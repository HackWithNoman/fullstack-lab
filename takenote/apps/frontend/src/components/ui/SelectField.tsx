"use client";

import React from "react";
import { Folder } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: SelectOption[];
}

/**
 * Premium reusable selection field with custom styles, borders, and Lucide folder icons.
 */
export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, id, options, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={id}
          className="text-[10px] font-bold text-zinc-455 dark:text-zinc-500 uppercase tracking-widest px-0.5"
        >
          {label}
        </label>
        
        <div className="relative">
          <select
            id={id}
            ref={ref}
            className={`w-full pl-3.5 pr-8 py-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#fcfbf9]/40 dark:bg-zinc-950/20 focus:outline-hidden focus:border-zinc-900 focus:ring-3 focus:ring-zinc-900/5 dark:focus:border-zinc-100 appearance-none font-bold shadow-3xs transition-all ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
            <Folder className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
export default SelectField;
