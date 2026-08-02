import { render, screen } from "@testing-library/react";
import type * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { ScrollIndicator } from "../atoms/scroll-indicator";

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    asChild: _asChild,
    ...props
  }: { children: React.ReactNode; asChild?: boolean }) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}));

const useReducedMotionMock = vi.fn(() => false);

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
  useReducedMotion: () => useReducedMotionMock(),
}));

describe("ScrollIndicator", () => {
  it("points at the target section so the native anchor jump handles scrolling", () => {
    render(<ScrollIndicator targetId="destination" label="Go" />);

    expect(screen.getByRole("link", { name: "Go" })).toHaveAttribute("href", "#destination");
  });

  it("keeps an accessible name on the icon-only control", () => {
    render(<ScrollIndicator targetId="destination" label="Go to skills" />);

    expect(screen.getByRole("link", { name: "Go to skills" })).toBeInTheDocument();
  });
});
