import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../theme-provider";

describe("ThemeProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders children when mounted", () => {
    render(
      <ThemeProvider>
        <div data-testid="test-child">Test Child</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("shows transition overlay when theme changes", async () => {
    vi.useRealTimers();
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>,
    );

    await act(async () => {
      window.dispatchEvent(new Event("theme-change"));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const overlay = screen.getByTestId("theme-transition-overlay");
    expect(overlay).toHaveClass("bg-background");

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
    });

    await waitForElementToBeRemoved(() => screen.queryByTestId("theme-transition-overlay"));
  });
});
