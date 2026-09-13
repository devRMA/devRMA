import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { ArchitectureBeam } from "../molecules/architecture-beam";

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children: ReactNode }) => <div {...props}>{children}</div>,
  },
}));

describe("ArchitectureBeam", () => {
  it("renders the four architecture nodes", () => {
    render(<ArchitectureBeam />);

    expect(screen.getByText("skills.bento.nodeDriverApp")).toBeInTheDocument();
    expect(screen.getByText("skills.bento.nodeBff")).toBeInTheDocument();
    expect(screen.getByText("skills.bento.nodeKafka")).toBeInTheDocument();
    expect(screen.getByText("skills.bento.nodeCloud")).toBeInTheDocument();
  });

  it("suppresses the beam animation under reduced motion", () => {
    const { container } = render(<ArchitectureBeam />);

    const line = container.querySelector("line");
    expect(line).toHaveClass("motion-reduce:animate-none");
  });

  it("hides the packet dots under reduced motion", () => {
    const { container } = render(<ArchitectureBeam />);

    const line = container.querySelector("line");
    const circles = line?.closest("svg")?.querySelectorAll("circle");
    expect(circles?.length).toBe(2);
    circles?.forEach((circle) => {
      expect(circle).toHaveClass("motion-reduce:hidden");
    });
  });
});
