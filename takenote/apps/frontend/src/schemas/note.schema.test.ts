import { describe, it, expect } from "vitest";
import { noteFormSchema } from "./note.schema";

describe("noteFormSchema", () => {
  it("validates a correct note form", () => {
    const result = noteFormSchema.safeParse({
      title: "My Note",
      content: "Some content",
      category: "work",
      color: "blue",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const result = noteFormSchema.safeParse({
      title: "",
      content: "Some content",
      category: "general",
      color: "slate",
    });
    expect(result.success).toBe(false);
  });

  it("rejects title over 50 characters", () => {
    const result = noteFormSchema.safeParse({
      title: "a".repeat(51),
      content: "Some content",
      category: "general",
      color: "slate",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty content", () => {
    const result = noteFormSchema.safeParse({
      title: "My Note",
      content: "",
      category: "general",
      color: "slate",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid category", () => {
    const result = noteFormSchema.safeParse({
      title: "My Note",
      content: "Some content",
      category: "invalid",
      color: "slate",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid color", () => {
    const result = noteFormSchema.safeParse({
      title: "My Note",
      content: "Some content",
      category: "general",
      color: "crimson",
    });
    expect(result.success).toBe(false);
  });
});
