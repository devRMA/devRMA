import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { useMobile } from "../use-mobile";

const setNavigatorProp = (key: string, value: unknown) => {
  Object.defineProperty(window.navigator, key, {
    configurable: true,
    get: () => value,
  });
};

const restoreNavigatorProp = (key: string, original: PropertyDescriptor | undefined) => {
  if (original) {
    Object.defineProperty(window.navigator, key, original);
  } else {
    // @ts-expect-error - property may not exist on the Navigator type but we can delete it for tests
    delete window.navigator[key];
  }
};

describe("useMobile", () => {
  const originalInnerWidth = window.innerWidth;
  const originalMaxTouchPoints = Object.getOwnPropertyDescriptor(
    window.navigator,
    "maxTouchPoints",
  );
  const originalMsMaxTouchPoints = Object.getOwnPropertyDescriptor(
    window.navigator,
    "msMaxTouchPoints",
  );

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 500,
    });
    setNavigatorProp("maxTouchPoints", 2);
    setNavigatorProp("msMaxTouchPoints", undefined);
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: originalInnerWidth,
    });
    restoreNavigatorProp("maxTouchPoints", originalMaxTouchPoints);
    restoreNavigatorProp("msMaxTouchPoints", originalMsMaxTouchPoints);
  });

  it("detects mobile viewport width and touch capability", () => {
    const { result } = renderHook(() => useMobile());

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTouchDevice).toBe(true);
  });

  it("updates the mobile flag when the viewport resizes", () => {
    const { result } = renderHook(() => useMobile());

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        writable: true,
        value: 1024,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTouchDevice).toBe(true);
  });

  it("falls back to legacy touch detection when maxTouchPoints is unavailable", () => {
    setNavigatorProp("maxTouchPoints", 0);
    setNavigatorProp("msMaxTouchPoints", 3);

    const { result } = renderHook(() => useMobile());

    expect(result.current.isTouchDevice).toBe(true);
  });

  it("detects non-touch device when maxTouchPoints and legacy touch are 0", () => {
    // @ts-expect-error - delete ontouchstart to simulate desktop environment without touch
    delete window.ontouchstart;
    setNavigatorProp("maxTouchPoints", 0);
    setNavigatorProp("msMaxTouchPoints", 0);

    const { result } = renderHook(() => useMobile());

    expect(result.current.isTouchDevice).toBe(false);

    // Restore
    // @ts-expect-error - restore ontouchstart
    window.ontouchstart = null;
  });
});
