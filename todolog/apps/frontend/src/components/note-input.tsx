import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type NoteInputProps = {
  handleCreateTodo: (title: string) => void;
};

export function NoteInput({ handleCreateTodo }: NoteInputProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    handleCreateTodo(title);

    setTitle("");
  };

  return (
    <Field orientation="horizontal">
      <Input
        type="search"
        placeholder="Type..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button onClick={() => handleSubmit()}>Add Todo</Button>
    </Field>
  );
}
