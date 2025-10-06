import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../ui/dropdown-menu";

vi.mock("@radix-ui/react-dropdown-menu", () => {
  const forward = (tag: string) =>
    React.forwardRef<any, any>(({ children, ...props }, ref) => (
      <div ref={ref} data-tag={tag} {...props}>
        {children}
      </div>
    ));

  const Root = ({ children }: { children: React.ReactNode }) => <div data-testid="root">{children}</div>;
  const Trigger = ({ children }: { children: React.ReactNode }) => <button data-testid="trigger">{children}</button>;
  const Content = forward("content");
  const Item = forward("item");
  const CheckboxItem = forward("checkbox");
  const RadioItem = forward("radio");
  const RadioGroup = ({ children }: { children: React.ReactNode }) => <div data-testid="radio-group">{children}</div>;
  const Label = forward("label");
  const Separator = forward("separator");
  const Group = ({ children }: { children: React.ReactNode }) => <div data-testid="group">{children}</div>;
  const Portal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  const Sub = ({ children }: { children: React.ReactNode }) => <div data-testid="sub">{children}</div>;
  const SubTrigger = forward("sub-trigger");
  const SubContent = forward("sub-content");
  const ItemIndicator = ({ children }: { children: React.ReactNode }) => <span data-tag="indicator">{children}</span>;

  return {
    Root,
    Trigger,
    Content,
    Item,
    CheckboxItem,
    RadioGroup,
    RadioItem,
    Label,
    Separator,
    Group,
    Portal,
    Sub,
    SubTrigger,
    SubContent,
    ItemIndicator,
  };
});

describe("Dropdown menu", () => {
  it("renders trigger, content and menu items with expected utility classes", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent className="extra-content">
          <DropdownMenuLabel data-testid="label">Label</DropdownMenuLabel>
          <DropdownMenuSeparator data-testid="separator" />
          <DropdownMenuGroup>
            <DropdownMenuItem data-testid="item">Item</DropdownMenuItem>
            <DropdownMenuCheckboxItem data-testid="checkbox" checked>
              Checkbox
            </DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup value="one">
              <DropdownMenuRadioItem value="one" data-testid="radio">
                Radio
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger data-testid="sub-trigger">More</DropdownMenuSubTrigger>
              <DropdownMenuSubContent data-testid="sub-content">Sub content</DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuShortcut data-testid="shortcut">⌘S</DropdownMenuShortcut>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId("trigger")).toHaveTextContent("Open");
    expect(screen.getByTestId("label")).toHaveClass("font-semibold");
    expect(screen.getByTestId("root").querySelector('[data-tag="content"]')).toHaveClass("extra-content");
    expect(screen.getByTestId("separator")).toHaveClass("bg-muted");
    expect(screen.getByTestId("item")).toHaveClass("text-sm");
    expect(screen.getByTestId("checkbox")).toHaveClass("rounded-sm");
    expect(screen.getByTestId("radio")).toHaveClass("rounded-sm");
    expect(screen.getByTestId("sub-trigger")).toHaveClass("flex");
    expect(screen.getByTestId("sub-content")).toHaveClass("min-w-[8rem]");
    expect(screen.getByTestId("shortcut")).toHaveClass("text-xs");
  });
});
