
import React, { useState } from 'react';
import { useOnboardingStore } from '@/lib/onboarding/store';
import { BloomAIBubble } from '../BloomAIBubble';
import { ContinueButton } from '../ContinueButton';
import { StepContainer } from '../StepContainer';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { onboardingContent } from '@/lib/i18n/onboardingContent';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';



export const Step3Past: React.FC = () => {
    const { answers, setAnswer, nextStep } = useOnboardingStore();
    const { language } = useLanguage();
    const content = onboardingContent[language].step3;
    const [hasTriedBefore, setHasTriedBefore] = useState<boolean | null>(
        answers.triedBefore === 'No, first time' ? false : answers.triedBefore ? true : null
    );

    const handleAttemptSelection = (val: string) => {
        // Cast to specific type to satisfy TypeScript
        const typedVal = val as 'Yes, multiple times' | 'Yes, once' | 'No, first time';
        setAnswer('triedBefore', typedVal);
        if (typedVal === 'No, first time') {
            nextStep();
        } else {
            setHasTriedBefore(true);
        }
    };

    const toggleObstacle = (obstacle: string) => {
        const current = answers.obstacles || [];
        if (current.includes(obstacle)) {
            setAnswer('obstacles', current.filter(o => o !== obstacle));
        } else {
            setAnswer('obstacles', [...current, obstacle]);
        }
    };

    const handleContinue = () => {
        nextStep();
    };

    if (hasTriedBefore === null) {
        return (
            <StepContainer>
                <BloomAIBubble
                    message={content.initialBubble}
                />

                <div className="space-y-4 mt-8">
                    {(Object.keys(content.options) as Array<keyof typeof content.options>).map((key) => (
                        <button
                            key={key}
                            onClick={() => handleAttemptSelection(key)}
                            className="w-full p-4 text-left rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group flex items-center justify-between"
                        >
                            <span className="font-medium text-lg">{content.options[key]}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                                <Check className="w-5 h-5" />
                            </span>
                        </button>
                    ))}
                </div>
            </StepContainer>
        );
    }

    return (
        <StepContainer key="part2">
            <BloomAIBubble
                message={content.part2Bubble}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-8">
                {content.obstacles.map((obstacle) => {
                    const isSelected = answers.obstacles.includes(obstacle);
                    return (
                        <button
                            key={obstacle}
                            onClick={() => toggleObstacle(obstacle)}
                            className={cn(
                                "p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-start gap-3",
                                isSelected
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border bg-card hover:border-primary/50"
                            )}
                        >
                            <div className={cn(
                                "w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5",
                                isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"
                            )}>
                                {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span className="font-medium">{obstacle}</span>
                        </button>
                    );
                })}
            </div>

            <ContinueButton
                onClick={handleContinue}
                disabled={answers.obstacles.length === 0}
            >
                {content.continue}
            </ContinueButton>
        </StepContainer>
    );
};
