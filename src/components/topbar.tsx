import { Bell, Search, Globe, Sun, Moon, MapPin, ChevronDown, Radio, AlertTriangle, Satellite } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState } from "react";
import { useRole } from "@/components/role-provider";
import { ROLE_META } from "@/lib/roles";

export function Topbar() {
  const { theme, toggle } = useTheme();
  const { role } = useRole();
  const [district, setDistrict] = useState("Musanze");
  const [lang, setLang] = useState<"EN" | "RW" | "FR">("EN");
  const isOfficer = role === "officer" || role === "researcher" || role === "admin";
  const meta = role ? ROLE_META[role] : null;

  return (
    <header className="sticky top-0 z-40 px-4 lg:px-8 py-4 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="flex items-center gap-3 lg:gap-5">
        {/* Live monitoring indicator (officer-tier roles) */}
        {isOfficer && (
          <div className="hidden xl:flex items-center gap-4 pr-4 mr-1 border-r border-border/60">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-forest">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-forest animate-ping opacity-75" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-forest" />
              </span>
              Live
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Satellite className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium text-foreground">214</span> stations
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <AlertTriangle className="w-3.5 h-3.5 text-clay" />
              <span className="font-medium text-foreground">7</span> active
            </div>
          </div>
        )}

        {/* District */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="bg-transparent outline-none cursor-pointer font-medium pr-1"
          >
            {["Musanze", "Kigali", "Huye", "Rubavu", "Nyagatare", "Karongi"].map((d) => (
              <option key={d} className="bg-card">{d}</option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Ask anything — crops, weather, markets…"
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-secondary/60 hover:bg-secondary text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
        </div>

        {/* Lang */}
        <button
          onClick={() => setLang((l) => (l === "EN" ? "RW" : l === "RW" ? "FR" : "EN"))}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-secondary text-xs font-semibold transition"
        >
          <Globe className="w-4 h-4" /> {lang}
        </button>

        {/* Theme */}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="grid place-items-center w-10 h-10 rounded-xl hover:bg-secondary transition"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Bell */}
        <button className="relative grid place-items-center w-10 h-10 rounded-xl hover:bg-secondary transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-clay animate-glow-pulse" />
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-sunrise grid place-items-center text-sm font-semibold text-sidebar shadow-glow">
          {meta?.initials ?? "JM"}
        </div>
      </div>
    </header>
  );
}