
import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

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

export interface EveningData {
    mood: number | null; // 1 | 2 | 3
    reflection: string;
    insights?: any;
    burnoutRisk?: number;
}

export interface DailyState {
    currentView: 'morning' | 'deep-work' | 'celebration' | 'evening';
    user: {
        id: string; // Added ID
        name: string;
        streak: number;
        weeklyProgress: number; // 0-100
    };
    oneThing: DailyAction;
    otherActions: DailyAction[];
    loading: boolean;

    // Evening Check-in State
    eveningStep: number;
    eveningData: EveningData;

    // Actions
    fetchDailyData: (userId: string) => Promise<void>;
    startDeepWork: () => void;
    completeOneThing: () => void;
    completeAction: (id: string) => void;
    skipAction: (id: string) => void;
    scheduleAction: (id: string, time: string) => void;

    // Evening Actions
    setEveningStep: (step: number) => void;
    updateEveningData: (data: Partial<EveningData>) => void;
    submitEveningCheckIn: () => Promise<void>;

    setView: (view: DailyState['currentView']) => void;
}

// Fallback Mock Data (if DB is empty or connection fails)
const MOCK_ONE_THING: DailyAction = {
    id: '1',
    title: 'Write 3-page investor deck',
    duration: '2 hours',
    type: 'creative',
    why: 'This validates your value proposition.',
    bestTime: '7-9pm tonight',
    completed: false,
    priority: 'one-thing',
};

const MOCK_OTHER_ACTIONS: DailyAction[] = [
    { id: '2', title: 'Interview 2 potential users', duration: '1h', type: 'collaborative', why: 'Validation', bestTime: '2-3pm', completed: false, priority: 'secondary' },
    { id: '3', title: 'Sketch landing page mockup', duration: '30min', type: 'creative', why: 'Visualization', bestTime: '4-4:30pm', completed: false, priority: 'secondary' },
];

export const useDailyStore = create<DailyState>((set, get) => ({
    currentView: 'morning',
    loading: true,
    user: {
        id: '',
        name: 'Jairo',
        streak: 3,
        weeklyProgress: 40,
    },
    oneThing: MOCK_ONE_THING,
    otherActions: MOCK_OTHER_ACTIONS,

    eveningStep: 0,
    eveningData: {
        mood: null,
        reflection: '',
    },

    fetchDailyData: async (userId: string) => {
        set({ loading: true });
        try {
            // 1. Fetch Profile for Name/Streak
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            // 2. Fetch Today's Actions
            const today = new Date().toISOString().split('T')[0];
            const { data: actions } = await supabase
                .from('actions')
                .select('*')
                .eq('user_id', userId)
                .eq('date', today);

            // Update State
            if (profile) {
                // simple streak calc logic would go here, using profile for now
                set(state => ({ user: { ...state.user, id: userId, name: profile.full_name || 'User' } }));
            }

            if (actions && actions.length > 0) {
                const oneThing = actions.find((a: any) => a.priority === 'one-thing') || MOCK_ONE_THING;
                const others = actions.filter((a: any) => a.priority !== 'one-thing');

                // Map DB schema to UI schema
                set({
                    oneThing: { ...oneThing, type: 'creative' /* default or map from DB */ },
                    otherActions: others.map((a: any) => ({ ...a, type: 'admin' }))
                });
            }

        } catch (error) {
            console.error("Failed to fetch daily data", error);
        } finally {
            set({ loading: false });
        }
    },

    startDeepWork: () => set({ currentView: 'deep-work' }),

    completeOneThing: async () => {
        const { oneThing, user } = get();
        // Optimistic Update
        set((state) => ({
            oneThing: { ...state.oneThing, completed: true },
            currentView: 'celebration',
            user: { ...state.user, weeklyProgress: Math.min(state.user.weeklyProgress + 20, 100) }
        }));

        // DB Update
        if (user.id) {
            await supabase.from('actions').update({
                completed_at: new Date().toISOString(),
                status: 'completed'
            }).eq('id', oneThing.id);
        }
    },

    completeAction: async (id) => {
        const { otherActions, user } = get();
        const action = otherActions.find(a => a.id === id);
        if (!action) return;

        const newStatus = !action.completed;

        set((state) => ({
            otherActions: state.otherActions.map(a =>
                a.id === id ? { ...a, completed: newStatus } : a
            )
        }));

        if (user.id) {
            await supabase.from('actions').update({
                completed_at: newStatus ? new Date().toISOString() : null,
                status: newStatus ? 'completed' : 'pending'
            }).eq('id', id);
        }
    },

    skipAction: (id) => console.log('Skipped', id),

    scheduleAction: (id, time) => console.log('Scheduled', id, time),

    setEveningStep: (step) => set({ eveningStep: step }),

    updateEveningData: (data) => set((state) => ({
        eveningData: { ...state.eveningData, ...data }
    })),

    submitEveningCheckIn: async () => {
        const { eveningData, user, oneThing, otherActions } = get();

        const completedCount = [oneThing, ...otherActions].filter(a => a.completed).length;
        const totalCount = 1 + otherActions.length;

        // DB Insert
        if (user.id) {
            const today = new Date().toISOString().split('T')[0];
            const { error } = await supabase.from('daily_logs').upsert({
                user_id: user.id,
                date: today,
                mood_score: eveningData.mood,
                reflection: eveningData.reflection,
                actions_completed: completedCount,
                actions_total: totalCount
            }, { onConflict: 'user_id, date' });

            if (error) {
                toast.error("Failed to save check-in");
                console.error(error);
                return;
            }
            toast.success("Evening check-in saved. Good night!");
        }

        // Reset
        set({
            currentView: 'morning',
            eveningStep: 0,
            eveningData: { mood: null, reflection: '' }
        });
    },

    setView: (view) => set({ currentView: view }),
}));
