import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

describe("UI base components", () => {
  it("renders Label with default and custom styles", () => {
    render(<Label className="custom">Email</Label>);

    const label = screen.getByText("Email");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveClass("text-sm", "font-medium", "custom");
  });

  it("renders Separator horizontally and vertically", () => {
    const { rerender } = render(<Separator decorative={false} />);

    const horizontal = screen.getByRole("separator");
    expect(horizontal).toHaveClass("h-[1px]", "w-full");

    rerender(<Separator orientation="vertical" decorative={false} />);
    const vertical = screen.getByRole("separator");
    expect(vertical).toHaveAttribute("aria-orientation", "vertical");
    expect(vertical).toHaveClass("h-full", "w-[1px]");
  });

  it("renders Skeleton with pulse animation and custom class", () => {
    render(<Skeleton data-testid="skeleton" className="h-10 w-10" />);

    expect(screen.getByTestId("skeleton")).toHaveClass(
      "animate-pulse",
      "rounded-md",
      "bg-muted",
      "h-10",
      "w-10",
    );
  });
});
