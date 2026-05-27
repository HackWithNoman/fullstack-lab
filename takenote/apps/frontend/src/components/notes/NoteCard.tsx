"use client";

import React from "react";
import { Trash2, Edit3, FolderOpen } from "lucide-react";
import { type Note } from "@/types";
import { ZEN_COLORS, CATEGORY_ICON_MAP } from "@/constants";
import { formatDate } from "@/utils/date";
import { useNotesContext } from "@/contexts/notes-context";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const { handleOpenEdit, handleOpenDelete, handleOpenView } =
    useNotesContext();
  const colorKey = note.color in ZEN_COLORS ? note.color : "slate";
  const styles = ZEN_COLORS[colorKey];
  const Icon =
    CATEGORY_ICON_MAP[note.category as keyof typeof CATEGORY_ICON_MAP] ||
    FolderOpen;

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl border border-zinc-200/50 dark:border-zinc-850/50 bg-white dark:bg-zinc-950 shadow-3xs ${styles.hoverBorder} ${styles.glow} transition-all duration-300 overflow-hidden w-full h-full`}
    >
      <div
        className={`bg-zinc-50/55 dark:bg-zinc-900/15 border-b border-zinc-150/40 dark:border-zinc-850/45 px-5.5 py-2.5 flex items-center select-none ${styles.headerHover} transition-colors duration-300`}
      >
        <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          <Icon className="h-3 w-3 shrink-0" />
          <span>{note.category}</span>
        </span>
      </div>

      <div
        onClick={() => handleOpenView(note)}
        className="px-5.5 py-4 flex flex-col gap-2 cursor-pointer select-none flex-1"
      >
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full shrink-0 ${styles.dot} transition-transform group-hover:scale-110 duration-300`}
          ></span>
          <h3
            className={`text-sm font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 ${styles.textHover} transition-colors duration-300 line-clamp-1`}
          >
            {note.title}
          </h3>
        </div>

        <p className="text-zinc-650 dark:text-zinc-350 text-xs leading-relaxed font-semibold line-clamp-3 whitespace-pre-line flex-1">
          {note.content}
        </p>

        {note.content.length > 80 || note.content.split("\n").length > 2 ? (
          <span
            className={`text-[10px] font-bold ${styles.textHover} mt-1 inline-block opacity-65 group-hover:opacity-100 transition-all duration-300`}
          >
            Show more
          </span>
        ) : null}
      </div>

      <div className="flex items-center justify-between px-5.5 py-3 mt-auto border-t border-zinc-150/40 dark:border-zinc-850/45">
        <span className="text-[9px] text-zinc-400 dark:text-zinc-550 font-extrabold tracking-wider uppercase select-none">
          {formatDate(note.updatedAt)}
        </span>

        <div className="flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-250">
          <button
            onClick={() => handleOpenEdit(note)}
            aria-label="Edit entry details"
            className="cursor-pointer h-6.5 w-6.5 rounded-lg inline-flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:text-zinc-450 dark:hover:text-zinc-200 hover:shadow-3xs active:scale-90 transition-all"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => handleOpenDelete(note)}
            aria-label="Delete note entry"
            className="cursor-pointer h-6.5 w-6.5 rounded-lg inline-flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-zinc-500 hover:text-red-500 dark:text-zinc-450 dark:hover:text-red-400 hover:shadow-3xs active:scale-90 transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
