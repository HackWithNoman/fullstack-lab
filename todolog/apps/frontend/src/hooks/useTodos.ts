import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/lib/api";
import { Todo } from "@/types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch todos
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTodos();
        setTodos(data.notes);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // create todo
  const addTodo = async (title: string) => {
    try {
      const data = await createTodo(title);
      setTodos((prev) => [data.note, ...prev]);
    } catch (error) {
      console.error("Faild to create todo", error);
    }
  };

  // update todo status
  const toggleTodo = async (id: string | number, currentStatus: boolean) => {
    try {
      const res = await updateTodo(id, currentStatus);

      const updatedTodo = res.note ?? res.data ?? res;

      setTodos((prev) =>
        prev.map((todo) =>
          String(todo.id) === String(id) ? updatedTodo : todo,
        ),
      );
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  // delete todo
  const removeTodo = async (id: string | number) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => String(todo.id) !== String(id)));
    } catch (error) {
      console.error("Faild to delete todo", error);
    }
  };

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    removeTodo,
  };
}
