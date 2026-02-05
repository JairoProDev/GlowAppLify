
"use client";

import { useDailyStore } from "@/lib/store/useDailyStore";
import { useEffect, useState } from "react";
import { Maximize, Pause, Play, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DeepWorkView() {
    const { oneThing, completeOneThing, setView } = useDailyStore();
    const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds
    const [isActive, setIsActive] = useState(true);
    const { t } = useLanguage();

    // Simple Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Format Time
    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = ((2 * 60 * 60 - timeLeft) / (2 * 60 * 60)) * 100;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white animate-in fade-in duration-700">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-2xl px-8 text-center">

                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium text-emerald-400">
                    <Maximize className="h-4 w-4" />
                    <span className="uppercase tracking-widest">{t('energy.peak') as string} MODE</span>
                </div>

                <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-5xl leading-tight">
                    {oneThing.title}
                </h1>

                {/* Timer Container */}
                <div className="relative mx-auto mb-12 h-64 w-64 md:h-80 md:w-80 flex items-center justify-center">
                    {/* Progress Ring (SVG) */}
                    <svg className="absolute inset-0 h-full w-full -rotate-90 transform text-emerald-500" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeOpacity="0.1"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="283"
                            strokeDashoffset={283 - (283 * progress) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-linear"
                        />
                    </svg>

                    <div className="text-6xl font-black md:text-7xl font-mono tracking-tighter tabular-nums text-emerald-50">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Controls */}
                <div className="mb-16 flex items-center justify-center gap-4">
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
                    >
                        {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                    </button>

                    <button
                        onClick={completeOneThing}
                        className="group flex h-16 items-center gap-3 rounded-full bg-emerald-500 px-8 font-bold text-zinc-950 transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95"
                    >
                        <CheckCircle2 className="h-6 w-6" />
                        <span>{t('daily.deepWork.done') as string}</span>
                    </button>
                </div>

                {/* Tips */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-left">
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400">
                        💡 {t('daily.deepWork.tips') as string}
                    </h3>
                    <ul className="grid grid-cols-1 gap-4 text-sm text-zinc-300 sm:grid-cols-2 md:text-base">
                        <li className="flex items-center gap-2">• {t('daily.deepWork.tip1') as string}</li>
                        <li className="flex items-center gap-2">• {t('daily.deepWork.tip2') as string}</li>
                        <li className="flex items-center gap-2">• {t('daily.deepWork.tip3') as string}</li>
                        <li className="flex items-center gap-2">• {t('daily.deepWork.tip4') as string}</li>
                    </ul>
                </div>

                <button
                    onClick={() => setView('morning')}
                    className="mt-8 text-sm text-zinc-500 hover:text-white transition-colors"
                >
                    {t('daily.deepWork.exit') as string}
                </button>

            </div>
        </div>
    );
}
