/**
 * Format ISO Date strings into zen-minimalist typography layout
 * Example: "Oct 26, 2026, 10:25 PM"
 */
export function formatDate(isoString: string): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
