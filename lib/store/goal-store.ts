
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export type GoalStatus = 'active' | 'completed' | 'paused';

export interface Goal {
    id: string;
    title: string;
    motivation?: string;
    status: GoalStatus;
    lifeAreaId?: string; // Connect to LifeArea
    deadline?: string;
    createdAt: string;
    progress: number; // 0-100
}

interface GoalState {
    goals: Goal[];
    addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'progress'>) => void;
    updateGoal: (id: string, updates: Partial<Goal>) => void;
    deleteGoal: (id: string) => void;
}

const generateId = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);

export const useGoalStore = create<GoalState>()(
    persist(
        (set) => ({
            goals: [],
            addGoal: (goal) => set((state) => ({
                goals: [...state.goals, {
                    ...goal,
                    id: generateId(),
                    createdAt: new Date().toISOString(),
                    progress: 0
                }]
            })),
            updateGoal: (id, updates) => set((state) => ({
                goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g))
            })),
            deleteGoal: (id) => set((state) => ({
                goals: state.goals.filter((g) => g.id !== id)
            }))
        }),
        {
            name: 'glow-goals-storage',
        }
    )
)
