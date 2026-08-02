import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Footer } from "../organisms/footer";

const useLanguageMock = vi.fn();

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => useLanguageMock(),
}));

vi.mock("@/components/atoms/logo", () => ({
  Logo: ({ className }: { className?: string }) => (
    <div data-testid="logo" className={className}>
      Logo
    </div>
  ),
}));

vi.mock("@/components/atoms/social-icon", () => ({
  SocialIcon: ({ label }: { label: string }) => <span>{label}</span>,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}));

describe("Footer", () => {
  beforeEach(() => {
    useLanguageMock.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the localized copyright message", () => {
    useLanguageMock.mockReturnValue({
      t: (key: string) => (key === "footer.rights" ? "All rights reserved." : key),
    });

    render(<Footer />);

    expect(screen.getByTestId("logo")).toHaveClass("mb-2");
    expect(screen.getByText("a11y.githubProfile")).toBeInTheDocument();
    expect(screen.getByText("a11y.linkedinProfile")).toBeInTheDocument();
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} Rafael Martins Alves. All rights reserved.`),
    ).toBeInTheDocument();
  });

  it("scrolls to the top when the action button is clicked", async () => {
    useLanguageMock.mockReturnValue({
      t: (key: string) => (key === "footer.backToTop" ? "Back to top" : ""),
    });

    render(<Footer />);

    const scrollSpy = vi.spyOn(window, "scrollTo");
    await userEvent.click(screen.getByRole("button", { name: "Back to top" }));
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
