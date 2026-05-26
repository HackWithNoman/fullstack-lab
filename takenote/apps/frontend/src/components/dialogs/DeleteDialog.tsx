"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { useNotesContext } from "@/contexts/notes-context";

export default function DeleteDialog() {
  const {
    isDeleteDialogOpen: isOpen,
    closeDeleteDialog: onClose,
    handleDeleteConfirm: onConfirm,
    activeNote,
    isDeleting: isSubmitting,
  } = useNotesContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-zinc-950/20 dark:bg-zinc-950/40 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      ></div>

      <div className="bg-[#fdfdfd] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 w-full max-w-sm rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-scale-in">
        <div className="p-6 flex flex-col gap-4 text-center items-center">

          <div className="h-11 w-11 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 flex items-center justify-center border border-red-100 dark:border-red-900/30">
            <Trash2 className="h-4.5 w-4.5" />
          </div>

          <div>
            <h2 className="text-sm font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100">
              Discard Note Entry?
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 max-w-[260px] leading-relaxed font-semibold">
              Are you sure you want to permanently delete <strong className="text-zinc-650 dark:text-zinc-300">"{activeNote?.title || ""}"</strong>? This action cannot be reversed.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full pt-2">
            <button
              onClick={onClose}
              className="cursor-pointer flex-1 px-4 py-2.5 rounded-xl text-xs font-bold border border-zinc-250 dark:border-zinc-700 hover:bg-zinc-55 dark:hover:bg-zinc-800 text-zinc-655 dark:text-zinc-350 transition-colors shadow-3xs"
            >
              Keep Entry
            </button>

            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className="cursor-pointer flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white transition-colors shadow-xs shadow-red-500/10"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Yes, Discard"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
