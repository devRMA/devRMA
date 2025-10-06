import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { formatDurationRange } from "../duration";

describe("formatDurationRange", () => {
  const fixedNow = new Date("2024-05-15T12:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixedNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'Less than a month' when the start date is invalid", () => {
    expect(formatDurationRange("not-a-date", "2024-05-01", { locale: "en" })).toBe(
      "Less than a month",
    );
  });

  it("falls back to the current date when end date is missing", () => {
    expect(formatDurationRange("2024-03-01", undefined, { locale: "en" })).toBe("2 months");
  });

  it("calculates the year and month difference in English", () => {
    expect(formatDurationRange("2020-01-15", "2021-03-10", { locale: "en" })).toBe(
      "1 year and 1 month",
    );
  });

  it("clamps the end date when it is earlier than the start date", () => {
    expect(formatDurationRange("2024-06-01", "2024-05-01", { locale: "en" })).toBe(
      "Less than a month",
    );
  });

  it("returns the Portuguese labels when requested", () => {
    expect(formatDurationRange("2024-01-10", "2024-03-15", { locale: "pt-BR" })).toBe(
      "2 meses",
    );
  });

  it("treats durations shorter than a whole month as less than a month", () => {
    expect(formatDurationRange("2024-01-10", "2024-01-20", { locale: "en" })).toBe(
      "Less than a month",
    );
  });
});
