import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { HeroSection } from "../organisms/hero-section";

const useLanguageMock = vi.fn();
const buttonLinkMock = vi.fn(({ children, ...props }: any) => (
  <a data-testid="button-link" {...props}>
    {children}
  </a>
));
const scrollIndicatorMock = vi.fn(({ label }: { label: string }) => (
  <div data-testid="scroll-indicator">{label}</div>
));

const motionVariants: unknown[] = [];

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => useLanguageMock(),
}));

vi.mock("@/components/atoms/button-link", () => ({
  ButtonLink: (props: any) => buttonLinkMock(props),
}));

vi.mock("@/components/atoms/scroll-indicator", () => ({
  ScrollIndicator: (props: { label: string; targetId: string }) => scrollIndicatorMock(props),
}));

vi.mock("@/public/rafael-martins-alves.jpg", () => ({
  default: "rafael-martins-alves.jpg",
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src = "/test.jpg" }: { alt: string; src?: string }) => (
    <img src={src} alt={alt} data-testid="profile-image" />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, variants, initial: _initial, animate: _animate, ...rest }: any) => {
      motionVariants.push(variants);
      return (
        <div data-testid={rest["data-testid"]} className={rest.className}>
          {children}
        </div>
      );
    },
  },
}));

describe("HeroSection", () => {
  beforeEach(() => {
    useLanguageMock.mockReset();
    buttonLinkMock.mockClear();
    scrollIndicatorMock.mockClear();
    motionVariants.length = 0;

    useLanguageMock.mockReturnValue({
      t: (key: string) =>
        ({
          "hero.badge": "Full Stack Developer at MadeiraMadeira",
          "hero.role": "Full Stack Developer",
          "hero.description": "Building delightful web experiences.",
          "hero.projects": "View projects",
          "hero.contact": "Contact me",
          "hero.stats.experience": "Years of experience",
          "hero.stats.education": "Universidade Positivo · in progress, ends Dec 2026",
          "hero.stats.educationValue": "Software Engineering",
          "hero.stats.leadership": "Architecture and squad leadership",
          "hero.stats.leadershipValue": "Tech Lead",
          "a11y.profilePhoto": "Portrait of Rafael Martins Alves",
          "a11y.scrollToExperience": "Go to Experience section",
        })[key] ?? key,
    });
  });

  it("renders the translated content", () => {
    render(<HeroSection />);

    expect(screen.getByText("Building delightful web experiences.")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer at MadeiraMadeira")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Rafael Martins Alves");
  });

  it("exposes both calls to action", () => {
    render(<HeroSection />);

    expect(buttonLinkMock).toHaveBeenCalledWith(
      expect.objectContaining({ href: "#projects", children: "View projects" }),
    );
    expect(buttonLinkMock).toHaveBeenCalledWith(
      expect.objectContaining({ href: "#contact", children: "Contact me" }),
    );
  });

  it("points the scroll indicator at the trajectory", () => {
    render(<HeroSection />);

    expect(scrollIndicatorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        targetId: "experience",
        label: "Go to Experience section",
      }),
    );
  });

  it("describes the profile picture from the locale", () => {
    render(<HeroSection />);

    expect(screen.getByTestId("profile-image")).toHaveAttribute(
      "alt",
      "Portrait of Rafael Martins Alves",
    );
  });

  it("keeps the computed years of experience", () => {
    render(<HeroSection />);

    const expected = `${new Date().getFullYear() - 2021}+`;
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it("shows exactly three credentials", () => {
    const { container } = render(<HeroSection />);

    const dl = container.querySelector("dl");
    expect(dl?.querySelectorAll("dt")).toHaveLength(3);
    expect(dl?.querySelectorAll("dd")).toHaveLength(3);
  });

  it("names no certification count and no company count", () => {
    const { container } = render(<HeroSection />);

    const text = container.textContent ?? "";
    expect(text).not.toContain("Certifications");
    expect(text).not.toContain("Certificações");
    expect(text).not.toContain("Companies");
    expect(text).not.toContain("Empresas");

    const dds = Array.from(container.querySelectorAll("dd")).map((dd) => dd.textContent);
    expect(dds).not.toContain("14");
    expect(dds).not.toContain("2");
  });

  it("states the education without asserting a completed degree", () => {
    render(<HeroSection />);

    const education = screen.getByText("Universidade Positivo · in progress, ends Dec 2026");
    expect(education).toBeInTheDocument();
    expect(education.textContent).not.toMatch(/bacharel|bachelor|graduado|graduated/i);
  });

  it("stacks the credential strip on small viewports", () => {
    const { container } = render(<HeroSection />);

    const dl = container.querySelector("dl");
    expect(dl).toHaveClass("grid-cols-1");
    expect(dl).toHaveClass("sm:grid-cols-3");
  });

  it("animates with a single set of variants regardless of viewport", () => {
    render(<HeroSection />);

    for (const variants of motionVariants) {
      const typed = variants as { animate: { transition: { duration: number } } };
      expect(typed.animate.transition.duration).toBe(0.5);
    }
  });

  it("copies contact email to clipboard when copy button is clicked", async () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextSpy,
      },
    });

    render(<HeroSection />);

    const copyBtn = screen.getByText("hero.copyEmail");
    copyBtn.click();

    expect(writeTextSpy).toHaveBeenCalledWith("contact@devrma.com");
  });
});
