import { act, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PerformanceProvider, usePerformance } from "../performance-provider";

function TestConsumer() {
  const { tier, isHighTier, isMidTier, supportsInteractiveCanvas, prefersReducedMotion } =
    usePerformance();
  return (
    <div>
      <span data-testid="tier">{tier}</span>
      <span data-testid="is-high">{isHighTier ? "yes" : "no"}</span>
      <span data-testid="is-mid">{isMidTier ? "yes" : "no"}</span>
      <span data-testid="canvas">{supportsInteractiveCanvas ? "yes" : "no"}</span>
      <span data-testid="reduced">{prefersReducedMotion ? "yes" : "no"}</span>
    </div>
  );
}

describe("PerformanceProvider", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 1);
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it("returns default capabilities when usePerformance is used outside PerformanceProvider", () => {
    const { result } = renderHook(() => usePerformance());
    expect(result.current.tier).toBe(1);
  });

  it("respects initialTier override when specified", () => {
    render(
      <PerformanceProvider initialTier={2}>
        <TestConsumer />
      </PerformanceProvider>,
    );

    expect(screen.getByTestId("tier")).toHaveTextContent("2");
    expect(screen.getByTestId("is-high")).toHaveTextContent("yes");
    expect(screen.getByTestId("canvas")).toHaveTextContent("yes");
  });

  it("handles tier 0 correctly", () => {
    render(
      <PerformanceProvider initialTier={0}>
        <TestConsumer />
      </PerformanceProvider>,
    );

    expect(screen.getByTestId("tier")).toHaveTextContent("0");
    expect(screen.getByTestId("is-high")).toHaveTextContent("no");
    expect(screen.getByTestId("is-mid")).toHaveTextContent("no");
    expect(screen.getByTestId("canvas")).toHaveTextContent("no");
  });

  it("evaluates high-end hardware capabilities when no initialTier is passed", async () => {
    // Mock high-spec environment
    Object.defineProperty(navigator, "hardwareConcurrency", { value: 8, configurable: true });
    // @ts-expect-error - deviceMemory mock
    navigator.deviceMemory = 16;

    let motionListener: (() => void) | null = null;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("pointer: fine"),
      media: query,
      addEventListener: (_event: string, cb: () => void) => {
        if (query.includes("reduced-motion")) motionListener = cb;
      },
      removeEventListener: vi.fn(),
    }));

    const { unmount } = render(
      <PerformanceProvider>
        <TestConsumer />
      </PerformanceProvider>,
    );

    expect(screen.getByTestId("tier")).toHaveTextContent("2");

    // Trigger media query change
    act(() => {
      motionListener?.();
    });

    unmount();
  });

  it("falls back to tier 0 when reduced motion is preferred", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(
      <PerformanceProvider>
        <TestConsumer />
      </PerformanceProvider>,
    );

    expect(screen.getByTestId("tier")).toHaveTextContent("0");
    expect(screen.getByTestId("reduced")).toHaveTextContent("yes");
  });

  it("falls back to tier 0 when saveData is active", () => {
    // @ts-expect-error - mock connection saveData
    navigator.connection = { saveData: true };

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(
      <PerformanceProvider>
        <TestConsumer />
      </PerformanceProvider>,
    );

    expect(screen.getByTestId("tier")).toHaveTextContent("0");

    // @ts-expect-error - cleanup
    delete navigator.connection;
  });

  it("caps mobile devices at Tier 1 or Tier 0 based on cpu/memory", () => {
    Object.defineProperty(navigator, "hardwareConcurrency", { value: 2, configurable: true });
    // @ts-expect-error - deviceMemory mock
    navigator.deviceMemory = 2;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false, // no fine pointer (touch)
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(
      <PerformanceProvider>
        <TestConsumer />
      </PerformanceProvider>,
    );

    expect(screen.getByTestId("tier")).toHaveTextContent("0");
  });

  it("evaluates mid-tier hardware for moderate desktop specs", () => {
    Object.defineProperty(navigator, "hardwareConcurrency", { value: 4, configurable: true });
    // @ts-expect-error - deviceMemory mock
    navigator.deviceMemory = 4;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("pointer: fine"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(
      <PerformanceProvider>
        <TestConsumer />
      </PerformanceProvider>,
    );

    expect(screen.getByTestId("tier")).toHaveTextContent("1");
    expect(screen.getByTestId("is-mid")).toHaveTextContent("yes");
    expect(screen.getByTestId("is-high")).toHaveTextContent("no");
  });

  it("downgrades from tier 2 to tier 1 when benchmark FPS drops below threshold", async () => {
    Object.defineProperty(navigator, "hardwareConcurrency", { value: 8, configurable: true });
    // @ts-expect-error - deviceMemory mock
    navigator.deviceMemory = 16;

    let callback: ((now: number) => void) | null = null;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      callback = cb as (now: number) => void;
      return 1;
    });

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("pointer: fine"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    let mockTime = 1000;
    vi.spyOn(performance, "now").mockImplementation(() => mockTime);

    render(
      <PerformanceProvider>
        <TestConsumer />
      </PerformanceProvider>,
    );

    expect(screen.getByTestId("tier")).toHaveTextContent("2");

    // Simulate 45 frames over 2000ms (22.5 FPS < 42)
    await act(async () => {
      for (let i = 0; i < 45; i++) {
        mockTime += 44;
        callback?.(mockTime);
      }
    });

    expect(screen.getByTestId("tier")).toHaveTextContent("1");
  });
});
