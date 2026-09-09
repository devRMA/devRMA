import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: Readonly<LogoProps>) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
        className,
      )}
    >
      <span className="font-bold text-xl text-primary transition-colors duration-200 ease-out group-hover:text-primary/90">
        dev<span className="text-foreground">RMA</span>
      </span>
    </Link>
  );
}
