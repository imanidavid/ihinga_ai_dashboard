import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { RwandaMap, DISTRICTS, type DistrictDatum } from "@/components/rwanda-map";
import { CloudRain, Sun, Wind, ShieldAlert, Activity } from "lucide-react";

export const Route = createFileRoute("/districts")({
  head: () => ({ meta: [{ title: "District Monitoring · IHINGA AI" }] }),
  component: DistrictsPage,
});

function DistrictsPage() {
  const [sel, setSel] = useState<DistrictDatum>(DISTRICTS[0]);
  const ranked = [...DISTRICTS].sort((a, b) => b.severity - a.severity);

  return (
    <PageShell
      title="District Monitoring"
      subtitle="Live climate, vegetation and crop-stress intelligence across Rwanda's 30 districts."
    >
      <div className="grid grid-cols-12 gap-6">
        <SectionCard className="col-span-12 xl:col-span-8" title="Rwanda climate severity map" subtitle="Hover or tap a district to inspect">
          <RwandaMap selectedId={sel.id} onSelect={setSel} />
        </SectionCard>

        <SectionCard className="col-span-12 xl:col-span-4" title={sel.name} subtitle={`${sel.province} Province`}>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { l: "Severity", v: sel.severity, i: ShieldAlert },
              { l: "Rain mm/wk", v: sel.rainfall, i: CloudRain },
              { l: "NDVI", v: sel.vegetation, i: Sun },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-secondary/60 p-4">
                <s.i className="w-4 h-4 text-amber-glow mx-auto" />
                <div className="font-display text-2xl mt-1">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <Row icon={Wind} k="Wind" v="9 km/h NE" />
            <Row icon={Activity} k="Active farmers" v="4,128" />
            <Row icon={ShieldAlert} k="Open alerts" v={sel.severity > 50 ? "3 critical" : "1 watch"} />
          </div>
        </SectionCard>

        <SectionCard className="col-span-12" title="All districts · severity ranking">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {ranked.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setSel(d)}
                className={`text-left flex items-center gap-3 p-3 rounded-2xl border transition ${
                  sel.id === d.id ? "border-amber-glow/60 bg-amber-glow/5" : "border-border/40 hover:bg-secondary/60"
                }`}
              >
                <span className="text-xs font-mono w-6 text-muted-foreground">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{d.name}</div>
                  <div className="text-[11px] text-muted-foreground">{d.province}</div>
                </div>
                <span className="font-display text-lg">{d.severity}</span>
              </button>
            ))}
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}

function Row({ icon: I, k, v }: { icon: React.ComponentType<{ className?: string }>; k: string; v: string }) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/40">
      <span className="flex items-center gap-2 text-muted-foreground">
        <I className="w-3.5 h-3.5 text-primary" /> {k}
      </span>
      <span className="font-medium">{v}</span>
    </div>
  );
}