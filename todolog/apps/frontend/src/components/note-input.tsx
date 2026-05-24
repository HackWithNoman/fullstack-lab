import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type NoteInputProps = {
  handleCreateTodo: (title: string) => void;
};

export function NoteInput({ handleCreateTodo }: NoteInputProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    handleCreateTodo(trimmedTitle);

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field orientation="horizontal">
        <Input
          type="search"
          placeholder="Type..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button type="submit" disabled={!title.trim()}>
          Add Todo
        </Button>
      </Field>
    </form>
  );
}
