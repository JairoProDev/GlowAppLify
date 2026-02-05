import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LifeArea, AreaType, AreaStatus, AREA_LABELS } from '@/lib/types/life-areas';
import { toast } from 'react-hot-toast';
import { useGoalStore } from '@/lib/store/goal-store';
import { useTaskStore } from '@/lib/store/task-store';
import { useDailyStore } from '@/lib/store/useDailyStore';

interface LifeAreasState {
    areas: LifeArea[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchAreas: () => Promise<void>;
    updateAreaStatus: (id: string, status: AreaStatus) => Promise<void>;
    createArea: (type: AreaType, status?: AreaStatus) => Promise<void>;
    getAreaByType: (type: AreaType) => LifeArea | undefined;

    // New Methods for Detail Page
    fetchAreaStats: (areaId: string) => { activeGoals: number; completedActions: number; totalActions: number };
}

const INITIAL_AREAS: LifeArea[] = [
    { id: 'area-1', user_id: 'local', area_type: 'finances', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'area-2', user_id: 'local', area_type: 'health', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'area-3', user_id: 'local', area_type: 'career', status: 'principal', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'area-4', user_id: 'local', area_type: 'relationships', status: 'maintenance', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'area-5', user_id: 'local', area_type: 'growth', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'area-6', user_id: 'local', area_type: 'learning', status: 'inactive', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'area-7', user_id: 'local', area_type: 'wellness', status: 'maintenance', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'area-8', user_id: 'local', area_type: 'creativity', status: 'inactive', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export const useLifeAreasStore = create<LifeAreasState>()(
    persist(
        (set, get) => ({
            areas: INITIAL_AREAS,
            isLoading: false,
            error: null,

            fetchAreas: async () => {
                // In local mode, we just ensure areas exist. 
                // Later this can sync with Supabase.
                set({ isLoading: false });
            },

            updateAreaStatus: async (id: string, status: AreaStatus) => {
                set((state) => ({
                    areas: state.areas.map((area) =>
                        area.id === id ? { ...area, status } : area
                    )
                }));
                toast.success('Area status updated');
            },

            createArea: async (type: AreaType, status: AreaStatus = 'active') => {
                // In local mode, we just activate the existing area or create if missing
                const existing = get().areas.find(a => a.area_type === type);
                if (existing) {
                    get().updateAreaStatus(existing.id, status);
                } else {
                    const newArea: LifeArea = {
                        id: `area-${Date.now()}`,
                        user_id: 'local',
                        area_type: type,
                        status,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    };
                    set((state) => ({ areas: [...state.areas, newArea] }));
                }
            },

            getAreaByType: (type: AreaType) => {
                return get().areas.find(a => a.area_type === type);
            },

            fetchAreaStats: (areaId: string) => {
                // Calculate stats from LOCAL stores
                const area = get().areas.find(a => a.id === areaId);
                if (!area) return { activeGoals: 0, completedActions: 0, totalActions: 0 };

                // 1. Goals (from useGoalStore)
                const goals = useGoalStore.getState().goals;
                const activeGoals = goals.filter(g => g.lifeAreaId === area.id && g.status === 'active').length;

                // 2. Actions (from useTaskStore - considering tasks as actions for now)
                // In a real scenario, we might want to map tasks to areas via tags or specific fields
                const tasks = useTaskStore.getState().tasks;

                // Simple heuristic: If task tag matches area type/label
                const areaLabel = AREA_LABELS[area.area_type].toLowerCase();
                const relatedTasks = tasks.filter(t =>
                    t.tags.some(tag => tag.toLowerCase().includes(areaLabel) || tag.toLowerCase().includes(area.area_type))
                );

                const totalActions = relatedTasks.length;
                const completedActions = relatedTasks.filter(t => t.status === 'done').length;

                return {
                    activeGoals,
                    completedActions,
                    totalActions
                };
            }
        }),
        {
            name: 'glow-life-areas-storage'
        }
    )
);
