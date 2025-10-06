import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("useToast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetModules();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("enqueues a toast, enforces the display limit and removes after dismiss", async () => {
    const { useToast, toast } = await import("../use-toast");
    const { result } = renderHook(() => useToast());

    expect(result.current.toasts).toHaveLength(0);

    act(() => {
      toast({ title: "First" });
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      toast({ title: "Second" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Second");

    const activeToastId = result.current.toasts[0].id;

    act(() => {
      result.current.dismiss(activeToastId);
    });

    expect(result.current.toasts[0].open).toBe(false);

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it("updates toast content via the returned helpers", async () => {
    const { useToast, toast } = await import("../use-toast");
    const { result } = renderHook(() => useToast());

    let toastId = "";

    act(() => {
      const created = toast({ title: "Initial" });
      toastId = created.id;
      created.update({ id: toastId, title: "Updated", description: "Details" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Updated");
    expect(result.current.toasts[0].description).toBe("Details");

    act(() => {
      result.current.dismiss();
    });

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });
    expect(result.current.toasts).toHaveLength(0);
  });
});
