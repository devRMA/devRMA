import { render, screen } from "@testing-library/react";
import { Mail } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

import { SocialIcon } from "../atoms/social-icon";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild: _asChild, ...props }: any) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}));

describe("SocialIcon", () => {
  it("wraps the button in an anchor with accessibility attributes", () => {
    render(<SocialIcon href="https://example.com" icon={Mail} label="Email" />);

    const link = screen.getByRole("link", { name: "Email" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    const icon = link.querySelector("svg");
    expect(icon).toHaveClass("h-5", "w-5");
  });
});
