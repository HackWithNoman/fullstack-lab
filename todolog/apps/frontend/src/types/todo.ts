export type Todo = {
  id: string | number;
  title: string;
  isCompleted: boolean;
};

export type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string | number, currentStatus: boolean) => Promise<void>;
  onDelete: (id: string | number) => Promise<void>;
};

export type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string | number, currentStatus: boolean) => Promise<void>;
  onDelete: (id: string | number) => Promise<void>;
};
