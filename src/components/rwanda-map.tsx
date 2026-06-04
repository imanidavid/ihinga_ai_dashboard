import { useState } from "react";

/**
 * Stylised Rwanda district intelligence map.
 * Not geographically accurate — a visual abstraction tuned to look like
 * a climate-ops GIS layer. Districts are colour-coded by severity.
 */

export type DistrictDatum = {
  id: string;
  name: string;
  province: "Northern" | "Southern" | "Eastern" | "Western" | "Kigali";
  cx: number; // 0–100
  cy: number;
  severity: number; // 0 (safe) → 100 (critical)
  rainfall: number; // mm/7d
  vegetation: number; // 0–100
};

export const DISTRICTS: DistrictDatum[] = [
  // Kigali
  { id: "GAS", name: "Gasabo", province: "Kigali", cx: 56, cy: 50, severity: 22, rainfall: 38, vegetation: 71 },
  { id: "KIC", name: "Kicukiro", province: "Kigali", cx: 58, cy: 54, severity: 18, rainfall: 36, vegetation: 68 },
  { id: "NYR", name: "Nyarugenge", province: "Kigali", cx: 54, cy: 53, severity: 25, rainfall: 35, vegetation: 64 },
  // Northern
  { id: "MUS", name: "Musanze", province: "Northern", cx: 46, cy: 28, severity: 12, rainfall: 62, vegetation: 88 },
  { id: "BUR", name: "Burera", province: "Northern", cx: 54, cy: 22, severity: 18, rainfall: 58, vegetation: 84 },
  { id: "GIC", name: "Gicumbi", province: "Northern", cx: 62, cy: 26, severity: 28, rainfall: 49, vegetation: 78 },
  { id: "GAK", name: "Gakenke", province: "Northern", cx: 44, cy: 36, severity: 20, rainfall: 55, vegetation: 81 },
  { id: "RUL", name: "Rulindo", province: "Northern", cx: 52, cy: 38, severity: 22, rainfall: 52, vegetation: 80 },
  // Western
  { id: "RUB", name: "Rubavu", province: "Western", cx: 24, cy: 30, severity: 14, rainfall: 71, vegetation: 86 },
  { id: "NYG", name: "Nyabihu", province: "Western", cx: 30, cy: 34, severity: 16, rainfall: 65, vegetation: 84 },
  { id: "NGO", name: "Ngororero", province: "Western", cx: 32, cy: 46, severity: 24, rainfall: 54, vegetation: 76 },
  { id: "KAR", name: "Karongi", province: "Western", cx: 22, cy: 52, severity: 30, rainfall: 48, vegetation: 72 },
  { id: "RUT", name: "Rutsiro", province: "Western", cx: 24, cy: 42, severity: 26, rainfall: 56, vegetation: 79 },
  { id: "NYM", name: "Nyamasheke", province: "Western", cx: 18, cy: 64, severity: 34, rainfall: 50, vegetation: 73 },
  { id: "RUS", name: "Rusizi", province: "Western", cx: 14, cy: 74, severity: 38, rainfall: 44, vegetation: 70 },
  // Southern
  { id: "MUH", name: "Muhanga", province: "Southern", cx: 42, cy: 52, severity: 26, rainfall: 46, vegetation: 74 },
  { id: "KAM", name: "Kamonyi", province: "Southern", cx: 48, cy: 56, severity: 24, rainfall: 42, vegetation: 71 },
  { id: "RUH", name: "Ruhango", province: "Southern", cx: 40, cy: 62, severity: 30, rainfall: 38, vegetation: 68 },
  { id: "NYZ", name: "Nyanza", province: "Southern", cx: 44, cy: 68, severity: 34, rainfall: 35, vegetation: 65 },
  { id: "HUY", name: "Huye", province: "Southern", cx: 38, cy: 76, severity: 28, rainfall: 41, vegetation: 70 },
  { id: "GIS", name: "Gisagara", province: "Southern", cx: 44, cy: 82, severity: 36, rainfall: 32, vegetation: 62 },
  { id: "NYA", name: "Nyaruguru", province: "Southern", cx: 32, cy: 84, severity: 32, rainfall: 39, vegetation: 67 },
  { id: "NYB", name: "Nyamagabe", province: "Southern", cx: 28, cy: 70, severity: 30, rainfall: 47, vegetation: 75 },
  // Eastern
  { id: "RWG", name: "Rwamagana", province: "Eastern", cx: 68, cy: 52, severity: 44, rainfall: 28, vegetation: 58 },
  { id: "KAY", name: "Kayonza", province: "Eastern", cx: 76, cy: 46, severity: 58, rainfall: 22, vegetation: 50 },
  { id: "GTR", name: "Gatsibo", province: "Eastern", cx: 78, cy: 36, severity: 62, rainfall: 19, vegetation: 46 },
  { id: "NYG2", name: "Nyagatare", province: "Eastern", cx: 84, cy: 24, severity: 78, rainfall: 14, vegetation: 38 },
  { id: "KIR", name: "Kirehe", province: "Eastern", cx: 86, cy: 60, severity: 66, rainfall: 18, vegetation: 44 },
  { id: "NGM", name: "Ngoma", province: "Eastern", cx: 80, cy: 64, severity: 54, rainfall: 24, vegetation: 52 },
  { id: "BUG", name: "Bugesera", province: "Eastern", cx: 64, cy: 64, severity: 48, rainfall: 26, vegetation: 56 },
];

function severityColor(s: number) {
  if (s < 25) return "oklch(0.62 0.14 145)"; // forest
  if (s < 45) return "oklch(0.78 0.16 65)";  // amber
  if (s < 65) return "oklch(0.68 0.16 45)";  // sunrise
  return "oklch(0.58 0.22 28)";              // destructive
}

export function RwandaMap({
  selectedId, onSelect,
}: {
  selectedId?: string;
  onSelect?: (d: DistrictDatum) => void;
}) {
  const [hover, setHover] = useState<DistrictDatum | null>(null);

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-forest">
      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.78_0.16_65/0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,oklch(0.58_0.22_28/0.18),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-amber-glow)_1px,transparent_1px),linear-gradient(90deg,var(--color-amber-glow)_1px,transparent_1px)] [background-size:32px_32px]" />

      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        {/* Country silhouette (stylised) */}
        <defs>
          <radialGradient id="country" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="oklch(0.32 0.06 150 / 0.95)" />
            <stop offset="100%" stopColor="oklch(0.18 0.04 150 / 0.95)" />
          </radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="1.2" /></filter>
        </defs>
        <path
          d="M14 30 L22 18 L40 12 L58 14 L74 18 L88 26 L92 42 L88 58 L86 72 L78 84 L60 90 L42 90 L26 84 L14 72 L8 56 L10 42 Z"
          fill="url(#country)"
          stroke="oklch(0.78 0.16 65 / 0.35)"
          strokeWidth="0.4"
        />

        {/* Province boundary hints */}
        <g stroke="oklch(0.78 0.16 65 / 0.18)" strokeWidth="0.25" strokeDasharray="0.8 0.8" fill="none">
          <path d="M14 50 L50 46 L92 42" />
          <path d="M50 14 L50 90" />
        </g>

        {/* Weather pulse rings (drought epicenter east) */}
        <circle cx="84" cy="24" r="6" fill="none" stroke="oklch(0.58 0.22 28 / 0.6)" strokeWidth="0.4">
          <animate attributeName="r" from="2" to="14" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.8" to="0" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="22" cy="52" r="6" fill="none" stroke="oklch(0.6 0.1 200 / 0.55)" strokeWidth="0.4">
          <animate attributeName="r" from="2" to="12" dur="4.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.7" to="0" dur="4.5s" repeatCount="indefinite" />
        </circle>

        {/* Districts */}
        {DISTRICTS.map((d) => {
          const active = selectedId === d.id || hover?.id === d.id;
          const c = severityColor(d.severity);
          return (
            <g
              key={d.id}
              onMouseEnter={() => setHover(d)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect?.(d)}
              className="cursor-pointer"
            >
              <circle cx={d.cx} cy={d.cy} r={active ? 3.4 : 2.4} fill={c} opacity={0.85} filter="url(#glow)" />
              <circle cx={d.cx} cy={d.cy} r={1.4} fill={c} />
              {active && (
                <circle cx={d.cx} cy={d.cy} r="4" fill="none" stroke={c} strokeWidth="0.4">
                  <animate attributeName="r" from="3" to="6" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="1" to="0" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hover && (
        <div
          className="absolute pointer-events-none px-3 py-2 rounded-xl glass-dark text-white text-xs shadow-luxe"
          style={{ left: `${hover.cx}%`, top: `${hover.cy}%`, transform: "translate(-50%, -130%)" }}
        >
          <div className="font-medium">{hover.name}</div>
          <div className="text-white/70">
            Severity {hover.severity} · {hover.rainfall}mm · NDVI {hover.vegetation}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl glass-dark text-[11px] text-white/80">
        <div className="flex items-center gap-3">
          <Legend color="oklch(0.62 0.14 145)" label="Safe" />
          <Legend color="oklch(0.78 0.16 65)" label="Watch" />
          <Legend color="oklch(0.68 0.16 45)" label="Warning" />
          <Legend color="oklch(0.58 0.22 28)" label="Critical" />
        </div>
        <div className="uppercase tracking-widest text-white/50">30 districts · live</div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}