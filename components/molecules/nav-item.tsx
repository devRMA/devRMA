"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (clickEvent: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function NavItem({ href, label, isActive, onClick }: Readonly<NavItemProps>) {
  return (
    <Link
      href={href}
      onClick={(clickEvent) => onClick(clickEvent, href)}
      className={cn(
        "text-sm font-medium transition-colors relative px-3 py-1 rounded-full",
        isActive ? "text-primary font-semibold" : "text-foreground/70 hover:text-foreground",
      )}
    >
      <span className="relative z-10">{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeSection"
          className="absolute inset-0 rounded-full bg-primary/10 border border-primary/25 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
        />
      )}
    </Link>
  );
}
