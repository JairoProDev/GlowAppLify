
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";

interface StepProps {
    value: string;
    onChange: (val: string) => void;
    onNext: () => void;
    content: any; // Type from onboardingContent
}

export default function Step1Goal({ value, onChange, onNext, content }: StepProps) {
    const [typedText, setTypedText] = useState("");
    const fullText = content.bubble;

    // Typewriter effect for the AI Bubble
    useEffect(() => {
        let i = 0;
        const speed = 20;
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

    const handleQuickSelect = (goal: string) => {
        onChange(goal);
    };

    const isComplete = value.length > 3;

    return (
        <div className="flex flex-col gap-6">
            {/* AI Bubble */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl rounded-tl-none shadow-sm relative"
            >
                <div className="absolute -left-3 -top-3 bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg leading-relaxed whitespace-pre-wrap text-zinc-800 dark:text-zinc-100">
                    {typedText}
                </p>
            </motion.div>

            {/* Input Area */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
            >
                <div>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={content.placeholder}
                        className="w-full bg-transparent text-xl md:text-2xl border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 outline-none py-4 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && isComplete && onNext()}
                    />
                </div>

                {/* Quick Goals Pills */}
                <div className="flex flex-wrap gap-2">
                    {content.quickGoals.map((goal: string) => (
                        <button
                            key={goal}
                            onClick={() => handleQuickSelect(goal)}
                            className={`px-4 py-2 rounded-full text-sm transition-all border ${value === goal
                                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800'
                                    : 'bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 text-zinc-600 dark:text-zinc-400'
                                }`}
                        >
                            {goal}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Continue Button */}
            <div className="flex justify-end pt-4">
                <button
                    onClick={onNext}
                    disabled={!isComplete}
                    className={`
                        group flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all
                        ${isComplete
                            ? 'bg-black dark:bg-white text-white dark:text-black hover:scale-105 shadow-lg'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                        }
                    `}
                >
                    {content.continue}
                    <Send className={`w-4 h-4 transition-transform ${isComplete ? 'group-hover:translate-x-1' : ''}`} />
                </button>
            </div>
        </div>
    );
}
