
"use client";

import { useDailyStore } from "@/lib/store/useDailyStore";
import CheckInPrompt from "./evening/CheckInPrompt";
import Scorecard from "./evening/Scorecard";
import MoodSelector from "./evening/MoodSelector";
import ReflectionInput from "./evening/ReflectionInput";
import InsightsScreen from "./evening/InsightsScreen";
import TomorrowPreview from "./evening/TomorrowPreview";
import ClosureScreen from "./evening/ClosureScreen";
import { useEffect } from "react";

export default function EveningView() {
    const { eveningStep, setEveningStep, updateEveningData, submitEveningCheckIn } = useDailyStore();

    // Scroll to top on step change for better mobile UX
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [eveningStep]);

    const nextStep = () => setEveningStep(eveningStep + 1);

    return (
        <div className="min-h-screen py-8 pb-32">
            {eveningStep === 0 && (
                <CheckInPrompt onStart={nextStep} />
            )}

            {eveningStep === 1 && (
                <Scorecard onContinue={nextStep} />
            )}

            {eveningStep === 2 && (
                <MoodSelector onSelect={(mood) => {
                    updateEveningData({ mood });
                    nextStep();
                }} />
            )}

            {eveningStep === 3 && (
                <ReflectionInput onSave={(text) => {
                    updateEveningData({ reflection: text });
                    nextStep();
                    // We could submit data here partially if needed
                }} />
            )}

            {eveningStep === 4 && (
                <InsightsScreen onContinue={nextStep} />
            )}

            {eveningStep === 5 && (
                <TomorrowPreview onContinue={nextStep} />
            )}

            {eveningStep === 6 && (
                <ClosureScreen onComplete={() => {
                    // Trigger sleep animations or final submit
                    submitEveningCheckIn();
                }} />
            )}

            {/* Progress Dots (Optional, skip on step 0 and 6) */}
            {eveningStep > 0 && eveningStep < 6 && (
                <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map(step => (
                        <div
                            key={step}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${step === eveningStep
                                    ? "bg-indigo-600 scale-125 dark:bg-white"
                                    : "bg-zinc-200 dark:bg-zinc-800"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
