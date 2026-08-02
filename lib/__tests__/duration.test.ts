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

  it("counts both endpoints, the way a CV range reads", () => {
    expect(formatDurationRange("2022-01-01", "2022-06-30", { locale: "en" })).toBe("6 months");
    expect(formatDurationRange("2021-06-14", "2021-12-31", { locale: "en" })).toBe("7 months");
  });

  it("agrees with the printed period for every real position", () => {
    expect(formatDurationRange("2024-03-18", "2025-05-31", { locale: "en" })).toBe(
      "1 year and 3 months",
    );
    expect(formatDurationRange("2022-07-01", "2024-03-17", { locale: "en" })).toBe(
      "1 year and 9 months",
    );
  });

  it("is not affected by the reader's timezone", () => {
    const original = process.env.TZ;
    const results = ["UTC", "America/Sao_Paulo", "Asia/Tokyo", "Pacific/Kiritimati"].map((tz) => {
      process.env.TZ = tz;
      return formatDurationRange("2022-01-01", "2022-06-30", { locale: "en" });
    });
    process.env.TZ = original;

    expect(new Set(results).size).toBe(1);
    expect(results[0]).toBe("6 months");
  });

  it("falls back to the current month when the end date is missing", () => {
    expect(formatDurationRange("2024-03-01", undefined, { locale: "en" })).toBe("3 months");
  });

  it("reports a single month for a range inside one month", () => {
    expect(formatDurationRange("2024-01-10", "2024-01-20", { locale: "en" })).toBe("1 month");
  });

  it("uses singular labels for exactly one year", () => {
    expect(formatDurationRange("2023-01-01", "2023-12-31", { locale: "en" })).toBe("1 year");
    expect(formatDurationRange("2023-01-01", "2023-12-31", { locale: "pt-BR" })).toBe("1 ano");
  });

  it("returns the Portuguese labels when requested", () => {
    expect(formatDurationRange("2024-01-10", "2024-03-15", { locale: "pt-BR" })).toBe("3 meses");
  });

  it("rejects an unparseable start date", () => {
    expect(formatDurationRange("not-a-date", "2024-05-01", { locale: "en" })).toBe(
      "Less than a month",
    );
    expect(formatDurationRange("2024-13-01", "2024-05-01", { locale: "en" })).toBe(
      "Less than a month",
    );
  });

  it("rejects an end date earlier than the start", () => {
    expect(formatDurationRange("2024-06-01", "2024-05-01", { locale: "en" })).toBe(
      "Less than a month",
    );
  });
});
