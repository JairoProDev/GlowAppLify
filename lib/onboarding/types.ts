
export interface OnboardingState {
    currentStep: number;
    totalSteps: number;
    answers: OnboardingAnswers;
    isLoading: boolean;

    // Actions
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    setAnswer: <K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) => void;
    setLoading: (loading: boolean) => void;
    reset: () => void;
}

export interface OnboardingAnswers {
    // Step 1: Goal
    goal: string;
    goalCategory?: string;

    // Step 2: Context
    constraint: 'Time' | 'Energy' | 'Money' | 'Skills' | 'Support' | 'Other' | null;
    timePerDay?: number; // hours (if constraint is Time)
    budget?: string; // (if constraint is Money)
    skillNeeded?: string; // (if constraint is Skills)
    energyPeak?: string; // (if constraint is Energy)

    // Step 3: Past Attempts
    triedBefore: 'Yes, multiple times' | 'Yes, once' | 'No, first time' | null;
    obstacles: string[];

    // Step 4: Future Self
    futureSelfVision: string;
}

export const INITIAL_ANSWERS: OnboardingAnswers = {
    goal: '',
    constraint: null,
    triedBefore: null,
    obstacles: [],
    futureSelfVision: '',
};
