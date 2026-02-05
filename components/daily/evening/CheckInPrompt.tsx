
"use client";

import { ArrowRight, Moon } from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CheckInPromptProps {
    onStart: () => void;
}

export default function CheckInPrompt({ onStart }: CheckInPromptProps) {
    const { t, language } = useLanguage();
    const dateLocale = language === 'es' ? es : enUS;

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:ring-indigo-800">
                <Moon className="h-10 w-10 fill-current" />
            </div>

            <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                {t('daily.evening.checkInTitle') as string}
            </h1>

            <p className="mb-2 text-lg font-medium text-zinc-500 dark:text-zinc-400">
                <span className="capitalize">{format(new Date(), "EEEE, MMMM d", { locale: dateLocale })}</span> • {format(new Date(), "p", { locale: dateLocale })}
            </p>

            <div className="mb-10 max-w-md rounded-2xl bg-zinc-50 p-6 text-zinc-600 dark:bg-zinc-900/50 dark:text-zinc-400">
                <p className="text-lg">
                    {t('daily.evening.checkInSubtitle') as string}
                </p>
                <p className="mt-2 text-sm font-semibold text-indigo-500">{t('daily.evening.takesTime') as string}</p>
            </div>

            <button
                onClick={onStart}
                className="group flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-xl font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95 dark:shadow-indigo-900/30"
            >
                {t('daily.evening.startCheckIn') as string}
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </button>
        </div>
    );
}
