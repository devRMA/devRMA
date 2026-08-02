import { render, screen } from "@testing-library/react";
import type { LucideIcon } from "lucide-react";
import type { SVGProps } from "react";
import { describe, expect, it } from "vitest";

import { ContactMethod } from "../molecules/contact-method";

function StubIcon(props: SVGProps<SVGSVGElement>) {
  return <svg data-testid="contact-icon" {...props} />;
}

describe("ContactMethod", () => {
  it("renders the contact information with an accessible link", () => {
    render(
      <ContactMethod icon={StubIcon as unknown as LucideIcon} title="Email" value="rafael@example.com" href="mailto:test" />,
    );

    expect(screen.getByTestId("contact-icon")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Email" })).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "rafael@example.com" });
    expect(link).toHaveAttribute("href", "mailto:test");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
