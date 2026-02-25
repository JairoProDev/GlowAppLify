
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onboardingContent } from "@/lib/i18n/onboardingContent";
import { Loader2, Sparkles, Brain, Cpu, Zap, Globe } from "lucide-react";

interface Props {
    language: "es" | "en";
}

export default function OnboardingLoading({ language }: Props) {
    const t = onboardingContent[language].loading;
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Vary speed for realism
                const increment = prev < 80 ? 0.8 : 0.3;
                return Math.min(100, prev + increment);
            });
        }, 80);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress > 15) setCurrentStepIndex(1);
        if (progress > 35) setCurrentStepIndex(2);
        if (progress > 60) setCurrentStepIndex(3);
        if (progress > 80) setCurrentStepIndex(4);
        if (progress > 95) setCurrentStepIndex(5);
    }, [progress]);

    const icons = [Sparkles, Brain, Cpu, Zap, Globe, Loader2];
    const ActiveIcon = icons[currentStepIndex] || Loader2;

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />

            {/* Progress Central */}
            <div className="relative mb-12">
                <div className="w-48 h-48 rounded-full border-4 border-secondary flex items-center justify-center relative shadow-2xl shadow-primary/10">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            className="text-primary transition-all duration-300 ease-out"
                            strokeWidth="4"
                            stroke="currentColor"
                            fill="transparent"
                            r="48"
                            cx="50"
                            cy="50"
                            strokeDasharray={301.59}
                            strokeDashoffset={301.59 - (301.59 * progress) / 100}
                            strokeLinecap="round"
                        />
                    </svg>

                    <div className="flex flex-col items-center">
                        <motion.div
                            key={currentStepIndex}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-primary/10 p-4 rounded-2xl mb-2"
                        >
                            <ActiveIcon className="h-8 w-8 text-primary animate-pulse" />
                        </motion.div>
                        <span className="text-4xl font-black tracking-tighter">{Math.floor(progress)}%</span>
                    </div>
                </div>
            </div>

            {/* Status Steps */}
            <div className="space-y-4 max-w-lg mx-auto h-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStepIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-2"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            {t.steps[currentStepIndex]}
                        </h2>
                        <div className="flex items-center justify-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-bounce" />
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em]">
                                {language === 'es' ? 'Optimizando Sistemas' : 'Optimizing Systems'}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Did You Know Banner */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-16 w-full max-w-md p-6 rounded-3xl bg-secondary/40 backdrop-blur-xl border border-primary/5 shadow-xl"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/20">
                        <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-primary/80">
                        {t.didYouKnow}
                    </span>
                </div>
                <p className="text-base text-left font-medium leading-relaxed text-foreground/80 italic">
                    "{t.facts[Math.floor(progress / 20) % t.facts.length]}"
                </p>
            </motion.div>
        </div>
    );
}
