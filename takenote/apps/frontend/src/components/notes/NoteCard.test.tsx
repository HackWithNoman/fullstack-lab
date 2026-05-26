import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithNotesContext } from "@/lib/test-utils";
import NoteCard from "./NoteCard";
import type { Note } from "@/types";

const mockNote: Note = {
  id: "1",
  title: "Test Note",
  content: "This is a test note",
  category: "work",
  color: "blue",
  createdAt: new Date().toISOString(),
  updatedAt: "2026-05-26T10:25:00.000Z",
};

describe("NoteCard", () => {
  it("renders note title and content", () => {
    renderWithNotesContext(<NoteCard note={mockNote} />);
    expect(screen.getByText("Test Note")).toBeInTheDocument();
    expect(screen.getByText("This is a test note")).toBeInTheDocument();
  });

  it("displays note category", () => {
    renderWithNotesContext(<NoteCard note={mockNote} />);
    expect(screen.getByText("work")).toBeInTheDocument();
  });

  it("calls handleOpenEdit when edit button is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderWithNotesContext(<NoteCard note={mockNote} />, {
      contextValue: { handleOpenEdit: onEdit },
    });
    const editBtn = screen.getByLabelText("Edit entry details");
    await user.click(editBtn);
    expect(onEdit).toHaveBeenCalledWith(mockNote);
  });

  it("calls handleOpenDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderWithNotesContext(<NoteCard note={mockNote} />, {
      contextValue: { handleOpenDelete: onDelete },
    });
    const deleteBtn = screen.getByLabelText("Delete note entry");
    await user.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledWith(mockNote);
  });
});
