
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, Sparkles, Heart, DollarSign, Briefcase, Users, Zap, Target } from "lucide-react";
import { OnboardingAnswers } from "@/lib/onboarding/types";

interface StepProps {
    name: string;
    goal: string;
    category: OnboardingAnswers['goalCategory'];
    onChange: (key: keyof OnboardingAnswers, val: any) => void;
    onNext: () => void;
    content: any;
}

const CATEGORIES = [
    { id: 'health', icon: Heart, color: 'text-red-500 bg-red-500/10' },
    { id: 'wealth', icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'career', icon: Briefcase, color: 'text-blue-500 bg-blue-500/10' },
    { id: 'relationships', icon: Users, color: 'text-pink-500 bg-pink-500/10' },
    { id: 'growth', icon: Zap, color: 'text-amber-500 bg-amber-500/10' },
    { id: 'other', icon: Target, color: 'text-zinc-500 bg-zinc-500/10' },
];

export default function Step1Goal({ name, goal, category, onChange, onNext, content }: StepProps) {
    const [typedText, setTypedText] = useState("");
    const fullText = content.bubble.replace('{{name}}', name);

    useEffect(() => {
        let i = 0;
        const speed = 15;
        setTypedText("");
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(prev => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [fullText]);

    const isComplete = goal.length > 3 && category;

    return (
        <div className="flex flex-col gap-8">
            {/* AI Bubble */}
            <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-card rounded-2xl p-6 border shadow-sm relative flex-1">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                        {typedText}
                    </p>
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-card border-l border-t rotate-45" />
                </div>
            </div>

            {/* Input Area */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pl-14 space-y-8"
            >
                <div>
                    <input
                        type="text"
                        value={goal}
                        onChange={(e) => onChange('goal', e.target.value)}
                        placeholder={content.placeholder}
                        className="w-full bg-transparent text-2xl md:text-3xl border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-primary outline-none py-4 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && isComplete && onNext()}
                    />
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{content.areas.label}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isSelected = category === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => onChange('goalCategory', cat.id)}
                                    className={`
                                        flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left
                                        ${isSelected
                                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                                            : 'border-transparent bg-secondary/50 hover:bg-secondary'
                                        }
                                    `}
                                >
                                    <div className={`p-2 rounded-lg ${cat.color}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <span className={`font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {content.areas[cat.id]}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Continue Button */}
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
                        <Send className={`w-5 h-5 transition-transform ${isComplete ? 'group-hover:translate-x-1' : ''}`} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
