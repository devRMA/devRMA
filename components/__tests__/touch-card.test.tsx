import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TouchCard } from "../atoms/touch-card";

describe("TouchCard", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <TouchCard>
        <span>Test Content</span>
      </TouchCard>,
    );

    expect(getByText("Test Content")).toBeDefined();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <TouchCard className="custom-class">
        <span>Test Content</span>
      </TouchCard>,
    );

    const button = container.querySelector("button");
    expect(button?.className).toBe("custom-class");
  });

  it("should call onClick when clicked", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <TouchCard onClick={handleClick}>
        <span>Test Content</span>
      </TouchCard>,
    );

    const button = getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render as a button with type button", () => {
    const { container } = render(
      <TouchCard>
        <span>Test Content</span>
      </TouchCard>,
    );

    const button = container.querySelector("button");
    expect(button?.type).toBe("button");
  });
});
