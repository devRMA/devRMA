import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { skillsData } from "@/data/skills";
import { SkillsSection } from "../organisms/skills-section";

const skillCardMock = vi.fn(({ name }: { name: string }) => <div data-skill={name} />);
const sectionHeadingMock = vi.fn(
  ({ title, description }: { title: string; description: string }) => (
    <header data-testid="heading" data-title={title} data-description={description} />
  ),
);

const translationMap: Record<string, string> = {
  "skills.title": "Skill Set",
  "skills.description": "Technologies powering current projects.",
  "skills.tabs.know": "Confident",
  "skills.tabs.studying": "Learning",
  "skills.tabs.future": "Next",
};

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({
    t: (key: string) => translationMap[key] ?? key,
  }),
}));

vi.mock("@/components/atoms/section-heading", () => ({
  SectionHeading: (props: { title: string; description: string }) => sectionHeadingMock(props),
}));

vi.mock("@/components/molecules/skill-card", () => ({
  SkillCard: (props: { name: string }) => skillCardMock(props),
}));

vi.mock("@/components/molecules/marquee", () => ({
  Marquee: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/ui/tabs", async () => {
  const { createContext, useContext, useState } = await import("react");
  const TabsContext = createContext<{ value: string; setValue: (value: string) => void }>({
    value: "",
    setValue: () => {},
  });

  return {
    Tabs: ({ children, defaultValue }: { children: ReactNode; defaultValue: string }) => {
      const [value, setValue] = useState(defaultValue);
      return <TabsContext.Provider value={{ value, setValue }}>{children}</TabsContext.Provider>;
    },
    TabsList: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    TabsTrigger: ({ value, children }: { value: string; children: ReactNode }) => {
      const { setValue } = useContext(TabsContext);
      return (
        <button type="button" onClick={() => setValue(value)}>
          {children}
        </button>
      );
    },
    TabsContent: ({ value, children }: { value: string; children: ReactNode }) => {
      const ctx = useContext(TabsContext);
      return ctx.value === value ? <div>{children}</div> : null;
    },
  };
});

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}));

describe("SkillsSection", () => {
  beforeEach(() => {
    skillCardMock.mockClear();
    sectionHeadingMock.mockClear();
  });

  it("renders every skill of the default tab exactly once", () => {
    render(<SkillsSection />);

    expect(sectionHeadingMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Skill Set", id: "skills-heading" }),
    );

    expect(skillCardMock).toHaveBeenCalledTimes(skillsData.know.length);

    const renderedSkillNames = skillCardMock.mock.calls.map(([props]) => props.name);
    for (const skill of skillsData.know) {
      expect(renderedSkillNames.filter((name) => name === skill.name)).toHaveLength(1);
    }
  });

  it("switches to the requested tab when a trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    skillCardMock.mockClear();

    await user.click(screen.getByRole("button", { name: "Learning" }));

    expect(skillCardMock).toHaveBeenCalledTimes(skillsData.studying.length);
    const renderedSkillNames = skillCardMock.mock.calls.map(([props]) => props.name);
    expect(renderedSkillNames).toContain(skillsData.studying[0]?.name);
  });

  it("labels the section with its own heading", () => {
    const { container } = render(<SkillsSection />);

    expect(container.querySelector("section")).toHaveAttribute(
      "aria-labelledby",
      "skills-heading",
    );
  });
});
