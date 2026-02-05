
import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useLanguage } from '../../lib/i18n/LanguageContext';
import { onboardingContent } from '../../lib/i18n/onboardingContent';



export const OnboardingLoading: React.FC = () => {
    const { language } = useLanguage();
    const content = onboardingContent[language].loading;
    const LOADING_STEPS = content.steps;
    const FACTS = content.facts;

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [currentFactIndex, setCurrentFactIndex] = useState(0);

    useEffect(() => {
        // Progress bar and steps simulation
        const totalTime = 30000; // 30 seconds total
        const intervalTime = 100;
        const stepsCount = LOADING_STEPS.length;
        const stepDuration = totalTime / stepsCount;

        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                // Non-linear progress for realism
                const increment = (100 / (totalTime / intervalTime)) * (Math.random() * 1.5 + 0.5);
                return Math.min(oldProgress + increment, 100);
            });
        }, intervalTime);

        // Switch steps text
        const stepTimer = setInterval(() => {
            setCurrentStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
        }, stepDuration);

        // Rotate facts
        const factTimer = setInterval(() => {
            setCurrentFactIndex((prev) => (prev + 1) % FACTS.length);
        }, 6000);

        return () => {
            clearInterval(timer);
            clearInterval(stepTimer);
            clearInterval(factTimer);
        };
    }, []);

    // Update current step index based on progress more accurately
    useEffect(() => {
        const calculatedStep = Math.min(
            Math.floor((progress / 100) * LOADING_STEPS.length),
            LOADING_STEPS.length - 1
        );
        if (calculatedStep !== currentStepIndex) {
            setCurrentStepIndex(calculatedStep);
        }
    }, [progress]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in duration-1000">

            {/* Magic Animation */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                <div className="relative bg-card p-6 rounded-full border border-border shadow-xl">
                    <Sparkles className="w-12 h-12 text-primary animate-spin-slow" />
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {content.headline}
            </h2>

            <p className="text-lg text-muted-foreground mb-8 min-h-[30px] transition-all duration-300">
                <span key={currentStepIndex} className="animate-in fade-in slide-in-from-bottom-2">
                    {LOADING_STEPS[currentStepIndex]}
                </span>
            </p>

            {/* Progress Bar */}
            <div className="w-full max-w-md h-3 bg-secondary rounded-full overflow-hidden mb-4 relative">
                <div
                    className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] skew-x-12" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-12">{Math.round(progress)}%</p>

            {/* Rotating Facts */}
            <div className="max-w-md bg-secondary/30 border border-secondary p-6 rounded-2xl relative overflow-hidden transition-all duration-500">
                <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-yellow-500 shrink-0" />
                    <div className="text-left">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{content.didYouKnow}</p>
                        <p key={currentFactIndex} className="text-sm animate-in fade-in slide-in-from-right-4 duration-500">
                            {FACTS[currentFactIndex]}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};
