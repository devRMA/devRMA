import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { SectionHeading } from "../atoms/section-heading";

vi.mock("framer-motion", () => ({
  motion: {
    h2: ({ children, ...props }: { children: ReactNode }) => {
      const { initial, whileInView, viewport, transition, ...other } = props as Record<
        string,
        unknown
      >;
      return <h2 {...other}>{children}</h2>;
    },
    p: ({ children, ...props }: { children: ReactNode }) => {
      const { initial, whileInView, viewport, transition, ...other } = props as Record<
        string,
        unknown
      >;
      return <p {...other}>{children}</p>;
    },
  },
}));

describe("SectionHeading", () => {
  it("renders the title and description with custom classes", () => {
    render(
      <SectionHeading
        title="Featured Work"
        description="Projects that highlight recent achievements"
        className="custom-container"
        titleClassName="custom-title"
        descriptionClassName="custom-description"
      />,
    );

    const heading = screen.getByRole("heading", { level: 2, name: "Featured Work" });
    expect(heading).toHaveClass("text-3xl", "font-bold", "mb-4", "custom-title");

    const description = screen.getByText("Projects that highlight recent achievements");
    expect(description).toHaveClass("text-muted-foreground", "custom-description");

    expect(heading.parentElement).toHaveClass("text-center", "mb-12", "custom-container");
  });

  it("renders without description when not provided", () => {
    render(<SectionHeading title="Only title" />);

    expect(screen.getByRole("heading", { name: "Only title" })).toBeInTheDocument();
    expect(screen.queryByText(/projects that/gi)).not.toBeInTheDocument();
  });
});
