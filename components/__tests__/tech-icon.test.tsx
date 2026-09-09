import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TechIcon } from "../atoms/tech-icon";

const ALL_TECH_CASES = [
  "typescript",
  "ts",
  "javascript",
  "js",
  "python",
  "kafka",
  "nestjs",
  "nest",
  "docker",
  "aws",
  "laravel",
  "php",
  "reactjs",
  "react",
  "vuejs",
  "vue",
  "nextjs",
  "next",
  "tailwindcss",
  "tailwind",
  "golang",
  "go",
  "sql",
  "postgresql",
  "postgres",
  "git",
  "github",
  "figma",
  "aspnetcore",
  "dotnet",
  "csharp",
  "c#",
  "c",
  "css",
  "html",
  "java",
  "sass",
  "websocket",
  "grpc",
  "terraform",
  "grafana",
  "cypress",
];

describe("TechIcon", () => {
  it.each(ALL_TECH_CASES)("renders SVG icon for '%s'", (tech) => {
    const { container } = render(<TechIcon name={tech} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "36");
    expect(svg).toHaveAttribute("height", "36");
  });

  it("renders with custom size and custom className", () => {
    const { container } = render(
      <TechIcon name="TypeScript" size={48} className="custom-tech-icon" />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "48");
    expect(svg).toHaveAttribute("height", "48");
    expect(svg).toHaveClass("custom-tech-icon");
  });

  it("renders fallback default icon when tech is unrecognized", () => {
    const { container } = render(<TechIcon name="UnknownTechStack" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    const circle = container.querySelector("circle");
    expect(circle).toBeInTheDocument();
  });
});
