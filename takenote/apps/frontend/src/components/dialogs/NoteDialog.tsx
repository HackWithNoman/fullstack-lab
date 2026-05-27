"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus, Edit3 } from "lucide-react";
import { noteFormSchema, type NoteFormSchemaType } from "@/schemas/note.schema";
import { useNotesContext } from "@/contexts/notes-context";
import FormField from "../ui/FormField";
import SelectField from "../ui/SelectField";
import ColorThemePicker from "../ui/ColorThemePicker";

const COLORS = [
  {
    id: "slate",
    name: "Warm Oat",
    hex: "#71717a",
    ring: "ring-zinc-400 dark:ring-zinc-600",
  },
  {
    id: "blue",
    name: "Misty Clay",
    hex: "#3b82f6",
    ring: "ring-blue-400 dark:ring-blue-600",
  },
  {
    id: "emerald",
    name: "Earthy Sage",
    hex: "#10b981",
    ring: "ring-emerald-450 dark:ring-emerald-600",
  },
  {
    id: "amber",
    name: "Harvest Mustard",
    hex: "#f59e0b",
    ring: "ring-amber-400 dark:ring-amber-600",
  },
  {
    id: "rose",
    name: "Terracotta",
    hex: "#f43f5e",
    ring: "ring-rose-455 dark:ring-rose-600",
  },
  {
    id: "violet",
    name: "Lavender Mist",
    hex: "#8b5cf6",
    ring: "ring-violet-400 dark:ring-violet-650",
  },
];

const CATEGORY_OPTIONS = [
  { value: "general", label: "General" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "ideas", label: "Ideas" },
  { value: "tasks", label: "Tasks" },
];

const EMPTY_DEFAULTS = {
  title: "",
  content: "",
  category: "general" as const,
  color: "slate" as const,
};

export default function NoteDialog() {
  const {
    isDialogModelOpen: isOpen,
    closeDialog: onClose,
    onSubmit,
    isEditMode,
    formDefaultValues: defaultValues,
  } = useNotesContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<NoteFormSchemaType>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ ...EMPTY_DEFAULTS, ...defaultValues });
    }
  }, [isOpen, defaultValues, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-zinc-950/20 dark:bg-zinc-950/40 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      ></div>

      <div className="bg-[#fdfdfd] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-scale-in">
        <div className="px-5.5 py-4.5 border-b border-zinc-150/50 dark:border-zinc-800/50 flex items-center justify-between">
          <h2 className="text-sm font-extrabold tracking-tight flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
            {isEditMode ? (
              <>
                <span className="p-1 bg-zinc-105 dark:bg-zinc-800 border border-zinc-200/20 text-zinc-800 dark:text-zinc-200 rounded-md">
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
            type="button"
            onClick={onClose}
            className="cursor-pointer text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 rounded-lg p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5.5 flex flex-col gap-4.5"
        >
          <FormField
            label="Note Title"
            id="dialog-title"
            placeholder="Give your thought a name..."
            error={errors.title?.message}
            {...register("title")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
            <SelectField
              label="Category"
              id="dialog-category"
              options={CATEGORY_OPTIONS}
              {...register("category")}
            />

            <Controller
              control={control}
              name="color"
              render={({ field }) => (
                <ColorThemePicker
                  label="Zen Color Theme"
                  selectedColor={field.value}
                  onSelectColor={(color) => field.onChange(color)}
                  colors={COLORS}
                />
              )}
            />
          </div>

          <FormField
            label="Note Content"
            id="dialog-content"
            placeholder="Reflect on your thoughts, map lists, detail notes..."
            error={errors.content?.message}
            textarea
            rows={6}
            {...register("content")}
          />

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
              className="cursor-pointer inline-flex items-center justify-center min-w-25 px-5 py-2.5 rounded-xl text-xs font-bold bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 disabled:opacity-50 transition-colors shadow-xs"
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
