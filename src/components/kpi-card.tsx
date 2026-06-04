import { ReactNode } from "react";
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from "recharts";
import { ArrowUpRight, LucideIcon } from "lucide-react";

export function KpiCard({
  title,
  value,
  unit,
  delta,
  icon: Icon,
  tone = "forest",
  data,
  caption,
}: {
  title: string;
  value: string | number;
  unit?: string;
  delta?: string;
  icon: LucideIcon;
  tone?: "forest" | "amber" | "clay" | "sky";
  data?: number[];
  caption?: string;
}) {
  const toneMap = {
    forest: "text-forest bg-forest/10",
    amber: "text-amber-glow bg-amber-glow/15",
    clay: "text-clay bg-clay/15",
    sky: "text-chart-4 bg-chart-4/15",
  } as const;
  const stroke = {
    forest: "var(--color-forest)",
    amber: "var(--color-amber-glow)",
    clay: "var(--color-clay)",
    sky: "var(--color-chart-4)",
  }[tone];

  const series = (data ?? [4, 6, 5, 8, 7, 10, 9, 12]).map((v, i) => ({ i, v }));

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-card shadow-card hover:shadow-luxe transition-all duration-500 p-6 border border-border/50 hover:-translate-y-0.5">
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-display text-4xl">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
            {caption && <p className="text-xs text-muted-foreground mt-1">{caption}</p>}
          </div>
          <div className={`grid place-items-center w-11 h-11 rounded-2xl ${toneMap[tone]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <defs>
                <linearGradient id={`g-${tone}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stroke} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={stroke} strokeWidth={2} fill={`url(#g-${tone})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {delta && (
          <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${toneMap[tone]} px-2 py-1 rounded-lg`}>
            <ArrowUpRight className="w-3 h-3" /> {delta}
          </div>
        )}
      </div>
    </div>
  );
}