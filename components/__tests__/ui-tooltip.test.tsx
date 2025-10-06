import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";

vi.mock("@radix-ui/react-tooltip", () => {
  const forward = (tag: string) =>
    React.forwardRef<any, any>(({ children, sideOffset: _sideOffset, ...props }, ref) => (
      <div ref={ref} data-tag={tag} {...props}>
        {children}
      </div>
    ));

  const Provider = ({ children }: { children: React.ReactNode }) => <div data-testid="provider">{children}</div>;
  const Root = ({ children }: { children: React.ReactNode }) => <div data-testid="tooltip-root">{children}</div>;
  const Trigger = ({ children, ...props }: any) => (
    <button data-testid="tooltip-trigger" {...props}>
      {children}
    </button>
  );
  const Content = forward("tooltip-content");

  return {
    Provider,
    Root,
    Trigger,
    Content,
  };
});

describe("Tooltip", () => {
  it("renders trigger and content with default spacing", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent sideOffset={8} data-testid="content">
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    await user.hover(screen.getByTestId("tooltip-trigger"));

    const content = screen.getByTestId("content");
    expect(content).toHaveClass("rounded-md", "px-3", "py-1.5", "shadow-md");
  });
});
