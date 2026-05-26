"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useNotesManager, type UseNotesManagerReturn } from "@/hooks/useNotesManager";

export const NotesContext = createContext<UseNotesManagerReturn | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const value = useNotesManager();
  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext() {
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error("useNotesContext must be used within a <NotesProvider>");
  }
  return ctx;
}
