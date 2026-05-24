import { TodoItemProps } from "@/types/todo";
import { Trash2, CheckCircle2, Circle } from "lucide-react";

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      key={todo.id}
      className={`group border rounded-lg p-3.5 flex items-center justify-between transition-all duration-200
      ${
        todo.isCompleted
          ? "bg-gray-50/50 border-gray-100/70 opacity-70"
          : "bg-white border-gray-100 hover:bg-gray-50/70 hover:border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={() => onToggle(todo.id, todo.isCompleted)}
          className={`transition-colors duration-150 focus:outline-none
          ${todo.isCompleted ? "text-emerald-500" : "text-gray-300 hover:text-emerald-500"}`}
          aria-label={todo.isCompleted ? "Mark incomplete" : "Mark complete"}
        >
          {todo.isCompleted ? (
            <CheckCircle2 size={19} className="fill-emerald-50" />
          ) : (
            <Circle size={19} />
          )}
        </button>

        <p
          className={`text-sm font-medium truncate transition-all duration-200
        ${todo.isCompleted ? "line-through text-gray-400" : "text-gray-700"}`}
        >
          {todo.title}
        </p>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors duration-200 ml-2"
        aria-label="Delete note"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default TodoItem;
