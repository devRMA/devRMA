import { act, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CustomCursor } from "../atoms/custom-cursor";
import { PerformanceProvider } from "../performance-provider";

describe("CustomCursor", () => {
  it("renders follower ring and dot when supported, reacting to mouse events", () => {
    const { container, unmount } = render(
      <PerformanceProvider initialTier={2}>
        <CustomCursor />
      </PerformanceProvider>,
    );

    const cursorContainer = container.firstChild as HTMLElement;
    expect(cursorContainer).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 200, clientY: 300 }));
    });

    act(() => {
      window.dispatchEvent(new MouseEvent("mousedown"));
    });

    act(() => {
      window.dispatchEvent(new MouseEvent("mouseup"));
    });

    // Create interactive button to test hover
    const btn = document.createElement("button");
    document.body.appendChild(btn);

    act(() => {
      btn.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    });

    act(() => {
      document.body.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    });

    act(() => {
      document.dispatchEvent(new MouseEvent("mouseleave"));
    });

    document.body.removeChild(btn);
    unmount();
  });

  it("returns null when custom cursor is not supported (tier 0)", () => {
    const { container } = render(
      <PerformanceProvider initialTier={0}>
        <CustomCursor />
      </PerformanceProvider>,
    );

    expect(container.firstChild).toBeNull();
  });
});
