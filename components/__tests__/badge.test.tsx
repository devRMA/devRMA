import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "../ui/badge";

describe("Badge", () => {
  it("renders with the default variant", () => {
    render(<Badge data-testid="default">Default</Badge>);

    expect(screen.getByTestId("default")).toHaveClass(
      "bg-primary",
      "text-primary-foreground",
      "px-2.5",
      "py-0.5",
    );
  });

  it("supports other variants and custom classes", () => {
    render(
      <Badge variant="secondary" className="custom" data-testid="secondary">
        Secondary
      </Badge>,
    );

    expect(screen.getByTestId("secondary")).toHaveClass(
      "bg-secondary",
      "text-secondary-foreground",
      "custom",
    );
  });
});
