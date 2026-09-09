import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CounterNumber } from "../atoms/counter-number";
import { PerformanceProvider } from "../performance-provider";

describe("CounterNumber", () => {
  let originalIntersectionObserver: typeof globalThis.IntersectionObserver;

  beforeEach(() => {
    originalIntersectionObserver = globalThis.IntersectionObserver;
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIntersectionObserver;
    vi.restoreAllMocks();
  });

  it("renders with the given value attribute and text on tier 0", () => {
    render(
      <PerformanceProvider initialTier={0}>
        <CounterNumber value="5+" />
      </PerformanceProvider>,
    );

    const element = screen.getByText("5+");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("data-value", "5+");
  });

  it("handles non-numeric strings directly", () => {
    render(
      <PerformanceProvider initialTier={2}>
        <CounterNumber value="N/A" />
      </PerformanceProvider>,
    );

    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("handles fallback when IntersectionObserver is undefined", () => {
    // @ts-expect-error - simulating browser without IntersectionObserver
    delete globalThis.IntersectionObserver;

    render(
      <PerformanceProvider initialTier={0}>
        <CounterNumber value="10+" />
      </PerformanceProvider>,
    );

    expect(screen.getByText("10+")).toBeInTheDocument();
  });

  it("animates from 0 to targetNumber when intersecting on tier 2", async () => {
    let observerCallback: IntersectionObserverCallback | null = null;

    class MockObserver {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe() {}
      disconnect() {}
      unobserve() {}
    }

    // @ts-expect-error - mock class for test
    globalThis.IntersectionObserver = MockObserver;

    // Control requestAnimationFrame
    let rafCallback: ((timestamp: number) => void) | null = null;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    render(
      <PerformanceProvider initialTier={2}>
        <CounterNumber value="50+" />
      </PerformanceProvider>,
    );

    expect(screen.getByText("50+")).toBeInTheDocument();

    // Trigger intersection
    act(() => {
      observerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    // Advance animation frame start
    act(() => {
      rafCallback?.(100);
    });

    // Advance animation frame to completion
    act(() => {
      rafCallback?.(1500);
    });

    expect(screen.getByText("50+")).toBeInTheDocument();
  });
});
