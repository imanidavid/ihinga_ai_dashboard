import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { Brain, Sparkles, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis,
  Tooltip as RTooltip, RadialBarChart, RadialBar, PolarAngleAxis, Line, LineChart,
} from "recharts";

export const Route = createFileRoute("/intelligence")({
  head: () => ({ meta: [{ title: "AI Intelligence · IHINGA AI" }] }),
  component: IntelPage,
});

const forecast = Array.from({ length: 14 }).map((_, i) => ({
  d: `D${i + 1}`,
  predicted: 40 + Math.sin(i / 1.6) * 18 + i,
  actual: i < 7 ? 38 + Math.sin(i / 1.6) * 16 + i : null,
  upper: 52 + Math.sin(i / 1.6) * 18 + i,
  lower: 28 + Math.sin(i / 1.6) * 18 + i,
}));

const anomaly = Array.from({ length: 24 }).map((_, i) => ({
  h: `${i}h`,
  v: 20 + Math.round(Math.sin(i / 2) * 20) + (i === 17 ? 38 : 0) + (i === 21 ? 28 : 0),
}));

function IntelPage() {
  return (
    <PageShell
      title="AI Intelligence"
      subtitle="Predictive climate models, anomaly detection, and pest-spread simulations."
      action={
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-glow" /> Model · IHINGA-CLIMATE-v3
        </div>
      }
    >
      {/* Hero insight strip */}
      <div className="rounded-3xl p-6 lg:p-8 bg-gradient-forest text-white relative overflow-hidden shadow-luxe">
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-amber-glow/30 blur-3xl animate-glow-pulse" />
        <div className="absolute -left-10 -bottom-10 w-52 h-52 rounded-full bg-chart-4/30 blur-3xl" />
        <div className="relative grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-[11px] uppercase tracking-widest">
              <Brain className="w-3.5 h-3.5 text-amber-glow" /> Strategic insight
            </div>
            <h2 className="mt-4 font-display text-2xl lg:text-4xl leading-snug text-balance">
              Eastern Province rainfall deficit is widening <span className="text-amber-glow">2.3× faster</span> than the 10-year seasonal baseline.
            </h2>
            <p className="mt-3 text-white/75 max-w-2xl">
              Probability of escalation to a drought emergency reaches 78% within 9 days unless mitigation in Nyagatare and Gatsibo is initiated.
            </p>
          </div>
          <div className="rounded-2xl glass-dark p-5">
            <div className="text-[11px] uppercase tracking-widest text-white/60">Confidence</div>
            <div className="h-32 mt-2">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ name: "c", value: 91, fill: "var(--color-amber-glow)" }]} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "rgba(255,255,255,0.08)" }} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center -mt-20 mb-4">
              <div className="font-display text-3xl text-white">91%</div>
              <div className="text-[10px] uppercase tracking-wider text-white/60">model certainty</div>
            </div>
          </div>
        </div>
      </div>

      {/* Predictions */}
      <div className="grid grid-cols-12 gap-6">
        <SectionCard className="col-span-12 xl:col-span-8" title="Rainfall forecast envelope" subtitle="14-day prediction · mm/day · 90% confidence band">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={forecast}>
                <defs>
                  <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-amber-glow)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-amber-glow)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <RTooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="upper" stroke="none" fill="url(#band)" />
                <Area type="monotone" dataKey="lower" stroke="none" fill="var(--color-background)" />
                <Area type="monotone" dataKey="predicted" stroke="var(--color-amber-glow)" strokeWidth={2.5} fill="none" />
                <Area type="monotone" dataKey="actual" stroke="var(--color-forest)" strokeWidth={2.5} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard className="col-span-12 xl:col-span-4" title="Anomaly detection" subtitle="Past 24h · sensor variance">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={anomaly}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="h" stroke="var(--color-muted-foreground)" fontSize={10} interval={3} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={10} />
                <RTooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="v" stroke="var(--color-destructive)" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            <AlertTriangle className="inline w-3 h-3 text-destructive mr-1" />
            2 anomalies flagged · 17:00 humidity spike, 21:00 wind shear
          </div>
        </SectionCard>

        {[
          { i: Brain, t: "Pest spread simulation", d: "Fall armyworm dispersion modelled across Eastern Province under current wind conditions.", c: "84%" },
          { i: TrendingUp, t: "Seasonal yield outlook", d: "Coffee +6%, Maize -4%, Beans stable. Northern Province leads expected gains.", c: "88%" },
          { i: Activity, t: "Environmental trend", d: "NDVI rising across Western Province — early indicator of regreening cycle.", c: "92%" },
        ].map((card) => (
          <SectionCard key={card.t} className="col-span-12 md:col-span-6 xl:col-span-4">
            <div className="flex items-start gap-3">
              <div className="grid place-items-center w-11 h-11 rounded-2xl bg-amber-glow/15 text-amber-glow">
                <card.i className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display text-lg">{card.t}</div>
                <p className="text-sm text-muted-foreground mt-1">{card.d}</p>
                <div className="mt-3 text-[11px] uppercase tracking-wider text-forest">
                  AI · {card.c} confidence
                </div>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}