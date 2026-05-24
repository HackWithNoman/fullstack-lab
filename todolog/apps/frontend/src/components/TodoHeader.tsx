import { Todo } from "@/types/todo";

type TodoHeaderProps = {
  todos: Todo[];
};

function TodoHeader({ todos }: TodoHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-xl font-bold text-gray-900 tracking-tight">
        TodoLog
      </h1>
      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-sm">
        {todos.filter((n) => !n.isCompleted).length} remaining
      </span>
    </div>
  );
}

export default TodoHeader;
