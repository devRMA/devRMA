import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logPerformanceAndEasterEggs } from "../console-easter-eggs";

describe("logPerformanceAndEasterEggs", () => {
  const originalEnv = process.env.NODE_ENV;
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    delete (window as any).__DEVRMA_LOGGED__;
    delete (window as any).devrma;
    (process.env as any).NODE_ENV = "development";
  });

  afterEach(() => {
    (process.env as any).NODE_ENV = originalEnv;
    logSpy.mockRestore();
  });

  it("logs hardware tier and initializes devrma easter egg in development", () => {
    logPerformanceAndEasterEggs({
      tier: 2,
      cpuCores: 12,
      memoryGb: 16,
      gpuRenderer: "Apple M3 Max",
      hasFinePointer: true,
      prefersReducedMotion: false,
    });

    expect(logSpy).toHaveBeenCalled();
    expect(window.devrma).toBeDefined();
    expect(window.devrma?.tier).toBe(2);
    expect(window.devrma?.specs.cores).toBe(12);
    expect(window.devrma?.specs.gpu).toBe("Apple M3 Max");

    // Test easter egg commands
    const helpResult = window.devrma?.help();
    expect(helpResult).toContain("Execute qualquer função");

    const stats = window.devrma?.stats();
    expect(stats?.targetFps).toBe(120);

    const ping = window.devrma?.ping();
    expect(ping).toContain("Curitiba Edge Cluster");

    const coffee = window.devrma?.coffee();
    expect(coffee).toContain("Café");

    const hire = window.devrma?.hireMe();
    expect(hire).toBe("contact@devrma.com");

    const arch = window.devrma?.architecture();
    expect(arch?.frontend).toContain("Next.js 15");
  });

  it("deduplicates console logs on subsequent calls", () => {
    logPerformanceAndEasterEggs({
      tier: 1,
      cpuCores: 4,
      memoryGb: 8,
      gpuRenderer: "Intel Iris",
      hasFinePointer: true,
      prefersReducedMotion: false,
    });

    const callCountFirst = logSpy.mock.calls.length;
    expect(callCountFirst).toBeGreaterThan(0);

    // Second call should be ignored
    logPerformanceAndEasterEggs({
      tier: 1,
      cpuCores: 4,
      memoryGb: 8,
      gpuRenderer: "Intel Iris",
      hasFinePointer: true,
      prefersReducedMotion: false,
    });

    expect(logSpy.mock.calls.length).toBe(callCountFirst);
  });
});
