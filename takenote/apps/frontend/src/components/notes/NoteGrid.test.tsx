import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithNotesContext } from "@/lib/test-utils";
import NoteGrid from "./NoteGrid";
import type { Note } from "@/types";

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Note One",
    content: "Content one",
    category: "work",
    color: "blue",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Note Two",
    content: "Content two",
    category: "personal",
    color: "rose",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe("NoteGrid", () => {
  it("renders loading state", () => {
    renderWithNotesContext(<NoteGrid />, {
      contextValue: { filteredNotes: [], loading: true, searchQuery: "", selectedCategory: "all" },
    });
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders empty state when no notes", () => {
    renderWithNotesContext(<NoteGrid />, {
      contextValue: { filteredNotes: [], loading: false, searchQuery: "", selectedCategory: "all" },
    });
    expect(screen.getByText(/Your Digital Garden is Empty/)).toBeInTheDocument();
  });

  it("renders notes when provided", () => {
    renderWithNotesContext(<NoteGrid />, {
      contextValue: { filteredNotes: mockNotes, loading: false, searchQuery: "", selectedCategory: "all" },
    });
    expect(screen.getByText("Note One")).toBeInTheDocument();
    expect(screen.getByText("Note Two")).toBeInTheDocument();
  });

  it("shows reset filters button when search is active with no results", () => {
    renderWithNotesContext(<NoteGrid />, {
      contextValue: { filteredNotes: [], loading: false, searchQuery: "nonexistent", selectedCategory: "all" },
    });
    expect(screen.getByText("Reset All Filters")).toBeInTheDocument();
  });
});
