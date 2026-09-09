"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { usePerformance } from "@/components/performance-provider";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const { tier } = usePerformance();

  if (prefersReduced || tier === 0) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(6,182,212,0.6)] pointer-events-none"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
