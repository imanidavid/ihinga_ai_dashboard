import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { TrendingUp, TrendingDown, ShoppingBag } from "lucide-react";
import coffee from "@/assets/crop-coffee.jpg";
import maize from "@/assets/crop-maize.jpg";
import tea from "@/assets/crop-tea.jpg";
import beans from "@/assets/crop-beans.jpg";

export const Route = createFileRoute("/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace · IHINGA AI" }] }),
  component: MarketplacePage,
});

const listings = [
  { name: "Arabica Coffee · Grade A", image: coffee, price: 4200, unit: "kg", seller: "Musanze Coop", delta: 3.2 },
  { name: "White Maize", image: maize, price: 480, unit: "kg", seller: "Nyagatare Farms", delta: -1.1 },
  { name: "Highland Tea Leaves", image: tea, price: 1100, unit: "kg", seller: "Nyamagabe Estate", delta: 2.0 },
  { name: "Climbing Beans", image: beans, price: 850, unit: "kg", seller: "Huye Cooperative", delta: 0.8 },
  { name: "Robusta Coffee", image: coffee, price: 3100, unit: "kg", seller: "Kayonza Farmers", delta: 1.6 },
  { name: "Yellow Maize", image: maize, price: 460, unit: "kg", seller: "Bugesera Coop", delta: -0.4 },
];
const districts = ["Kigali","Musanze","Huye","Rubavu","Nyagatare","Karongi"];

function MarketplacePage() {
  return (
    <PageShell title="Marketplace" subtitle="Discover, compare and trade with verified Rwandan growers.">
      <SectionCard title="Live district prices" subtitle="Updated hourly · RWF per kg">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {districts.map((d, i) => (
            <div key={d} className="rounded-2xl bg-secondary/60 p-4 hover:bg-secondary transition">
              <div className="text-xs text-muted-foreground">{d}</div>
              <div className="font-display text-xl mt-1">RWF {3800 + i * 120}</div>
              <div className="text-[11px] text-forest">+{(1 + i * 0.3).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((l) => (
          <div key={l.name} className="group rounded-3xl bg-card border border-border/50 overflow-hidden shadow-card hover:shadow-luxe hover:-translate-y-0.5 transition-all duration-500">
            <div className="h-40 overflow-hidden bg-secondary">
              <img src={l.image} alt={l.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg">{l.name}</h3>
              <p className="text-xs text-muted-foreground">{l.seller}</p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="font-display text-2xl">RWF {l.price.toLocaleString()}<span className="text-sm text-muted-foreground"> /{l.unit}</span></div>
                  <div className={`text-xs flex items-center gap-1 mt-1 ${l.delta >= 0 ? "text-forest" : "text-destructive"}`}>
                    {l.delta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {l.delta > 0 ? "+" : ""}{l.delta}%
                  </div>
                </div>
                <button className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-gradient-sunrise text-sidebar font-medium hover:opacity-95">
                  <ShoppingBag className="w-3.5 h-3.5" /> Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}