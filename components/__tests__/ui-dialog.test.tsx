import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

vi.mock("@radix-ui/react-dialog", () => {
  const forward = (tag: string) =>
    React.forwardRef<HTMLElement, any>(({ children, ...props }, ref) =>
      React.createElement(tag, { ref, ...props, "data-tag": tag }, children),
    );

  const Root = ({ children }: { children: ReactNode }) => (
    <div data-testid="dialog-root">{children}</div>
  );
  const Trigger = ({ children }: { children: ReactNode }) => (
    <button data-testid="dialog-trigger">{children}</button>
  );
  const Portal = ({ children }: { children: ReactNode }) => <>{children}</>;
  const Overlay = forward("div");
  const Content = forward("section");
  const Close = forward("button");
  const Title = forward("h2");
  const Description = forward("p");

  return {
    Root,
    Trigger,
    Portal,
    Overlay,
    Content,
    Close,
    Title,
    Description,
  };
});

describe("Dialog UI", () => {
  it("renders overlay, content and structural helpers with the expected classes", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="custom-content">
          <DialogHeader data-testid="header">Header</DialogHeader>
          <DialogTitle data-testid="title">Title</DialogTitle>
          <DialogDescription data-testid="description">Description</DialogDescription>
          <DialogFooter data-testid="footer">Footer</DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    const root = screen.getByTestId("dialog-root");
    const overlay = root.querySelector('[data-tag="div"]');
    expect(overlay).toHaveClass("bg-black/80");

    const content = root.querySelector('[data-tag="section"]');
    expect(content).toHaveClass("custom-content");

    expect(screen.getByTestId("header")).toHaveClass("flex", "sm:text-left");
    expect(screen.getByTestId("footer")).toHaveClass("sm:space-x-2");
    expect(screen.getByTestId("title")).toHaveClass("text-lg", "font-semibold");
    expect(screen.getByTestId("description")).toHaveClass("text-sm", "text-muted-foreground");
  });
});
