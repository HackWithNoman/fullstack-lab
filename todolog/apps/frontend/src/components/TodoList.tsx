import { TodoListProps } from "@/types/todo";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
