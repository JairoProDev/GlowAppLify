
import React from 'react';
import { useOnboardingStore } from '@/lib/onboarding/store';
import { BloomAIBubble } from '../BloomAIBubble';
import { ContinueButton } from '../ContinueButton';
import { StepContainer } from '../StepContainer';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { onboardingContent } from '@/lib/i18n/onboardingContent';
import { Clock, Battery, DollarSign, Brain, Users, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { Slider } from '@/components/ui/slider'; 

// If Slider doesn't exist, I'll implement a simple one or use input range
// But since I saw "shadcn/ui" mentioned, I'll try to use standard HTML range if confident simple is better, 
// or the one from the components folder if I already saw it. 
// I did NOT see components/ui/slider.tsx in the list_dir output (I saw switch, tabs, progress etc but missed slider maybe? 
// Re-checking list_dir output: select.tsx, separator.tsx, sheet.tsx, skeleton.tsx, switch.tsx... NO SLIDER.
// I will use a standard input range for now to be safe and fast.

type ConstraintType = 'Time' | 'Energy' | 'Money' | 'Skills' | 'Support' | 'Other';

const CONSTRAINTS: { id: ConstraintType; icon: React.ReactNode }[] = [
    { id: 'Time', icon: <Clock className="w-5 h-5" /> },
    { id: 'Energy', icon: <Battery className="w-5 h-5" /> },
    { id: 'Money', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'Skills', icon: <Brain className="w-5 h-5" /> },
    { id: 'Support', icon: <Users className="w-5 h-5" /> },
    { id: 'Other', icon: <HelpCircle className="w-5 h-5" /> },
];

export const Step2Context: React.FC = () => {
    const { answers, setAnswer, nextStep } = useOnboardingStore();
    const { language } = useLanguage();
    const content = onboardingContent[language].step2;

    // Local state for the second part of the question (follow up)
    const [showFollowUp, setShowFollowUp] = React.useState(!!answers.constraint);

    const handleConstraintSelect = (constraint: ConstraintType) => {
        setAnswer('constraint', constraint);
        setShowFollowUp(true);

        // Set defaults for follow ups if not set
        if (constraint === 'Time' && !answers.timePerDay) {
            setAnswer('timePerDay', 2);
        }
    };

    const handleContinue = () => {
        nextStep();
    };

    const renderFollowUp = () => {
        switch (answers.constraint) {
            case 'Time':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <BloomAIBubble
                            message={content.followUpTime}
                        />
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between mb-4">
                                <span className="text-sm font-medium text-muted-foreground">{content.timeLabels.min}</span>
                                <span className="text-2xl font-bold text-primary">
                                    {answers.timePerDay}h
                                </span>
                                <span className="text-sm font-medium text-muted-foreground">{content.timeLabels.max}</span>
                            </div>
                            <input
                                type="range"
                                min="0.25"
                                max="8"
                                step="0.25"
                                value={answers.timePerDay || 2}
                                onChange={(e) => setAnswer('timePerDay', parseFloat(e.target.value))}
                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <p className="text-center text-sm text-muted-foreground mt-4">
                                {content.timeLabels.message}
                            </p>
                        </div>
                        <ContinueButton onClick={handleContinue}>{content.continue}</ContinueButton>
                    </div>
                );

            // For MVP simplicity, treating other constraints as simple text or selection or just continue
            case 'Money':
            case 'Skills':
            case 'Energy':
            case 'Support':
            case 'Other':
            default:
                // Generic follow up for MVP or specific ones as requested
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <BloomAIBubble
                            message={content.followUpGeneric.replace('{{constraint}}', answers.constraint?.toLowerCase() || '')}
                        />
                        <ContinueButton onClick={handleContinue}>{content.continue}</ContinueButton>
                    </div>
                );
        }
    };

    return (
        <StepContainer>
            {!showFollowUp ? (
                <>
                    <BloomAIBubble
                        message={content.initialBubble.replace('{{goal}}', answers.goal)}
                    />

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {CONSTRAINTS.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => handleConstraintSelect(c.id)}
                                className={cn(
                                    "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 active:scale-95",
                                    answers.constraint === c.id
                                        ? "border-primary bg-primary/5 text-primary"
                                        : "border-border bg-card hover:border-primary/50"
                                )}
                            >
                                <div className={cn(
                                    "mb-3 p-3 rounded-full",
                                    answers.constraint === c.id ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                                )}>
                                    {c.icon}
                                </div>
                                <span className="font-medium">{content.constraints[c.id]}</span>
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                renderFollowUp()
            )}
        </StepContainer>
    );
};
