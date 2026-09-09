import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CounterNumber } from "../atoms/counter-number";
import { PerformanceProvider } from "../performance-provider";

describe("CounterNumber", () => {
  it("renders with the given value attribute and text", () => {
    render(
      <PerformanceProvider initialTier={0}>
        <CounterNumber value="5+" />
      </PerformanceProvider>,
    );

    const element = screen.getByText("5+");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("data-value", "5+");
  });

  it("handles plain numeric strings", () => {
    render(
      <PerformanceProvider initialTier={0}>
        <CounterNumber value="14" />
      </PerformanceProvider>,
    );

    const element = screen.getByText("14");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("data-value", "14");
  });
});
