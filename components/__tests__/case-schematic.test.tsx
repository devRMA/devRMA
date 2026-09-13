import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CaseSchematic } from "../molecules/case-schematic";

const translationMap: Record<string, string> = {
  "projects.cases.isend.schema.title": "iSend instrumentation schematic",
  "projects.cases.isend.schema.caption": "Diagram drawn for this portfolio",
  "projects.cases.isend.schema.db": "MySQL",
  "projects.cases.isend.schema.dbSub": "Operational relational store",
  "projects.cases.isend.schema.async": "AWS Lambda (Python)",
  "projects.cases.isend.schema.asyncSub": "Isolated routines",
  "projects.cases.isend.schema.core": "Laravel/PHP monolith",
  "projects.cases.isend.schema.coreSub": "Over 1,100 routes",
  "projects.cases.isend.schema.apm": "New Relic",
  "projects.cases.isend.schema.apmSub": "Tracing and structured logs",
  "projects.cases.isend.schema.ci": "GitHub Actions and SonarQube",
  "projects.cases.isend.schema.ciSub": "Coverage and quality gate per PR",
  "projects.cases.isend.alt": "A diagram of the iSend instrumentation, not a screenshot.",
};

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({
    t: (key: string) => translationMap[key],
  }),
}));

describe("CaseSchematic", () => {
  it("exposes itself as a single image with a diagram title", () => {
    render(<CaseSchematic />);

    expect(
      screen.getByRole("img", { name: "iSend instrumentation schematic" }),
    ).toBeInTheDocument();
  });

  it("describes the diagram for screen readers", () => {
    const { container } = render(<CaseSchematic />);

    expect(container.querySelector("desc")?.textContent).toBe(
      "A diagram of the iSend instrumentation, not a screenshot.",
    );
  });

  it("renders all five node labels and sublabels", () => {
    render(<CaseSchematic />);

    const nodeStrings = [
      "MySQL",
      "Operational relational store",
      "AWS Lambda (Python)",
      "Isolated routines",
      "Laravel/PHP monolith",
      "Over 1,100 routes",
      "New Relic",
      "Tracing and structured logs",
      "GitHub Actions and SonarQube",
      "Coverage and quality gate per PR",
    ];

    nodeStrings.forEach((text) => {
      expect(screen.getAllByText(text).length).toBeGreaterThan(0);
    });
  });

  it("draws nodes as dashed, unfilled strokes", () => {
    const { container } = render(<CaseSchematic />);

    const rects = container.querySelectorAll("rect");
    expect(rects.length).toBeGreaterThan(0);
    rects.forEach((rect) => {
      expect(rect.getAttribute("fill")).toBe("none");
      expect(rect.getAttribute("stroke-dasharray")).toBe("4 3");
    });
  });

  it("accents exactly one edge per layout", () => {
    const { container } = render(<CaseSchematic />);

    const primaryStrokeElements = container.querySelectorAll('[stroke="hsl(var(--primary))"]');
    expect(primaryStrokeElements.length).toBe(2);
  });

  it("renders no window chrome", () => {
    const { container } = render(<CaseSchematic />);

    expect(container.querySelectorAll("circle").length).toBe(0);

    const shapes = container.querySelectorAll("rect, line, path");
    shapes.forEach((shape) => {
      const fill = shape.getAttribute("fill");
      if (fill !== null) {
        expect(["none", "hsl(var(--border))", "hsl(var(--primary))"]).toContain(fill);
      }
    });
  });
});
