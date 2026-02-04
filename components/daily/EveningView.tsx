
"use client";

import { useDailyStore } from "@/lib/store/useDailyStore";
import { useState } from "react";
import { Check, X, Moon, Save, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EveningView() {
    const { oneThing, otherActions, submitEveningCheckIn } = useDailyStore();
    const [reflection, setReflection] = useState("");
    const [mood, setMood] = useState<number | null>(null);

    return (
        <div className="mx-auto max-w-2xl px-6 py-16 animate-in slide-in-from-bottom-8 duration-700 font-sans">
            <header className="mb-12 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 shadow-xl shadow-indigo-100 ring-4 ring-white dark:bg-indigo-900/20 dark:text-indigo-400 dark:ring-indigo-900/10 dark:shadow-none">
                    <Moon className="h-10 w-10" />
                </div>
                <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white md:text-5xl">Evening Reset</h1>
                <p className="mt-3 text-xl text-zinc-500 dark:text-zinc-400 font-medium">Close your day with intention.</p>
            </header>

            {/* Scorecard Card */}
            <div className="mb-10 overflow-hidden rounded-[2rem] bg-white border border-zinc-100 shadow-2xl shadow-zinc-200/50 dark:bg-zinc-900 dark:shadow-black/50 dark:border-zinc-800">
                <div className="bg-gradient-to-r from-zinc-50 to-white px-8 py-6 border-b border-zinc-100 flex items-center gap-3 dark:from-zinc-800 dark:to-zinc-900 dark:border-zinc-800">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg dark:bg-amber-900/30 dark:text-amber-400">
                        <Star className="h-5 w-5 fill-current" />
                    </div>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Today's Wins</h2>
                </div>
                <div className="p-8">
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <div className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                                oneThing.completed
                                    ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-none"
                                    : "border-red-200 bg-red-50 text-red-500 dark:bg-red-900/10 dark:text-red-400"
                            )}>
                                {oneThing.completed ? <Check className="h-5 w-5 stroke-[3]" /> : <X className="h-5 w-5" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded dark:bg-emerald-900/30 dark:text-emerald-400">
                                        Top Priority
                                    </span>
                                </div>
                                <span className={cn(
                                    "block text-lg font-bold leading-tight",
                                    oneThing.completed ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"
                                )}>
                                    {oneThing.title}
                                </span>
                            </div>
                        </li>

                        {otherActions.map(action => (
                            <li key={action.id} className="flex items-center gap-4 pl-1">
                                <div className={cn(
                                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                                    action.completed
                                        ? "border-emerald-500 bg-white text-emerald-600 dark:bg-transparent dark:text-emerald-400"
                                        : "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800"
                                )}>
                                    {action.completed ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : null}
                                </div>
                                <span className={cn(
                                    "font-medium  text-base",
                                    action.completed ? "text-zinc-700 dark:text-zinc-300 line-through decoration-zinc-300" : "text-zinc-500 dark:text-zinc-500"
                                )}>
                                    {action.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mood Selector */}
            <div className="mb-10">
                <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-2">How do you feel?</h3>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { val: 1, label: 'Low', emoji: '😫' },
                        { val: 2, label: 'Okay', emoji: '😐' },
                        { val: 3, label: 'Great', emoji: '🤩' },
                    ].map((item) => (
                        <button
                            key={item.val}
                            onClick={() => setMood(item.val)}
                            className={cn(
                                "group flex flex-col items-center justify-center rounded-2xl border-2 p-6 transition-all duration-300 bg-white dark:bg-zinc-900",
                                mood === item.val
                                    ? "border-indigo-600 bg-indigo-50/50 shadow-xl shadow-indigo-100 scale-[1.02] dark:bg-indigo-900/20 dark:border-indigo-500 dark:shadow-none"
                                    : "border-transparent hover:border-zinc-200 hover:shadow-lg dark:hover:border-zinc-700"
                            )}
                        >
                            <span className="text-4xl mb-3 filter grayscale group-hover:grayscale-0 transition-all duration-300">{item.emoji}</span>
                            <span className={cn(
                                "text-sm font-bold",
                                mood === item.val ? "text-indigo-700 dark:text-indigo-300" : "text-zinc-400 dark:text-zinc-500"
                            )}>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Reflection Input */}
            <div className="mb-12">
                <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-2">Daily Reflection</h3>
                <div className="relative">
                    <textarea
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                        placeholder="What went well today? What did you learn?"
                        className="w-full min-h-[140px] rounded-3xl border-0 bg-white p-6 text-lg text-zinc-900 placeholder:text-zinc-300 shadow-xl shadow-zinc-100 focus:ring-4 focus:ring-indigo-500/10 focus:shadow-2xl focus:shadow-indigo-500/10 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-700 dark:shadow-none resize-none transition-all"
                    />
                    <div className="absolute bottom-4 right-4 pointer-events-none">
                        <div className="h-8 w-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300 dark:bg-zinc-800 dark:text-zinc-600">
                            <span className="text-xs font-bold">✎</span>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => submitEveningCheckIn({ mood, reflection })}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[20px] bg-zinc-900 py-6 text-lg font-bold text-white shadow-2xl shadow-zinc-900/20 transition-all hover:scale-[1.01] hover:shadow-zinc-900/30 active:scale-[0.99] dark:bg-white dark:text-zinc-900"
            >
                <span className="relative z-10 flex items-center gap-2">
                    Save & Close Day
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
        </div>
    );
}
