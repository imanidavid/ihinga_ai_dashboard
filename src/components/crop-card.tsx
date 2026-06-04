export function CropCard({
  name, image, stage, health, location, status,
}: {
  name: string;
  image: string;
  stage: string;
  health: number;
  location: string;
  status: "Planted" | "Emerging" | "Vegetative" | "Flowering" | "Maturing" | "Harvest";
}) {
  const circumference = 2 * Math.PI * 26;
  const offset = circumference - (health / 100) * circumference;

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-card shadow-card hover:shadow-luxe hover:-translate-y-1 transition-all duration-500 border border-border/50">
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-secondary to-muted">
        <img
          src={image} alt={name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg glass text-[11px] font-medium">
          {status}
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
      </div>
      <div className="p-5 -mt-4 relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg leading-tight">{name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{location}</p>
            <p className="text-xs mt-2.5 text-forest font-medium">{stage}</p>
          </div>

          <div className="relative w-14 h-14 shrink-0">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted" />
              <circle
                cx="30" cy="30" r="26" fill="none" strokeWidth="4" strokeLinecap="round"
                stroke="var(--color-forest)"
                strokeDasharray={circumference} strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 1.2s ease" }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-xs font-semibold">
              {health}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}