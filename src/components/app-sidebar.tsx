import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf, Crown, LogOut } from "lucide-react";
import { useRole } from "@/components/role-provider";
import { ROLE_META, ROLE_NAV } from "@/lib/roles";

export function AppSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const { role, signOut } = useRole();
  const activeRole = role ?? "farmer";
  const nav = ROLE_NAV[activeRole];
  const meta = ROLE_META[activeRole];

  return (
    <aside className="hidden lg:flex w-[280px] shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <div className="flex items-center gap-3">
          <div className="relative grid place-items-center w-11 h-11 rounded-xl bg-gradient-sunrise shadow-glow">
            <Leaf className="w-5 h-5 text-sidebar" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display text-xl tracking-tight">IHINGA AI</div>
            <div className="text-[11px] text-sidebar-foreground/60 tracking-wide uppercase">
              {meta.tagline}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto pb-4 space-y-0.5">
        {nav.map(({ to, label, icon: Icon }, i) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <Link
              key={`${to}-${i}`}
              to={to}
              search={{ role: activeRole }}
              className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                active
                  ? "bg-sidebar-accent text-sidebar-primary shadow-glow"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-r-full bg-gradient-sunrise" />
              )}
              <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={active ? 2.4 : 1.8} />
              <span className={active ? "font-medium" : ""}>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile + Premium */}
      <div className="p-4 space-y-3 border-t border-sidebar-border">
        <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-sunrise">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sidebar-primary-foreground/90 text-xs uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" /> {meta.badge}
            </div>
            <p className="mt-1.5 text-sm text-sidebar-primary-foreground font-medium leading-snug">
              {activeRole === "officer"
                ? "National climate intelligence engaged across 30 districts."
                : "Unlock advanced AI forecasts & cooperative insights."}
            </p>
            <button
              onClick={signOut}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 text-xs font-medium rounded-lg bg-sidebar/90 text-sidebar-foreground py-2 hover:bg-sidebar transition"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/20 blur-2xl" />
        </div>

        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-sidebar-accent/50 transition cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-glow to-forest grid place-items-center text-sidebar font-semibold text-sm">
            {meta.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{meta.person}</div>
            <div className="text-[11px] text-sidebar-foreground/60 truncate">{meta.district}</div>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-amber-glow/80">{meta.short}</span>
        </div>
      </div>
    </aside>
  );
}