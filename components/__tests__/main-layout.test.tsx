import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MainLayout } from "../templates/main-layout";

vi.mock("@/components/organisms/footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}));

vi.mock("@/components/organisms/header", () => ({
  Header: () => <header data-testid="header" />,
}));

vi.mock("@/components/atoms/skip-link", () => ({
  SkipLink: () => <a href="#main-content">skip</a>,
}));

describe("MainLayout", () => {
  it("renders the header, main content and footer", () => {
    render(
      <MainLayout>
        <p>Inner content</p>
      </MainLayout>,
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Inner content");
  });
});
