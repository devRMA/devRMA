import type React from "react";
import { Button } from "@/components/ui/button";

interface SocialIconProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export function SocialIcon({ href, icon: Icon, label }: Readonly<SocialIconProps>) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </a>
    </Button>
  );
}
