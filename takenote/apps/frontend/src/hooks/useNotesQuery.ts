import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useNotesStore } from "@/stores/notes-store";
import { CATEGORIES } from "@/constants";

export function useNotesQuery() {
  const searchQuery = useNotesStore((s) => s.searchQuery);
  const selectedCategory = useNotesStore((s) => s.selectedCategory);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: api.fetchNotes,
  });

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentCategoryLabel =
    CATEGORIES.find((cat) => cat.id === selectedCategory)?.label || "Notes";

  return {
    notes,
    filteredNotes,
    loading: isLoading,
    currentCategoryLabel,
  };
}
