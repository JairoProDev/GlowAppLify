import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
    sidebarOpen: boolean
    aiCoachOpen: boolean
    toggleSidebar: () => void
    setSidebarOpen: (open: boolean) => void
    toggleAICoach: () => void
    setAICoachOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            sidebarOpen: true,
            aiCoachOpen: false,
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
            setSidebarOpen: (open) => set({ sidebarOpen: open }),
            toggleAICoach: () => set((state) => ({ aiCoachOpen: !state.aiCoachOpen })),
            setAICoachOpen: (open) => set({ aiCoachOpen: open }),
        }),
        {
            name: 'ui-storage',
        }
    )
)
