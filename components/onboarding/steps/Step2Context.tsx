
"use client"

import { motion } from "framer-motion"
import { Sparkles, Clock, Zap, Timer, Send } from "lucide-react"
import { OnboardingAnswers } from "@/lib/onboarding/types"
import { Input } from "@/components/ui/input"

interface StepProps {
    timePerDay: string;
    energyPeak: string;
    scheduleConstraints: string;
    onChange: (key: keyof OnboardingAnswers, val: any) => void;
    onNext: () => void;
    content: any;
}

export function Step2Context({
    timePerDay,
    energyPeak,
    scheduleConstraints,
    onChange,
    onNext,
    content
}: StepProps) {
    const energyOptions = [
        { id: 'morning', icon: Zap, label: content.energyOptions.morning },
        { id: 'afternoon', icon: Zap, label: content.energyOptions.afternoon },
        { id: 'evening', icon: Zap, label: content.energyOptions.evening },
    ];

    const isComplete = timePerDay && energyPeak;

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
                className="pl-14 space-y-10"
            >
                {/* Time Per Day */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        <Clock className="h-4 w-4" />
                        {content.timeLabel}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {["< 30 min", "1 hour", "2 hours", "4+ hours"].map((t) => (
                            <button
                                key={t}
                                onClick={() => onChange('timePerDay', t)}
                                className={`p-4 rounded-xl border-2 transition-all font-medium ${timePerDay === t
                                    ? 'border-primary bg-primary/5 text-foreground'
                                    : 'border-transparent bg-secondary'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Energy Peak */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        <Zap className="h-4 w-4" />
                        {content.energyLabel}
                    </div>
                    <div className="flex gap-3">
                        {energyOptions.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => onChange('energyPeak', opt.id)}
                                className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${energyPeak === opt.id
                                    ? 'border-primary bg-primary/5 text-foreground'
                                    : 'border-transparent bg-secondary'
                                    }`}
                            >
                                <opt.icon className={`h-6 w-6 ${energyPeak === opt.id ? 'text-primary' : 'text-muted-foreground'}`} />
                                <span className="text-sm font-medium">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Constraints */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        <Timer className="h-4 w-4" />
                        {content.constraintsLabel}
                    </div>
                    <Input
                        value={scheduleConstraints}
                        onChange={(e) => onChange('scheduleConstraints', e.target.value)}
                        placeholder={content.constraintsPlaceholder}
                        className="py-6 rounded-xl bg-secondary border-none"
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={onNext}
                        disabled={!isComplete}
                        className={`
                            group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all
                            ${isComplete
                                ? 'bg-primary text-primary-foreground hover:scale-105 shadow-xl shadow-primary/20'
                                : 'bg-secondary text-muted-foreground cursor-not-allowed'
                            }
                        `}
                    >
                        {content.continue}
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
