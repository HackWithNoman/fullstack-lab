import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormField from "./FormField";

describe("FormField", () => {
  it("renders label and input", () => {
    render(
      <FormField
        label="Note Title"
        id="test-title"
        placeholder="Enter title"
      />
    );
    expect(screen.getByLabelText("Note Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();
  });

  it("renders textarea when textarea prop is true", () => {
    render(
      <FormField
        label="Content"
        id="test-content"
        placeholder="Enter content"
        textarea
      />
    );
    const textarea = screen.getByPlaceholderText("Enter content");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("displays error message", () => {
    render(
      <FormField
        label="Title"
        id="test-title"
        error="Title is required"
      />
    );
    expect(screen.getByText("Title is required")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FormField
        label="Title"
        id="test-title"
        onChange={onChange}
      />
    );
    await user.type(screen.getByLabelText("Title"), "a");
    expect(onChange).toHaveBeenCalled();
  });
});
