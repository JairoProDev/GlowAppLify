
import { create } from 'zustand';
import { OnboardingState, OnboardingAnswers, INITIAL_ANSWERS } from './types';

export const useOnboardingStore = create<OnboardingState>((set) => ({
    currentStep: 1,
    totalSteps: 5,
    answers: INITIAL_ANSWERS,
    isLoading: false,

    setStep: (step) => set({ currentStep: step }),

    nextStep: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, state.totalSteps + 2) // +2 for loading (6) and reveal (7)
    })),

    prevStep: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 1)
    })),

    setAnswer: (key, value) => set((state) => ({
        answers: { ...state.answers, [key]: value }
    })),

    setLoading: (loading) => set({ isLoading: loading }),

    reset: () => set({
        currentStep: 1,
        answers: INITIAL_ANSWERS,
        isLoading: false
    }),
}));
