import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Toggle } from "../ui/toggle";

vi.mock("@radix-ui/react-toggle", () => {
  const Root = React.forwardRef<HTMLButtonElement, any>(({ children, defaultPressed, onPressedChange, ...props }, ref) => {
    const [pressed, setPressed] = React.useState(defaultPressed ?? false);

    const handleClick = () => {
      setPressed((prev) => {
        const next = !prev;
        onPressedChange?.(next);
        return next;
      });
    };

    return (
      <button ref={ref} {...props} data-state={pressed ? "on" : "off"} onClick={handleClick}>
        {children}
      </button>
    );
  });
  Root.displayName = "ToggleRootMock";
  return { Root };
});

describe("Toggle", () => {
  it("applies variant and size classes and toggles state", async () => {
    const user = userEvent.setup();
    render(
      <Toggle data-testid="toggle" variant="outline" size="sm" defaultPressed>
        Label
      </Toggle>,
    );

    const toggle = screen.getByTestId("toggle");
    expect(toggle).toHaveClass("border", "min-w-9");
    expect(toggle).toHaveAttribute("data-state", "on");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("data-state", "off");
  });
});
