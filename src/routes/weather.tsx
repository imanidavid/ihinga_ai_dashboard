import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { AlertTriangle, CloudLightning, CloudSnow, CloudRain, Wind, Sun } from "lucide-react";

export const Route = createFileRoute("/weather")({
  head: () => ({ meta: [{ title: "Weather Alerts · IHINGA AI" }] }),
  component: WeatherPage,
});

const alerts = [
  { level: "high", title: "Heavy rainfall expected", area: "Musanze · Rubavu", time: "Wed 06:00 – 12:00", icon: CloudRain, msg: "Possible runoff on terraced slopes. Secure young maize." },
  { level: "medium", title: "Strong winds", area: "Nyagatare", time: "Tonight 22:00", icon: Wind, msg: "Up to 38 km/h gusts. Check trellising on beans." },
  { level: "low", title: "UV index high", area: "Country-wide", time: "Tomorrow 10–14h", icon: Sun, msg: "Field workers should rotate every 90 min." },
  { level: "medium", title: "Thunderstorm watch", area: "Karongi", time: "Thursday afternoon", icon: CloudLightning, msg: "Delay aerial spraying." },
];
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function WeatherPage() {
  return (
    <PageShell title="Weather Alerts" subtitle="Real-time advisories tailored to your fields and crops.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {alerts.map((a) => {
          const tone = a.level === "high" ? "from-destructive/30 to-destructive/5 border-destructive/30"
            : a.level === "medium" ? "from-amber-glow/30 to-amber-glow/5 border-amber-glow/30"
            : "from-forest/30 to-forest/5 border-forest/30";
          return (
            <div key={a.title} className={`rounded-3xl p-6 border bg-gradient-to-br ${tone} shadow-card hover:-translate-y-0.5 transition`}>
              <div className="flex items-center gap-3">
                <div className="grid place-items-center w-11 h-11 rounded-2xl bg-card">
                  <a.icon className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase tracking-wider opacity-70">{a.level} priority</div>
              </div>
              <h3 className="mt-4 font-display text-lg">{a.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{a.area} · {a.time}</p>
              <p className="text-sm mt-3">{a.msg}</p>
            </div>
          );
        })}
      </div>

      <SectionCard title="7-day outlook" subtitle="Hyperlocal AI forecast for Musanze">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {days.map((d, i) => (
            <div key={d} className="rounded-2xl bg-secondary/50 hover:bg-secondary p-4 text-center transition">
              <div className="text-xs text-muted-foreground">{d}</div>
              <div className="text-3xl mt-1">{["☀","🌤","🌧","⛈","🌧","🌤","☀"][i]}</div>
              <div className="font-display text-lg mt-1">{22 + (i % 3)}°</div>
              <div className="text-[11px] text-muted-foreground">{14 + i}° low</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}