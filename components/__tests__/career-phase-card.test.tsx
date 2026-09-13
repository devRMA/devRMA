import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CareerPhaseCard } from "../molecules/career-phase-card";

const useReducedMotionMock = vi.fn(() => false);
const motionLiPropsSpy = vi.fn();

vi.mock("framer-motion", () => ({
  motion: {
    li: ({
      children,
      className,
      ...motionProps
    }: {
      children: ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => {
      motionLiPropsSpy(motionProps);
      return <li className={className}>{children}</li>;
    },
  },
  useReducedMotion: () => useReducedMotionMock(),
}));

const baseProps = {
  number: "01",
  badge: "Fundamentals",
  period: "2019 — 2021",
  title: "The technical foundation",
  context: "SENAI Dr. Celso Charuri · Adam Robo",
  description: "The technical degree in Systems Development covered logic, SQL and testing.",
  emphasis: "muted" as const,
  index: 0,
};

describe("CareerPhaseCard", () => {
  beforeEach(() => {
    useReducedMotionMock.mockReturnValue(false);
    motionLiPropsSpy.mockClear();
  });

  it("renders every phase field", () => {
    render(
      <ol>
        <CareerPhaseCard {...baseProps} />
      </ol>,
    );

    expect(screen.getByText(baseProps.number)).toBeInTheDocument();
    expect(screen.getByText(baseProps.badge)).toBeInTheDocument();
    expect(screen.getByText(baseProps.period)).toBeInTheDocument();
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
    expect(screen.getByText(baseProps.context)).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
  });

  it("exposes the phase as a list item with a level-3 heading", () => {
    render(
      <ol>
        <CareerPhaseCard {...baseProps} />
      </ol>,
    );

    expect(screen.getByRole("listitem")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(baseProps.title);
  });

  it("is not interactive", () => {
    render(
      <ol>
        <CareerPhaseCard {...baseProps} />
      </ol>,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("escalates emphasis by phase", () => {
    const { unmount } = render(
      <ol>
        <CareerPhaseCard {...baseProps} emphasis="primary" />
      </ol>,
    );
    expect(screen.getByRole("listitem")).toHaveClass("border-primary/40");
    unmount();

    render(
      <ol>
        <CareerPhaseCard {...baseProps} emphasis="muted" />
      </ol>,
    );
    expect(screen.getByRole("listitem")).toHaveClass("border-border/70");
  });

  it("drops the vertical offset and the stagger under reduced motion", () => {
    useReducedMotionMock.mockReturnValue(true);
    render(
      <ol>
        <CareerPhaseCard {...baseProps} index={2} />
      </ol>,
    );

    const motionProps = motionLiPropsSpy.mock.calls[0][0] as {
      initial: Record<string, unknown>;
      transition: { delay: number };
    };
    expect(motionProps.initial).not.toHaveProperty("y");
    expect(motionProps.transition.delay).toBe(0);
  });

  it("suppresses the hover lift under reduced motion", () => {
    render(
      <ol>
        <CareerPhaseCard {...baseProps} />
      </ol>,
    );

    expect(screen.getByRole("listitem")).toHaveClass("motion-reduce:transform-none");
  });
});
