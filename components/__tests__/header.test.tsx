import { act, render, screen } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "../organisms/header";

const NavigationMock = vi.fn((_props: unknown) => <nav data-testid="navigation" />);
const SocialIconMock = vi.fn(({ label }: { label: string }) => <span>{label}</span>);

vi.mock("@/components/atoms/language-toggle", () => ({
  LanguageToggle: () => <div data-testid="language-toggle" />,
}));

vi.mock("@/components/atoms/logo", () => ({
  Logo: () => <div data-testid="logo" />,
}));

vi.mock("@/components/atoms/mode-toggle", () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />,
}));

vi.mock("@/components/atoms/social-icon", () => ({
  SocialIcon: (props: { label: string }) => SocialIconMock(props),
}));

vi.mock("@/components/organisms/navigation", () => ({
  Navigation: (props: { className?: string }) => NavigationMock(props),
}));

describe("Header", () => {
  const originalScrollY = window.scrollY;

  beforeEach(() => {
    NavigationMock.mockClear();
    SocialIconMock.mockClear();
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      writable: true,
      value: 0,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      writable: true,
      value: originalScrollY,
    });
  });

  it("renders the brand, navigation and utility actions", () => {
    render(<Header />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("language-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();

    expect(NavigationMock).toHaveBeenCalledWith(
      expect.objectContaining({ className: expect.stringContaining("hidden md:flex") }),
    );
    expect(SocialIconMock).toHaveBeenCalledTimes(2);
    expect(SocialIconMock.mock.calls[0][0]).toEqual(expect.objectContaining({ label: "GitHub Profile" }));
    expect(SocialIconMock.mock.calls[1][0]).toEqual(expect.objectContaining({ label: "LinkedIn Profile" }));
  });

  it("adds a background and border once the user scrolls", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-transparent");

    act(() => {
      Object.defineProperty(window, "scrollY", {
        configurable: true,
        writable: true,
        value: 50,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(header).toHaveClass("border-b");
  });
});
