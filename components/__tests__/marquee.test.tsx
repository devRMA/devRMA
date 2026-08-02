import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Marquee } from "../molecules/marquee";

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({ t: (key: string) => key }),
}));

describe("Marquee", () => {
  it("exposes a pause control, since :hover does not reach keyboard or touch", async () => {
    render(
      <Marquee>
        <span>item</span>
      </Marquee>,
    );

    const control = screen.getByRole("button", { name: "a11y.pauseCarousel" });
    expect(control).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(control);

    expect(screen.getByRole("button", { name: "a11y.playCarousel" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(document.querySelector(".carousel")).toHaveAttribute("data-paused");
  });

  it("resumes when toggled back", async () => {
    render(
      <Marquee>
        <span>item</span>
      </Marquee>,
    );

    await userEvent.click(screen.getByRole("button", { name: "a11y.pauseCarousel" }));
    await userEvent.click(screen.getByRole("button", { name: "a11y.playCarousel" }));

    expect(document.querySelector(".carousel")).not.toHaveAttribute("data-paused");
  });

  it("clones the row for the seamless loop and hides the clone from assistive tech", () => {
    render(
      <Marquee>
        <span>item</span>
      </Marquee>,
    );

    expect(screen.getAllByText("item")).toHaveLength(2);
    expect(screen.getByTestId("marquee-loop-clone")).toHaveAttribute("aria-hidden", "true");
  });
});
