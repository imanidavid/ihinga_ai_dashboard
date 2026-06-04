import { ReactNode } from "react";

export function SectionCard({
  title, subtitle, children, className = "", action,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div className={`rounded-3xl bg-card border border-border/50 shadow-card p-6 lg:p-7 ${className}`}>
      {(title || action) && (
        <div className="flex items-end justify-between mb-5 gap-4">
          <div>
            {title && <h2 className="font-display text-xl lg:text-2xl">{title}</h2>}
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}