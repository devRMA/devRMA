"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface ScrollIndicatorProps {
  targetId: string;
  label: string;
}

export function ScrollIndicator({ targetId, label }: Readonly<ScrollIndicatorProps>) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 0.5,
              delay: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 0.2,
            }
      }
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
