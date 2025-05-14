"use client";

import type React from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function NavItem({
  href,
  label,
  isActive,
  onClick,
}: Readonly<NavItemProps>) {
  return (
    <Link
      href={href}
      onClick={(e) => onClick(e, href)}
      className={cn(
        "text-sm font-medium transition-colors relative py-1",
        isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
      )}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeSection"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}
