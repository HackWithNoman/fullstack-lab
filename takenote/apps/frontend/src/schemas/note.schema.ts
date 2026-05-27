import { z } from "zod";

export const noteFormSchema = z.object({
  title: z
    .string()
    .min(1, "Note title is required")
    .max(50, "Title must be 50 characters or less"),
  content: z.string().min(1, "Note content cannot be empty"),
  category: z.enum(["work", "personal", "ideas", "tasks", "general"]),
  color: z.enum(["slate", "blue", "emerald", "amber", "rose", "violet"]),
});

export type NoteFormSchemaType = z.infer<typeof noteFormSchema>;
