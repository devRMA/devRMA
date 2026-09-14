import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Navigation } from "../organisms/navigation";

const useLanguageMock = vi.fn();
const useMobileMock = vi.fn();
const useActiveSectionMock = vi.fn();
type NavItemMockProps = {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (event: unknown, href: string) => void;
};

type MobileMenuMockProps = {
  navItems: { href: string; label: string; id: string }[];
  activeSection: string | null;
  onNavClick: (event: unknown, href: string) => void;
};

const NavItemMock = vi.fn((_props: NavItemMockProps) => null);
const MobileMenuMock = vi.fn((_props: MobileMenuMockProps) => null);

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => useLanguageMock(),
}));

vi.mock("@/hooks/use-mobile", () => ({
  useMobile: () => useMobileMock(),
}));

vi.mock("@/hooks/use-active-section", () => ({
  useActiveSection: () => useActiveSectionMock(),
}));

vi.mock("@/components/molecules/nav-item", () => ({
  NavItem: (props: any) => NavItemMock(props),
}));

vi.mock("@/components/organisms/mobile-menu", () => ({
  MobileMenu: (props: any) => MobileMenuMock(props),
}));

describe("Navigation", () => {
  beforeEach(() => {
    useLanguageMock.mockReset();
    useMobileMock.mockReset();
    useActiveSectionMock.mockReset();
    NavItemMock.mockClear();
    MobileMenuMock.mockClear();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  const translations = {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
  } as const;

  it("renders desktop navigation items and handles smooth scrolling", () => {
    useLanguageMock.mockReturnValue({
      t: (key: keyof typeof translations) => translations[key] ?? key,
    });
    useMobileMock.mockReturnValue({ isMobile: false });
    useActiveSectionMock.mockReturnValue("skills");

    const pushStateSpy = vi.spyOn(window.history, "pushState");

    render(<Navigation className="nav-class" />);

    expect(NavItemMock).toHaveBeenCalledTimes(5);
    expect(NavItemMock).toHaveBeenCalledWith(
      expect.objectContaining({ href: "#about", label: "About", isActive: false }),
    );
    expect(NavItemMock).toHaveBeenCalledWith(
      expect.objectContaining({ href: "#skills", label: "Skills", isActive: true }),
    );

    const targetElement = document.createElement("div");
    targetElement.id = "projects";
    const scrollSpy = vi.fn();
    targetElement.scrollIntoView = scrollSpy;
    document.body.appendChild(targetElement);

    const navItemProps = NavItemMock.mock.calls.find(([props]) => props.href === "#projects")?.[0];
    const preventDefault = vi.fn();
    navItemProps?.onClick({ preventDefault }, "#projects");

    expect(preventDefault).toHaveBeenCalled();
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(pushStateSpy).toHaveBeenCalledWith(null, "", "#projects");
  });

  it("renders five items in page order", () => {
    useLanguageMock.mockReturnValue({
      t: (key: keyof typeof translations) => translations[key] ?? key,
    });
    useMobileMock.mockReturnValue({ isMobile: false });
    useActiveSectionMock.mockReturnValue("about");

    render(<Navigation />);

    expect(NavItemMock.mock.calls.map(([props]) => props.href)).toEqual([
      "#about",
      "#experience",
      "#projects",
      "#skills",
      "#contact",
    ]);
    expect(MobileMenuMock.mock.calls[0][0].navItems.map((item) => item.href)).toEqual([
      "#about",
      "#experience",
      "#projects",
      "#skills",
      "#contact",
    ]);
  });

  it("renders the mobile menu when the viewport is mobile", () => {
    useLanguageMock.mockReturnValue({
      t: (key: keyof typeof translations) => translations[key] ?? key,
    });
    useMobileMock.mockReturnValue({ isMobile: true });
    useActiveSectionMock.mockReturnValue("about");

    render(<Navigation />);

    expect(MobileMenuMock).toHaveBeenCalledWith(
      expect.objectContaining({
        activeSection: "about",
        navItems: expect.arrayContaining([
          expect.objectContaining({ href: "#contact", label: "Contact" }),
        ]),
      }),
    );
  });
});
