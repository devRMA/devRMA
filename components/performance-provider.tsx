"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { logPerformanceAndEasterEggs } from "@/lib/console-easter-eggs";

export type PerformanceTier = 0 | 1 | 2;

export interface PerformanceCapabilities {
  tier: PerformanceTier;
  isHighTier: boolean;
  isMidTier: boolean;
  hasFinePointer: boolean;
  prefersReducedMotion: boolean;
  supportsInteractiveCanvas: boolean;
  supportsCustomCursor: boolean;
  supports3DTilt: boolean;
  supportsParallax: boolean;
}

const DEFAULT_CAPABILITIES: PerformanceCapabilities = {
  tier: 1,
  isHighTier: false,
  isMidTier: true,
  hasFinePointer: false,
  prefersReducedMotion: false,
  supportsInteractiveCanvas: false,
  supportsCustomCursor: false,
  supports3DTilt: false,
  supportsParallax: true,
};

const PerformanceContext = createContext<PerformanceCapabilities>(DEFAULT_CAPABILITIES);

function detectGpuQuality(): { quality: "low" | "mid" | "high"; renderer: string } {
  if (typeof document === "undefined" || process.env.NODE_ENV === "test") {
    return { quality: "mid", renderer: "Mock/Test GPU" };
  }

  try {
    const canvas = document.createElement("canvas");
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext("webgl", { powerPreference: "high-performance" }) ||
        canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    } catch {
      return { quality: "mid", renderer: "WebGL Not Supported" };
    }

    if (!gl) return { quality: "mid", renderer: "WebGL Context Failed" };

    const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return { quality: "mid", renderer: "Standard WebGL" };

    const rawRenderer =
      (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
    const renderer = rawRenderer.toLowerCase();

    if (
      renderer.includes("swiftshader") ||
      renderer.includes("llvmpipe") ||
      renderer.includes("software") ||
      renderer.includes("basic render")
    ) {
      return { quality: "low", renderer: rawRenderer };
    }

    if (
      renderer.includes("rtx") ||
      renderer.includes("gtx") ||
      renderer.includes("geforce") ||
      renderer.includes("radeon") ||
      renderer.includes("apple m") ||
      renderer.includes("quadro") ||
      renderer.includes("arc")
    ) {
      return { quality: "high", renderer: rawRenderer };
    }

    return { quality: "mid", renderer: rawRenderer };
  } catch {
    return { quality: "mid", renderer: "Standard WebGL" };
  }
}

export function PerformanceProvider({
  children,
  initialTier,
}: Readonly<{
  children: ReactNode;
  initialTier?: PerformanceTier;
}>) {
  const [capabilities, setCapabilities] = useState<PerformanceCapabilities>(() => {
    if (initialTier !== undefined) {
      return {
        tier: initialTier,
        isHighTier: initialTier === 2,
        isMidTier: initialTier >= 1,
        hasFinePointer: true,
        prefersReducedMotion: false,
        supportsInteractiveCanvas: initialTier === 2,
        supportsCustomCursor: initialTier === 2,
        supports3DTilt: initialTier >= 1,
        supportsParallax: initialTier >= 1,
      };
    }
    return DEFAULT_CAPABILITIES;
  });

  useEffect(() => {
    if (typeof window === "undefined" || initialTier !== undefined) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(pointer: fine) and (hover: hover)");

    const calculateCapabilities = (): PerformanceCapabilities => {
      const prefersReduced = reducedMotionQuery.matches;
      const hasFinePointer = finePointerQuery.matches;

      const nav = navigator as Navigator & {
        deviceMemory?: number;
        connection?: { saveData?: boolean };
      };

      const cpuCores = nav.hardwareConcurrency || 4;
      const memoryGb = nav.deviceMemory || 4;
      const saveData = nav.connection?.saveData || false;
      const { quality: gpuQuality, renderer: gpuRenderer } = detectGpuQuality();

      // Tier 0 if user requested reduced motion
      if (prefersReduced) {
        logPerformanceAndEasterEggs({
          tier: 0,
          cpuCores,
          memoryGb,
          gpuRenderer,
          hasFinePointer,
          prefersReducedMotion: true,
        });
        return {
          tier: 0,
          isHighTier: false,
          isMidTier: false,
          hasFinePointer,
          prefersReducedMotion: true,
          supportsInteractiveCanvas: false,
          supportsCustomCursor: false,
          supports3DTilt: false,
          supportsParallax: false,
        };
      }

      // Data saver mode drops straight to Tier 0
      if (saveData) {
        logPerformanceAndEasterEggs({
          tier: 0,
          cpuCores,
          memoryGb,
          gpuRenderer,
          hasFinePointer,
          prefersReducedMotion: false,
        });
        return {
          tier: 0,
          isHighTier: false,
          isMidTier: false,
          hasFinePointer,
          prefersReducedMotion: false,
          supportsInteractiveCanvas: false,
          supportsCustomCursor: false,
          supports3DTilt: false,
          supportsParallax: false,
        };
      }

      // Check if machine qualifies for Beast Mode (Tier 2)
      const isHighEndHardware =
        (cpuCores >= 8 && memoryGb >= 8 && gpuQuality !== "low") ||
        (cpuCores >= 6 && gpuQuality === "high");

      let evaluatedTier: PerformanceTier;

      if (!hasFinePointer) {
        // Touch devices / mobile are capped at Tier 1 to avoid jank and battery drain
        evaluatedTier = cpuCores <= 4 || memoryGb <= 4 ? 0 : 1;
      } else if (isHighEndHardware) {
        evaluatedTier = 2;
      } else if (cpuCores < 4 || memoryGb < 4 || gpuQuality === "low") {
        evaluatedTier = 0;
      } else {
        evaluatedTier = 1;
      }

      logPerformanceAndEasterEggs({
        tier: evaluatedTier,
        cpuCores,
        memoryGb,
        gpuRenderer,
        hasFinePointer,
        prefersReducedMotion: false,
      });

      return {
        tier: evaluatedTier,
        isHighTier: evaluatedTier === 2,
        isMidTier: evaluatedTier >= 1,
        hasFinePointer,
        prefersReducedMotion: false,
        supportsInteractiveCanvas: evaluatedTier === 2,
        supportsCustomCursor: evaluatedTier === 2 && hasFinePointer,
        supports3DTilt: evaluatedTier >= 1 && hasFinePointer,
        supportsParallax: evaluatedTier >= 1,
      };
    };

    setCapabilities(calculateCapabilities());

    // FPS benchmark guard: if Tier 2 but frames are dropping, downgrade to Tier 1
    let frameCount = 0;
    const startTime = performance.now();
    let animId: number;

    const benchmarkFrames = () => {
      frameCount++;
      if (frameCount >= 45) {
        const elapsed = performance.now() - startTime;
        const averageFps = (frameCount / elapsed) * 1000;

        if (averageFps < 42) {
          // System under heavy load or throttling -> gracefully downgrade
          if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
            console.log(
              "%c⚡ [TELEMETRIA] Benchmark dinâmico detectou queda de quadros (< 42 FPS). Downgrade gracioso para Tier 1 aplicado para manter 100% de estabilidade.",
              "color: #06b6d4; font-family: monospace;",
            );
          }
          setCapabilities((prev) => {
            if (prev.tier === 2) {
              return {
                ...prev,
                tier: 1,
                isHighTier: false,
                isMidTier: true,
                supportsInteractiveCanvas: false,
                supportsCustomCursor: false,
              };
            }
            return prev;
          });
        }
        return;
      }
      animId = requestAnimationFrame(benchmarkFrames);
    };

    animId = requestAnimationFrame(benchmarkFrames);

    const onMotionChange = () => setCapabilities(calculateCapabilities());
    const onPointerChange = () => setCapabilities(calculateCapabilities());

    reducedMotionQuery.addEventListener("change", onMotionChange);
    finePointerQuery.addEventListener("change", onPointerChange);

    return () => {
      cancelAnimationFrame(animId);
      reducedMotionQuery.removeEventListener("change", onMotionChange);
      finePointerQuery.removeEventListener("change", onPointerChange);
    };
  }, [initialTier]);

  return <PerformanceContext.Provider value={capabilities}>{children}</PerformanceContext.Provider>;
}

export function usePerformance() {
  return useContext(PerformanceContext);
}
