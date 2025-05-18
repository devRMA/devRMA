import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider, useLanguage } from "../language-provider";

vi.mock("@/locales/en", () => ({
  default: {
    test: {
      key: "English text",
    },
  },
}));

vi.mock("@/locales/pt-BR", () => ({
  default: {
    test: {
      key: "Texto em português",
    },
  },
}));

function TestComponent() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <div data-testid="current-language">{language}</div>
      <button type="button" onClick={() => setLanguage("en")}>
        Switch to English
      </button>
      <button type="button" onClick={() => setLanguage("pt-BR")}>
        Switch to Portuguese
      </button>
      <div data-testid="translation">{t("test.key")}</div>
    </div>
  );
}

describe("LanguageProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders with default language (pt-BR)", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("current-language")).toHaveTextContent("pt-BR");
    expect(screen.getByTestId("translation")).toHaveTextContent("Texto em português");
  });

  it("changes language when setLanguage is called", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    act(() => {
      screen.getByText("Switch to English").click();
    });

    expect(screen.getByTestId("current-language")).toHaveTextContent("en");
    expect(screen.getByTestId("translation")).toHaveTextContent("English text");
  });

  it("loads saved language preference from localStorage", () => {
    localStorage.setItem("language", "en");

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("current-language")).toHaveTextContent("en");
    expect(screen.getByTestId("translation")).toHaveTextContent("English text");
  });

  it("returns key when translation is not found", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("translation")).toHaveTextContent("Texto em português");

    act(() => {
      screen.getByText("Switch to English").click();
    });

    expect(screen.getByTestId("translation")).toHaveTextContent("English text");
  });
});
