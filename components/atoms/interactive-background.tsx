"use client";

import { useEffect, useRef } from "react";
import { usePerformance } from "@/components/performance-provider";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

interface MouseState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  isActive: boolean;
}

function getCryptoRandom(): number {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] / (0xffffffff + 1);
  }
  return 0.5;
}

function drawMouseGlow(ctx: CanvasRenderingContext2D, mouse: MouseState, isDarkMode: boolean) {
  if (!mouse.isActive || mouse.x <= 0 || mouse.y <= 0) return;
  const gradient = ctx.createRadialGradient(
    mouse.x,
    mouse.y,
    0,
    mouse.x,
    mouse.y,
    mouse.radius * 1.5,
  );
  const glowColor = isDarkMode ? "6, 182, 212" : "2, 132, 199";
  gradient.addColorStop(0, `rgba(${glowColor}, 0.08)`);
  gradient.addColorStop(0.5, `rgba(${glowColor}, 0.03)`);
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, mouse.radius * 1.5, 0, Math.PI * 2);
  ctx.fill();
}

function updateParticlePosition(p: Particle, width: number, height: number, mouse: MouseState) {
  p.x += p.vx;
  p.y += p.vy;

  if (p.x < 0) p.x = width;
  if (p.x > width) p.x = 0;
  if (p.y < 0) p.y = height;
  if (p.y > height) p.y = 0;

  if (mouse.isActive) {
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const distance = Math.hypot(dx, dy);

    if (distance < mouse.radius) {
      const force = (1 - distance / mouse.radius) * 1.8;
      const divisor = distance || 1;
      p.x -= (dx / divisor) * force * 1.5;
      p.y -= (dy / divisor) * force * 1.5;
      p.alpha = Math.min(p.baseAlpha + 0.35, 0.75);
    } else {
      p.alpha += (p.baseAlpha - p.alpha) * 0.05;
    }
  } else {
    p.alpha += (p.baseAlpha - p.alpha) * 0.05;
  }
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = `${p.color}${p.alpha})`;
  ctx.fill();
}

function drawParticleConnections(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  startIndex: number,
  strokeColorPrefix: string,
) {
  const p = particles[startIndex];
  if (!p) return;

  for (let j = startIndex + 1; j < particles.length; j++) {
    const p2 = particles[j];
    if (!p2) continue;
    const lineDx = p.x - p2.x;
    const lineDy = p.y - p2.y;
    const lineDist = Math.hypot(lineDx, lineDy);

    if (lineDist < 110) {
      const lineAlpha = (1 - lineDist / 110) * 0.12;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `${strokeColorPrefix}${lineAlpha})`;
      ctx.lineWidth = 0.75;
      ctx.stroke();
    }
  }
}

export function InteractiveBackground() {
  const { supportsInteractiveCanvas, prefersReducedMotion } = usePerformance();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!supportsInteractiveCanvas || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Mouse tracking state with spring interpolation
    const mouse: MouseState = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 180,
      isActive: false,
    };

    // Responsive particle count based on screen area
    const particleDensity = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Particle[] = [];

    const isDarkMode = document.documentElement.classList.contains("dark");
    const colors = isDarkMode
      ? ["rgba(6, 182, 212, ", "rgba(14, 165, 233, ", "rgba(16, 185, 129, "]
      : ["rgba(2, 132, 199, ", "rgba(8, 145, 178, ", "rgba(13, 148, 136, "];
    const defaultColor = colors[0] ?? "rgba(6, 182, 212, ";
    const strokeColorPrefix = isDarkMode ? "rgba(6, 182, 212, " : "rgba(2, 132, 199, ";

    // Initialize particles using secure PRNG
    for (let i = 0; i < particleDensity; i++) {
      const x = getCryptoRandom() * width;
      const y = getCryptoRandom() * height;
      const baseAlpha = 0.12 + getCryptoRandom() * 0.28;
      const colorIndex = Math.floor(getCryptoRandom() * colors.length);
      const color = colors[colorIndex] ?? defaultColor;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (getCryptoRandom() - 0.5) * 0.4,
        vy: (getCryptoRandom() - 0.5) * 0.4,
        size: 1.2 + getCryptoRandom() * 1.8,
        alpha: baseAlpha,
        baseAlpha,
        color,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize, { passive: true });

    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Main animation loop with low cognitive complexity
    const render = () => {
      if (!isTabVisible) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse toward target
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw subtle interactive cursor glow aura
      drawMouseGlow(ctx, mouse, isDarkMode);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        updateParticlePosition(p, width, height, mouse);
        drawParticle(ctx, p);
        drawParticleConnections(ctx, particles, i, strokeColorPrefix);
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [supportsInteractiveCanvas, prefersReducedMotion]);

  if (!supportsInteractiveCanvas || prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70 transition-opacity duration-700"
    />
  );
}
