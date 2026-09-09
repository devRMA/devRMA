import { describe, expect, it } from "vitest";
import { certificatesData } from "../certificates";
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
  });

  it("validates certificates dataset", () => {
    const categories = Object.keys(certificatesData);
    expect(categories.length).toBeGreaterThan(0);
    for (const cat of categories) {
      const items = certificatesData[cat as keyof typeof certificatesData];
      expect(items.length).toBeGreaterThan(0);
      for (const cert of items) {
        expect(cert.id).toBeDefined();
        expect(cert.title).toBeDefined();
        expect(cert.issuer).toBeDefined();
      }
    }
  });

  it("validates projects dataset", () => {
    expect(projectsData.length).toBeGreaterThan(0);
    for (const project of projectsData) {
      expect(project.id).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.technologies.length).toBeGreaterThan(0);
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
