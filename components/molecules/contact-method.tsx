import type { LucideIcon } from "lucide-react";

interface ContactMethodProps {
  icon: LucideIcon;
  title: string;
  value: string;
  href: string;
}

export function ContactMethod({
  icon: Icon,
  title,
  value,
  href,
}: Readonly<ContactMethodProps>) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-primary/10 p-3 rounded-full" aria-hidden="true">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          {value}
        </a>
      </div>
    </div>
  );
}
