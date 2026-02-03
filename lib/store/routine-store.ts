import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface RoutineStep {
    id: string;
    title: string;
    duration: number; // minutes
}

export interface Routine {
    id: string;
    title: string;
    description: string;
    type: 'morning' | 'evening' | 'custom';
    steps: RoutineStep[];
    active?: boolean;
}

interface RoutineState {
    routines: Routine[];
    addRoutine: (routine: Routine) => void;
    updateRoutine: (id: string, updates: Partial<Routine>) => void;
}

export const useRoutineStore = create<RoutineState>()(
    persist(
        (set) => ({
            routines: [
                {
                    id: 'morning-1',
                    title: 'Miracle Morning',
                    description: 'Start your day with high energy and focus.',
                    type: 'morning',
                    steps: [
                        { id: 'S1', title: 'Silence (Meditation)', duration: 5 },
                        { id: 'S2', title: 'Affirmations', duration: 5 },
                        { id: 'S3', title: 'Visualization', duration: 5 },
                        { id: 'S4', title: 'Exercise', duration: 20 },
                        { id: 'S5', title: 'Reading', duration: 20 },
                        { id: 'S6', title: 'Scribing (Journaling)', duration: 5 },
                    ]
                },
                {
                    id: 'evening-1',
                    title: 'Shutdown Ritual',
                    description: 'Disconnect and prepare for sleep.',
                    type: 'evening',
                    steps: [
                        { id: 'E1', title: 'Review tomorrow\'s calendar', duration: 5 },
                        { id: 'E2', title: 'Tidy up workspace', duration: 5 },
                        { id: 'E3', title: 'Read fiction', duration: 30 },
                    ]
                }
            ],
            addRoutine: (routine) => set((state) => ({ routines: [...state.routines, routine] })),
            updateRoutine: (id, updates) => set((state) => ({
                routines: state.routines.map(r => r.id === id ? { ...r, ...updates } : r)
            }))
        }),
        {
            name: 'glow-routine-store',
        }
    )
)
