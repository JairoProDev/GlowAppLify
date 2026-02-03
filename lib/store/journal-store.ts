import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Mood = 1 | 2 | 3 | 4 | 5; // 1 = Variable (Bad), 5 = Amazing

export interface JournalEntry {
    id: string;
    date: string; // ISO Date
    content: string;
    mood: Mood;
    prompts?: { question: string; answer: string }[];
    tags: string[];
    createdAt: string;
}

interface JournalState {
    entries: JournalEntry[];
    addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
    deleteEntry: (id: string) => void;
    getEntryByDate: (date: string) => JournalEntry | undefined;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useJournalStore = create<JournalState>()(
    persist(
        (set, get) => ({
            entries: [],
            addEntry: (entry) => set((state) => ({
                entries: [...state.entries, { ...entry, id: generateId(), createdAt: new Date().toISOString() }]
            })),
            deleteEntry: (id) => set((state) => ({
                entries: state.entries.filter((e) => e.id !== id)
            })),
            getEntryByDate: (date) => {
                // simple date string match YYYY-MM-DD
                return get().entries.find(e => e.date.startsWith(date));
            }
        }),
        {
            name: 'glow-journal-store',
        }
    )
)
