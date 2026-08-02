import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CertificateCard } from "../molecules/certificate-card";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} data-testid="image" />,
}));

describe("CertificateCard", () => {
  it("renders the thumbnail and invokes callback on click", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <CertificateCard
        id={1}
        title="Certified Dev"
        issuer="ACME"
        date="2024"
        thumbnail="thumb.png"
        onClick={handleClick}
      />,
    );

    expect(screen.getByTestId("image")).toHaveAttribute("alt", "");
    expect(screen.getByText("ACME • 2024")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Certified Dev/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
