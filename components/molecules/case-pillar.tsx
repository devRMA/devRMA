import type { LucideIcon } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";

interface CasePillarProps {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  body: string;
  children?: React.ReactNode;
}

export function CasePillar({ icon: Icon, iconClassName, title, body, children }: CasePillarProps) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className={cn("h-4 w-4", iconClassName)} aria-hidden="true" />
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          {title}
        </h3>
      </div>
      <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">{body}</p>
      {children}
    </div>
  );
}
