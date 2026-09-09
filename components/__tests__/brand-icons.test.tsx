import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GithubIcon, LinkedinIcon } from "../atoms/brand-icons";

describe("BrandIcons", () => {
  it("renders GithubIcon with custom attributes", () => {
    const { container } = render(<GithubIcon className="custom-github" aria-hidden="true" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("custom-github");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("renders LinkedinIcon with custom attributes", () => {
    const { container } = render(<LinkedinIcon className="custom-linkedin" aria-hidden="true" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("custom-linkedin");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
