import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Logo } from "../atoms/logo";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Logo", () => {
  it("renders a link to the homepage with the brand name", () => {
    render(<Logo className="text-test" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveClass("text-test");
    expect(link).toHaveTextContent("devRMA");
  });
});
