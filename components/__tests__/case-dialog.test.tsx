import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { casesData } from "@/data/cases";
import { CaseDialog } from "../organisms/case-dialog";
import { Dialog } from "../ui/dialog";

const PARAMETERISED_STRINGS: Record<string, string> = {
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

function getCase(id: string) {
  const found = casesData.find((engineeringCase) => engineeringCase.id === id);
  if (!found) throw new Error(`no case named ${id}`);
  return found;
}

function renderCase(id: string) {
  const engineeringCase = getCase(id);
  return render(
    <Dialog open>
      <CaseDialog engineeringCase={engineeringCase} />
    </Dialog>,
  );
}

describe("CaseDialog", () => {
  it("states the problem, the architecture and the outcome", () => {
    renderCase("iship");

    expect(screen.getByText("projects.case.challengeTitle")).toBeInTheDocument();
    expect(screen.getByText("projects.cases.iship.challenge")).toBeInTheDocument();
    expect(screen.getByText("projects.case.architectureTitle")).toBeInTheDocument();
    expect(screen.getByText("projects.cases.iship.architecture")).toBeInTheDocument();
    expect(screen.getByText("projects.case.resultTitle")).toBeInTheDocument();
    expect(screen.getByText("projects.cases.iship.result")).toBeInTheDocument();
  });

  it("lists the full technology set without truncation", () => {
    renderCase("iship");

    const iship = getCase("iship");
    for (const technology of iship.technologies) {
      expect(screen.getByText(technology)).toBeInTheDocument();
    }
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
  });

  it("renders the architecture diagram only for iShip", () => {
    const { unmount } = renderCase("iship");
    expect(screen.getByTestId("architecture-beam")).toBeInTheDocument();
    unmount();

    for (const id of ["isend", "a1", "electrolux"]) {
      const { unmount: unmountOther } = renderCase(id);
      expect(screen.queryByTestId("architecture-beam")).not.toBeInTheDocument();
      unmountOther();
    }
  });

  it("renders the evidence gallery only when plates exist", () => {
    renderCase("a1");
    expect(screen.getByText("projects.case.evidenceTitle")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "projects.cases.a1.shots.setup" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "projects.cases.a1.shots.completed" }),
    ).toBeInTheDocument();
  });

  it("renders no evidence gallery when a case has no extra plates", () => {
    renderCase("iship");

    expect(screen.queryByText("projects.case.evidenceTitle")).not.toBeInTheDocument();
  });

  it("renders the responsive row only for A1", () => {
    const { unmount } = renderCase("a1");
    expect(screen.getByText("projects.case.responsiveTitle")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "projects.cases.a1.shots.acuityMobile" }),
    ).toBeInTheDocument();
    unmount();

    renderCase("electrolux");
    expect(screen.queryByText("projects.case.responsiveTitle")).not.toBeInTheDocument();
  });

  it("uses the engineering headline as the dialog name", () => {
    renderCase("iship");

    const dialog = screen.getByRole("dialog", { name: "projects.cases.iship.title" });
    expect(within(dialog).getByText(/projects\.cases\.iship\.systemName/)).toBeInTheDocument();
  });

  it("exposes the body as a keyboard-reachable scroll region", () => {
    renderCase("iship");

    const scrollRegion = screen.getByRole("group");
    expect(scrollRegion).toHaveAttribute("tabindex", "0");
    expect(scrollRegion.getAttribute("aria-label")).toBeTruthy();
  });

  it("renders the iSend schematic with its diagram note", () => {
    renderCase("isend");

    expect(screen.getByText("projects.cases.isend.schema.caption")).toBeInTheDocument();
  });

  it("nests the dialog headings without skipping a level", () => {
    renderCase("iship");

    const dialog = screen.getByRole("dialog");
    const levels = Array.from(dialog.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((heading) =>
      Number(heading.tagName[1]),
    );

    expect(levels[0]).toBe(2);
    let maxAllowed = levels[0];
    for (const level of levels) {
      expect(level).toBeLessThanOrEqual(maxAllowed + 1);
      if (level > maxAllowed) maxAllowed = level;
    }
  });
});
