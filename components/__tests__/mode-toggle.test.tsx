import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ModeToggle } from "../atoms/mode-toggle";

const setThemeMock = vi.fn();
const useThemeMock = vi.fn(() => ({ theme: "dark", setTheme: setThemeMock }));

vi.mock("next-themes", () => ({
  useTheme: () => useThemeMock(),
}));

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({ t: (key: string) => key }),
}));

vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuRadioGroup: ({
    children,
    value,
    onValueChange,
  }: {
    children: ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
  }) => (
    <div data-testid="theme-group" data-value={value ?? ""}>
      {children}
      <button type="button" data-testid="pick-light" onClick={() => onValueChange?.("light")} />
    </div>
  ),
  DropdownMenuRadioItem: ({ children, value }: { children: ReactNode; value: string }) => (
    <div data-value={value}>{children}</div>
  ),
}));

describe("ModeToggle", () => {
  beforeEach(() => {
    setThemeMock.mockClear();
    useThemeMock.mockReturnValue({ theme: "dark", setTheme: setThemeMock });
  });

  it("renders an enabled, labelled trigger", async () => {
    render(<ModeToggle />);

    const trigger = screen.getByLabelText("theme.toggle");
    expect(trigger).toBeEnabled();
  });

  it("marks the active theme once mounted", async () => {
    render(<ModeToggle />);

    await waitFor(() => {
      expect(screen.getByTestId("theme-group")).toHaveAttribute("data-value", "dark");
    });
  });

  it("sets the theme when an option is picked", async () => {
    render(<ModeToggle />);

    await userEvent.click(screen.getByTestId("pick-light"));

    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it("renders all three theme options", () => {
    render(<ModeToggle />);

    expect(document.body.textContent).toContain("theme.light");
    expect(document.body.textContent).toContain("theme.dark");
    expect(document.body.textContent).toContain("theme.system");
  });
});
