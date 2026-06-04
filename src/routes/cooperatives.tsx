import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { Users, MapPin } from "lucide-react";

export const Route = createFileRoute("/cooperatives")({
  head: () => ({ meta: [{ title: "Cooperatives · IHINGA AI" }] }),
  component: CoopsPage,
});

const coops = [
  { name: "Musanze Coffee Coop", members: 428, district: "Musanze", focus: "Arabica", score: 92 },
  { name: "Nyagatare Grain Union", members: 612, district: "Nyagatare", focus: "Maize · Sorghum", score: 84 },
  { name: "Nyamagabe Tea Society", members: 256, district: "Nyamagabe", focus: "Tea", score: 88 },
  { name: "Huye Beans Collective", members: 314, district: "Huye", focus: "Climbing beans", score: 79 },
  { name: "Karongi Lakeside Coop", members: 198, district: "Karongi", focus: "Mixed", score: 81 },
  { name: "Rubavu Highland Coop", members: 372, district: "Rubavu", focus: "Coffee · Potatoes", score: 86 },
];

function CoopsPage() {
  return (
    <PageShell title="Cooperatives" subtitle="Stronger together — discover and join cooperatives near you.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coops.map((c) => (
          <SectionCard key={c.name}>
            <div className="flex items-start gap-4">
              <div className="grid place-items-center w-12 h-12 rounded-2xl bg-gradient-sunrise text-sidebar font-semibold">
                {c.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg leading-tight">{c.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{c.district}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <Stat label="Members" value={c.members} />
              <Stat label="Focus" value={c.focus} compact />
              <Stat label="AI score" value={`${c.score}`} />
            </div>
            <button className="mt-4 w-full py-2 rounded-xl bg-secondary hover:bg-secondary/70 text-sm font-medium transition">
              Request to join
            </button>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}

function Stat({ label, value, compact = false }: { label: string; value: string | number; compact?: boolean }) {
  return (
    <div className="rounded-xl bg-secondary/50 p-2">
      <div className={`font-display ${compact ? "text-xs" : "text-lg"}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}