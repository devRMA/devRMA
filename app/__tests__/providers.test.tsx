import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Providers } from "../providers";

describe("Providers", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <Providers>
        <div>Test Content</div>
      </Providers>,
    );

    expect(getByText("Test Content")).toBeDefined();
  });

  it("should render multiple children correctly", () => {
    const { getByText } = render(
      <Providers>
        <div>First Child</div>
        <div>Second Child</div>
      </Providers>,
    );

    expect(getByText("First Child")).toBeDefined();
    expect(getByText("Second Child")).toBeDefined();
  });
});
