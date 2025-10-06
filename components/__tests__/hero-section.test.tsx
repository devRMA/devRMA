import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { HeroSection } from "../organisms/hero-section";

const useLanguageMock = vi.fn();
const useMobileMock = vi.fn();
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

vi.mock("@/hooks/use-mobile", () => ({
  useMobile: () => useMobileMock(),
}));

vi.mock("@/components/atoms/button-link", () => ({
  ButtonLink: (props: any) => buttonLinkMock(props),
}));

vi.mock("@/components/atoms/scroll-indicator", () => ({
  ScrollIndicator: (props: { label: string; targetId: string }) => scrollIndicatorMock(props),
}));

vi.mock("@/public/photo.png", () => ({
  default: "photo.png",
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} data-testid="profile-image" />,
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
    useMobileMock.mockReset();
    buttonLinkMock.mockClear();
    scrollIndicatorMock.mockClear();
    motionVariants.length = 0;
  });

  it("renders the translated content and actions for desktop", () => {
    useLanguageMock.mockReturnValue({
      t: (key: string) =>
        ({
          "hero.description": "Building delightful web experiences.",
          "hero.contact": "Contact me",
        }[key] ?? key),
    });
    useMobileMock.mockReturnValue({ isMobile: false });

    render(<HeroSection />);

    expect(screen.getByText("Building delightful web experiences.")).toBeInTheDocument();
    expect(buttonLinkMock).toHaveBeenCalledWith(
      expect.objectContaining({ href: "#contact", children: "Contact me" }),
    );
    expect(scrollIndicatorMock).toHaveBeenCalledWith(
      expect.objectContaining({ targetId: "skills", label: "Scroll to Skills section" }),
    );
    expect(screen.getByTestId("profile-image")).toHaveAttribute("alt", "Rafael Martins Alves");

    // The first motion.div receives the text animation variants.
    const textVariants = motionVariants[0] as { animate: { transition: { duration?: number } } };
    expect(textVariants.animate.transition.duration).toBe(0.5);
  });

  it("uses the mobile animation variants when rendered on small screens", () => {
    useLanguageMock.mockReturnValue({
      t: (key: string) =>
        ({
          "hero.description": "Experiências mobile first.",
          "hero.contact": "Vamos conversar",
        }[key] ?? key),
    });
    useMobileMock.mockReturnValue({ isMobile: true });

    render(<HeroSection />);

    const textVariants = motionVariants[0] as {
      animate: { transition: { type?: string; stiffness?: number } };
    };
    expect(textVariants.animate.transition.type).toBe("spring");
    expect(textVariants.animate.transition.stiffness).toBe(100);
  });
});
