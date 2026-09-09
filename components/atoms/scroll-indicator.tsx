"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScrollIndicatorProps {
  targetId: string;
  label: string;
}

export function ScrollIndicator({ targetId, label }: Readonly<ScrollIndicatorProps>) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="animate-bounce motion-reduce:animate-none"
    >
      <Button variant="ghost" size="icon" asChild>
        <a href={`#${targetId}`}>
          <ArrowDown className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </a>
      </Button>
    </motion.div>
  );
}
