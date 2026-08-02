import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { academicData, experienceData } from "@/data/experience";
import { ExperienceSection } from "../organisms/experience-section";

const sectionHeadingMock = vi.fn(
  ({ title, description }: { title: string; description: string }) => (
    <header data-testid="heading" data-title={title} data-description={description} />
  ),
);

const experiencePositionMock = vi.fn((props: any) => (
  <div data-testid={`position-${props.title}`} data-previous={props.isPrevious ?? false}>
    {props.title}
  </div>
));

const educationCardMock = vi.fn((props: any) => <div data-testid={`education-${props.period}`} />);

const translationMap: Record<string, string | undefined> = {
  "experience.title": "Professional journey",
  "experience.description": "Timeline of roles and studies.",
  "experience.tabs.professional": "Professional",
  "experience.tabs.academic": "Academic",
  "experience.previousPositions": "Previous roles",
  "experience.inProgress": "In progress",
  "experience.keyAchievements": "Key achievements",
};

for (const company of experienceData) {
  translationMap[`experience.companies.${company.id}.name`] = `${company.name} Inc.`;
  translationMap[`experience.companies.${company.id}.period`] = company.period;
  company.positions.forEach((position, index) => {
    translationMap[`experience.companies.${company.id}.positions.${index}.title`] =
      `${position.title}*`;
    translationMap[`experience.companies.${company.id}.positions.${index}.period`] =
      position.period;
    translationMap[`experience.companies.${company.id}.positions.${index}.description`] =
      position.description;
  });
}

for (const education of academicData) {
  translationMap[`experience.education.${education.id}.degree`] = `${education.degree}*`;
  translationMap[`experience.education.${education.id}.institution`] = education.institution;
  translationMap[`experience.education.${education.id}.period`] = education.period;
  translationMap[`experience.education.${education.id}.description`] = education.description;
  education.achievements?.forEach((achievement, index) => {
    translationMap[`experience.education.${education.id}.achievements.${index}`] = achievement;
  });
}

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({
    t: (key: string) => translationMap[key],
    language: "en",
  }),
}));

vi.mock("@/components/atoms/section-heading", () => ({
  SectionHeading: (props: { title: string; description: string }) => sectionHeadingMock(props),
}));

vi.mock("@/components/molecules/experience-position", () => ({
  ExperiencePosition: (props: any) => experiencePositionMock(props),
}));

vi.mock("@/components/molecules/education-card", () => ({
  EducationCard: (props: any) => educationCardMock(props),
}));

const cardInstances: Array<Record<string, never>> = [];

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: ReactNode }) => {
    cardInstances.push({});
    const index = cardInstances.length - 1;
    return <div data-testid={`card-${index}`}>{children}</div>;
  },
  CardHeader: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children: ReactNode }) => <h3>{children}</h3>,
  CardDescription: ({ children }: { children: ReactNode }) => <p>{children}</p>,
  CardContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/ui/tabs", () => ({
  Tabs: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TabsList: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TabsTrigger: ({ children }: { children: ReactNode }) => <button type="button">{children}</button>,
  TabsContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}));

describe("ExperienceSection", () => {
  beforeEach(() => {
    sectionHeadingMock.mockClear();
    experiencePositionMock.mockClear();
    educationCardMock.mockClear();
    cardInstances.length = 0;
  });

  it("renders the primary position for each company and toggles previous roles", async () => {
    const user = userEvent.setup();
    render(<ExperienceSection />);

    expect(sectionHeadingMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Professional journey" }),
    );

    const firstCompany = experienceData[0];
    const mainPositionTitle = `${firstCompany.positions[0].title}*`;
    expect(experiencePositionMock.mock.calls[0][0].title).toBe(mainPositionTitle);

    if (firstCompany.positions.length > 1) {
      experiencePositionMock.mockClear();

      const disclosure = screen.getByRole("button", {
        name: new RegExp(firstCompany.name, "i"),
      });
      expect(disclosure).toHaveAttribute("aria-expanded", "false");
      expect(disclosure).toHaveAttribute("aria-controls", `positions-${firstCompany.id}`);

      await user.click(disclosure);

      expect(disclosure).toHaveAttribute("aria-expanded", "true");
      const hasPrevious = experiencePositionMock.mock.calls.some(
        (call) => call[0].isPrevious === true,
      );
      expect(hasPrevious).toBe(true);
    }
  });

  it("renders academic entries with translated labels", () => {
    render(<ExperienceSection />);

    academicData.forEach((education) => {
      expect(educationCardMock).toHaveBeenCalledWith(
        expect.objectContaining({
          period: education.period,
          description: education.description,
          inProgressLabel: "In progress",
          keyAchievementsLabel: "Key achievements",
        }),
      );
    });
  });
});
