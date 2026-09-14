import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { casesData } from "@/data/cases";
import { projectsData } from "@/data/projects";
import { ProjectsSection } from "../organisms/projects-section";

const sectionHeadingMock = vi.fn(
  ({ title, description }: { title: string; description: string }) => (
    <header data-testid="heading" data-title={title} data-description={description} />
  ),
);

const projectCardMock = vi.fn((_props: unknown) => null);
const caseCardMock = vi.fn((_props: unknown) => null);

const translationMap = projectsData.reduce<Record<string, string>>(
  (map, project) => {
    map[`projects.items.${project.id}.title`] = `${project.title} (translated)`;
    map[`projects.items.${project.id}.shortDescription`] = `${project.shortDescription} short`;
    map[`projects.items.${project.id}.longDescription`] = `${project.longDescription} long`;
    return map;
  },
  {
    "projects.title": "Engineering proof",
    "projects.description": "Selected case studies.",
    "projects.openSourceTitle": "Personal and open-source projects",
    "projects.openSourceDescription": "Libraries and utilities I maintain.",
  },
);

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

vi.mock("@/components/molecules/case-card", () => ({
  CaseCard: (props: any) => {
    caseCardMock(props);
    return <article data-testid={`case-${props.engineeringCase.id}`} />;
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
    caseCardMock.mockClear();
    sectionHeadingMock.mockClear();
  });

  it("renders the four production cases in evidence order", () => {
    render(<ProjectsSection />);

    expect(caseCardMock).toHaveBeenCalledTimes(4);

    const order = ["iship", "isend", "a1", "electrolux"];
    order.forEach((id, index) => {
      expect(screen.getByTestId(`case-${id}`)).toBeInTheDocument();
      expect(caseCardMock).toHaveBeenNthCalledWith(
        index + 1,
        expect.objectContaining({ index, engineeringCase: casesData[index] }),
      );
    });
  });

  it("keeps the open-source strip below the production cases", () => {
    const { container } = render(<ProjectsSection />);

    const lastCase = screen.getByTestId("case-electrolux");
    const openSourceHeading = screen.getByText("Personal and open-source projects");

    expect(lastCase.compareDocumentPosition(openSourceHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container).toBeInTheDocument();
  });

  it("still renders every open-source project", () => {
    render(<ProjectsSection />);

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

  it("no longer renders the architecture diagram inline", () => {
    render(<ProjectsSection />);

    expect(screen.queryByTestId("architecture-beam")).not.toBeInTheDocument();
  });

  it("renders no fabricated environment string", () => {
    const { container } = render(<ProjectsSection />);

    expect(container.textContent).not.toMatch(/\.interno|internal\/telemetry|ACTIVE DISPATCH/i);
  });
});
