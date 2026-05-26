import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { NoteFormData } from "@/types";
import { useNotesStore } from "@/stores/notes-store";

export function useNotesMutations() {
  const queryClient = useQueryClient();
  const closeDialog = useNotesStore((s) => s.closeDialog);
  const closeDeleteDialog = useNotesStore((s) => s.closeDeleteDialog);

  const invalidateNotes = () =>
    queryClient.invalidateQueries({ queryKey: ["notes"] });

  const createNote = useMutation({
    mutationFn: (data: NoteFormData) => api.createNote(data),
    onSuccess: () => {
      invalidateNotes();
      closeDialog();
    },
  });

  const updateNote = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: NoteFormData;
    }) => api.updateNote(id, data),
    onSuccess: () => {
      invalidateNotes();
      closeDialog();
    },
  });

  const deleteNote = useMutation({
    mutationFn: (id: string) => api.deleteNote(id),
    onSuccess: () => {
      invalidateNotes();
      closeDeleteDialog();
    },
  });

  return { createNote, updateNote, deleteNote };
}
