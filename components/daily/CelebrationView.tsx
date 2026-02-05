
"use client";

import { useDailyStore } from "@/lib/store/useDailyStore";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { ArrowRight, Trophy, Zap, Target } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CelebrationView() {
    const { user, setView } = useDailyStore();
    const { t } = useLanguage();

    useEffect(() => {
        // Confetti Explosion
        const end = Date.now() + 2000;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#00C853', '#00E676', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#00C853', '#00E676', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-xl animate-in fade-in duration-500 dark:bg-zinc-950/95">
            <div className="w-full max-w-lg p-8 text-center">

                <div className="mb-6 flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-6xl shadow-xl shadow-emerald-200 animate-in zoom-in spin-in-180 duration-700 dark:bg-emerald-900/30 dark:shadow-emerald-900/20">
                        🎉
                    </div>
                </div>

                <h1 className="mb-2 text-4xl font-extrabold text-zinc-900 animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300 dark:text-white uppercase">
                    {t('daily.celebration.mainTitle') as string}
                </h1>

                <div className="mb-8 text-lg font-medium text-zinc-500 animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-500 dark:text-zinc-400">
                    {t('daily.celebration.impactMessage') as string}
                </div>

                <div className="mb-8 space-y-4 rounded-2xl bg-zinc-50 p-6 ring-1 ring-zinc-100 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 dark:bg-zinc-900 dark:ring-zinc-800">

                    <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <Target className="h-5 w-5" />
                            </div>
                            <span className="font-semibold text-zinc-700 dark:text-zinc-200">{t('daily.celebration.weeklyGoal') as string}</span>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-zinc-900 dark:text-white">60% {t('daily.celebration.done') as string}</div>
                            <div className="text-xs text-emerald-600 dark:text-emerald-400">{t('daily.celebration.todayBoost') as string}</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                                <Zap className="h-5 w-5" />
                            </div>
                            <span className="font-semibold text-zinc-700 dark:text-zinc-200">{t('daily.celebration.dayStreak') as string}</span>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-zinc-900 dark:text-white">{user.streak} {t('daily.morning.days') as string}</div>
                            <div className="text-xs text-orange-600 dark:text-orange-400">{t('daily.celebration.onFire') as string}</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                <Trophy className="h-5 w-5" />
                            </div>
                            <span className="font-semibold text-zinc-700 dark:text-zinc-200">{t('daily.celebration.impact') as string}</span>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-zinc-900 dark:text-white">{t('daily.celebration.high') as string}</div>
                            <div className="text-xs text-zinc-500">{t('daily.celebration.investorReady') as string}</div>
                        </div>
                    </div>

                </div>

                <button
                    onClick={() => setView('morning')}
                    className="group w-full rounded-xl bg-zinc-900 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-95 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 animate-in fade-in duration-1000 delay-1000"
                >
                    <span className="flex items-center justify-center gap-2">
                        {t('daily.celebration.continueButton') as string}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                </button>

            </div>
        </div>
    );
}
