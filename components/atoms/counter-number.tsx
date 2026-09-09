"use client";

import { useEffect, useRef, useState } from "react";
import { usePerformance } from "@/components/performance-provider";

interface CounterNumberProps {
  value: string;
  className?: string;
}

const NUMERIC_REGEX = /^(\d+)([^\d]*)$/;

export function CounterNumber({ value, className }: Readonly<CounterNumberProps>) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { tier, prefersReducedMotion } = usePerformance();

  // Extract numeric prefix and optional suffix (e.g., "5+" -> num: 5, suffix: "+")
  const numericMatch = NUMERIC_REGEX.exec(value);
  const targetNumber = numericMatch ? Number.parseInt(numericMatch[1] ?? "0", 10) : null;
  const suffix = numericMatch ? (numericMatch[2] ?? "") : "";

  const [displayValue, setDisplayValue] = useState<string>(() =>
    prefersReducedMotion || tier === 0 || targetNumber === null ? value : "0",
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-30px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || tier === 0 || targetNumber === null || !isInView) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    const duration = 1200; // ms
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
      const currentVal = Math.round(targetNumber * easeProgress);

      setDisplayValue(`${currentVal}${progress === 1 ? suffix : ""}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, prefersReducedMotion, tier, targetNumber, value, suffix]);

  return (
    <span ref={ref} className={className} data-value={value}>
      {displayValue}
    </span>
  );
}
