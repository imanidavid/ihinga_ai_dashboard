import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · IHINGA AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  const [notif, setNotif] = useState({ weather: true, market: true, ai: true, coop: false });
  const [lang, setLang] = useState<"EN" | "RW" | "FR">("EN");

  return (
    <PageShell title="Settings" subtitle="Tailor IHINGA AI to your farm.">
      <div className="grid grid-cols-12 gap-6">
        <SectionCard className="col-span-12 lg:col-span-7" title="Profile">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-sunrise grid place-items-center text-sidebar font-semibold text-2xl shadow-glow">JM</div>
            <div className="space-y-2 flex-1">
              <Field label="Name" value="Jean Mugabo" />
              <Field label="District" value="Musanze · Northern Province" />
              <Field label="Phone" value="+250 78 *** ***" />
            </div>
          </div>
        </SectionCard>

        <SectionCard className="col-span-12 lg:col-span-5" title="Appearance">
          <button onClick={toggle} className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/60 hover:bg-secondary transition">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <div className="text-left">
                <div className="font-medium">{theme === "dark" ? "Cinematic Dark" : "Elegant Light"}</div>
                <div className="text-xs text-muted-foreground">Tap to switch</div>
              </div>
            </div>
            <div className={`w-12 h-7 rounded-full p-1 transition ${theme === "dark" ? "bg-gradient-sunrise" : "bg-muted"}`}>
              <div className={`w-5 h-5 rounded-full bg-card shadow transition-transform ${theme === "dark" ? "translate-x-5" : ""}`} />
            </div>
          </button>

          <div className="mt-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Language</div>
            <div className="grid grid-cols-3 gap-2">
              {(["EN","RW","FR"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`py-2 rounded-xl text-sm font-medium transition ${
                    lang === l ? "bg-gradient-sunrise text-sidebar shadow-glow" : "bg-secondary hover:bg-secondary/70"
                  }`}>{l}</button>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard className="col-span-12 lg:col-span-7" title="Notifications">
          {Object.entries(notif).map(([k, v]) => (
            <Toggle key={k} label={
              k === "weather" ? "Weather alerts" :
              k === "market" ? "Market price changes" :
              k === "ai" ? "AI recommendations" : "Cooperative news"
            } value={v} onChange={(nv) => setNotif((s) => ({ ...s, [k]: nv }))} />
          ))}
        </SectionCard>

        <SectionCard className="col-span-12 lg:col-span-5" title="Security">
          <Field label="2-step verification" value="Enabled" />
          <Field label="Active sessions" value="2 devices" />
          <button className="mt-4 w-full py-2.5 rounded-xl bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition">
            Sign out everywhere
          </button>
        </SectionCard>
      </div>
    </PageShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
      <span className="text-sm">{label}</span>
      <button onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full p-0.5 transition ${value ? "bg-gradient-sunrise" : "bg-muted"}`}>
        <div className={`w-5 h-5 rounded-full bg-card shadow transition-transform ${value ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}