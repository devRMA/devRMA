import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InteractiveBackground } from "../atoms/interactive-background";
import { PerformanceProvider } from "../performance-provider";

describe("InteractiveBackground", () => {
  let mockContext: Record<string, ReturnType<typeof vi.fn>>;
  let originalGetContext: typeof HTMLCanvasElement.prototype.getContext;

  beforeEach(() => {
    mockContext = {
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      createRadialGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
      })),
    };

    originalGetContext = HTMLCanvasElement.prototype.getContext;
    // @ts-expect-error - mocked 2d context for jsdom
    HTMLCanvasElement.prototype.getContext = vi.fn((type: string) => {
      if (type === "2d") return mockContext;
      return null;
    });

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      return setTimeout(cb, 16) as unknown as number;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
      clearTimeout(id);
    });
  });

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    vi.restoreAllMocks();
  });

  it("renders canvas and executes animation loop with mouse interaction and particle physics", async () => {
    const { container, unmount } = render(
      <PerformanceProvider initialTier={2}>
        <InteractiveBackground />
      </PerformanceProvider>,
    );

    const canvas = container.querySelector("canvas");
    expect(canvas).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 100, clientY: 100 }));
      window.dispatchEvent(new Event("resize"));
    });

    // Let animation loop run a few ticks
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(mockContext.clearRect).toHaveBeenCalled();
    expect(mockContext.beginPath).toHaveBeenCalled();

    // Trigger mouseleave
    act(() => {
      document.dispatchEvent(new MouseEvent("mouseleave"));
    });

    // Trigger visibilitychange
    act(() => {
      Object.defineProperty(document, "hidden", { value: true, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });

    act(() => {
      Object.defineProperty(document, "hidden", { value: false, configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    unmount();
  });

  it("returns null when canvas is not supported (tier 0)", () => {
    const { container } = render(
      <PerformanceProvider initialTier={0}>
        <InteractiveBackground />
      </PerformanceProvider>,
    );

    expect(container.querySelector("canvas")).toBeNull();
  });
});
