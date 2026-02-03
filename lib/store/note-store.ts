import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const generateId = () => Math.random().toString(36).substring(2, 9);

export interface Note {
    id: string;
    title: string;
    content: string;
    folder?: string;
    tags: string[];
    updatedAt: string;
    createdAt: string;
}

interface NoteState {
    notes: Note[];
    activeNoteId: string | null;
    addNote: () => string; // returns id
    updateNote: (id: string, updates: Partial<Note>) => void;
    deleteNote: (id: string) => void;
    setActiveNote: (id: string | null) => void;
}

export const useNoteStore = create<NoteState>()(
    persist(
        (set, get) => ({
            notes: [
                {
                    id: '1',
                    title: 'Project Ideas',
                    content: '# Ideas\n\n- Build a rocket\n- Learn cooking',
                    tags: ['ideas'],
                    updatedAt: new Date().toISOString(),
                    createdAt: new Date().toISOString()
                }
            ],
            activeNoteId: null,
            addNote: () => {
                const id = generateId();
                const newNote: Note = {
                    id,
                    title: 'Untitled Note',
                    content: '',
                    tags: [],
                    updatedAt: new Date().toISOString(),
                    createdAt: new Date().toISOString()
                };
                set(state => ({
                    notes: [newNote, ...state.notes],
                    activeNoteId: id
                }));
                return id;
            },
            updateNote: (id, updates) => set(state => ({
                notes: state.notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n)
            })),
            deleteNote: (id) => set(state => ({
                notes: state.notes.filter(n => n.id !== id),
                activeNoteId: state.activeNoteId === id ? null : state.activeNoteId
            })),
            setActiveNote: (id) => set({ activeNoteId: id })
        }),
        {
            name: 'glow-notes-store'
        }
    )
)
