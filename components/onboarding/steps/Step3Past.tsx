
import React, { useState } from 'react';
import { useOnboardingStore } from '@/lib/onboarding/store';
import { BloomAIBubble } from '../BloomAIBubble';
import { ContinueButton } from '../ContinueButton';
import { StepContainer } from '../StepContainer';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const OBSTACLES = [
    'Lost motivation',
    'Got too busy',
    "Didn't see progress",
    'Felt overwhelmed',
    'Life got in the way',
    "Didn't know what to do next"
];

export const Step3Past: React.FC = () => {
    const { answers, setAnswer, nextStep } = useOnboardingStore();
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
                    message={`Have you tried achieving this goal before?\n\n(No judgment - I just want to build a system that works THIS time.)`}
                />

                <div className="space-y-4 mt-8">
                    {[
                        'Yes, multiple times',
                        'Yes, once',
                        'No, first time'
                    ].map((option) => (
                        <button
                            key={option}
                            onClick={() => handleAttemptSelection(option)}
                            className="w-full p-4 text-left rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group flex items-center justify-between"
                        >
                            <span className="font-medium text-lg">{option}</span>
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
                message={`What typically stops you?\n\n(Select all that apply)`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-8">
                {OBSTACLES.map((obstacle) => {
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
                Continue
            </ContinueButton>
        </StepContainer>
    );
};
