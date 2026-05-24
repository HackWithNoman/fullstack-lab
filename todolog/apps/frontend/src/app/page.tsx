"use client";

import { NoteInput } from "@/components/note-input";
import { Trash2, CheckCircle2, Circle } from "lucide-react";
import { useEffect, useState } from "react";

type Note = {
  id: string | number;
  title: string;
  isCompleted: boolean;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  // Get Notes
  useEffect(() => {
    const getNotes = async () => {
      const res = await fetch("http://localhost:8000/notes");
      const data = await res.json();

      setNotes(data.notes as Note[]);
    };

    getNotes();
  }, []);

  // Create todo
  const handleCreateTodo = async (title: string) => {
    const res = await fetch(`http://localhost:8000/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });

    const data = await res.json();

    setNotes((prev) => [data.note, ...prev]);
  };

  // Update Status
  const handleStatus = async (id: string | number, currentStatus: boolean) => {
    const res = await fetch(`http://localhost:8000/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: !currentStatus,
      }),
    });

    const updatedNote = await res.json();

    setNotes((prev) =>
      prev.map((note) => (note.id === id ? updatedNote : note)),
    );
  };

  // Delete Notes
  const handleDelete = async (id: string | number) => {
    const res = await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
    });

    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-xl shadow-xs p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            TakeNote
          </h1>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-sm">
            {notes.filter((n) => !n.isCompleted).length} remaining
          </span>
        </div>

        <div className="mb-6">
          <NoteInput handleCreateTodo={handleCreateTodo} />
        </div>

        <div className="flex flex-col gap-2.5">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`group border rounded-lg p-3.5 flex items-center justify-between transition-all duration-200
                ${
                  note.isCompleted
                    ? "bg-gray-50/50 border-gray-100/70 opacity-70"
                    : "bg-white border-gray-100 hover:bg-gray-50/70 hover:border-gray-200"
                }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => handleStatus(note.id, note.isCompleted)}
                  className={`transition-colors duration-150 focus:outline-none
                    ${note.isCompleted ? "text-emerald-500" : "text-gray-300 hover:text-emerald-500"}`}
                  aria-label={
                    note.isCompleted ? "Mark incomplete" : "Mark complete"
                  }
                >
                  {note.isCompleted ? (
                    <CheckCircle2 size={19} className="fill-emerald-50" />
                  ) : (
                    <Circle size={19} />
                  )}
                </button>

                <p
                  className={`text-sm font-medium truncate transition-all duration-200
                  ${note.isCompleted ? "line-through text-gray-400" : "text-gray-700"}`}
                >
                  {note.title}
                </p>
              </div>

              <button
                onClick={() => handleDelete(note.id)}
                className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors duration-200 ml-2"
                aria-label="Delete note"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
