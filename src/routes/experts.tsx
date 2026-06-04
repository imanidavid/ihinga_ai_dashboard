import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Star, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/experts")({
  head: () => ({ meta: [{ title: "Experts · IHINGA AI" }] }),
  component: ExpertsPage,
});

const experts = [
  { name: "Dr. Aline Uwase", field: "Soil Science", years: 12, rating: 4.9, initials: "AU" },
  { name: "Prof. Eric Habimana", field: "Coffee Agronomy", years: 18, rating: 5.0, initials: "EH" },
  { name: "Claudine Ingabire", field: "Pest Management", years: 9, rating: 4.8, initials: "CI" },
  { name: "Jean Bosco Nshuti", field: "Irrigation Systems", years: 14, rating: 4.9, initials: "JN" },
  { name: "Dr. Marie Mukamana", field: "Tea Production", years: 11, rating: 4.7, initials: "MM" },
  { name: "Patrick Kagame", field: "Cooperative Strategy", years: 16, rating: 4.9, initials: "PK" },
];

function ExpertsPage() {
  return (
    <PageShell title="Experts" subtitle="Book a session with verified Rwandan agronomists.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {experts.map((e) => (
          <div key={e.name} className="rounded-3xl bg-card border border-border/50 shadow-card p-6 hover:-translate-y-0.5 hover:shadow-luxe transition-all duration-500">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-sunrise grid place-items-center text-sidebar font-semibold shadow-glow">
                {e.initials}
              </div>
              <div>
                <div className="font-display text-lg leading-tight">{e.name}</div>
                <div className="text-xs text-muted-foreground">{e.field} · {e.years}y exp.</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-amber-glow"><Star className="w-4 h-4 fill-current" /> {e.rating}</div>
              <button className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/70">
                <MessageCircle className="w-3.5 h-3.5" /> Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}