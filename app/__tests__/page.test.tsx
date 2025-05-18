import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "../page";

vi.mock("@/components/organisms/hero-section", () => ({
  HeroSection: () => <div data-testid="hero-section" />,
}));

vi.mock("@/components/organisms/skills-section", () => ({
  SkillsSection: () => <div data-testid="skills-section" />,
}));

vi.mock("@/components/organisms/projects-section", () => ({
  ProjectsSection: () => <div data-testid="projects-section" />,
}));

vi.mock("@/components/organisms/experience-section", () => ({
  ExperienceSection: () => <div data-testid="experience-section" />,
}));

vi.mock("@/components/organisms/certificates-section", () => ({
  CertificatesSection: () => <div data-testid="certificates-section" />,
}));

vi.mock("@/components/organisms/contact-section", () => ({
  ContactSection: () => <div data-testid="contact-section" />,
}));

vi.mock("@/components/templates/main-layout", () => ({
  MainLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">{children}</div>
  ),
}));

describe("Home Page", () => {
  it("should render all sections in the correct order", () => {
    const { getByTestId } = render(<Home />);

    const mainLayout = getByTestId("main-layout");
    expect(mainLayout).toBeDefined();

    const sections = [
      "hero-section",
      "skills-section",
      "projects-section",
      "experience-section",
      "certificates-section",
      "contact-section",
    ];

    for (const section of sections) {
      expect(getByTestId(section)).toBeDefined();
    }

    const sectionElements = sections.map((section) => getByTestId(section));
    for (let i = 1; i < sectionElements.length; i++) {
      const previousElement = sectionElements[i - 1];
      const currentElement = sectionElements[i];
      expect(
        previousElement.compareDocumentPosition(currentElement) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });
});
