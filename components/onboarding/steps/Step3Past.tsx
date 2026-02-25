
"use client"

import { motion } from "framer-motion"
import { Sparkles, ShieldAlert, CheckCircle2, Send } from "lucide-react"
import { OnboardingAnswers } from "@/lib/onboarding/types"

interface StepProps {
    selectedObstacles: string[];
    onChange: (key: keyof OnboardingAnswers, val: any) => void;
    onNext: () => void;
    content: any;
}

export function Step3Past({ selectedObstacles, onChange, onNext, content }: StepProps) {
    const toggleObstacle = (obs: string) => {
        if (selectedObstacles.includes(obs)) {
            onChange('obstacles', selectedObstacles.filter(o => o !== obs));
        } else {
            onChange('obstacles', [...selectedObstacles, obs]);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-card rounded-2xl p-6 border shadow-sm relative flex-1">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                        {content.bubble}
                    </p>
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-card border-l border-t rotate-45" />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pl-14 space-y-6"
            >
                <div className="space-y-4">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {content.obstaclesLabel}
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        {content.obstacles.map((obs: string) => {
                            const isSelected = selectedObstacles.includes(obs);
                            return (
                                <button
                                    key={obs}
                                    onClick={() => toggleObstacle(obs)}
                                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${isSelected
                                            ? 'border-primary bg-primary/5 text-foreground'
                                            : 'border-transparent bg-secondary'
                                        }`}
                                >
                                    <span className="font-medium">{obs}</span>
                                    {isSelected ? (
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                    ) : (
                                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={onNext}
                        className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all bg-primary text-primary-foreground hover:scale-105 shadow-xl shadow-primary/20"
                    >
                        {content.continue}
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
