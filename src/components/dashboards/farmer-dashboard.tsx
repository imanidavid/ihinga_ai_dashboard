import { HeroSection } from "@/components/hero-section";
import { KpiCard } from "@/components/kpi-card";
import { CropCard } from "@/components/crop-card";
import {
  CloudRain, Droplets, ShieldAlert, Waves, Sparkles, CalendarClock,
  TrendingUp, Quote, Bot, Banknote, Activity,
} from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis,
  Line, LineChart, CartesianGrid,
} from "recharts";
import coffee from "@/assets/crop-coffee.jpg";
import maize from "@/assets/crop-maize.jpg";
import tea from "@/assets/crop-tea.jpg";
import beans from "@/assets/crop-beans.jpg";

export function FarmerDashboard() {
  return (
    <div className="px-4 lg:px-8 py-6 lg:py-8 space-y-12 max-w-[1500px] mx-auto">
      <HeroSection name="Jean" />

      <div className="pt-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Climate Risk" value="Low" icon={ShieldAlert} tone="forest"
              caption="Stable conditions" delta="-8% wk" data={[8,7,7,6,5,5,4,3]} />
            <KpiCard title="Rainfall" value="42" unit="mm" icon={CloudRain} tone="sky"
              caption="Next 7 days" delta="+15%" data={[3,5,4,6,8,7,10,12]} />
            <KpiCard title="Soil Moisture" value="68" unit="%" icon={Droplets} tone="amber"
              caption="Optimal range" delta="stable" data={[60,62,64,65,67,68,68,68]} />
            <KpiCard title="Irrigation" value="Active" icon={Waves} tone="clay"
              caption="Zone A · 2 of 4" delta="3h left" data={[2,4,3,5,4,6,5,7]} />
          </div>

          <div className="rounded-3xl bg-card border border-border/50 shadow-card p-6 lg:p-7">
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="font-display text-2xl">Crop overview</h2>
                <p className="text-sm text-muted-foreground">Live growth and health across your fields.</p>
              </div>
              <button className="text-xs text-primary hover:underline">View all 12</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <CropCard name="Arabica Coffee" image={coffee} stage="Flowering · week 14"
                health={92} location="Musanze · Field A" status="Flowering" />
              <CropCard name="Maize" image={maize} stage="Vegetative · week 6"
                health={78} location="Musanze · Field C" status="Vegetative" />
              <CropCard name="Tea" image={tea} stage="Harvest cycle"
                health={88} location="Nyamagabe · Plot 2" status="Harvest" />
              <CropCard name="Beans" image={beans} stage="Emerging · day 11"
                health={71} location="Musanze · Field B" status="Emerging" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-3xl bg-card border border-border/50 shadow-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl">Farm profit prediction</h3>
                  <p className="text-sm text-muted-foreground">12-month projection · RWF</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display text-forest">+RWF 2.4M</div>
                  <div className="text-xs text-muted-foreground">vs last season</div>
                </div>
              </div>
              <div className="h-56 mt-4">
                <ResponsiveContainer>
                  <AreaChart data={profitData}>
                    <defs>
                      <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-amber-glow)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--color-amber-glow)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <RTooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                    <Area type="monotone" dataKey="profit" stroke="var(--color-amber-glow)" strokeWidth={2.5} fill="url(#pg)" />
                    <Line type="monotone" dataKey="forecast" stroke="var(--color-forest)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-forest text-white p-6 shadow-card relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-amber-glow/30 blur-3xl animate-glow-pulse" />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
                  <Sparkles className="w-3.5 h-3.5 text-amber-glow" /> AI recommendation
                </div>
                <h3 className="mt-3 font-display text-xl leading-snug">
                  Delay maize irrigation by 36 hours.
                </h3>
                <p className="mt-2 text-sm text-white/75">
                  Rainfall probability is 78% Wednesday morning. Holding will save 1,200L and protect root oxygenation.
                </p>
                <div className="mt-4 flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-amber-glow text-sidebar font-medium">Apply</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition">Dismiss</button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 rounded-3xl bg-card border border-border/50 shadow-card p-6">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <h3 className="font-display text-xl">Water usage</h3>
                  <p className="text-sm text-muted-foreground">Last 14 days · litres</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-forest">
                  <TrendingUp className="w-3.5 h-3.5" /> 12% more efficient vs prev. period
                </div>
              </div>
              <div className="h-44">
                <ResponsiveContainer>
                  <LineChart data={waterData}>
                    <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <RTooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                    <Line type="monotone" dataKey="used" stroke="var(--color-chart-4)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--color-chart-4)" }} />
                    <Line type="monotone" dataKey="ideal" stroke="var(--color-forest)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <aside className="col-span-12 xl:col-span-4 space-y-4">
          <FarmScoreCard />
          <UpcomingPanel />
          <MarketPanel />
          <QuoteCard />
        </aside>
      </div>
    </div>
  );
}

const profitData = [
  { m: "Jan", profit: 1.2, forecast: 1.4 },
  { m: "Feb", profit: 1.4, forecast: 1.6 },
  { m: "Mar", profit: 1.7, forecast: 1.8 },
  { m: "Apr", profit: 1.9, forecast: 2.0 },
  { m: "May", profit: 2.1, forecast: 2.3 },
  { m: "Jun", profit: 2.4, forecast: 2.6 },
  { m: "Jul", profit: 2.6, forecast: 2.9 },
  { m: "Aug", profit: 2.9, forecast: 3.2 },
];
const waterData = Array.from({ length: 14 }).map((_, i) => ({
  d: `D${i+1}`,
  used: 380 + Math.round(Math.sin(i / 2) * 60) + i * 3,
  ideal: 420,
}));

function FarmScoreCard() {
  return (
    <div className="rounded-3xl bg-gradient-sunrise text-sidebar p-6 shadow-luxe relative overflow-hidden">
      <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-white/30 blur-3xl" />
      <div className="relative flex items-center gap-5">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="rgba(0,0,0,0.15)" strokeWidth="8" fill="none" />
            <circle cx="50" cy="50" r="42" stroke="oklch(0.2 0.04 150)" strokeWidth="8" strokeLinecap="round" fill="none"
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={2 * Math.PI * 42 * (1 - 0.86)} />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="font-display text-2xl leading-none">86</div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">score</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80">AI farm score</div>
          <div className="font-display text-xl leading-tight">Excellent</div>
          <p className="text-xs opacity-80 mt-1">Top 12% in Northern Province this month.</p>
        </div>
      </div>
    </div>
  );
}

function UpcomingPanel() {
  const items = [
    { time: "07:00", title: "Inspect coffee canopy", tag: "Field A", icon: Sparkles },
    { time: "10:30", title: "Irrigate maize zone B", tag: "Zone B · 1,800L", icon: Waves },
    { time: "14:00", title: "Cooperative meeting", tag: "Musanze hall", icon: Activity },
    { time: "Tomorrow", title: "Soil sampling — beans", tag: "AI suggested", icon: Bot },
  ];
  return (
    <div className="rounded-3xl bg-card border border-border/50 shadow-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <CalendarClock className="w-4 h-4 text-primary" />
        <h3 className="font-display text-lg">Upcoming</h3>
      </div>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it.title} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-secondary/60 transition">
            <div className="grid place-items-center w-9 h-9 rounded-xl bg-amber-glow/15 text-amber-glow shrink-0">
              <it.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{it.title}</div>
              <div className="text-xs text-muted-foreground">{it.tag}</div>
            </div>
            <div className="text-xs text-muted-foreground">{it.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MarketPanel() {
  const rows = [
    { crop: "Coffee (kg)", price: "RWF 4,200", delta: "+3.2%", up: true },
    { crop: "Maize (kg)", price: "RWF 480", delta: "-1.1%", up: false },
    { crop: "Beans (kg)", price: "RWF 850", delta: "+0.8%", up: true },
    { crop: "Tea (kg)", price: "RWF 1,100", delta: "+2.0%", up: true },
  ];
  return (
    <div className="rounded-3xl bg-card border border-border/50 shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Banknote className="w-4 h-4 text-primary" />
          <h3 className="font-display text-lg">Market prices</h3>
        </div>
        <span className="text-[11px] text-muted-foreground">Today · Kigali</span>
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.crop} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/60 transition">
            <span className="text-sm">{r.crop}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{r.price}</span>
              <span className={`text-xs px-2 py-0.5 rounded-md ${r.up ? "bg-forest/10 text-forest" : "bg-destructive/10 text-destructive"}`}>
                {r.delta}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuoteCard() {
  return (
    <div className="rounded-3xl p-6 shadow-card border border-border/50 bg-gradient-to-br from-forest/20 to-amber-glow/10 relative overflow-hidden">
      <Quote className="absolute top-4 right-4 w-12 h-12 text-amber-glow/30" />
      <p className="font-display text-lg leading-snug text-balance">
        "Ubuhinzi ni urufunguzo rw'iterambere." — Farming is the key to development.
      </p>
      <div className="mt-3 text-xs text-muted-foreground">Rwandan agricultural proverb</div>
    </div>
  );
}