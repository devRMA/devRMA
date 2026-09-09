import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollProgress } from "../atoms/scroll-progress";
import { PerformanceProvider } from "../performance-provider";

describe("ScrollProgress", () => {
  it("renders progress bar on supported tier", () => {
    const { container } = render(
      <PerformanceProvider initialTier={2}>
        <ScrollProgress />
      </PerformanceProvider>,
    );

    const progressBar = container.querySelector("div[aria-hidden='true']");
    expect(progressBar).toBeInTheDocument();
  });

  it("returns null when tier is 0", () => {
    const { container } = render(
      <PerformanceProvider initialTier={0}>
        <ScrollProgress />
      </PerformanceProvider>,
    );

    expect(container.firstChild).toBeNull();
  });
});
