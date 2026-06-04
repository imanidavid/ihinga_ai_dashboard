import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  useNavigate,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/theme-provider";
import { RoleProvider, useRole } from "@/components/role-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import { FloatingVoiceAI } from "@/components/floating-voice-ai";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "IHINGA AI — Smart Farming Intelligence for Rwanda" },
      { name: "description", content: "An AI-powered agricultural operating system for Rwandan farmers, cooperatives and experts." },
      { name: "author", content: "IHINGA AI" },
      { property: "og:title", content: "IHINGA AI — Smart Farming Intelligence for Rwanda" },
      { property: "og:description", content: "An AI-powered agricultural operating system for Rwandan farmers, cooperatives and experts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "IHINGA AI — Smart Farming Intelligence for Rwanda" },
      { name: "twitter:description", content: "An AI-powered agricultural operating system for Rwandan farmers, cooperatives and experts." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RoleProvider>
          <Shell />
        </RoleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function Shell() {
  const { role, mounted } = useRole();
  const state = useRouterState();
  const path = state.location.pathname;
  const authPaths = ["/login", "/signin", "/signup", "/otp", "/forgot", "/reset"];
  const onAuth = authPaths.includes(path);
  
  const [showSwitcher, setShowSwitcher] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setShowSwitcher(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Avoid SSR/client mismatch: only render after mount.
  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-background grid place-items-center">
        <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  // If on a specific auth page, show it without the sidebar shell.
  if (onAuth) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground">
        <Outlet />
      </div>
    );
  }

  // Prototype Mode: Always show the full app shell. 
  // Individual routes handle rendering content based on the role.
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground relative">
      <AppSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <FloatingVoiceAI />
      
      {/* Prototype Quick Switcher */}
      <div 
        ref={switcherRef}
        onMouseEnter={() => setShowSwitcher(true)}
        className="fixed bottom-6 left-6 z-50"
      >
        <div className={`absolute bottom-full left-0 mb-4 flex flex-col gap-2 transition-all duration-300 transform ${
          showSwitcher 
            ? "pointer-events-auto opacity-100 translate-y-0" 
            : "pointer-events-none opacity-0 translate-y-2"
        }`}>
          {[
            { id: "farmer", label: "Farmer", color: "from-amber-glow to-forest" },
            { id: "officer", label: "Officer", color: "from-blue-500 to-indigo-600" },
            { id: "cooperative", label: "Cooperative", color: "from-purple-500 to-pink-600" },
            { id: "agronomist", label: "Agronomist", color: "from-green-500 to-teal-600" },
            { id: "researcher", label: "Researcher", color: "from-orange-500 to-red-600" },
            { id: "admin", label: "Admin", color: "from-slate-700 to-slate-900" },
          ].map((r) => (
            <Link
              key={r.id}
              to={`/${r.id}`}
              onClick={() => setShowSwitcher(false)}
              className={`px-4 py-2 rounded-xl bg-gradient-to-r ${r.color} text-white text-xs font-bold shadow-lg hover:scale-105 transition active:scale-95 whitespace-nowrap`}
            >
              Switch to {r.label}
            </Link>
          ))}
        </div>
        <button className="w-12 h-12 rounded-full bg-sidebar border border-sidebar-border shadow-2xl flex items-center justify-center hover:bg-sidebar-accent transition-colors">
          <div className="grid grid-cols-2 gap-1 px-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-glow" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          </div>
        </button>
      </div>
    </div>
  );
}
