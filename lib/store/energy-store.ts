import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Chronotype = 'morning_lark' | 'night_owl' | 'afternoon_dip' | 'steady'

export interface EnergyProfile {
    chronotype: Chronotype
    peakHours: number[] // Array of hour integers (0-23)
    dipHours: number[] // Array of hour integers (0-23)
    isSetup: boolean
}

interface EnergyState {
    profile: EnergyProfile
    setChronotype: (type: Chronotype) => void
    updatePeakHours: (hours: number[]) => void
    completeSetup: () => void
    resetProfile: () => void
}

const DEFAULT_PROFILE: EnergyProfile = {
    chronotype: 'steady',
    peakHours: [9, 10, 11],
    dipHours: [14, 15],
    isSetup: false
}

export const useEnergyStore = create<EnergyState>()(
    persist(
        (set) => ({
            profile: DEFAULT_PROFILE,
            setChronotype: (type) => set((state) => {
                let peakHours: number[] = []
                let dipHours: number[] = []

                // Auto-set defaults based on chronotype
                switch (type) {
                    case 'morning_lark':
                        peakHours = [7, 8, 9, 10, 11]
                        dipHours = [14, 15, 16]
                        break
                    case 'night_owl':
                        peakHours = [19, 20, 21, 22, 23]
                        dipHours = [10, 11, 12]
                        break
                    case 'afternoon_dip':
                        peakHours = [9, 10, 11, 16, 17]
                        dipHours = [13, 14, 15]
                        break
                    case 'steady':
                        peakHours = [10, 11, 14, 15]
                        dipHours = []
                        break
                }

                return {
                    profile: {
                        ...state.profile,
                        chronotype: type,
                        peakHours,
                        dipHours
                    }
                }
            }),
            updatePeakHours: (hours) => set((state) => ({
                profile: { ...state.profile, peakHours: hours }
            })),
            completeSetup: () => set((state) => ({
                profile: { ...state.profile, isSetup: true }
            })),
            resetProfile: () => set({ profile: DEFAULT_PROFILE })
        }),
        {
            name: 'energy-storage',
        }
    )
)
