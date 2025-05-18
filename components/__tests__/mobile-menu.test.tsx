import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MobileMenu } from "../mobile-menu";

vi.mock("@/hooks/use-mobile", () => ({
  useMobile: () => ({
    isTouchDevice: true,
  }),
}));

const mockNavItems = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#contact", label: "Contact", id: "contact" },
];

describe("MobileMenu", () => {
  const mockOnNavClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders menu button initially", () => {
    render(<MobileMenu navItems={mockNavItems} activeSection={null} onNavClick={mockOnNavClick} />);

    expect(screen.getByLabelText("Open Menu")).toBeInTheDocument();
  });

  it("toggles menu when button is clicked", async () => {
    render(<MobileMenu navItems={mockNavItems} activeSection={null} onNavClick={mockOnNavClick} />);

    expect(screen.queryByText("Home")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Open Menu"));
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close Menu"));
    await waitForElementToBeRemoved(() => screen.queryByText("Home"));
  });

  it("calls onNavClick when a nav item is clicked", async () => {
    render(<MobileMenu navItems={mockNavItems} activeSection={null} onNavClick={mockOnNavClick} />);

    fireEvent.click(screen.getByLabelText("Open Menu"));

    fireEvent.click(screen.getByText("About"));

    expect(mockOnNavClick).toHaveBeenCalled();
    await waitForElementToBeRemoved(() => screen.queryByText("About"));
  });

  it("highlights active section", () => {
    render(
      <MobileMenu navItems={mockNavItems} activeSection="about" onNavClick={mockOnNavClick} />,
    );

    fireEvent.click(screen.getByLabelText("Open Menu"));

    const activeLink = screen.getByText("About").closest("a");
    expect(activeLink).toHaveClass("text-primary", "bg-primary/5");
  });

  it("vibrates on touch devices when menu is toggled", () => {
    const mockVibrate = vi.fn();
    navigator.vibrate = mockVibrate;

    render(<MobileMenu navItems={mockNavItems} activeSection={null} onNavClick={mockOnNavClick} />);

    fireEvent.click(screen.getByLabelText("Open Menu"));
    expect(mockVibrate).toHaveBeenCalledWith(5);

    fireEvent.click(screen.getByLabelText("Close Menu"));
    expect(mockVibrate).toHaveBeenCalledTimes(2);
  });
});
