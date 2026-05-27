"use client";

import React from "react";
import { X, Edit3, Trash2, FolderOpen } from "lucide-react";
import { useNotesContext } from "@/contexts/notes-context";
import { ZEN_COLORS, CATEGORY_ICON_MAP } from "@/constants";
import { formatDate } from "@/utils/date";

export default function ViewNoteDialog() {
  const {
    isViewDialogOpen: isOpen,
    closeViewDialog: onClose,
    activeNote: note,
    handleOpenEdit,
    handleOpenDelete,
  } = useNotesContext();

  if (!isOpen || !note) return null;

  const colorKey = note.color in ZEN_COLORS ? note.color : "slate";
  const styles = ZEN_COLORS[colorKey];
  const Icon =
    CATEGORY_ICON_MAP[note.category as keyof typeof CATEGORY_ICON_MAP] ||
    FolderOpen;

  const onEditClick = () => {
    onClose();
    handleOpenEdit(note);
  };

  const onDeleteClick = () => {
    onClose();
    handleOpenDelete(note);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-zinc-950/20 dark:bg-zinc-950/40 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      ></div>

      <div className="bg-[#fdfdfd] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-scale-in flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5.5 py-4 border-b border-zinc-150/50 dark:border-zinc-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2 select-none">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest ${styles.badge}`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{note.category}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onEditClick}
              aria-label="Edit note details"
              className="cursor-pointer h-7 w-7 rounded-lg inline-flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:shadow-3xs active:scale-90 transition-all"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onDeleteClick}
              aria-label="Delete note"
              className="cursor-pointer h-7 w-7 rounded-lg inline-flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700 text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 hover:shadow-3xs active:scale-90 transition-all"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-zinc-400 hover:text-zinc-655 dark:hover:text-zinc-250 rounded-lg p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
          <div className="flex items-start gap-2.5">
            <span
              className={`h-3 w-3 rounded-full shrink-0 ${styles.dot} mt-1.5`}
            ></span>
            <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">
              {note.title}
            </h2>
          </div>

          <div className="text-zinc-450 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider pl-5.5 select-none border-l border-zinc-150 dark:border-zinc-800/60 ml-1.5 py-0.5">
            Last updated: {formatDate(note.updatedAt)}
          </div>

          <div className="pl-5.5 ml-1.5 border-l border-zinc-150 dark:border-zinc-800/60 flex-1 py-1">
            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-semibold whitespace-pre-line break-words">
              {note.content}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5.5 py-3.5 border-t border-zinc-150/50 dark:border-zinc-800/50 flex items-center justify-end bg-zinc-50/50 dark:bg-zinc-900/10">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-5 py-2.5 rounded-xl text-xs font-bold bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
}
