import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

describe("Card UI", () => {
  it("renders the card primitives with their default styles", () => {
    render(
      <Card data-testid="card" className="extra-card">
        <CardHeader data-testid="header" className="extra-header">
          <CardTitle data-testid="title" className="extra-title">
            Title
          </CardTitle>
          <CardDescription data-testid="description" className="extra-description">
            Description
          </CardDescription>
        </CardHeader>
        <CardContent data-testid="content" className="extra-content">
          Content
        </CardContent>
        <CardFooter data-testid="footer" className="extra-footer">
          Footer
        </CardFooter>
      </Card>,
    );

    expect(screen.getByTestId("card")).toHaveClass(
      "rounded-lg",
      "border",
      "bg-card",
      "text-card-foreground",
      "shadow-sm",
      "extra-card",
    );
    expect(screen.getByTestId("header")).toHaveClass("flex", "space-y-1.5", "p-6", "extra-header");
    expect(screen.getByTestId("title")).toHaveClass(
      "text-2xl",
      "font-semibold",
      "leading-none",
      "tracking-tight",
      "extra-title",
    );
    expect(screen.getByTestId("description")).toHaveClass(
      "text-sm",
      "text-muted-foreground",
      "extra-description",
    );
    expect(screen.getByTestId("content")).toHaveClass("p-6", "pt-0", "extra-content");
    expect(screen.getByTestId("footer")).toHaveClass("flex", "items-center", "p-6", "pt-0", "extra-footer");
  });
});
