"use client";

import React from "react";
import { NotebookPen, Sparkles } from "lucide-react";
import { CATEGORIES, CATEGORY_ICON_MAP } from "@/constants";
import { useNotesContext } from "@/contexts/notes-context";

export default function Sidebar() {
  const { selectedCategory, setSelectedCategory, notes } = useNotesContext();

  const getCount = (catId: string) => {
    if (catId === "all") return notes.length;
    return notes.filter((n) => n.category === catId).length;
  };

  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-2xl p-5 shadow-2xs flex items-center gap-3.5 transition-all">
        <div className="h-9 w-9 rounded-xl bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center shadow-xs text-white dark:text-zinc-950 shrink-0">
          <NotebookPen className="h-4.5 w-4.5" />
        </div>
        <div>
          <h1 className="text-sm font-extrabold tracking-tight flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100">
            TakeNote <span className="text-[8px] uppercase font-black px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-855 border border-zinc-200/40 dark:border-zinc-700/40 text-zinc-600 dark:text-zinc-450 tracking-wider">Zen</span>
          </h1>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">Mindful digital garden</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-2xl p-5 shadow-2xs flex flex-col gap-1.5">
        <h2 className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-1 mb-2.5">Workspace</h2>

        <nav className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = getCount(cat.id);
            const Icon = CATEGORY_ICON_MAP[cat.iconKey] || CATEGORY_ICON_MAP.all;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all group ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center justify-center h-6 w-6 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800"
                      : "bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800"
                  }`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{cat.label}</span>
                </div>

                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md transition-all ${
                  isActive
                    ? "bg-zinc-800 dark:bg-zinc-200 text-zinc-355 dark:text-zinc-700"
                    : "bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-450 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="hidden md:flex bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-2xl p-5 shadow-2xs flex-col gap-2 relative overflow-hidden group">
        <div className="absolute top-0 right-0 h-16 w-16 bg-zinc-500/5 rounded-full blur-xl group-hover:bg-zinc-500/10 transition-colors"></div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-500/60" />
          Mindfulness
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-450 italic leading-relaxed font-semibold">
          "Simplicity is the ultimate sophistication. Clear your mind, structure your thoughts, grow your garden."
        </p>
      </div>

    </aside>
  );
}
