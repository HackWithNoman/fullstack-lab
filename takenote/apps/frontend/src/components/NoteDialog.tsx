"use client";

import React from "react";
import { X, AlertCircle, Folder, Plus, Edit3 } from "lucide-react";
import { type Note } from "@/lib/api";

export interface NoteFormData {
  title: string;
  content: string;
  category: Note["category"];
  color: Note["color"];
}

interface NoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditMode: boolean;
  formData: NoteFormData;
  onChangeFormData: (data: NoteFormData) => void;
  formErrors: { title?: string; content?: string };
  isSubmitting: boolean;
}

const COLORS = [
  { id: "slate", name: "Warm Oat", hex: "#71717a", ring: "ring-zinc-400 dark:ring-zinc-600" },
  { id: "blue", name: "Misty Clay", hex: "#3b82f6", ring: "ring-blue-400 dark:ring-blue-600" },
  { id: "emerald", name: "Earthy Sage", hex: "#10b981", ring: "ring-emerald-450 dark:ring-emerald-600" },
  { id: "amber", name: "Harvest Mustard", hex: "#f59e0b", ring: "ring-amber-400 dark:ring-amber-600" },
  { id: "rose", name: "Terracotta", hex: "#f43f5e", ring: "ring-rose-450 dark:ring-rose-600" },
  { id: "violet", name: "Lavender Mist", hex: "#8b5cf6", ring: "ring-violet-400 dark:ring-violet-650" },
];

export default function NoteDialog({
  isOpen,
  onClose,
  onSubmit,
  isEditMode,
  formData,
  onChangeFormData,
  formErrors,
  isSubmitting,
}: NoteDialogProps) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background backdrop blur */}
      <div
        className="fixed inset-0 bg-zinc-950/20 dark:bg-zinc-950/40 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Dialog container sheet */}
      <div className="bg-[#fdfdfd] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-scale-in">
        
        {/* Modal Header */}
        <div className="px-5.5 py-4.5 border-b border-zinc-150/50 dark:border-zinc-800/50 flex items-center justify-between">
          <h2 className="text-sm font-extrabold tracking-tight flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
            {isEditMode ? (
              <>
                <span className="p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/20 text-zinc-800 dark:text-zinc-200 rounded-md">
                  <Edit3 className="h-4 w-4" />
                </span>
                <span>Edit Note Entry</span>
              </>
            ) : (
              <>
                <span className="p-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 rounded-md">
                  <Plus className="h-4 w-4" />
                </span>
                <span>Create Note Entry</span>
              </>
            )}
          </h2>
          
          <button
            onClick={onClose}
            className="cursor-pointer text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 rounded-lg p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form Form */}
        <form onSubmit={onSubmit} className="p-5.5 flex flex-col gap-4.5">
          
          {/* Title Field Input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="dialog-title"
              className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest px-0.5"
            >
              Note Title
            </label>
            
            <input
              id="dialog-title"
              type="text"
              placeholder="Give your thought a name..."
              value={formData.title}
              onChange={(e) => onChangeFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                formErrors.title
                  ? "border-red-500/80 focus:ring-red-500/10 focus:border-red-500"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 focus:ring-zinc-900/5 dark:focus:border-zinc-100"
              } bg-[#fcfbf9]/40 dark:bg-zinc-950/20 focus:outline-hidden focus:ring-3 placeholder:text-zinc-400 font-bold transition-all shadow-3xs`}
            />
            
            {formErrors.title && (
              <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5 px-0.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{formErrors.title}</span>
              </p>
            )}
          </div>

          {/* Grid Selection: Space Category & Clay Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
            
            {/* Category Space Dropdown (No Emojis!) */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="dialog-category"
                className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest px-0.5"
              >
                Space Category
              </label>
              
              <div className="relative">
                <select
                  id="dialog-category"
                  value={formData.category}
                  onChange={(e) => onChangeFormData({ ...formData, category: e.target.value as Note["category"] })}
                  className="w-full pl-3.5 pr-8 py-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#fcfbf9]/40 dark:bg-zinc-950/20 focus:outline-hidden focus:border-zinc-900 focus:ring-3 focus:ring-zinc-900/5 dark:focus:border-zinc-100 appearance-none font-bold shadow-3xs"
                >
                  <option value="general">General Space</option>
                  <option value="work">Work & Projects</option>
                  <option value="personal">Personal Life</option>
                  <option value="ideas">Bright Ideas</option>
                  <option value="tasks">Action Tasks</option>
                </select>
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Folder className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Earthy Theme Pickers */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-zinc-455 dark:text-zinc-500 uppercase tracking-widest px-0.5">
                Zen Color Theme
              </span>
              
              <div className="flex items-center gap-2 h-9.5">
                {COLORS.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => onChangeFormData({ ...formData, color: color.id as Note["color"] })}
                    aria-label={`Select ${color.name}`}
                    style={{ backgroundColor: color.hex }}
                    className={`cursor-pointer h-7 w-7 rounded-full transition-all relative shrink-0 border border-black/5 dark:border-white/5 ${
                      formData.color === color.id
                        ? `ring-4 ${color.ring} scale-110 shadow-sm`
                        : "hover:scale-105 active:scale-95"
                    }`}
                  >
                    {formData.color === color.id && (
                      <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-white shadow-xs"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Note Content Textarea */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="dialog-content"
              className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest px-0.5"
            >
              Note Content
            </label>
            
            <textarea
              id="dialog-content"
              placeholder="Reflect on your thoughts, map lists, detail notes..."
              value={formData.content}
              onChange={(e) => onChangeFormData({ ...formData, content: e.target.value })}
              rows={6}
              className={`w-full px-3.5 py-3 text-xs rounded-xl border resize-none ${
                formErrors.content
                  ? "border-red-500/80 focus:ring-red-500/10 focus:border-red-500"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 focus:ring-zinc-900/5 dark:focus:border-zinc-100"
              } bg-[#fcfbf9]/40 dark:bg-zinc-950/20 focus:outline-hidden focus:ring-3 placeholder:text-zinc-400 font-semibold leading-relaxed shadow-3xs`}
            />
            
            {formErrors.content && (
              <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5 px-0.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{formErrors.content}</span>
              </p>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-150/50 dark:border-zinc-800/50 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4.5 py-2.5 rounded-xl text-xs font-bold border border-zinc-250 dark:border-zinc-700 hover:bg-zinc-55 dark:hover:bg-zinc-800/80 text-zinc-655 dark:text-zinc-350 transition-colors shadow-3xs"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer inline-flex items-center justify-center min-w-[100px] px-5 py-2.5 rounded-xl text-xs font-bold bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 disabled:opacity-50 transition-colors shadow-xs"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white dark:border-zinc-950/30 dark:border-t-zinc-950 rounded-full animate-spin"></span>
              ) : (
                "Save Entry"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
