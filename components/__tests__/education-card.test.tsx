import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EducationCard } from "../molecules/education-card";

describe("EducationCard", () => {
  it("renders period, description and optional achievements", () => {
    render(
      <EducationCard
        period="2020 - 2024"
        description="Studied Computer Science"
        inProgress
        achievements={["Scholarship", "Research project"]}
        inProgressLabel="In progress"
        keyAchievementsLabel="Highlights"
      />,
    );

    expect(screen.getByText("2020 - 2024")).toBeInTheDocument();
    expect(screen.getByText("Studied Computer Science")).toBeInTheDocument();
    expect(screen.getByText("In progress")).toBeInTheDocument();
    expect(screen.getByText("Highlights")).toBeInTheDocument();
    expect(screen.getByText("Scholarship")).toBeInTheDocument();
    expect(screen.getByText("Research project")).toBeInTheDocument();
  });
});
