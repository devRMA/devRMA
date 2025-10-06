import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ButtonLink } from "../atoms/button-link";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("ButtonLink", () => {
  it("renders an internal link using Next.js Link", () => {
    render(<ButtonLink href="/about">About me</ButtonLink>);

    const link = screen.getByRole("link", { name: "About me" });
    expect(link).toHaveAttribute("href", "/about");
    expect(link).toHaveClass("bg-primary", "text-primary-foreground");
  });

  it("renders an external link with security attributes", () => {
    render(
      <ButtonLink href="https://example.com" external variant="outline">
        External
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("border", "border-input", "bg-background");
  });
});
