import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExperiencePosition } from "../molecules/experience-position";

describe("ExperiencePosition", () => {
  it("renders role details and technologies, highlighting previous positions", () => {
    render(
      <ExperiencePosition
        title="Senior Developer"
        period="Jan 2020 - Jan 2022"
        duration="2 years"
        description="Built scalable systems."
        technologies={["React", "Node.js"]}
        isPrevious
      />,
    );

    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    expect(screen.getByText("Jan 2020 - Jan 2022")).toBeInTheDocument();
    expect(screen.getByText("2 years")).toBeInTheDocument();
    expect(screen.getByText("Built scalable systems.")).toBeInTheDocument();
    expect(screen.getByText("React")).toHaveClass("text-xs");
    expect(screen.getByText("Node.js")).toHaveClass("text-xs");
  });
});
