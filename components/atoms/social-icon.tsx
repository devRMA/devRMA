import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface SocialIconProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export function SocialIcon({ href, icon: Icon, label }: Readonly<SocialIconProps>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Button variant="ghost" size="icon">
        <Icon className="h-5 w-5" />
        <span className="sr-only">{label}</span>
      </Button>
    </a>
  );
}
