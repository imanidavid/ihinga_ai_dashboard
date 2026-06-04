import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Sprout, Droplets, Bot, CloudRain, Store, Users } from "lucide-react";

export const Route = createFileRoute("/timeline")({
  head: () => ({ meta: [{ title: "Activity Timeline · IHINGA AI" }] }),
  component: TimelinePage,
});

const events = [
  { t: "07:14", title: "Irrigation cycle completed", desc: "Zone A · 1,840L used (12% under plan)", icon: Droplets, tone: "sky" },
  { t: "06:30", title: "AI: Coffee canopy +1.4% vigor", desc: "Computed from satellite + ground sensors", icon: Bot, tone: "amber" },
  { t: "Yesterday", title: "Rain event recorded", desc: "23mm overnight in Musanze", icon: CloudRain, tone: "sky" },
  { t: "Mon", title: "Maize Field C planted", desc: "32 hectares · projected yield 4.1t/ha", icon: Sprout, tone: "forest" },
  { t: "Sun", title: "Sold 120kg coffee", desc: "RWF 504,000 · Musanze Coop", icon: Store, tone: "clay" },
  { t: "Sat", title: "Joined Musanze Coop", desc: "Membership #428", icon: Users, tone: "forest" },
];
const toneMap = {
  forest: "bg-forest/15 text-forest",
  amber: "bg-amber-glow/15 text-amber-glow",
  clay: "bg-clay/15 text-clay",
  sky: "bg-chart-4/15 text-chart-4",
} as const;

function TimelinePage() {
  return (
    <PageShell title="Activity Timeline" subtitle="A living journal of every decision and event on your farm.">
      <div className="rounded-3xl bg-card border border-border/50 shadow-card p-6 lg:p-8">
        <ol className="relative border-l-2 border-border/60 ml-3 space-y-6">
          {events.map((e, i) => (
            <li key={i} className="pl-8 relative">
              <span className={`absolute -left-[19px] top-0 grid place-items-center w-9 h-9 rounded-full ${toneMap[e.tone as keyof typeof toneMap]} ring-4 ring-card`}>
                <e.icon className="w-4 h-4" />
              </span>
              <div className="text-xs text-muted-foreground">{e.t}</div>
              <div className="font-display text-lg mt-0.5">{e.title}</div>
              <p className="text-sm text-muted-foreground">{e.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </PageShell>
  );
}