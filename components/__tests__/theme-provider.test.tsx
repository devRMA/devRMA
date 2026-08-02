import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../theme-provider";

const nextThemesProviderMock = vi.fn((_props: unknown) => null);

vi.mock("next-themes", () => ({
  ThemeProvider: ({ children, ...props }: { children: React.ReactNode }) => {
    nextThemesProviderMock(props);
    return <div data-testid="next-themes-provider">{children}</div>;
  },
}));

describe("ThemeProvider", () => {
  it("wraps children in next-themes on the first render, before hydration", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div data-testid="test-child">Test Child</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId("next-themes-provider")).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("forwards its configuration to next-themes", () => {
    nextThemesProviderMock.mockClear();

    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div>Test Child</div>
      </ThemeProvider>,
    );

    expect(nextThemesProviderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        disableTransitionOnChange: true,
      }),
    );
  });
});
