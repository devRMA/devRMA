import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MainLayout } from "../templates/main-layout";

vi.mock("@/components/organisms/footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}));

vi.mock("@/components/organisms/header", () => ({
  Header: () => <header data-testid="header" />,
}));

vi.mock("@/components/splash-screen", () => ({
  SplashScreen: () => <div data-testid="splash" />,
}));

describe("MainLayout", () => {
  it("renders the splash screen, header, main content and footer", () => {
    render(
      <MainLayout>
        <p>Inner content</p>
      </MainLayout>,
    );

    expect(screen.getByTestId("splash")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Inner content");
  });
});
