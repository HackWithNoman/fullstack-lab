import { create } from "zustand";
import type { Note } from "@/types";
import type { NoteFormSchemaType } from "@/schemas/note.schema";

type FormDefaultValues = Partial<NoteFormSchemaType>;

interface NotesStore {
  isDialogOpen: boolean;
  isEditMode: boolean;
  isDeleteDialogOpen: boolean;
  activeNote: Note | null;
  searchQuery: string;
  selectedCategory: string;
  formDefaultValues: FormDefaultValues;

  openCreateDialog: () => void;
  openEditDialog: (note: Note) => void;
  closeDialog: () => void;
  openDeleteDialog: (note: Note) => void;
  closeDeleteDialog: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  resetFilters: () => void;
}

export const useNotesStore = create<NotesStore>((set) => ({
  isDialogOpen: false,
  isEditMode: false,
  isDeleteDialogOpen: false,
  activeNote: null,
  searchQuery: "",
  selectedCategory: "all",
  formDefaultValues: {},

  openCreateDialog: () =>
    set({
      isDialogOpen: true,
      isEditMode: false,
      activeNote: null,
      formDefaultValues: {},
    }),
  openEditDialog: (note) =>
    set({
      isDialogOpen: true,
      isEditMode: true,
      activeNote: note,
      formDefaultValues: {
        title: note.title,
        content: note.content,
        category: note.category,
        color: note.color,
      },
    }),
  closeDialog: () =>
    set({ isDialogOpen: false, activeNote: null }),
  openDeleteDialog: (note) =>
    set({ isDeleteDialogOpen: true, activeNote: note }),
  closeDeleteDialog: () =>
    set({ isDeleteDialogOpen: false, activeNote: null }),
  setSearchQuery: (searchQuery) =>
    set({ searchQuery }),
  setSelectedCategory: (selectedCategory) =>
    set({ selectedCategory }),
  resetFilters: () =>
    set({ searchQuery: "", selectedCategory: "all" }),
}));
