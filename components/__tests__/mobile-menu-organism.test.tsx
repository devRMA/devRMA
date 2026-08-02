import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import { MobileMenu } from "../organisms/mobile-menu";

const useMobileMock = vi.fn();
type NavItemMockProps = {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (event: unknown, href: string) => void;
};

const MobileNavItemMock = vi.fn((_props: NavItemMockProps) => null);

vi.mock("@/hooks/use-mobile", () => ({
  useMobile: () => useMobileMock(),
}));

vi.mock("@/components/molecules/mobile-nav-item", () => ({
  MobileNavItem: (props: any) => MobileNavItemMock(props),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  motion: {
    div: ({
      children,
      variants: _variants,
      initial: _initial,
      animate: _animate,
      exit: _exit,
      transition: _transition,
      ...rest
    }: any) => <div {...rest}>{children}</div>,
  },
}));

describe("MobileMenu (organism)", () => {
  const originalVibrate = navigator.vibrate;

  beforeEach(() => {
    useMobileMock.mockReset();
    MobileNavItemMock.mockClear();
    navigator.vibrate = vi.fn();
  });

  afterAll(() => {
    navigator.vibrate = originalVibrate;
  });

  const navItems = [
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
  ];

  it("toggles the menu and forwards click events to the provided handler", async () => {
    const onNavClick = vi.fn();
    useMobileMock.mockReturnValue({ isTouchDevice: true });

    const user = userEvent.setup();

    render(<MobileMenu navItems={navItems} activeSection="skills" onNavClick={onNavClick} />);

    const toggleButton = screen.getByRole("button", { name: "Open Menu" });
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(MobileNavItemMock).toHaveBeenCalledWith(
      expect.objectContaining({ href: "#skills", isActive: true }),
    );
    expect(navigator.vibrate).toHaveBeenCalledWith(5);

    const navItemProps = MobileNavItemMock.mock.calls[0][0];
    const clickEvent = { preventDefault: vi.fn() } as any;
    await act(async () => {
      navItemProps.onClick(clickEvent, navItemProps.href);
    });

    expect(onNavClick).toHaveBeenCalledWith(clickEvent, "#about");
    expect(navigator.vibrate).toHaveBeenCalledTimes(2);
    expect(await screen.findByRole("button", { name: "Open Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("does not vibrate when the device is not touch-enabled", async () => {
    const onNavClick = vi.fn();
    useMobileMock.mockReturnValue({ isTouchDevice: false });

    render(<MobileMenu navItems={navItems} activeSection={null} onNavClick={onNavClick} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Open Menu" }));
    expect(navigator.vibrate).not.toHaveBeenCalled();
  });
});
