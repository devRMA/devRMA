import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LanguageToggle } from "../atoms/language-toggle";

const useLanguageMock = vi.fn();

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => useLanguageMock(),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    "aria-label": ariaLabel,
  }: { children: ReactNode; "aria-label"?: string }) => (
    <button type="button" aria-label={ariaLabel}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <>{children}</>,
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
    <div data-testid="radio-group" data-value={value}>
      {children}
      <button
        type="button"
        data-testid="select-pt"
        onClick={() => onValueChange?.("pt-BR")}
        hidden
      />
      <button type="button" data-testid="select-en" onClick={() => onValueChange?.("en")} hidden />
    </div>
  ),
  DropdownMenuRadioItem: ({ children, value }: { children: ReactNode; value: string }) => (
    <button type="button" data-value={value}>
      {children}
    </button>
  ),
}));

describe("LanguageToggle", () => {
  beforeEach(() => {
    useLanguageMock.mockReset();
  });

  it("exposes the active language as the radio group value, not only as a colour", () => {
    useLanguageMock.mockReturnValue({
      language: "en",
      setLanguage: vi.fn(),
      t: (key: string) => (key === "language.toggle" ? "Change language" : key),
    });

    render(<LanguageToggle />);

    expect(screen.getByRole("button", { name: "Change language" })).toBeInTheDocument();
    expect(screen.getByTestId("radio-group")).toHaveAttribute("data-value", "en");
    expect(screen.getByRole("button", { name: "Português" })).toHaveAttribute(
      "data-value",
      "pt-BR",
    );
  });

  it("switches to Portuguese when that option is selected", async () => {
    const setLanguage = vi.fn();
    useLanguageMock.mockReturnValue({
      language: "en",
      setLanguage,
      t: (key: string) => key,
    });

    render(<LanguageToggle />);

    await userEvent.click(screen.getByTestId("select-pt"));
    expect(setLanguage).toHaveBeenCalledWith("pt-BR");
  });

  it("switches back to English when that option is selected", async () => {
    const setLanguage = vi.fn();
    useLanguageMock.mockReturnValue({
      language: "pt-BR",
      setLanguage,
      t: (key: string) => key,
    });

    render(<LanguageToggle />);

    expect(screen.getByTestId("radio-group")).toHaveAttribute("data-value", "pt-BR");

    await userEvent.click(screen.getByTestId("select-en"));
    expect(setLanguage).toHaveBeenCalledWith("en");
  });
});
