import { ReactNode } from "react";

export function PageShell({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="px-4 lg:px-8 py-8 space-y-8 max-w-[1500px] mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-display tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-muted-foreground max-w-2xl">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}