import { render, screen } from "@testing-library/react";
import { Github } from "lucide-react";
import { describe, expect, it } from "vitest";

import { SocialIcon } from "../atoms/social-icon";

describe("SocialIcon", () => {
  it("renders a single interactive element, not a button inside a link", () => {
    const { container } = render(
      <SocialIcon href="https://github.com/devRMA" icon={Github} label="GitHub profile" />,
    );

    const link = screen.getByRole("link", { name: "GitHub profile" });
    expect(link).toHaveAttribute("href", "https://github.com/devRMA");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    expect(container.querySelector("a button")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });
});
