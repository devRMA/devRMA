"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;

const EMPHASIS = {
  muted: { card: "border-border/70 hover:border-border", accent: "text-muted-foreground" },
  foreground: { card: "border-border hover:border-border", accent: "text-foreground" },
  primary: { card: "border-primary/40 bg-primary/5 hover:border-primary/60", accent: "text-primary" },
} as const;

interface CareerPhaseCardProps {
  number: string;
  badge: string;
  period: string;
  title: string;
  context: string;
  description: string;
  emphasis: "muted" | "foreground" | "primary";
  index: number;
}

export function CareerPhaseCard({
  number,
  badge,
  period,
  title,
  context,
  description,
  emphasis,
  index,
}: Readonly<CareerPhaseCardProps>) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.06,
        ease: EASE,
      }}
      className={cn(
        "flex h-full flex-col rounded-xl border bg-card/50 p-5 backdrop-blur-xl transition-[border-color,transform] duration-[180ms] ease-out-expo hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:hover:translate-y-0",
        EMPHASIS[emphasis].card,
      )}
    >
      <div className="flex items-baseline justify-between gap-2 font-mono text-[11px]">
        <span className={cn("font-bold", EMPHASIS[emphasis].accent)}>{number}</span>
        <span className="text-muted-foreground">{period}</span>
      </div>
      <span
        className={cn(
          "mt-2 w-fit rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px]",
          EMPHASIS[emphasis].accent,
        )}
      >
        {badge}
      </span>
      <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-foreground text-balance">
        {title}
      </h3>
      <p className="mt-1 font-mono text-xs text-muted-foreground">{context}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </motion.li>
  );
}
