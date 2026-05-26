"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
}

/**
 * Premium, reusable form field component supporting input elements and textareas
 * complete with inline error validations, labels, and Tailwind transitions.
 */
export const FormField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, id, error, textarea = false, rows = 4, className = "", ...props }, ref) => {
    const inputStyle = `w-full px-3.5 py-2.5 text-xs rounded-xl border ${
      error
        ? "border-red-500/80 focus:ring-red-500/10 focus:border-red-500"
        : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 focus:ring-zinc-900/5 dark:focus:border-zinc-100"
    } bg-[#fcfbf9]/40 dark:bg-zinc-950/20 focus:outline-hidden focus:ring-3 placeholder:text-zinc-400 font-semibold transition-all shadow-3xs ${className}`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={id}
          className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest px-0.5"
        >
          {label}
        </label>

        {textarea ? (
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            className={`resize-none leading-relaxed ${inputStyle}`}
            {...props}
          />
        ) : (
          <input
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            className={`font-bold ${inputStyle}`}
            {...props}
          />
        )}

        {error && (
          <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-0.5 px-0.5">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;
