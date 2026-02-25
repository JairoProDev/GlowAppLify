
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
    // Step 0: Profile
    name: string;

    // Step 1: Goal
    goal: string;
    goalCategory: 'health' | 'wealth' | 'career' | 'relationships' | 'growth' | 'other';

    // Step 2: Context & Schedule
    timePerDay: string; // e.g. "1-2 hours"
    energyPeak: 'morning' | 'afternoon' | 'evening';
    scheduleConstraints: string; // e.g. "Work 9-5", "Kids in afternoon"

    // Step 3: Past Attempts
    obstacles: string[];

    // Step 4: Future Self (Optional/Guided)
    wantsVisualization: boolean;
    futureSelfVision: string;
}

export const INITIAL_ANSWERS: OnboardingAnswers = {
    name: '',
    goal: '',
    goalCategory: 'growth',
    timePerDay: '',
    energyPeak: 'morning',
    scheduleConstraints: '',
    obstacles: [],
    wantsVisualization: true,
    futureSelfVision: '',
};
