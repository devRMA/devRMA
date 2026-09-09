import type { LucideIcon } from "lucide-react";

interface ContactMethodProps {
  icon: LucideIcon;
  title: string;
  value: string;
  href: string;
}

export function ContactMethod({ icon: Icon, title, value, href }: Readonly<ContactMethodProps>) {
  return (
    <div className="group flex items-center gap-4">
      <div
        className="rounded-full bg-primary/10 p-3 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:bg-primary/20"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary transition-colors duration-150 ease-out hover:text-primary/80 hover:underline"
        >
          {value}
        </a>
      </div>
    </div>
  );
}
