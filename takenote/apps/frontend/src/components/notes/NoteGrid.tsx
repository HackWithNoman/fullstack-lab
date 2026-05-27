"use client";

import React from "react";
import { Sparkles, Plus } from "lucide-react";
import { useNotesContext } from "@/contexts/notes-context";
import NoteCard from "./NoteCard";

export default function NoteGrid() {
  const {
    filteredNotes,
    loading,
    searchQuery,
    selectedCategory,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenCreate,
    handleResetFilters,
  } = useNotesContext();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-full h-48 rounded-2xl border border-zinc-200/50 dark:border-zinc-805/50 bg-white dark:bg-zinc-950 flex flex-col justify-between animate-pulse shadow-3xs relative overflow-hidden"
          >
            <div className="bg-zinc-50/50 dark:bg-zinc-900/15 border-b border-zinc-150/40 dark:border-zinc-850/40 px-5.5 py-2.5 flex items-center select-none">
              <div className="h-4.5 w-16 bg-zinc-100 dark:bg-zinc-850 rounded-md"></div>
            </div>

            <div className="px-5.5 py-4 flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-100 dark:bg-zinc-855 shrink-0"></div>
                <div className="h-4.5 w-2/3 bg-zinc-100 dark:bg-zinc-850 rounded-md"></div>
              </div>
              <div className="space-y-1.5 mt-1.5 flex-1">
                <div className="h-3.5 w-full bg-zinc-100 dark:bg-zinc-850 rounded-md"></div>
                <div className="h-3.5 w-5/6 bg-zinc-100 dark:bg-zinc-850 rounded-md"></div>
              </div>
            </div>

            <div className="flex items-center justify-between px-5.5 py-3 mt-auto border-t border-zinc-150/40 dark:border-zinc-850/45">
              <div className="h-3 w-16 bg-zinc-100 dark:bg-zinc-850 rounded-md"></div>
              <div className="h-6.5 w-14 bg-zinc-100 dark:bg-zinc-850 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-855/50 rounded-2xl max-w-xl mx-auto shadow-2xs">
        <div className="h-11 w-11 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-center mb-4 text-zinc-400">
          <Sparkles className="h-5 w-5 text-amber-500/70 animate-pulse" />
        </div>

        <h3 className="text-base font-extrabold tracking-tight mb-1.5 text-zinc-800 dark:text-zinc-100">
          Your Digital Garden is Empty
        </h3>

        <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-xs mb-6 font-semibold leading-relaxed">
          {searchQuery || selectedCategory !== "all"
            ? "No notes found matching your search. Try resetting filters to view all entries."
            : "Clear your mind, capture your thoughts, and watch your thoughts grow."}
        </p>

        {searchQuery || selectedCategory !== "all" ? (
          <button
            onClick={handleResetFilters}
            className="cursor-pointer text-xs font-bold px-4 py-2 border border-zinc-250 dark:border-zinc-700 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 rounded-xl transition-all shadow-3xs"
          >
            Reset All Filters
          </button>
        ) : (
          <button
            onClick={handleOpenCreate}
            className="cursor-pointer inline-flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 hover:scale-[1.02] transition-all shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Create First Entry</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredNotes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
