import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NavItem } from "../molecules/nav-item";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, layoutId: _layoutId, ...props }: { children: unknown; layoutId?: string }) => (
      <div data-testid="motion" {...props}>
        {children}
      </div>
    ),
  },
}));

describe("NavItem", () => {
  it("renders an inactive navigation link", () => {
    const handleClick = vi.fn();

    render(<NavItem href="#about" label="About" isActive={false} onClick={handleClick} />);

    const link = screen.getByRole("link", { name: "About" });
    expect(link).toHaveAttribute("href", "#about");
    expect(link).toHaveClass("text-foreground/70", "hover:text-foreground");

    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick.mock.calls[0][1]).toBe("#about");
  });

  it("renders the active indicator when the section is active", () => {
    const handleClick = vi.fn();

    render(<NavItem href="#projects" label="Projects" isActive onClick={handleClick} />);

    const link = screen.getByRole("link", { name: "Projects" });
    expect(link).toHaveClass("text-primary");
    expect(screen.getByTestId("motion")).toBeInTheDocument();
  });
});
