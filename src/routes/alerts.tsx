import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { AlertTriangle, CloudRain, Bug, Droplets, ShieldAlert, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alerts & Interventions · IHINGA AI" }] }),
  component: AlertsPage,
});

const alerts = [
  { sev: "Critical", tone: "destructive", icon: CloudRain, title: "Severe drought escalation", where: "Nyagatare · Eastern", affected: "8,400 farmers", eta: "Active · 14 days", body: "Cumulative rainfall 34% below baseline. Maize and beans entering acute stress. Deploy emergency irrigation kits." },
  { sev: "Critical", tone: "destructive", icon: Droplets, title: "Flood risk window opening", where: "Nyamasheke · Western", affected: "2,100 farmers", eta: "72h horizon", body: "Lake Kivu pressure system intensifying. Pre-position evacuation teams and protect lowland coffee plots." },
  { sev: "High", tone: "clay", icon: Bug, title: "Fall armyworm cluster", where: "Kayonza · 3 cells", affected: "640 farmers", eta: "Spreading", body: "Pheromone traps confirm outbreak. Distribute biopesticide stock from Rwamagana depot." },
  { sev: "Watch", tone: "amber", icon: ShieldAlert, title: "Soil moisture decline", where: "Gatsibo · Eastern", affected: "1,250 farmers", eta: "5–7 days", body: "Trend below seasonal norm. Schedule advisory broadcasts and prep mobile irrigation." },
];

const tones: Record<string, string> = {
  destructive: "bg-destructive/15 text-destructive border-destructive/30",
  clay: "bg-clay/15 text-clay border-clay/30",
  amber: "bg-amber-glow/15 text-amber-glow border-amber-glow/30",
};

function AlertsPage() {
  return (
    <PageShell
      title="Alerts & Interventions"
      subtitle="Severe weather coordination, intervention planning, and response analytics."
    >
      {/* Banner */}
      <div className="rounded-3xl p-6 bg-gradient-forest text-white relative overflow-hidden shadow-luxe">
        <div className="absolute -right-12 -bottom-12 w-52 h-52 rounded-full bg-destructive/30 blur-3xl animate-glow-pulse" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center w-12 h-12 rounded-2xl bg-destructive/30">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-white/60">National status</div>
              <div className="font-display text-2xl">2 critical · 5 watch · 12 monitored</div>
            </div>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-amber-glow text-sidebar font-medium text-sm shadow-glow">
            Open response room
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {alerts.map((a) => (
          <SectionCard key={a.title} className={`col-span-12 lg:col-span-6 border ${tones[a.tone]}`}>
            <div className="flex items-start gap-4">
              <div className={`grid place-items-center w-12 h-12 rounded-2xl ${tones[a.tone]} border-0`}>
                <a.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-xl">{a.title}</h3>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md ${tones[a.tone]}`}>{a.sev}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{a.where} · {a.affected} · {a.eta}</div>
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{a.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-gradient-sunrise text-sidebar font-medium inline-flex items-center gap-1.5">
                    Plan intervention <ArrowRight className="w-3 h-3" />
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/70">Escalate</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/70">Broadcast SMS</button>
                </div>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}