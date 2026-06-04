import { ROLE_META, type Role } from "@/lib/roles";
import { HeroSection } from "@/components/hero-section";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function StubDashboard({ role }: { role: Role }) {
  const meta = ROLE_META[role];
  return (
    <div className="px-4 lg:px-8 py-6 lg:py-8 space-y-12 max-w-[1500px] mx-auto">
      <HeroSection name={meta.person.split(" ")[0]} />
      <div className="pt-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 rounded-3xl bg-card border border-border/50 shadow-card p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-glow/15 text-amber-glow text-[11px] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> {meta.short} workspace
          </div>
          <h2 className="mt-4 font-display text-3xl lg:text-4xl leading-tight">
            The {meta.label.toLowerCase()} surface is coming online.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Your role-specific intelligence panels, advisory tooling, and operational widgets are being orchestrated. In the meantime, explore the shared modules — every screen respects {meta.label.toLowerCase()} permissions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/climate" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-sunrise text-sidebar font-medium text-sm shadow-glow">
              Open Climate Intelligence <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/reports" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/70 text-sm">
              View shared reports
            </Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 rounded-3xl bg-gradient-forest text-white p-8 shadow-card relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-amber-glow/30 blur-3xl animate-glow-pulse" />
          <div className="relative">
            <div className="text-xs uppercase tracking-wider text-white/70">Signed in as</div>
            <div className="mt-2 font-display text-2xl">{meta.person}</div>
            <div className="text-sm text-white/70">{meta.district}</div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white/5 p-3">
                <div className="text-[11px] uppercase tracking-wider text-white/60">Permissions</div>
                <div className="font-medium">{meta.badge}</div>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <div className="text-[11px] uppercase tracking-wider text-white/60">Domain</div>
                <div className="font-medium">{meta.short}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}