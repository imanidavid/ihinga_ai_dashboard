import { Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import hero from "@/assets/hero-rwanda.jpg";

export function HeroSection({ name = "Jean" }: { name?: string }) {
  // Compute time-based greeting only after mount to avoid SSR hydration mismatch.
  const [greeting, setGreeting] = useState("Muraho neza");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Muraho neza" : "Mwiriwe");
  }, []);

  return (
    <section className="relative rounded-3xl shadow-luxe">
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <img
          src={hero}
          alt="Sunrise over Rwanda's terraced hills"
          width={1920}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Atmospheric overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-amber-glow/30 blur-3xl animate-float" />
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-amber-glow/40 blur-2xl animate-glow-pulse" />
      </div>

      <div className="relative px-7 lg:px-12 py-12 lg:py-16 min-h-[440px] flex flex-col justify-between text-white">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-xs uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 text-amber-glow" />
            AI confidence · 94%
          </div>
          <h1 className="font-display text-4xl lg:text-6xl leading-[1.05] text-balance">
            {greeting}, <span className="text-amber-glow">{name}</span>.
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-white/85 max-w-xl text-balance">
            Today's hills are awake — soil is moist, the sky is clear over Musanze, and your coffee canopy is gaining 1.4% vigor this week.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-gradient-sunrise text-sidebar font-medium text-sm shadow-glow hover:opacity-95 transition">
              View today's plan
            </button>
            <button className="px-5 py-2.5 rounded-xl glass-dark text-white font-medium text-sm hover:bg-white/10 transition">
              Talk to AI Assistant
            </button>
          </div>
        </div>

        {/* AI insight strip */}
        <div className="mt-10 inline-flex items-center gap-3 self-start px-4 py-3 rounded-2xl glass-dark text-sm">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-sunrise">
            <TrendingUp className="w-4 h-4 text-sidebar" />
          </span>
          <span className="text-white/90">
            Coffee yield forecast up <b className="text-amber-glow">+12%</b> this season — ideal harvest window opens in 18 days.
          </span>
        </div>
      </div>

      {/* Floating weather strip */}
      <WeatherStrip />
    </section>
  );
}

function WeatherStrip() {
  const items = [
    { icon: "🌡", label: "Temperature", value: "22°C", trend: "+1.2°" },
    { icon: "💧", label: "Humidity", value: "68%", trend: "stable" },
    { icon: "🍃", label: "Wind", value: "8 km/h", trend: "NE" },
    { icon: "☀", label: "UV Index", value: "6 · High", trend: "10am peak" },
  ];
  return (
    <div className="relative -mb-12 mx-4 lg:mx-12 -translate-y-2">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 glass-dark rounded-2xl p-3 lg:p-4 shadow-luxe">
        {items.map((it) => (
          <div key={it.label} className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
            <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider">
              <span className="text-base">{it.icon}</span> {it.label}
            </div>
            <div className="mt-1 text-2xl font-display text-white">{it.value}</div>
            <div className="text-[11px] text-amber-glow/90">{it.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}