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
        })[key] ?? key,
    });
  });

  it("renders the translated content", () => {
    render(<HeroSection />);

    expect(screen.getByText("Building delightful web experiences.")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer at MadeiraMadeira")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Rafael Martins Alves");
  });

  it("exposes both calls to action and the scroll indicator", () => {
    render(<HeroSection />);

    expect(buttonLinkMock).toHaveBeenCalledWith(
      expect.objectContaining({ href: "#projects", children: "View projects" }),
    );
    expect(buttonLinkMock).toHaveBeenCalledWith(
      expect.objectContaining({ href: "#contact", children: "Contact me" }),
    );
    expect(scrollIndicatorMock).toHaveBeenCalledWith(
      expect.objectContaining({ targetId: "skills", label: "a11y.scrollToSkills" }),
    );
  });

  it("describes the profile picture", () => {
    render(<HeroSection />);

    expect(screen.getByTestId("profile-image")).toHaveAttribute(
      "alt",
      "Rafael Martins Alves, desenvolvedor full stack",
    );
  });

  it("derives the years of experience from the current year", () => {
    render(<HeroSection />);

    const expected = `${new Date().getFullYear() - 2021}+`;
    expect(screen.getByText(expected)).toBeInTheDocument();
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
