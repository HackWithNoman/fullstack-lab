"use client";

import React from "react";
import { type Note } from "@/types";

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  ring: string;
}

interface ColorThemePickerProps {
  label: string;
  selectedColor: Note["color"];
  onSelectColor: (color: Note["color"]) => void;
  colors: ColorOption[];
}

/**
 * Premium reusable theme selector dot triggers, managing focus highlights and zen outline rings.
 */
export function ColorThemePicker({
  label,
  selectedColor,
  onSelectColor,
  colors,
}: ColorThemePickerProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-[10px] font-bold text-zinc-455 dark:text-zinc-500 uppercase tracking-widest px-0.5">
        {label}
      </span>
      
      <div className="flex items-center gap-2 h-9.5">
        {colors.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => onSelectColor(color.id as Note["color"])}
            aria-label={`Select ${color.name}`}
            style={{ backgroundColor: color.hex }}
            className={`cursor-pointer h-7 w-7 rounded-full transition-all relative shrink-0 border border-black/5 dark:border-white/5 ${
              selectedColor === color.id
                ? `ring-4 ${color.ring} scale-110 shadow-sm`
                : "hover:scale-105 active:scale-95"
            }`}
          >
            {selectedColor === color.id && (
              <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-white shadow-xs"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorThemePicker;
