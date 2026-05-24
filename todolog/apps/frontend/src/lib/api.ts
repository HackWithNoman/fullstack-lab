const BASE_URL = "http://localhost:8000";

// Get Notes
export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}/notes`);

  return res.json();
};

// Create todo
export const createTodo = async (title: string) => {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });

  return res.json();
};

// Update Status
export const updateTodo = async (
  id: string | number,
  currentStatus: boolean,
) => {
  const res = await fetch(`http://localhost:8000/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isCompleted: !currentStatus,
    }),
  });

  return res.json();
};

// Delete Notes
export const deleteTodo = async (id: string | number) => {
  const res = await fetch(`http://localhost:8000/notes/${id}`, {
    method: "DELETE",
  });

  return res.json();
};
