import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import RootLayout from "../layout";

vi.mock("next/font/google", () => ({
  Inter: () => ({
    variable: "inter-variable",
    subsets: ["latin"],
    display: "swap",
  }),
  JetBrains_Mono: () => ({
    variable: "jetbrains-mono-variable",
    subsets: ["latin"],
    display: "swap",
  }),
}));

vi.mock("@/components/language-provider", () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="language-provider">{children}</div>
  ),
}));

vi.mock("@/components/theme-provider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

vi.mock("@/components/ui/toaster", () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

vi.mock("../providers", () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}));

describe("RootLayout", () => {
  it("should render the layout with all providers", () => {
    const html = renderToString(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    expect(html).toContain('data-testid="language-provider"');
    expect(html).toContain('data-testid="theme-provider"');
    expect(html).toContain('data-testid="providers"');
    expect(html).toContain('data-testid="toaster"');
  });

  it("should render the JsonLd scripts", () => {
    const html = renderToString(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    const scriptCount = (html.match(/<script type="application\/ld\+json">/g) || []).length;
    expect(scriptCount).toBe(2);
  });

  it("should render the correct HTML attributes", () => {
    const html = renderToString(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    expect(html).toContain('lang="pt-BR"');
    expect(html).toContain('class="inter-variable jetbrains-mono-variable font-sans"');
  });
});
