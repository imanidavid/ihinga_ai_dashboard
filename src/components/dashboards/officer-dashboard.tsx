import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles, Radio, AlertTriangle, CloudRain, Activity, Droplets, ShieldAlert,
  Brain, TrendingUp, Satellite, Wind, Sun, ArrowUpRight, MapPin, ChevronRight,
} from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis,
  CartesianGrid, BarChart, Bar, RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import { KpiCard } from "@/components/kpi-card";
import { RwandaMap, DISTRICTS, type DistrictDatum } from "@/components/rwanda-map";
import hero from "@/assets/hero-rwanda.jpg";

export function OfficerDashboard() {
  const [selected, setSelected] = useState<DistrictDatum>(
    DISTRICTS.find((d) => d.id === "NYG2") ?? DISTRICTS[0],
  );

  const ranked = useMemo(
    () => [...DISTRICTS].sort((a, b) => b.severity - a.severity).slice(0, 6),
    [],
  );

  return (
    <div className="px-4 lg:px-8 py-6 lg:py-8 space-y-10 max-w-[1600px] mx-auto">
      {/* ===== Operational Hero ===== */}
      <section className="relative overflow-hidden rounded-3xl shadow-luxe">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/85 to-sidebar/20" />
        <div className="absolute -top-24 -left-20 w-[460px] h-[460px] rounded-full bg-amber-glow/25 blur-3xl animate-float" />

        <div className="relative grid lg:grid-cols-12 gap-6 p-6 lg:p-10 text-white">
          {/* Left: live national map */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-[11px] uppercase tracking-widest">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-forest animate-ping opacity-75" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-forest" />
                </span>
                Live Surveillance
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-[11px] uppercase tracking-widest text-amber-glow">
                <Sparkles className="w-3 h-3" /> AI confidence 91%
              </div>
              <div className="text-[11px] text-white/60 uppercase tracking-widest">
                <Satellite className="inline w-3 h-3 mr-1" /> 214 stations · 30 districts
              </div>
            </div>

            <h1 className="font-display text-3xl lg:text-5xl leading-[1.05] text-balance">
              Rwanda <span className="text-amber-glow">climate operations</span><br />
              command surface
            </h1>
            <p className="text-sm lg:text-base text-white/80 max-w-xl">
              Real-time district intelligence, vegetation health, and rainfall anomalies — integrated across MINAGRI, RAB, and Meteo Rwanda networks.
            </p>

            <div className="mt-2">
              <RwandaMap selectedId={selected.id} onSelect={setSelected} />
            </div>
          </div>

          {/* Right: operational stack */}
          <aside className="lg:col-span-5 space-y-3">
            <OpsStat
              icon={AlertTriangle}
              tone="destructive"
              label="Districts under warning"
              value="7"
              hint="2 critical · 5 watch"
            />
            <OpsStat
              icon={Activity}
              tone="amber"
              label="Farmer distress signals"
              value="1,284"
              hint="↑ 18% vs last 24h"
            />
            <OpsStat
              icon={Brain}
              tone="forest"
              label="Prediction confidence"
              value="91%"
              hint="Stable · 7-day horizon"
            />
            <OpsStat
              icon={ShieldAlert}
              tone="sky"
              label="Intervention readiness"
              value="86%"
              hint="Teams in 24 districts"
            />

            {/* District focus card */}
            <div className="rounded-2xl glass-dark p-5 mt-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> Focus district
                </div>
                <span className="text-[11px] text-amber-glow">{selected.province} Province</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <h3 className="font-display text-2xl">{selected.name}</h3>
                <span className="text-2xl font-display text-amber-glow">{selected.severity}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <Mini label="Rain" value={`${selected.rainfall}mm`} icon={CloudRain} />
                <Mini label="NDVI" value={`${selected.vegetation}`} icon={Sun} />
                <Mini label="Wind" value="9km/h" icon={Wind} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== KPI strip ===== */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Active Districts" value="30" icon={Radio} tone="forest"
          caption="All provinces online" delta="100% uptime" data={[28,29,29,30,30,30,30,30]} />
        <KpiCard title="Rainfall Anomaly" value="-34" unit="%" icon={CloudRain} tone="sky"
          caption="Eastern Province" delta="↑ severity" data={[12,8,6,4,3,2,1,1]} />
        <KpiCard title="Crop Stress Index" value="High" icon={ShieldAlert} tone="clay"
          caption="Maize · Nyagatare" delta="+22% wk" data={[3,4,6,7,8,10,12,14]} />
        <KpiCard title="Pest Outbreak Risk" value="3" icon={AlertTriangle} tone="amber"
          caption="Fall armyworm clusters" delta="2 confirmed" data={[1,1,2,2,2,3,3,3]} />
      </section>

      {/* ===== Charts + alert feed ===== */}
      <section className="grid grid-cols-12 gap-6">
        {/* National rainfall anomaly */}
        <div className="col-span-12 xl:col-span-8 rounded-3xl bg-card border border-border/50 shadow-card p-6 lg:p-7">
          <div className="flex items-end justify-between mb-4 gap-4 flex-wrap">
            <div>
              <h3 className="font-display text-2xl">National rainfall anomaly</h3>
              <p className="text-sm text-muted-foreground">Deviation from 10-year seasonal baseline · mm/week</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Pill color="forest" label="Baseline" />
              <Pill color="amber" label="Observed" />
              <Pill color="destructive" label="Anomaly" />
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={rainfallSeries}>
                <defs>
                  <linearGradient id="rg-obs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-amber-glow)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-amber-glow)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="rg-base" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-forest)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--color-forest)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="w" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <RTooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="baseline" stroke="var(--color-forest)" strokeWidth={2} strokeDasharray="4 4" fill="url(#rg-base)" />
                <Area type="monotone" dataKey="observed" stroke="var(--color-amber-glow)" strokeWidth={2.5} fill="url(#rg-obs)" />
                <Area type="monotone" dataKey="anomaly" stroke="var(--color-destructive)" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI insight panel */}
        <div className="col-span-12 xl:col-span-4 rounded-3xl bg-gradient-forest text-white p-6 shadow-card relative overflow-hidden">
          <div className="absolute -right-12 -bottom-16 w-56 h-56 rounded-full bg-amber-glow/30 blur-3xl animate-glow-pulse" />
          <div className="relative space-y-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/70">
              <Brain className="w-3.5 h-3.5 text-amber-glow" /> Officer AI · Strategic
            </div>
            {[
              "Eastern Province rainfall deficit increasing faster than seasonal baseline.",
              "High maize stress probability detected in Nyagatare within 72h.",
              "Flood risk escalation projected for Nyamasheke in 5–7 days.",
            ].map((t, i) => (
              <div key={i} className="rounded-2xl bg-white/5 p-4 border border-white/5 hover:bg-white/10 transition">
                <div className="text-sm leading-snug">{t}</div>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-white/60">
                  <Sparkles className="w-3 h-3 text-amber-glow" />
                  AI · {88 + i * 2}% confidence
                </div>
              </div>
            ))}
            <Link to="/intelligence" className="inline-flex items-center gap-1.5 text-xs text-amber-glow hover:gap-3 transition-all">
              Open AI Intelligence <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== District ranking + alert feed ===== */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 rounded-3xl bg-card border border-border/50 shadow-card p-6 lg:p-7">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h3 className="font-display text-2xl">District severity ranking</h3>
              <p className="text-sm text-muted-foreground">Composite climate + crop stress index</p>
            </div>
            <Link to="/districts" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              View all 30 <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <ul className="space-y-2">
            {ranked.map((d, i) => (
              <li key={d.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-secondary/60 transition group">
                <div className="text-xs font-mono w-6 text-muted-foreground">#{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{d.name}</span>
                    <span className="text-[11px] text-muted-foreground">{d.province}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${d.severity}%`,
                        background: `linear-gradient(90deg, var(--color-forest), var(--color-amber-glow), var(--color-destructive))`,
                      }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl">{d.severity}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.rainfall}mm/wk</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Live alert feed */}
        <div className="col-span-12 lg:col-span-5 rounded-3xl bg-card border border-border/50 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-primary" />
              <h3 className="font-display text-xl">Live activity feed</h3>
            </div>
            <span className="text-[11px] text-forest inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" /> streaming
            </span>
          </div>
          <ul className="space-y-3 max-h-[26rem] overflow-y-auto pr-1">
            {activityFeed.map((a, i) => (
              <li key={i} className="flex gap-3 p-3 rounded-2xl border border-border/40 hover:border-amber-glow/40 hover:bg-secondary/40 transition">
                <div className={`grid place-items-center w-9 h-9 rounded-xl shrink-0 ${a.toneBg}`}>
                  <a.icon className={`w-4 h-4 ${a.tone}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.where} · {a.time}</div>
                </div>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md self-start ${a.toneBg} ${a.tone}`}>
                  {a.severity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Bottom strip ===== */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 rounded-3xl bg-card border border-border/50 shadow-card p-6">
          <h3 className="font-display text-xl">Intervention readiness</h3>
          <p className="text-sm text-muted-foreground">Field response capacity</p>
          <div className="h-52 grid place-items-center mt-2">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="65%" outerRadius="100%" data={[{ name: "ready", value: 86, fill: "var(--color-amber-glow)" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "var(--color-muted)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-32 mb-10">
            <div className="font-display text-4xl">86%</div>
            <div className="text-xs text-muted-foreground">24 districts staffed</div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 rounded-3xl bg-card border border-border/50 shadow-card p-6">
          <div className="flex items-end justify-between mb-3">
            <div>
              <h3 className="font-display text-xl">Cooperative yield trend</h3>
              <p className="text-sm text-muted-foreground">Top-10 cooperatives · tonnes / month</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-forest">
              <TrendingUp className="w-3.5 h-3.5" /> +9% YoY
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer>
              <BarChart data={coopYield}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <RTooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="t" fill="var(--color-amber-glow)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== tiny subcomponents ===== */

function OpsStat({
  icon: Icon, tone, label, value, hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "destructive" | "amber" | "forest" | "sky";
  label: string; value: string; hint: string;
}) {
  const tones = {
    destructive: "bg-destructive/15 text-destructive",
    amber: "bg-amber-glow/15 text-amber-glow",
    forest: "bg-forest/20 text-forest",
    sky: "bg-chart-4/15 text-chart-4",
  } as const;
  return (
    <div className="rounded-2xl glass-dark p-4 hover:bg-white/10 transition group">
      <div className="flex items-center gap-3">
        <div className={`grid place-items-center w-10 h-10 rounded-xl ${tones[tone]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] uppercase tracking-wider text-white/60">{label}</div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-white">{value}</span>
            <span className="text-[11px] text-white/60 truncate">{hint}</span>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-amber-glow group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}

function Mini({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-xl bg-white/5 py-2.5 px-2">
      <Icon className="w-3.5 h-3.5 text-amber-glow mx-auto" />
      <div className="mt-1 text-sm font-medium text-white">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-white/55">{label}</div>
    </div>
  );
}

function Pill({ color, label }: { color: "forest" | "amber" | "destructive"; label: string }) {
  const map = {
    forest: "bg-forest/15 text-forest",
    amber: "bg-amber-glow/15 text-amber-glow",
    destructive: "bg-destructive/15 text-destructive",
  } as const;
  return <span className={`px-2 py-1 rounded-md text-[10px] uppercase tracking-wider ${map[color]}`}>{label}</span>;
}

/* ===== mock data ===== */

const rainfallSeries = [
  { w: "W1", baseline: 42, observed: 40, anomaly: -2 },
  { w: "W2", baseline: 46, observed: 42, anomaly: -4 },
  { w: "W3", baseline: 50, observed: 38, anomaly: -12 },
  { w: "W4", baseline: 54, observed: 36, anomaly: -18 },
  { w: "W5", baseline: 58, observed: 32, anomaly: -26 },
  { w: "W6", baseline: 60, observed: 28, anomaly: -32 },
  { w: "W7", baseline: 62, observed: 26, anomaly: -36 },
  { w: "W8", baseline: 60, observed: 30, anomaly: -30 },
  { w: "W9", baseline: 56, observed: 34, anomaly: -22 },
  { w: "W10", baseline: 52, observed: 38, anomaly: -14 },
];

const coopYield = [
  { m: "Jan", t: 320 }, { m: "Feb", t: 360 }, { m: "Mar", t: 410 }, { m: "Apr", t: 480 },
  { m: "May", t: 520 }, { m: "Jun", t: 560 }, { m: "Jul", t: 590 }, { m: "Aug", t: 640 },
];

const activityFeed = [
  { icon: AlertTriangle, tone: "text-destructive", toneBg: "bg-destructive/15", title: "Severe drought signal · Nyagatare", where: "Eastern Province", time: "2m", severity: "Critical" },
  { icon: Droplets, tone: "text-chart-4", toneBg: "bg-chart-4/15", title: "Irrigation failure reported", where: "Bugesera · 14 farmers", time: "8m", severity: "High" },
  { icon: Activity, tone: "text-amber-glow", toneBg: "bg-amber-glow/15", title: "Fall armyworm cluster confirmed", where: "Kayonza · 3 cells", time: "21m", severity: "Watch" },
  { icon: CloudRain, tone: "text-chart-4", toneBg: "bg-chart-4/15", title: "Heavy rainfall window opening", where: "Rusizi · Karongi", time: "34m", severity: "Watch" },
  { icon: Radio, tone: "text-forest", toneBg: "bg-forest/15", title: "Cooperative report received", where: "Huye · COAMV", time: "1h", severity: "Info" },
  { icon: ShieldAlert, tone: "text-amber-glow", toneBg: "bg-amber-glow/15", title: "Intervention team deployed", where: "Nyagatare district HQ", time: "1h", severity: "Action" },
  { icon: Activity, tone: "text-forest", toneBg: "bg-forest/15", title: "Vegetation health rising", where: "Musanze · NDVI 88", time: "2h", severity: "Info" },
];