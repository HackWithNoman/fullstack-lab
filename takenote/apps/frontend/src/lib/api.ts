export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'work' | 'personal' | 'ideas' | 'tasks' | 'general';
  color: 'slate' | 'blue' | 'emerald' | 'amber' | 'rose' | 'violet';
  createdAt: string;
  updatedAt: string;
}

const DEFAULT_NOTES: Note[] = [
  {
    id: "welcome-note",
    title: "Welcome to TakeNote! 🚀",
    content: "TakeNote is a premium note-taking space designed for quick capturing of thoughts. You can add, edit, search, filter, and color-code your notes. Try creating a new note to see it in action!",
    category: "general",
    color: "blue",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "ideas-note",
    title: "Project Brainstorming 💡",
    content: "- Design modern glassmorphism UI/UX\n- Implement custom dialog overlay\n- Build async service abstraction layer\n- Set up localStorage synchronization\n- Test color badges and dynamic sorting",
    category: "ideas",
    color: "emerald",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: "shopping-note",
    title: "Grocery Shopping List 🛒",
    content: "- Organic avocados 🥑\n- Unsweetened oat milk 🥛\n- Fresh cherry tomatoes & basil 🍅\n- Organic dark chocolate (70%+) 🍫",
    category: "tasks",
    color: "amber",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  }
];

const LOCAL_STORAGE_KEY = 'takenote_notes_store';
const SIMULATED_LATENCY = 350;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getNotesFromStore = (): Note[] => {
  if (typeof window === 'undefined') return DEFAULT_NOTES;
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_NOTES));
      return DEFAULT_NOTES;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to read notes from localStorage", error);
    return DEFAULT_NOTES;
  }
};

const saveNotesToStore = (notes: Note[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Failed to write notes to localStorage", error);
  }
};

export const api = {
  async fetchNotes(): Promise<Note[]> {
    await delay(SIMULATED_LATENCY);
    const notes = getNotesFromStore();
    return [...notes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },

  async createNote(newNoteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    await delay(SIMULATED_LATENCY);
    const notes = getNotesFromStore();
    
    const newNote: Note = {
      ...newNoteData,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    notes.push(newNote);
    saveNotesToStore(notes);
    return newNote;
  },

  async updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Note> {
    await delay(SIMULATED_LATENCY);
    const notes = getNotesFromStore();
    const index = notes.findIndex(note => note.id === id);
    
    if (index === -1) {
      throw new Error(`Note with id ${id} not found`);
    }
    
    const updatedNote: Note = {
      ...notes[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    notes[index] = updatedNote;
    saveNotesToStore(notes);
    return updatedNote;
  },

  async deleteNote(id: string): Promise<void> {
    await delay(SIMULATED_LATENCY);
    const notes = getNotesFromStore();
    const filteredNotes = notes.filter(note => note.id !== id);
    saveNotesToStore(filteredNotes);
  }
};
