import { describe, it, expect, beforeEach } from "vitest";
import { useNotesStore } from "./notes-store";
import type { Note } from "@/types";

const mockNote: Note = {
  id: "1",
  title: "Test",
  content: "Test content",
  category: "general",
  color: "slate",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

beforeEach(() => {
  useNotesStore.setState({
    isDialogOpen: false,
    isEditMode: false,
    isDeleteDialogOpen: false,
    activeNote: null,
    searchQuery: "",
    selectedCategory: "all",
  });
});

describe("notes-store", () => {
  it("opens create dialog", () => {
    useNotesStore.getState().openCreateDialog();
    const state = useNotesStore.getState();
    expect(state.isDialogOpen).toBe(true);
    expect(state.isEditMode).toBe(false);
  });

  it("opens edit dialog with note", () => {
    useNotesStore.getState().openEditDialog(mockNote);
    const state = useNotesStore.getState();
    expect(state.isDialogOpen).toBe(true);
    expect(state.isEditMode).toBe(true);
    expect(state.activeNote).toEqual(mockNote);
  });

  it("closes dialog and clears active note", () => {
    useNotesStore.setState({ isDialogOpen: true, activeNote: mockNote });
    useNotesStore.getState().closeDialog();
    const state = useNotesStore.getState();
    expect(state.isDialogOpen).toBe(false);
    expect(state.activeNote).toBeNull();
  });

  it("opens delete dialog with note", () => {
    useNotesStore.getState().openDeleteDialog(mockNote);
    const state = useNotesStore.getState();
    expect(state.isDeleteDialogOpen).toBe(true);
    expect(state.activeNote).toEqual(mockNote);
  });

  it("closes delete dialog", () => {
    useNotesStore.setState({ isDeleteDialogOpen: true, activeNote: mockNote });
    useNotesStore.getState().closeDeleteDialog();
    const state = useNotesStore.getState();
    expect(state.isDeleteDialogOpen).toBe(false);
    expect(state.activeNote).toBeNull();
  });

  it("sets search query", () => {
    useNotesStore.getState().setSearchQuery("hello");
    expect(useNotesStore.getState().searchQuery).toBe("hello");
  });

  it("sets selected category", () => {
    useNotesStore.getState().setSelectedCategory("work");
    expect(useNotesStore.getState().selectedCategory).toBe("work");
  });

  it("resets filters", () => {
    useNotesStore.setState({ searchQuery: "test", selectedCategory: "work" });
    useNotesStore.getState().resetFilters();
    expect(useNotesStore.getState().searchQuery).toBe("");
    expect(useNotesStore.getState().selectedCategory).toBe("all");
  });
});
