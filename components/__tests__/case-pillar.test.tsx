import { render, screen } from "@testing-library/react";
import { Activity } from "lucide-react";
import { describe, expect, it } from "vitest";
import { CasePillar } from "../molecules/case-pillar";

describe("CasePillar", () => {
  it("renders the title as a level-3 heading and the body", () => {
    render(
      <CasePillar
        icon={Activity}
        iconClassName="text-amber-400"
        title="The problem"
        body="A large monolith with no structured logging."
      />,
    );

    expect(screen.getByRole("heading", { level: 3, name: "The problem" })).toBeInTheDocument();
    expect(screen.getByText("A large monolith with no structured logging.")).toBeInTheDocument();
  });

  it("hides the icon from assistive technology", () => {
    const { container } = render(
      <CasePillar
        icon={Activity}
        iconClassName="text-amber-400"
        title="The problem"
        body="Body text"
      />,
    );

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps the accent on the icon and not on the title", () => {
    render(
      <CasePillar
        icon={Activity}
        iconClassName="text-amber-400"
        title="The problem"
        body="Body text"
      />,
    );

    const title = screen.getByRole("heading", { level: 3, name: "The problem" });
    expect(title).toHaveClass("text-foreground");
    expect(title.className).not.toMatch(/text-(amber|cyan|emerald)/);
  });

  it("renders children below the body", () => {
    render(
      <CasePillar icon={Activity} iconClassName="text-amber-400" title="The problem" body="Body">
        <span data-testid="extra">Extra content</span>
      </CasePillar>,
    );

    expect(screen.getByTestId("extra")).toBeInTheDocument();
  });
});
