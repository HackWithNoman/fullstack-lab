export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'work' | 'personal' | 'ideas' | 'tasks' | 'general';
  color: 'slate' | 'blue' | 'emerald' | 'amber' | 'rose' | 'violet';
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  category: Note["category"];
  color: Note["color"];
}
