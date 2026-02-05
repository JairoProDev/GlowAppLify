
import React, { useState, useEffect } from 'react';
import { useOnboardingStore } from '../../../lib/onboarding/store';
import { BloomAIBubble } from '../BloomAIBubble';
import { ContinueButton } from '../ContinueButton';
import { QuickPicks } from '../QuickPicks';
import { StepContainer } from '../StepContainer';
import { useLanguage } from '../../../lib/i18n/LanguageContext';
import { onboardingContent } from '../../../lib/i18n/onboardingContent';



export const Step1Goal: React.FC = () => {
    const { answers, setAnswer, nextStep } = useOnboardingStore();
    const { language } = useLanguage();
    const content = onboardingContent[language].step1;
    const [localGoal, setLocalGoal] = useState(answers.goal);

    // Sync local state with store on mount (in case of back navigation)
    useEffect(() => {
        setLocalGoal(answers.goal);
    }, [answers.goal]);

    const handleContinue = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (localGoal.trim()) {
            setAnswer('goal', localGoal);
            nextStep();
        }
    };

    return (

        <StepContainer>
            <BloomAIBubble
                message={content.bubble}
            />

            <div className="mt-8 space-y-6">
                <form onSubmit={handleContinue}>
                    <div className="space-y-4">
                        <label htmlFor="goal-input" className="sr-only">Your Goal</label>
                        <textarea
                            id="goal-input"
                            value={localGoal}
                            onChange={(e) => setLocalGoal(e.target.value)}
                            placeholder={content.placeholder}
                            className="w-full px-6 py-4 text-xl rounded-2xl border-2 border-border bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none shadow-sm"
                            rows={3}
                            autoFocus
                        />

                        <QuickPicks
                            options={content.quickGoals}
                            onSelect={(val) => {
                                setLocalGoal(val);
                                // Optional: Auto-advance if they click a quick pick? 
                                // Better to let them confirm so they can edit it if needed.
                            }}
                        />
                    </div>

                    <div className="mt-8">
                        <ContinueButton
                            type="submit"
                            disabled={!localGoal.trim()}
                        >
                            {content.continue}
                        </ContinueButton>
                    </div>
                </form>
            </div>
        </StepContainer>
    );
};
