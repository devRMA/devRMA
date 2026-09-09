import { act, render, renderHook, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider, useLanguage } from "../language-provider";

vi.mock("@/locales/en", () => ({
  default: {
    test: {
      key: "English text",
      greeting: "Hello, {name}!",
      nestedObject: { child: "value" },
    },
  },
}));

vi.mock("@/locales/pt-BR", () => ({
  default: {
    test: {
      key: "Texto em português",
      greeting: "Olá, {name}!",
      nestedObject: { child: "valor" },
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
      <div data-testid="interpolated">{t("test.greeting", { name: "Rafael" })}</div>
      <div data-testid="missing">{t("test.nonexistent")}</div>
      <div data-testid="non-string">{t("test.nestedObject")}</div>
    </div>
  );
}

describe("LanguageProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("throws error when useLanguage is used outside LanguageProvider", () => {
    expect(() => renderHook(() => useLanguage())).toThrow(
      "useLanguage must be used within a LanguageProvider",
    );
  });

  it("renders with default language (pt-BR) and handles interpolation and fallbacks", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("current-language")).toHaveTextContent("pt-BR");
    expect(screen.getByTestId("translation")).toHaveTextContent("Texto em português");
    expect(screen.getByTestId("interpolated")).toHaveTextContent("Olá, Rafael!");
    expect(screen.getByTestId("missing")).toHaveTextContent("test.nonexistent");
    expect(screen.getByTestId("non-string")).toHaveTextContent("test.nestedObject");
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
    expect(screen.getByTestId("interpolated")).toHaveTextContent("Hello, Rafael!");
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

  it("gracefully catches localStorage errors on read and write", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Quota exceeded");
    });
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    act(() => {
      screen.getByText("Switch to English").click();
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
