import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProjectsSection } from "../organisms/projects-section";
import { projectsData } from "@/data/projects";

const sectionHeadingMock = vi.fn(({ title, description }: { title: string; description: string }) => (
  <header data-testid="heading" data-title={title} data-description={description} />
));

const projectCardMock = vi.fn(() => null);

const translationMap = projectsData.reduce<Record<string, string>>((map, project) => {
  map[`projects.items.${project.id}.title`] = `${project.title} (translated)`;
  map[`projects.items.${project.id}.shortDescription`] = `${project.shortDescription} short`;
  map[`projects.items.${project.id}.longDescription`] = `${project.longDescription} long`;
  return map;
}, {
  "projects.title": "Highlighted projects",
  "projects.description": "Selected case studies.",
});

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({
    t: (key: keyof typeof translationMap) => translationMap[key],
  }),
}));

vi.mock("@/components/atoms/section-heading", () => ({
  SectionHeading: (props: { title: string; description: string }) => sectionHeadingMock(props),
}));

vi.mock("@/components/molecules/project-card", () => ({
  ProjectCard: (props: any) => {
    projectCardMock(props);
    return <article data-testid={`project-${props.id}`} />;
  },
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}));

describe("ProjectsSection", () => {
  beforeEach(() => {
    projectCardMock.mockClear();
    sectionHeadingMock.mockClear();
  });

  it("renders all projects using localized copy", () => {
    render(<ProjectsSection />);

    expect(sectionHeadingMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Highlighted projects" }),
    );

    expect(projectCardMock).toHaveBeenCalledTimes(projectsData.length);

    projectsData.forEach((project) => {
      expect(projectCardMock).toHaveBeenCalledWith(
        expect.objectContaining({
          id: project.id,
          title: `${project.title} (translated)`,
          shortDescription: `${project.shortDescription} short`,
          longDescription: `${project.longDescription} long`,
          technologies: project.technologies,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
        }),
      );
    });
  });
});
