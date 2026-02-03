import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'
export type Language = 'en' | 'es'

interface UserProfile {
    name: string
    email: string
    avatarUrl?: string
}

interface SettingsState {
    theme: Theme
    language: Language
    profile: UserProfile
    notificationsEnabled: boolean

    setTheme: (theme: Theme) => void
    setLanguage: (lang: Language) => void
    updateProfile: (profile: Partial<UserProfile>) => void
    toggleNotifications: () => void
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'system',
            language: 'en',
            profile: {
                name: 'Guest User',
                email: 'guest@example.com'
            },
            notificationsEnabled: true,

            setTheme: (theme) => set({ theme }),
            setLanguage: (language) => set({ language }),
            updateProfile: (updates) => set((state) => ({
                profile: { ...state.profile, ...updates }
            })),
            toggleNotifications: () => set((state) => ({
                notificationsEnabled: !state.notificationsEnabled
            })),
        }),
        {
            name: 'glow-settings-storage',
        }
    )
)
