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

function entryFor(id: string, top: number, isIntersecting: boolean) {
  return {
    isIntersecting,
    boundingClientRect: { top } as DOMRectReadOnly,
    target: document.getElementById(id) as Element,
  } as unknown as IntersectionObserverEntry;
}

describe("useActiveSection", () => {
  const sections = ["about", "skills", "projects"];
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    document.body.innerHTML = "";
    sections.forEach((id) => {
      const element = document.createElement("div");
      element.id = id;
      document.body.appendChild(element);
    });

    originalIntersectionObserver = window.IntersectionObserver;
    // @ts-expect-error - we are providing a test double for IntersectionObserver
    window.IntersectionObserver = MockIntersectionObserver;
    observers.length = 0;
  });

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
    document.body.innerHTML = "";
  });

  it("observes every section with a single observer", async () => {
    renderHook(() => useActiveSection(sections, 150));

    await waitFor(() => expect(observers).toHaveLength(1));
    expect(observers[0].elements).toHaveLength(sections.length);
    expect(observers[0].options?.rootMargin).toBe("-150px 0px -45% 0px");
  });

  it("defaults to the first section and picks the topmost visible one", async () => {
    const { result } = renderHook(() => useActiveSection(sections, 150));

    expect(result.current).toBe("about");
    await waitFor(() => expect(observers).toHaveLength(1));

    await act(async () => {
      observers[0].trigger([entryFor("projects", 480, true), entryFor("skills", 120, true)]);
      await Promise.resolve();
    });

    await waitFor(() => expect(result.current).toBe("skills"));
  });

  it("falls back to the remaining visible section when one leaves the viewport", async () => {
    const { result } = renderHook(() => useActiveSection(sections));

    await waitFor(() => expect(observers).toHaveLength(1));

    await act(async () => {
      observers[0].trigger([entryFor("skills", 100, true), entryFor("projects", 600, true)]);
      await Promise.resolve();
    });

    await waitFor(() => expect(result.current).toBe("skills"));

    await act(async () => {
      observers[0].trigger([entryFor("skills", -400, false)]);
      await Promise.resolve();
    });

    await waitFor(() => expect(result.current).toBe("projects"));
  });

  it("keeps the current section when no entries intersect", () => {
    const { result } = renderHook(() => useActiveSection(sections));

    act(() => {
      observers[0].trigger([entryFor("skills", 0, false)]);
    });

    expect(result.current).toBe("about");
  });
});
