import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "../ui/toast";

vi.mock("@radix-ui/react-toast", () => {
  const forward = (tag: string) =>
    React.forwardRef<any, any>(({ children, ...props }, ref) => (
      <div ref={ref} data-tag={tag} {...props}>
        {children}
      </div>
    ));

  const Provider = ({ children }: { children: React.ReactNode }) => <div data-testid="toast-provider">{children}</div>;
  const Viewport = forward("viewport");
  const Root = forward("root");
  const Title = forward("title");
  const Description = forward("description");
  const Close = forward("close");
  const Action = forward("action");

  return {
    Provider,
    Viewport,
    Root,
    Title,
    Description,
    Close,
    Action,
  };
});

describe("Toast primitives", () => {
  it("renders provider, toast and action with expected utility classes", () => {
    render(
      <ToastProvider>
        <ToastViewport data-testid="viewport" />
        <Toast data-testid="toast" variant="destructive">
          <div>
            <ToastTitle data-testid="title">Oops</ToastTitle>
            <ToastDescription data-testid="description">Something broke</ToastDescription>
          </div>
          <ToastAction data-testid="action">Undo</ToastAction>
          <ToastClose data-testid="close" />
        </Toast>
      </ToastProvider>,
    );

    expect(screen.getByTestId("viewport")).toHaveClass("flex", "max-h-screen");
    expect(screen.getByTestId("toast")).toHaveClass("destructive", "border");
    expect(screen.getByTestId("title")).toHaveClass("text-sm", "font-semibold");
    expect(screen.getByTestId("description")).toHaveClass("opacity-90");
    expect(screen.getByTestId("action")).toHaveClass("inline-flex", "rounded-md");
    expect(screen.getByTestId("close")).toHaveClass("absolute", "p-1");
  });
});
