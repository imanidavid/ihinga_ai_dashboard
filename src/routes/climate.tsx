import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { KpiCard } from "@/components/kpi-card";
import { CloudRain, ThermometerSun, Wind, Droplets } from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar,
} from "recharts";

export const Route = createFileRoute("/climate")({
  head: () => ({ meta: [{ title: "Climate Intelligence · IHINGA AI" }] }),
  component: ClimatePage,
});

const districts = [
  { name: "Musanze", risk: 22, rain: 48 }, { name: "Kigali", risk: 35, rain: 28 },
  { name: "Huye", risk: 18, rain: 52 }, { name: "Rubavu", risk: 41, rain: 22 },
  { name: "Nyagatare", risk: 58, rain: 14 }, { name: "Karongi", risk: 27, rain: 44 },
  { name: "Rusizi", risk: 31, rain: 39 }, { name: "Gicumbi", risk: 24, rain: 47 },
];
const rainfall = Array.from({ length: 12 }).map((_, i) => ({
  m: ["J","F","M","A","M","J","J","A","S","O","N","D"][i],
  rain: 40 + Math.round(Math.sin(i / 1.8) * 35) + 20,
  forecast: 50 + Math.round(Math.sin((i + 1) / 1.8) * 35) + 18,
}));

function ClimatePage() {
  return (
    <PageShell title="Climate Intelligence" subtitle="Rwanda-wide forecasts, district risk maps and seasonal projections — powered by AI.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Avg. temp" value="21.8" unit="°C" icon={ThermometerSun} tone="amber" delta="+0.4°" />
        <KpiCard title="Rainfall (mo)" value="142" unit="mm" icon={CloudRain} tone="sky" delta="+12%" />
        <KpiCard title="Humidity" value="71" unit="%" icon={Droplets} tone="forest" delta="stable" />
        <KpiCard title="Wind avg" value="9.2" unit="km/h" icon={Wind} tone="clay" delta="NE" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <SectionCard className="col-span-12 lg:col-span-7" title="Rwanda district risk map"
          subtitle="Hover districts to inspect drought & flood probability.">
          <div className="grid grid-cols-4 gap-3">
            {districts.map((d) => {
              const tone = d.risk > 50 ? "bg-destructive/20 text-destructive" : d.risk > 30 ? "bg-amber-glow/20 text-amber-glow" : "bg-forest/15 text-forest";
              return (
                <div key={d.name} className={`relative rounded-2xl p-4 ${tone} hover:scale-[1.03] transition cursor-pointer`}>
                  <div className="text-sm font-medium">{d.name}</div>
                  <div className="font-display text-2xl mt-1">{d.risk}%</div>
                  <div className="text-[11px] opacity-80">drought risk</div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard className="col-span-12 lg:col-span-5" title="Rainfall forecast"
          subtitle="Actual vs AI projection · 12 months">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={rainfall}>
                <defs>
                  <linearGradient id="r1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-4)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-chart-4)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="rain" stroke="var(--color-chart-4)" fill="url(#r1)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="forecast" stroke="var(--color-amber-glow)" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard className="col-span-12" title="Drought severity index by district">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={districts}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="risk" fill="var(--color-amber-glow)" radius={[8,8,0,0]} />
                <Bar dataKey="rain" fill="var(--color-forest)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}