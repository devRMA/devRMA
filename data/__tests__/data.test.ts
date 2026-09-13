import { describe, expect, it } from "vitest";
import { casesData } from "../cases";
import { academicData, experienceData } from "../experience";
import { projectsData } from "../projects";
import { skillsData } from "../skills";

describe("Static Data Integrity", () => {
  it("validates experience and academic datasets", () => {
    expect(experienceData.length).toBeGreaterThan(0);
    for (const exp of experienceData) {
      expect(exp.id).toBeDefined();
      expect(exp.name).toBeDefined();
      expect(exp.positions.length).toBeGreaterThan(0);
    }

    expect(academicData.length).toBeGreaterThan(0);
    for (const edu of academicData) {
      expect(edu.id).toBeDefined();
      expect(edu.institution).toBeDefined();
    }

    const softwareEngineering = academicData.find((edu) => edu.id === "software-engineering");
    expect(softwareEngineering?.institution).toBe("Universidade Positivo");
    expect(softwareEngineering?.inProgress).toBe(true);
  });

  it("validates projects dataset", () => {
    expect(projectsData.length).toBeGreaterThan(0);
    for (const project of projectsData) {
      expect(project.id).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.technologies.length).toBeGreaterThan(0);
    }
  });

  it("validates engineering cases dataset", () => {
    expect(casesData.length).toBe(4);
    expect(casesData.map((c) => c.id)).toEqual(["iship", "isend", "a1", "electrolux"]);
    for (const engineeringCase of casesData) {
      expect(engineeringCase.technologies.length).toBeGreaterThan(0);
    }

    const beamCases = casesData.filter((c) => c.hasArchitectureBeam);
    expect(beamCases.length).toBe(1);

    const diagramCases = casesData.filter((c) => c.variant === "diagram");
    expect(diagramCases.length).toBe(1);
    expect(diagramCases[0]?.cover).toBeUndefined();

    for (const engineeringCase of casesData.filter((c) => c.variant === "capture")) {
      expect(engineeringCase.cover).toBeDefined();
      expect(engineeringCase.cover?.src.startsWith("/projects/")).toBe(true);
    }
  });

  it("validates skills dataset", () => {
    const categories = Object.keys(skillsData);
    expect(categories.length).toBeGreaterThan(0);
    for (const cat of categories) {
      const skills = skillsData[cat as keyof typeof skillsData];
      expect(skills.length).toBeGreaterThan(0);
      for (const skill of skills) {
        expect(skill.name).toBeDefined();
        expect(skill.icon).toBeDefined();
      }
    }
  });
});
