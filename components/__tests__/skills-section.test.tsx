import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SkillsSection } from "../organisms/skills-section";
import { skillsData } from "@/data/skills";

const skillCardMock = vi.fn(({ name }: { name: string }) => <div data-skill={name} />);
const sectionHeadingMock = vi.fn(({ title, description }: { title: string; description: string }) => (
  <header data-testid="heading" data-title={title} data-description={description} />
));

const translationMap = {
  "skills.title": "Skill Set",
  "skills.description": "Technologies powering current projects.",
  "skills.tabs.know": "Confident",
  "skills.tabs.studying": "Learning",
  "skills.tabs.future": "Next",
};

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({
    t: (key: keyof typeof translationMap) => translationMap[key],
  }),
}));

vi.mock("@/components/atoms/section-heading", () => ({
  SectionHeading: (props: { title: string; description: string }) => sectionHeadingMock(props),
}));

vi.mock("@/components/molecules/skill-card", () => ({
  SkillCard: (props: { name: string }) => skillCardMock(props),
}));

let triggerValueChange: ((value: string) => void) | undefined;

vi.mock("@/components/ui/tabs", () => ({
  Tabs: ({ children, onValueChange }: { children: ReactNode; onValueChange?: (value: string) => void }) => {
    triggerValueChange = onValueChange;
    return <div>{children}</div>;
  },
  TabsList: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TabsTrigger: ({ value, children }: { value: string; children: ReactNode }) => (
    <button type="button" onClick={() => triggerValueChange?.(value)}>
      {children}
    </button>
  ),
  TabsContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}));

describe("SkillsSection", () => {
  beforeEach(() => {
    skillCardMock.mockClear();
    sectionHeadingMock.mockClear();
  });

  it("renders the default tab with duplicated skills", () => {
    render(<SkillsSection />);

    expect(sectionHeadingMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Skill Set" }),
    );

    const knowSkills = skillsData.know.length;
    expect(skillCardMock).toHaveBeenCalledTimes(knowSkills * 2);

    const renderedSkillNames = skillCardMock.mock.calls.map(([props]) => props.name);
    for (const skill of skillsData.know) {
      const occurrences = renderedSkillNames.filter((name) => name === skill.name).length;
      expect(occurrences).toBeGreaterThanOrEqual(2);
    }
  });

  it("switches to the requested tab when a trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    skillCardMock.mockClear();

    await user.click(screen.getByRole("button", { name: "Learning" }));

    const studyingSkills = skillsData.studying.length;
    expect(skillCardMock).toHaveBeenCalledTimes(studyingSkills * 2);
    const renderedSkillNames = skillCardMock.mock.calls.map(([props]) => props.name);
    expect(renderedSkillNames).toContain(skillsData.studying[0]?.name);
  });
});
