import { describe, it, expect } from "vitest";
import { formatDate } from "./date";

describe("formatDate", () => {
  it("formats a valid ISO string", () => {
    const result = formatDate("2026-05-26T10:25:00.000Z");
    expect(result).toMatch(/May 26, 2026/);
  });

  it("returns empty string for empty input", () => {
    expect(formatDate("")).toBe("");
  });

  it("returns empty string for invalid date", () => {
    expect(formatDate("not-a-date")).toBe("");
  });
});
