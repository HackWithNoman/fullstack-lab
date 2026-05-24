"use client";

import { NoteInput } from "@/components/note-input";
import TodoHeader from "@/components/TodoHeader";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const { todos, loading, addTodo, toggleTodo, removeTodo } = useTodos();

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-xl shadow-xs p-8">
        <TodoHeader todos={todos} />
        <div className="mb-6">
          <NoteInput handleCreateTodo={addTodo} />
        </div>

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={removeTodo} />
      </div>
    </div>
  );
}
