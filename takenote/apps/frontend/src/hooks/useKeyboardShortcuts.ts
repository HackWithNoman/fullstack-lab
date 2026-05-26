import { useEffect } from "react";

/**
 * Custom React hook to bind Cmd+K / Ctrl+K keyboard shortcut to focus the query search field.
 */
export function useKeyboardShortcuts(onTrigger: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onTrigger();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onTrigger]);
}
