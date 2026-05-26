"use client";

import React from "react";
import { 
  Trash2, 
  Edit3, 
  Compass, 
  Terminal, 
  Heart, 
  Zap, 
  ListTodo,
  FolderOpen
} from "lucide-react";
import { type Note } from "@/lib/api";

interface NoteCardProps {
  note: Note;
  onEditClick: (note: Note) => void;
  onDeleteClick: (note: Note) => void;
  formatDate: (isoString: string) => string;
}

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  general: <Compass className="h-3 w-3 shrink-0" />,
  work: <Terminal className="h-3 w-3 shrink-0" />,
  personal: <Heart className="h-3 w-3 shrink-0" />,
  ideas: <Zap className="h-3 w-3 shrink-0" />,
  tasks: <ListTodo className="h-3 w-3 shrink-0" />,
};

export const ZEN_COLORS = {
  slate: {
    id: "slate",
    name: "Warm Oat",
    dot: "bg-zinc-450 dark:bg-zinc-550",
    hoverBorder: "hover:border-zinc-400 dark:hover:border-zinc-600",
    glow: "hover:shadow-[0_0_20px_rgba(113,113,122,0.12)]",
    textHover: "group-hover:text-zinc-900 dark:group-hover:text-zinc-50",
    headerHover: "group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/20",
  },
  blue: {
    id: "blue",
    name: "Misty Clay",
    dot: "bg-blue-500 dark:bg-blue-600",
    hoverBorder: "hover:border-blue-500/70 dark:hover:border-blue-600/70",
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.14)]",
    textHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    headerHover: "group-hover:bg-blue-500/5 dark:group-hover:bg-blue-500/10",
  },
  emerald: {
    id: "emerald",
    name: "Earthy Sage",
    dot: "bg-emerald-500 dark:bg-emerald-600",
    hoverBorder: "hover:border-emerald-500/70 dark:hover:border-emerald-600/70",
    glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.14)]",
    textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    headerHover: "group-hover:bg-emerald-500/5 dark:group-hover:bg-emerald-500/10",
  },
  amber: {
    id: "amber",
    name: "Harvest Mustard",
    dot: "bg-amber-500 dark:bg-amber-600",
    hoverBorder: "hover:border-amber-500/70 dark:hover:border-amber-600/70",
    glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.14)]",
    textHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    headerHover: "group-hover:bg-amber-500/5 dark:group-hover:bg-amber-500/10",
  },
  rose: {
    id: "rose",
    name: "Terracotta",
    dot: "bg-rose-500 dark:bg-rose-600",
    hoverBorder: "hover:border-rose-500/70 dark:hover:border-rose-600/70",
    glow: "hover:shadow-[0_0_20px_rgba(244,63,94,0.14)]",
    textHover: "group-hover:text-rose-650 dark:group-hover:text-rose-400",
    headerHover: "group-hover:bg-rose-500/5 dark:group-hover:bg-rose-500/10",
  },
  violet: {
    id: "violet",
    name: "Lavender Mist",
    dot: "bg-violet-500 dark:bg-violet-650",
    hoverBorder: "hover:border-violet-500/70 dark:hover:border-violet-600/70",
    glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.14)]",
    textHover: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    headerHover: "group-hover:bg-violet-500/5 dark:group-hover:bg-violet-500/10",
  },
};

export default function NoteCard({
  note,
  onEditClick,
  onDeleteClick,
  formatDate,
}: NoteCardProps) {
  // Graceful fallback for colors
  const colorKey = (note.color in ZEN_COLORS) ? note.color : "slate";
  const styles = ZEN_COLORS[colorKey];
  const icon = CATEGORY_ICONS[note.category] || <FolderOpen className="h-3 w-3 shrink-0" />;

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl border border-zinc-200/50 dark:border-zinc-850/50 bg-white dark:bg-zinc-950 shadow-3xs ${styles.hoverBorder} ${styles.glow} transition-all duration-300 overflow-hidden`}
    >
      {/* Split Top Shaded Header Partition */}
      <div className={`bg-zinc-50/55 dark:bg-zinc-900/15 border-b border-zinc-150/40 dark:border-zinc-850/45 px-5.5 py-3 flex items-center justify-between select-none ${styles.headerHover} transition-colors duration-300`}>
        <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {icon}
          <span>{note.category}</span>
        </span>
        
        <span className="text-[9px] text-zinc-400 dark:text-zinc-550 font-extrabold tracking-wider uppercase">
          {formatDate(note.updatedAt)}
        </span>
      </div>

      {/* Middle Content Section */}
      <div className="px-5.5 py-5 flex flex-col gap-2.5">
        {/* Title with solid colored indicator bullet dot */}
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${styles.dot} transition-transform group-hover:scale-110 duration-300`}></span>
          <h3 className={`text-sm font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 ${styles.textHover} transition-colors duration-300 line-clamp-1`}>
            {note.title}
          </h3>
        </div>
        
        {/* Content body text */}
        <p className="text-zinc-600 dark:text-zinc-350 text-xs leading-relaxed font-semibold line-clamp-5 whitespace-pre-line">
          {note.content}
        </p>
      </div>

      {/* Floating Action Button Controls Footer */}
      <div className="flex items-center justify-end px-5.5 py-3.5 mt-auto">
        <div className="flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-250">
          <button
            onClick={() => onEditClick(note)}
            aria-label="Edit entry details"
            className="cursor-pointer h-6.5 w-6.5 rounded-lg inline-flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:text-zinc-450 dark:hover:text-zinc-200 hover:shadow-3xs active:scale-90 transition-all"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          
          <button
            onClick={() => onDeleteClick(note)}
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
