import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SkipLink } from "../atoms/skip-link";

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({ t: (key: string) => key }),
}));

describe("SkipLink", () => {
  it("targets the main landmark and only becomes visible on focus", () => {
    render(<SkipLink />);

    const link = screen.getByRole("link", { name: "a11y.skipToContent" });
    expect(link).toHaveAttribute("href", "#main-content");
    expect(link).toHaveClass("sr-only", "focus:not-sr-only");
  });
});
