"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { usePerformance } from "@/components/performance-provider";

export function CustomCursor() {
  const { supportsCustomCursor } = usePerformance();
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  // Smooth physical spring for outer follower ring
  const springConfig = { damping: 24, stiffness: 260, mass: 0.45 };
  const smoothX = useSpring(rawMouseX, springConfig);
  const smoothY = useSpring(rawMouseY, springConfig);

  useEffect(() => {
    if (!supportsCustomCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null ||
        target.closest("input") !== null ||
        target.closest("textarea") !== null ||
        target.closest(".interactive-target") !== null;

      setIsHoveringInteractive(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [supportsCustomCursor, isVisible, rawMouseX, rawMouseY]);

  if (!supportsCustomCursor) {
    return null;
  }

  let ringScale = 1;
  if (isMouseDown) {
    ringScale = 0.75;
  } else if (isHoveringInteractive) {
    ringScale = 1.7;
  }

  let dotScale = 1;
  if (isMouseDown) {
    dotScale = 1.4;
  } else if (isHoveringInteractive) {
    dotScale = 0.5;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 motion-reduce:hidden"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-cyan-400/60 bg-cyan-400/5 shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          scale: ringScale,
          borderColor: isHoveringInteractive ? "rgba(6, 182, 212, 0.9)" : "rgba(6, 182, 212, 0.5)",
          backgroundColor: isHoveringInteractive
            ? "rgba(6, 182, 212, 0.12)"
            : "rgba(6, 182, 212, 0.04)",
        }}
      />

      {/* Inner Precision Target Dot */}
      <motion.div
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        style={{
          x: rawMouseX,
          y: rawMouseY,
          scale: dotScale,
        }}
      />
    </div>
  );
}
