import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { ScrollIndicator } from "../atoms/scroll-indicator";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild: _asChild, ...props }: any) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

describe("ScrollIndicator", () => {
  it("scrolls smoothly to the target section", async () => {
    const user = userEvent.setup();
    const target = document.createElement("div");
    target.id = "destination";
    target.style.marginTop = "200px";
    document.body.appendChild(target);

    const scrollSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    render(<ScrollIndicator targetId="destination" label="Go" />);

    await user.click(screen.getByRole("link", { name: "Go" }));

    expect(scrollSpy).toHaveBeenCalledWith({ top: target.offsetTop - 80, behavior: "smooth" });

    scrollSpy.mockRestore();
    document.body.removeChild(target);
  });
});
