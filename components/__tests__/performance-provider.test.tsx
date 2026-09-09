import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PerformanceProvider, usePerformance } from "../performance-provider";

function TestConsumer() {
  const { tier, isHighTier, isMidTier, supportsInteractiveCanvas } = usePerformance();
  return (
    <div>
      <span data-testid="tier">{tier}</span>
      <span data-testid="is-high">{isHighTier ? "yes" : "no"}</span>
      <span data-testid="is-mid">{isMidTier ? "yes" : "no"}</span>
      <span data-testid="canvas">{supportsInteractiveCanvas ? "yes" : "no"}</span>
    </div>
  );
}

describe("PerformanceProvider", () => {
  it("renders with default tier and provides capabilities to children", () => {
    render(
      <PerformanceProvider>
        <TestConsumer />
      </PerformanceProvider>,
    );

    expect(screen.getByTestId("tier")).toBeInTheDocument();
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
});
