"use client";

import { NotesProvider } from "@/contexts/notes-context";
import {
  Sidebar,
  Header,
  NoteGrid,
  NoteDialog,
  DeleteDialog,
  ViewNoteDialog,
} from "@/components";

function HomeContent() {
  return (
    <div className="min-h-screen w-full bg-[#faf9f6] dark:bg-[#0c0c0b] text-zinc-800 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-300">
      <div className="flex-1 flex flex-col md:flex-row gap-8 max-w-6xl w-full mx-auto px-4 md:px-8 py-8 md:py-12">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-6">
          <Header />
          <NoteGrid />
        </div>
      </div>

      <footer className="py-8 text-center text-[10px] text-zinc-400 dark:text-zinc-650 font-bold border-t border-zinc-200/35 dark:border-zinc-900/35 mt-auto">
        <p>
          © 2026 TakeNote Zen. Built using modular components & Tailwind CSS v4.
        </p>
      </footer>

      <NoteDialog />
      <DeleteDialog />
      <ViewNoteDialog />
    </div>
  );
}

export default function Home() {
  return (
    <NotesProvider>
      <HomeContent />
    </NotesProvider>
  );
}
