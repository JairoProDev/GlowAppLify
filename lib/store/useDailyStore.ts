
import { create } from 'zustand';

export type TaskType = 'creative' | 'analytical' | 'admin' | 'collaborative';

export interface DailyAction {
    id: string;
    title: string;
    duration: string; // e.g. "2 hours"
    type: TaskType;
    description?: string;
    why: string;
    bestTime: string;
    completed: boolean;
    priority: 'one-thing' | 'secondary';
}

export interface DailyState {
    currentView: 'morning' | 'deep-work' | 'celebration' | 'evening';
    user: {
        name: string;
        streak: number;
        weeklyProgress: number; // 0-100
    };
    oneThing: DailyAction;
    otherActions: DailyAction[];

    // Actions
    setUserId: (name: string) => void;
    startDeepWork: () => void;
    completeOneThing: () => void;
    completeAction: (id: string) => void;
    skipAction: (id: string) => void;
    scheduleAction: (id: string, time: string) => void;
    submitEveningCheckIn: (data: any) => void;
    setView: (view: DailyState['currentView']) => void;
}

// Mock Data
const MOCK_ONE_THING: DailyAction = {
    id: '1',
    title: 'Write 3-page investor deck',
    duration: '2 hours',
    type: 'creative',
    why: 'This validates your value proposition and gets you ready for investor conversations. Week 1 milestone depends on this.',
    bestTime: '7-9pm tonight',
    completed: false,
    priority: 'one-thing',
};

const MOCK_OTHER_ACTIONS: DailyAction[] = [
    {
        id: '2',
        title: 'Interview 2 potential users',
        duration: '1h',
        type: 'collaborative',
        why: 'Validation',
        bestTime: '2-3pm',
        completed: false,
        priority: 'secondary',
    },
    {
        id: '3',
        title: 'Sketch landing page mockup',
        duration: '30min',
        type: 'creative',
        why: 'Visualization',
        bestTime: '4-4:30pm',
        completed: false,
        priority: 'secondary',
    },
    {
        id: '4',
        title: 'Draft email to 3 advisors',
        duration: '20min',
        type: 'admin',
        why: 'Outreach',
        bestTime: 'Anytime',
        completed: false,
        priority: 'secondary',
    },
];

export const useDailyStore = create<DailyState>((set) => ({
    currentView: 'morning',
    user: {
        name: 'Jairo',
        streak: 3,
        weeklyProgress: 40,
    },
    oneThing: MOCK_ONE_THING,
    otherActions: MOCK_OTHER_ACTIONS,

    setUserId: (name) => set((state) => ({ user: { ...state.user, name } })),

    startDeepWork: () => set({ currentView: 'deep-work' }),

    completeOneThing: () => set((state) => {
        // Determine if we should show celebration
        // Yes, always for ONE Thing
        return {
            oneThing: { ...state.oneThing, completed: true },
            currentView: 'celebration',
            user: {
                ...state.user,
                weeklyProgress: Math.min(state.user.weeklyProgress + 20, 100), // Mock progress
            }
        };
    }),

    completeAction: (id) => set((state) => ({
        otherActions: state.otherActions.map(a =>
            a.id === id ? { ...a, completed: !a.completed } : a
        )
    })),

    skipAction: (id) => console.log('Skipped', id), // Placeholder

    scheduleAction: (id, time) => console.log('Scheduled', id, time), // Placeholder

    submitEveningCheckIn: (data) => {
        console.log('Evening Check In', data);
        set({ currentView: 'morning' }); // Reset for demo loop
    },

    setView: (view) => set({ currentView: view }),
}));
