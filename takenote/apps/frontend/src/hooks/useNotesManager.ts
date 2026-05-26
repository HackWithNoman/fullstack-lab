"use client";

import { type Note } from "@/types";
import type { NoteFormSchemaType } from "@/schemas/note.schema";
import { useNotesStore } from "@/stores/notes-store";
import { useNotesQuery } from "./useNotesQuery";
import { useNotesMutations } from "./useNotesMutations";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

export function useNotesManager() {
  const store = useNotesStore();
  const query = useNotesQuery();
  const mutations = useNotesMutations();

  useKeyboardShortcuts(() => {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    input?.focus();
  });

  const handleOpenCreate = () => {
    store.openCreateDialog();
  };

  const handleOpenEdit = (note: Note) => {
    store.openEditDialog(note);
  };

  const handleSubmit = async (data: NoteFormSchemaType) => {
    if (store.isEditMode && store.activeNote) {
      await mutations.updateNote.mutateAsync({
        id: store.activeNote.id,
        data,
      });
    } else {
      await mutations.createNote.mutateAsync(data);
    }
  };

  const handleOpenDelete = (note: Note) => {
    store.openDeleteDialog(note);
  };

  const handleDeleteConfirm = async () => {
    if (!store.activeNote) return;
    await mutations.deleteNote.mutateAsync(store.activeNote.id);
  };

  return {
    notes: query.notes,
    loading: query.loading,
    filteredNotes: query.filteredNotes,
    currentCategoryLabel: query.currentCategoryLabel,
    searchQuery: store.searchQuery,
    setSearchQuery: store.setSearchQuery,
    selectedCategory: store.selectedCategory,
    setSelectedCategory: store.setSelectedCategory,
    handleResetFilters: store.resetFilters,
    isDialogModelOpen: store.isDialogOpen,
    closeDialog: store.closeDialog,
    isEditMode: store.isEditMode,
    isDeleteDialogOpen: store.isDeleteDialogOpen,
    closeDeleteDialog: store.closeDeleteDialog,
    activeNote: store.activeNote,
    formDefaultValues: store.formDefaultValues,
    handleOpenCreate,
    handleOpenEdit,
    onSubmit: handleSubmit,
    handleOpenDelete,
    handleDeleteConfirm,
    isDeleting: mutations.deleteNote.isPending,
  };
}

export type UseNotesManagerReturn = ReturnType<typeof useNotesManager>;
