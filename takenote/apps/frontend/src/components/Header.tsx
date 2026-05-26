"use client";

import React, { useRef } from "react";
import { Search, Plus, X, Command } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateClick: () => void;
  selectedCategoryLabel: string;
}

export default function Header({
  searchQuery,
  onSearchChange,
  onCreateClick,
  selectedCategoryLabel,
}: HeaderProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input helper
  const handleShortcutClick = () => {
    searchInputRef.current?.focus();
  };

  return (
    <header className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 md:py-2">
      
      {/* Dynamic Title / Breadcrumb Display */}
      <div>
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-zinc-800 dark:text-zinc-50 flex items-center gap-2">
          {selectedCategoryLabel}
        </h2>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold mt-0.5">
          {searchQuery ? `Filtering workspace for "${searchQuery}"` : "Manage and capture your entries"}
        </p>
      </div>

      {/* Action Controls Section */}
      <div className="flex items-center w-full sm:w-auto gap-3">
        
        {/* Modern Bento Search Input */}
        <div className="relative flex-1 sm:w-64 md:w-80 group">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-amber-500 dark:group-focus-within:text-amber-400 transition-colors">
            <Search className="h-4 w-4" />
          </span>
          
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search within this space..."
            className="w-full pl-9.5 pr-14 py-2.5 text-xs rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-[#fcfbf9] dark:bg-zinc-900/30 text-zinc-800 dark:text-zinc-150 focus:outline-hidden focus:ring-3 focus:ring-amber-500/10 focus:border-amber-500/80 dark:focus:border-amber-500/50 transition-all placeholder:text-zinc-400 font-semibold shadow-2xs"
          />

          {/* Quick Clear or Shortcut Helper */}
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center gap-1.5">
            {searchQuery ? (
              <button
                onClick={() => onSearchChange("")}
                className="cursor-pointer text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 rounded-md p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Clear Search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={handleShortcutClick}
                className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-bold text-zinc-450 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200/50 dark:border-zinc-700/50 select-none hover:bg-zinc-150"
              >
                <Command className="h-2.5 w-2.5" />
                <span>K</span>
              </button>
            )}
          </div>
        </div>

        {/* Primary Accent Action Button */}
        <button
          onClick={onCreateClick}
          className="group cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 shadow-sm hover:scale-[1.02] active:scale-[0.98] active:translate-y-px transition-all shrink-0 border border-transparent dark:hover:bg-zinc-200 hover:bg-zinc-800"
        >
          <Plus className="h-3.5 w-3.5 group-hover:rotate-90 transition-transform duration-300" />
          <span>New Note</span>
        </button>

      </div>
    </header>
  );
}
