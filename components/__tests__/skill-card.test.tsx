import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkillCard } from "../molecules/skill-card";

describe("SkillCard", () => {
  const mockIcon = <div data-testid="mock-icon">Icon</div>;

  it("renders with name and icon", () => {
    render(<SkillCard name="React" icon={mockIcon} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(<SkillCard name="React" icon={mockIcon} />);

    const card = screen.getByText("React").closest("div");
    expect(card).toHaveClass(
      "carousel-item",
      "flex",
      "flex-col",
      "items-center",
      "gap-4",
      "p-4",
      "rounded-lg",
      "hover:bg-muted",
      "transition-colors",
    );

    const iconContainer = card?.querySelector("div");
    expect(iconContainer).toHaveClass(
      "w-16",
      "h-16",
      "flex",
      "items-center",
      "justify-center",
      "text-primary",
    );
  });

  it("renders icon with correct size", () => {
    render(<SkillCard name="React" icon={mockIcon} />);

    const card = screen.getByText("React").closest("div");
    const iconContainer = card?.querySelector("div");
    const iconWrapper = iconContainer?.querySelector("div");
    expect(iconWrapper).toHaveClass("w-10", "h-10");
  });

  it("renders name with correct styling", () => {
    render(<SkillCard name="React" icon={mockIcon} />);

    const nameElement = screen.getByText("React");
    expect(nameElement).toHaveClass("font-medium", "text-center");
  });

  it("handles different skill names", () => {
    const { rerender } = render(<SkillCard name="JavaScript" icon={mockIcon} />);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();

    rerender(<SkillCard name="TypeScript" icon={mockIcon} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("handles different icon components", () => {
    const differentIcon = <div data-testid="different-icon">Different Icon</div>;
    render(<SkillCard name="React" icon={differentIcon} />);

    expect(screen.getByTestId("different-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
