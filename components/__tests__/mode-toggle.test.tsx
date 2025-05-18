import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ModeToggle } from "../atoms/mode-toggle";

vi.mock("next-themes", () => ({
  useTheme: () => ({ setTheme: vi.fn() }),
}));
vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({ t: (key: string) => key }),
}));
vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuItem: ({
    children,
    onClick,
  }: { children: React.ReactNode; onClick?: () => void }) => (
    <div tabIndex={0} role="menuitem" onClick={onClick} onKeyUp={() => {}}>
      {children}
    </div>
  ),
}));

describe("ModeToggle", () => {
  it("should render theme toggle button after mount", async () => {
    render(<ModeToggle />);
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeEnabled();
      expect(screen.getByLabelText("theme.toggle")).toBeDefined();
    });
  });

  it("should dispatch theme-change event when theme is changed", async () => {
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    render(<ModeToggle />);
    await waitFor(() => expect(screen.getByRole("button")).toBeEnabled());
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(document.body.textContent).toContain("theme.light");
    });
    const lightOption = Array.from(document.body.querySelectorAll("*")).find(
      (el) => el.textContent === "theme.light",
    );
    expect(lightOption).toBeDefined();
    if (lightOption) {
      fireEvent.click(lightOption);
    }
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
    dispatchSpy.mockRestore();
  });

  it("should render all theme options", async () => {
    render(<ModeToggle />);
    await waitFor(() => expect(screen.getByRole("button")).toBeEnabled());
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(document.body.textContent).toContain("theme.light");
      expect(document.body.textContent).toContain("theme.dark");
      expect(document.body.textContent).toContain("theme.system");
    });
  });
});
