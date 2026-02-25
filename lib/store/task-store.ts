import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Fallback UUID if uuid package issues, though most environments have crypto.randomUUID
const generateId = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);

export type TaskPriority = 'urgent-important' | 'important' | 'urgent' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'blocked' | 'done';

export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: TaskPriority;
    status: TaskStatus;
    deadline?: string; // ISO date
    tags: string[];
    createdAt: string;
    completedAt?: string;
}

interface TaskState {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    moveTask: (id: string, status: TaskStatus) => void;
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [
                // Seed some data
                {
                    id: '1',
                    title: 'Complete Project Roadmap',
                    priority: 'urgent-important',
                    status: 'in-progress',
                    tags: ['work', 'planning'],
                    createdAt: new Date().toISOString()
                },
                {
                    id: '2',
                    title: 'Review Quarterly Goals',
                    priority: 'important',
                    status: 'todo',
                    tags: ['strategy'],
                    createdAt: new Date().toISOString()
                }
            ],
            addTask: (task) => set((state) => ({
                tasks: [...state.tasks, { ...task, id: generateId(), createdAt: new Date().toISOString() }]
            })),
            updateTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
            })),
            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id)
            })),
            moveTask: (id, status) => set((state) => ({
                tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t))
            })),
        }),
        {
            name: 'glow-tasks-storage',
        }
    )
)
