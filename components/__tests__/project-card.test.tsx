import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProjectCard } from "../molecules/project-card";

const useMobileMock = vi.fn();

vi.mock("@/hooks/use-mobile", () => ({
  useMobile: () => useMobileMock(),
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, className, src }: { alt: string; className: string; src: string }) => (
    // The real Next.js Image component renders a div; we just need a predictable element for tests.
    <img alt={alt} className={className} data-testid="project-image" src={src} />
  ),
}));

describe("ProjectCard", () => {
  beforeEach(() => {
    useMobileMock.mockReset();
  });

  const baseProps = {
    id: 1,
    title: "Project One",
    shortDescription: "Short",
    longDescription: "Long description",
    technologies: ["Next.js", "TypeScript"],
    image: "/image.png",
    githubUrl: "https://github.com/example",
    liveUrl: "https://example.com",
  };

  it("renders project details and action links for desktop devices", () => {
    useMobileMock.mockReturnValue({ isMobile: false });

    render(<ProjectCard {...baseProps} />);

    expect(screen.getByText("Project One")).toBeInTheDocument();
    expect(screen.getByText("Short")).toBeInTheDocument();
    expect(screen.getByText("Long description")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    const image = screen.getByTestId("project-image");
    expect(image).toHaveClass("hover:scale-105");

    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/example",
    );
    expect(screen.getByRole("link", { name: /demo/i })).toHaveAttribute("href", "https://example.com");
  });

  it("adjusts the image interaction when rendered on mobile", () => {
    useMobileMock.mockReturnValue({ isMobile: true });

    render(<ProjectCard {...baseProps} liveUrl={null} />);

    const image = screen.getByTestId("project-image");
    expect(image).toHaveClass("active:scale-105");
    expect(screen.queryByRole("link", { name: /demo/i })).not.toBeInTheDocument();
  });
});
