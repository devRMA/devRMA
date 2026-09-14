import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { casesData } from "@/data/cases";
import { CaseCard } from "../molecules/case-card";

const PARAMETERISED_STRINGS: Record<string, string> = {
  "a11y.openCase": "Open the engineering case: {title}",
  "a11y.caseDialog": "Engineering case: {title}",
};

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({
    t: (key: string, params?: Record<string, string>) => {
      const text = PARAMETERISED_STRINGS[key] ?? key;
      return params
        ? text.replace(/\{(\w+)\}/g, (_match, name) => params[name] ?? `{${name}}`)
        : text;
    },
  }),
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

vi.mock("@/components/molecules/architecture-beam", () => ({
  ArchitectureBeam: () => <div data-testid="architecture-beam" />,
}));

const useReducedMotionMock = vi.fn(() => false);
const motionDivPropsSpy = vi.fn();

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...motionProps
    }: {
      children: ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => {
      motionDivPropsSpy(motionProps);
      return <div className={className}>{children}</div>;
    },
  },
  useReducedMotion: () => useReducedMotionMock(),
}));

function getCase(id: string) {
  const found = casesData.find((engineeringCase) => engineeringCase.id === id);
  if (!found) throw new Error(`no case named ${id}`);
  return found;
}

describe("CaseCard", () => {
  beforeEach(() => {
    useReducedMotionMock.mockReturnValue(false);
    motionDivPropsSpy.mockClear();
  });

  it("presents every structural field for all four cases", () => {
    casesData.forEach((engineeringCase, index) => {
      const { unmount } = render(<CaseCard engineeringCase={engineeringCase} index={index} />);

      expect(screen.getByText(`projects.cases.${engineeringCase.id}.badge`)).toBeInTheDocument();
      expect(
        screen.getByText(`projects.cases.${engineeringCase.id}.title`, { selector: "button" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`projects.cases.${engineeringCase.id}.systemName`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`projects.cases.${engineeringCase.id}.subtitle`),
      ).toBeInTheDocument();
      expect(screen.getByText(engineeringCase.technologies[0])).toBeInTheDocument();

      unmount();
    });
  });

  it("names the trigger after the engineering headline", () => {
    const iship = getCase("iship");
    render(<CaseCard engineeringCase={iship} index={0} />);

    const trigger = screen.getByRole("button", { name: /projects\.cases\.iship\.title/ });
    expect(trigger.getAttribute("aria-label")).toContain("projects.cases.iship.title");
    expect(trigger.getAttribute("aria-label")).not.toContain("projects.cases.iship.systemName");
  });

  it("truncates the chip list with an overflow count", () => {
    const iship = getCase("iship");
    const { unmount } = render(<CaseCard engineeringCase={iship} index={0} />);

    iship.technologies.slice(0, 5).forEach((technology) => {
      expect(screen.getByText(technology)).toBeInTheDocument();
    });
    iship.technologies.slice(5).forEach((technology) => {
      expect(screen.queryByText(technology)).not.toBeInTheDocument();
    });
    expect(screen.getByText("+5")).toBeInTheDocument();
    unmount();

    const electrolux = getCase("electrolux");
    render(<CaseCard engineeringCase={electrolux} index={0} />);
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("opens the detail view from the keyboard", async () => {
    const user = userEvent.setup();
    const iship = getCase("iship");
    render(<CaseCard engineeringCase={iship} index={0} />);

    await user.tab();
    await user.keyboard("{Enter}");

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const iship = getCase("iship");
    render(<CaseCard engineeringCase={iship} index={0} />);

    const trigger = screen.getByRole("button", { name: /projects\.cases\.iship\.title/ });
    await user.tab();
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("closes from the close control and returns focus", async () => {
    const user = userEvent.setup();
    const iship = getCase("iship");
    render(<CaseCard engineeringCase={iship} index={0} />);

    const trigger = screen.getByRole("button", { name: /projects\.cases\.iship\.title/ });
    await user.tab();
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "a11y.closeCase" });
    await user.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("drops the vertical entrance offset under reduced motion", () => {
    useReducedMotionMock.mockReturnValue(true);
    const iship = getCase("iship");
    render(<CaseCard engineeringCase={iship} index={0} />);

    const motionProps = motionDivPropsSpy.mock.calls[0][0] as {
      initial: Record<string, unknown>;
      transition: { delay: number };
    };
    expect(motionProps.initial).not.toHaveProperty("y");
    expect(motionProps.transition.delay).toBe(0);
  });

  it("suppresses the hover lift under reduced motion", () => {
    const iship = getCase("iship");
    const { container } = render(<CaseCard engineeringCase={iship} index={0} />);

    const article = container.querySelector("article");
    expect(article).toHaveClass("motion-reduce:transform-none");
    expect(article).toHaveClass("hover:border-primary/40");
  });
});
