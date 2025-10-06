import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LanguageToggle } from "../atoms/language-toggle";

const useLanguageMock = vi.fn();

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => useLanguageMock(),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, "aria-label": ariaLabel, ...props }: any) => (
    <button type="button" aria-label={ariaLabel} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <>{children}</>,
  DropdownMenuContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick, className }: any) => (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  ),
}));

describe("LanguageToggle", () => {
  beforeEach(() => {
    useLanguageMock.mockReset();
  });

  it("renders the current language and switches to Portuguese", async () => {
    const setLanguage = vi.fn();
    useLanguageMock.mockReturnValue({
      language: "en",
      setLanguage,
      t: (key: string) => (key === "language.toggle" ? "Change language" : key),
    });

    render(<LanguageToggle />);

    expect(screen.getByRole("button", { name: "Change language" })).toBeInTheDocument();
    const englishOption = screen.getByRole("button", { name: /english/i });
    expect(englishOption).toHaveClass("bg-muted");

    await userEvent.click(screen.getByRole("button", { name: /português/i }));
    expect(setLanguage).toHaveBeenCalledWith("pt-BR");
  });

  it("switches back to English when the English option is selected", async () => {
    const setLanguage = vi.fn();
    useLanguageMock.mockReturnValue({
      language: "pt-BR",
      setLanguage,
      t: (key: string) => (key === "language.toggle" ? "Alterar idioma" : key),
    });

    render(<LanguageToggle />);

    const portugueseOption = screen.getByRole("button", { name: /português/i });
    expect(portugueseOption).toHaveClass("bg-muted");

    await userEvent.click(screen.getByRole("button", { name: /english/i }));
    expect(setLanguage).toHaveBeenCalledWith("en");
  });
});
