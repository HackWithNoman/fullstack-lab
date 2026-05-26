import { localStorageNotesService } from "@/lib/services";
import type { Note, NoteFormData } from "@/types";

export const api = {
  fetchNotes: (): Promise<Note[]> => localStorageNotesService.fetchNotes(),
  createNote: (data: NoteFormData): Promise<Note> =>
    localStorageNotesService.createNote(data),
  updateNote: (id: string, data: NoteFormData): Promise<Note> =>
    localStorageNotesService.updateNote(id, data),
  deleteNote: (id: string): Promise<void> =>
    localStorageNotesService.deleteNote(id),
};
