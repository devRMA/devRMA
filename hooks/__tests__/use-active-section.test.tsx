import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useActiveSection } from "../use-active-section";

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

const { MockIntersectionObserver, observers } = vi.hoisted(() => {
  const instances: MockIntersectionObserver[] = [];

  class MockIntersectionObserver {
    elements: Element[] = [];
    callback: ObserverCallback;
    options?: IntersectionObserverInit;

    constructor(callback: ObserverCallback, options?: IntersectionObserverInit) {
      this.callback = callback;
      this.options = options;
      instances.push(this);
    }

    observe(element: Element) {
      this.elements.push(element);
    }

    unobserve(element: Element) {
      this.elements = this.elements.filter((el) => el !== element);
    }

    disconnect() {
      this.elements = [];
    }

    trigger(entries: IntersectionObserverEntry[]) {
      this.callback(entries);
    }
  }

  return { MockIntersectionObserver, observers: instances };
});

describe("useActiveSection", () => {
  const sections = ["about", "skills", "projects"];
  let originalIntersectionObserver: typeof IntersectionObserver;
  let scrollYDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    document.body.innerHTML = "";
    sections.forEach((id) => {
      const element = document.createElement("div");
      element.id = id;
      document.body.appendChild(element);
    });

    scrollYDescriptor = Object.getOwnPropertyDescriptor(window, "scrollY");

    originalIntersectionObserver = window.IntersectionObserver;
    // @ts-expect-error - we are providing a test double for IntersectionObserver
    window.IntersectionObserver = MockIntersectionObserver;
    observers.length = 0;
  });

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
    if (scrollYDescriptor) {
      Object.defineProperty(window, "scrollY", scrollYDescriptor);
    }
    document.body.innerHTML = "";
  });

  it("defaults to the first section and updates when intersections change", async () => {
    const { result } = renderHook(() => useActiveSection(sections, 150));

    expect(result.current).toBe("about");
    await waitFor(() => expect(observers.length).toBe(sections.length));

    await act(async () => {
      observers[1].trigger([
        {
          isIntersecting: true,
          boundingClientRect: { top: 0 } as DOMRectReadOnly,
          target: document.getElementById("skills")!,
        } as unknown as IntersectionObserverEntry,
      ]);
      await Promise.resolve();
    });

    await waitFor(() => expect(result.current).toBe("skills"));

    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, value: 200 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe("skills");

    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe("about");
  });

  it("falls back to the first section when no entries intersect", (context) => {
    const { result } = renderHook(() => useActiveSection(sections));

    act(() => {
      observers.forEach((observer) => {
        observer.trigger([
          {
            isIntersecting: false,
            boundingClientRect: { top: 0 } as DOMRectReadOnly,
            target: observer.elements[0] ?? document.createElement("div"),
          } as unknown as IntersectionObserverEntry,
        ]);
      });
    });

    expect(result.current).toBe("about");
  });
});
