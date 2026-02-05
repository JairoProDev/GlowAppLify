
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { onboardingContent } from "@/lib/i18n/onboardingContent";

interface Props {
    language: "es" | "en";
}

export default function OnboardingLoading({ language }: Props) {
    const t = onboardingContent[language].loading;
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Simulation of REAL-TIME generation steps
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1; // 1% every 100ms -> 10 seconds total
            });
        }, 120); // 12 seconds approx total time

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Sync text steps with progress milestones
        if (progress > 10) setCurrentStepIndex(1); // Designing execution plan
        if (progress > 30) setCurrentStepIndex(2); // Generating daily actions
        if (progress > 55) setCurrentStepIndex(3); // Building habits
        if (progress > 75) setCurrentStepIndex(4); // Obstacle plans
        if (progress > 90) setCurrentStepIndex(5); // Almost there
    }, [progress]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-8">
            {/* Main Spinner / Visualizer */}
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                    <circle
                        className="text-zinc-200 dark:text-zinc-800"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                    />
                    <circle
                        className="text-black dark:text-white"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        strokeDasharray={283}
                        strokeDashoffset={283 - (283 * progress) / 100}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="text-3xl font-bold">{progress}%</div>
            </div>

            {/* Live Action Status */}
            <div className="space-y-2 h-20">
                <motion.h2
                    key={currentStepIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400"
                >
                    {t.steps[currentStepIndex]}
                </motion.h2>
                <p className="text-sm text-zinc-500 animate-pulse">
                    {language === 'es' ? 'Construyendo...' : 'Building...'}
                </p>
            </div>

            {/* Dopamine Box: "Did you know?" */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="max-w-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-left"
            >
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-indigo-500 tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                    {t.didYouKnow}
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 italic">
                    "{t.facts[Math.floor(progress / 20) % t.facts.length]}"
                </p>
            </motion.div>
        </div>
    );
}
