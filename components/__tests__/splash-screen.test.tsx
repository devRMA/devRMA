import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SplashScreen } from "../splash-screen";

describe("SplashScreen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders initially with loading state", () => {
    render(<SplashScreen />);

    expect(
      screen.getByText((content, node) => {
        const hasText = (node: Element | null) => node?.textContent === "devRMA";
        const nodeHasText = hasText(node as Element);
        const childrenDontHaveText = Array.from((node as Element)?.children || []).every(
          (child) => !hasText(child),
        );
        return nodeHasText && childrenDontHaveText;
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
  });

  it("disappears after 2 seconds", async () => {
    vi.useRealTimers();
    render(<SplashScreen />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100));
    });

    await waitFor(
      () => {
        const logo = screen.getByText((content, node) => {
          const hasText = (node: Element | null) => node?.textContent === "devRMA";
          const nodeHasText = hasText(node as Element);
          const childrenDontHaveText = Array.from((node as Element)?.children || []).every(
            (child) => !hasText(child),
          );
          return nodeHasText && childrenDontHaveText;
        });
        const subtitle = screen.getByText("Full Stack Developer");
        expect(logo.parentElement).toHaveStyle({ opacity: "0" });
        expect(subtitle).toHaveStyle({ opacity: "0" });
      },
      { timeout: 3000 },
    );
  }, 10000);

  it("has correct styling classes", () => {
    render(<SplashScreen />);

    const container = screen.getByTestId("splash-container");
    expect(container).toHaveClass(
      "fixed",
      "inset-0",
      "z-[100]",
      "flex",
      "items-center",
      "justify-center",
      "bg-background",
    );

    const logo = screen.getByText((content, node) => {
      const hasText = (node: Element | null) => node?.textContent === "devRMA";
      const nodeHasText = hasText(node as Element);
      const childrenDontHaveText = Array.from((node as Element)?.children || []).every(
        (child) => !hasText(child),
      );
      return nodeHasText && childrenDontHaveText;
    });
    expect(logo).toHaveClass("text-4xl", "md:text-5xl", "font-bold", "text-primary");

    const subtitle = screen.getByText("Full Stack Developer");
    expect(subtitle).toHaveClass("mt-4", "text-sm", "text-muted-foreground");
  });
});
