import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";

vi.mock("@radix-ui/react-dialog", () => {
  const forward = (tag: string) =>
    React.forwardRef<any, any>(({ children, ...props }, ref) => (
      <div ref={ref} data-tag={tag} {...props}>
        {children}
      </div>
    ));

  const Root = ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-root">{children}</div>;
  const Trigger = ({ children }: { children: React.ReactNode }) => <button data-testid="sheet-trigger">{children}</button>;
  const Portal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  const Overlay = forward("overlay");
  const Content = forward("content");
  const Close = forward("close");
  const Title = forward("title");
  const Description = forward("description");

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

describe("Sheet", () => {
  it("renders overlay and content with side variants", () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="left" className="custom-sheet">
          <SheetHeader data-testid="header">Header</SheetHeader>
          <SheetTitle data-testid="title">Title</SheetTitle>
          <SheetDescription data-testid="description">Description</SheetDescription>
          <SheetFooter data-testid="footer">Footer</SheetFooter>
        </SheetContent>
      </Sheet>,
    );

    const root = screen.getByTestId("sheet-root");
    const overlay = root.querySelector('[data-tag="overlay"]');
    expect(overlay).toHaveClass("bg-black/80");

    const content = root.querySelector('[data-tag="content"]');
    expect(content).toHaveClass("custom-sheet", "inset-y-0", "left-0");

    expect(screen.getByTestId("header")).toHaveClass("flex", "sm:text-left");
    expect(screen.getByTestId("footer")).toHaveClass("sm:flex-row");
    expect(screen.getByTestId("title")).toHaveClass("text-lg", "font-semibold");
    expect(screen.getByTestId("description")).toHaveClass("text-sm", "text-muted-foreground");
  });
});
