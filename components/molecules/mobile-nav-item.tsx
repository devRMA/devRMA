"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";

interface MobileNavItemProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileNavItem({ href, label, isActive, onClick }: Readonly<MobileNavItemProps>) {
  return (
    <Link
      href={href}
      onClick={(e) => onClick(e, href)}
      className={cn(
        "py-3 px-2 text-sm font-medium transition-colors flex items-center rounded-md relative overflow-hidden",
        isActive
          ? "text-primary bg-primary/5"
          : "text-foreground/70 hover:text-foreground hover:bg-muted/50",
      )}
    >
      {isActive && (
        <motion.div
          layoutId="mobileActiveIndicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <span className="ml-1">{label}</span>
    </Link>
  );
}
