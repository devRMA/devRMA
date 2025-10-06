import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { MobileNavItem } from "../molecules/mobile-nav-item";

const { motionDivMock } = vi.hoisted(() => ({
  motionDivMock: vi.fn(({ children }: { children: ReactNode }) => (
    <div data-testid="indicator">{children}</div>
  )),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: motionDivMock,
  },
}));

describe("MobileNavItem", () => {
  beforeEach(() => {
    motionDivMock.mockClear();
  });

  it("applies active styling and renders the indicator when active", () => {
    render(
      <MobileNavItem href="#skills" label="Skills" isActive onClick={vi.fn()} />,
    );

    const link = screen.getByRole("link", { name: "Skills" });
    expect(link).toHaveAttribute("href", "#skills");
    expect(link).toHaveClass("text-primary", "bg-primary/5");
    expect(screen.getByTestId("indicator")).toBeInTheDocument();
  });

  it("invokes the click handler with the href when pressed", () => {
    const handleClick = vi.fn();
    render(
      <MobileNavItem href="#projects" label="Projects" isActive={false} onClick={handleClick} />,
    );

    const link = screen.getByRole("link", { name: "Projects" });
    expect(link).toHaveClass("text-foreground/70");

    fireEvent.click(link);

    expect(handleClick).toHaveBeenCalledWith(expect.any(Object), "#projects");
  });
});
