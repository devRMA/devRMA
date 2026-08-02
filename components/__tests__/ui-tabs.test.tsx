import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

vi.mock("@radix-ui/react-tabs", () => {
  const forward = (tag: string) =>
    React.forwardRef<any, any>(({ children, ...props }, ref) => (
      <div ref={ref} data-tag={tag} {...props}>
        {children}
      </div>
    ));

  const Root = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tabs-root">{children}</div>
  );
  const List = forward("list");
  const Trigger = forward("trigger");
  const Content = forward("content");

  return { Root, List, Trigger, Content };
});

describe("Tabs", () => {
  it("applies utility classes to list, trigger and content", () => {
    render(
      <Tabs value="one">
        <TabsList data-testid="list" className="extra-list">
          <TabsTrigger value="one" data-testid="trigger">
            One
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one" data-testid="content">
          Content
        </TabsContent>
      </Tabs>,
    );

    expect(screen.getByTestId("list")).toHaveClass("bg-muted", "extra-list");
    expect(screen.getByTestId("trigger")).toHaveClass("rounded-sm", "text-sm");
    expect(screen.getByTestId("content")).toHaveClass("mt-2");
  });
});
