import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { Download, FileText } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports · IHINGA AI" }] }),
  component: ReportsPage,
});

const yieldData = Array.from({ length: 8 }).map((_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"][i],
  coffee: 1.2 + i * 0.3,
  maize: 0.8 + i * 0.2,
  beans: 0.6 + i * 0.15,
}));
const climateRadial = [{ name: "Risk", value: 28, fill: "var(--color-amber-glow)" }];

function ReportsPage() {
  return (
    <PageShell title="Reports" subtitle="Deep analytics across yield, climate and profitability."
      action={
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/70 text-sm"><FileText className="w-4 h-4" /> View</button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-sunrise text-sidebar font-medium text-sm shadow-glow"><Download className="w-4 h-4" /> Export PDF</button>
        </div>
      }>
      <div className="grid grid-cols-12 gap-6">
        <SectionCard className="col-span-12 lg:col-span-8" title="Yield by crop" subtitle="Tonnes per hectare · 2026 season">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={yieldData}>
                <defs>
                  {["coffee","maize","beans"].map((k, i) => (
                    <linearGradient key={k} id={`g${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={`var(--color-chart-${i+1})`} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={`var(--color-chart-${i+1})`} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="coffee" stroke="var(--color-chart-1)" fill="url(#gcoffee)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="maize" stroke="var(--color-chart-2)" fill="url(#gmaize)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="beans" stroke="var(--color-chart-3)" fill="url(#gbeans)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard className="col-span-12 lg:col-span-4" title="Climate risk" subtitle="Composite index">
          <div className="h-72 grid place-items-center">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="65%" outerRadius="100%" data={climateRadial} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "var(--color-muted)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-44 mb-12">
            <div className="font-display text-4xl">28%</div>
            <div className="text-xs text-muted-foreground">Low risk</div>
          </div>
        </SectionCard>

        <SectionCard className="col-span-12" title="Profit by month" subtitle="Net RWF (millions)">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={yieldData}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="coffee" stackId="a" fill="var(--color-amber-glow)" radius={[0,0,0,0]} />
                <Bar dataKey="maize" stackId="a" fill="var(--color-forest)" radius={[0,0,0,0]} />
                <Bar dataKey="beans" stackId="a" fill="var(--color-clay)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}