"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface ScrollIndicatorProps {
  targetId: string;
  label: string;
}

export function ScrollIndicator({ targetId, label }: Readonly<ScrollIndicatorProps>) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        repeatDelay: 0.2,
      }}
    >
      <Button variant="ghost" size="icon" asChild>
        <a href={`#${targetId}`} onClick={handleScroll}>
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">{label}</span>
        </a>
      </Button>
    </motion.div>
  );
}
