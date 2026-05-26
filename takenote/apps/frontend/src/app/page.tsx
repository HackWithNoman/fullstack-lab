"use client";

import React, { useState, useEffect } from "react";
import { api, type Note } from "@/lib/api";
import Sidebar, { CATEGORIES } from "@/components/Sidebar";
import Header from "@/components/Header";
import NoteGrid from "@/components/NoteGrid";
import NoteDialog from "@/components/NoteDialog";
import DeleteDialog from "@/components/DeleteDialog";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Dialog Overlays states
  const [isDialogModelOpen, setIsDialogModelOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Focus target note for editing/deleting
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general" as Note["category"],
    color: "slate" as Note["color"],
  });
  const [formErrors, setFormErrors] = useState<{ title?: string; content?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load all notes on mount
  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await api.fetchNotes();
      setNotes(data);
    } catch (err) {
      console.error("Failed to load notes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
        inputElement?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Format date helper
  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Form Validation
  const validateForm = () => {
    const errors: { title?: string; content?: string } = {};
    if (!formData.title.trim()) {
      errors.title = "Note title is required";
    } else if (formData.title.length > 50) {
      errors.title = "Title must be 50 characters or less";
    }
    if (!formData.content.trim()) {
      errors.content = "Note content cannot be empty";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Trigger Open Create Dialog Form
  const handleOpenCreate = () => {
    setFormData({
      title: "",
      content: "",
      category: "general",
      color: "slate",
    });
    setFormErrors({});
    setIsEditMode(false);
    setIsDialogModelOpen(true);
  };

  // Trigger Open Edit Dialog Form
  const handleOpenEdit = (note: Note) => {
    setActiveNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category,
      color: note.color,
    });
    setFormErrors({});
    setIsEditMode(true);
    setIsDialogModelOpen(true);
  };

  // Handle Dialog Form Submit
  const handleDialogFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (isEditMode && activeNote) {
        // Edit update operation
        const updated = await api.updateNote(activeNote.id, formData);
        setNotes(notes.map((n) => (n.id === activeNote.id ? updated : n)));
      } else {
        // Create note operation
        const newNote = await api.createNote(formData);
        setNotes([newNote, ...notes]);
      }
      setIsDialogModelOpen(false);
    } catch (err) {
      console.error("Failed to submit note dialog form", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger Open Delete Confirmation Alert
  const handleOpenDelete = (note: Note) => {
    setActiveNote(note);
    setIsDeleteDialogOpen(true);
  };

  // Confirm Delete Operation
  const handleDeleteConfirm = async () => {
    if (!activeNote) return;
    try {
      setIsSubmitting(true);
      await api.deleteNote(activeNote.id);
      setNotes(notes.filter((n) => n.id !== activeNote.id));
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error("Failed to delete note", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset search input and active category space filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  // Filter notes mapping search & space category active filters
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Fetch current Category Label
  const currentCategoryLabel =
    CATEGORIES.find((cat) => cat.id === selectedCategory)?.label || "Spaces";

  return (
    <div className="min-h-screen w-full bg-[#faf9f6] dark:bg-[#0c0c0b] text-zinc-800 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-300">
      
      <div className="flex-1 flex flex-col md:flex-row gap-8 max-w-6xl w-full mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* Modular Left Sidebar Navigation */}
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          notes={notes}
        />

        {/* Modular Main Content Area Panel */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Header Row Component */}
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCreateClick={handleOpenCreate}
            selectedCategoryLabel={currentCategoryLabel}
          />

          {/* Dynamic Masonry Bento Grid Component */}
          <NoteGrid
            notes={filteredNotes}
            loading={loading}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onEditClick={handleOpenEdit}
            onDeleteClick={handleOpenDelete}
            onCreateClick={handleOpenCreate}
            onResetFilters={handleResetFilters}
            formatDate={formatDate}
          />

        </div>
      </div>

      {/* Global Bottom Credit Footer */}
      <footer className="py-8 text-center text-[10px] text-zinc-400 dark:text-zinc-650 font-bold border-t border-zinc-200/35 dark:border-zinc-900/35 mt-auto">
        <p>© 2026 TakeNote Zen. Built using modular components & Tailwind CSS v4.</p>
      </footer>

      {/* Structured Create/Edit Form Dialog Modal Sheet */}
      <NoteDialog
        isOpen={isDialogModelOpen}
        onClose={() => setIsDialogModelOpen(false)}
        onSubmit={handleDialogFormSubmit}
        isEditMode={isEditMode}
        formData={formData}
        onChangeFormData={setFormData}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
      />

      {/* Structured Delete Confirmation Safety Modal */}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        noteTitle={activeNote?.title || ""}
        isSubmitting={isSubmitting}
      />

      {/* Custom Core Animated Layout Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.16s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

    </div>
  );
}
