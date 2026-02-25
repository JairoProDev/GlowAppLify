
"use client";

import { Moon, Check, ShieldCheck } from "lucide-react";
import { useDailyStore } from "@/lib/store/useDailyStore";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ClosureScreenProps {
    onComplete: () => void;
}

export default function ClosureScreen({ onComplete }: ClosureScreenProps) {
    const { oneThing, otherActions, user } = useDailyStore();
    const { t } = useLanguage();
    const [closing, setClosing] = useState(false);

    const completedCount = [oneThing, ...otherActions].filter(a => a.completed).length;

    const handleSleep = () => {
        setClosing(true);
        setTimeout(() => {
            onComplete();
        }, 1500);
    };

    return (
        <div className={cn(
            "flex min-h-[60vh] flex-col items-center justify-center text-center animate-in fade-in duration-1000",
            closing && "animate-out fade-out duration-1000 scale-95"
        )}>

            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 animate-in zoom-in duration-500 delay-200">
                <Check className="h-10 w-10 stroke-[3]" />
            </div>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {t('daily.evening.closure.title') as string}
            </h1>

            <div className="mb-12 max-w-sm space-y-2 text-zinc-500 dark:text-zinc-400">
                <p>{(t('daily.evening.closure.accomplished') as string).replace('{count}', completedCount.toString())}</p>
                <p>{t('daily.evening.closure.let_go') as string}</p>
            </div>

            <button
                onClick={handleSleep}
                disabled={closing}
                className="group relative flex items-center gap-3 rounded-full bg-indigo-950 px-10 py-5 text-xl font-bold text-indigo-100 shadow-2xl shadow-indigo-900/50 transition-all hover:scale-105 hover:bg-indigo-900 active:scale-95 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:text-zinc-900 dark:shadow-zinc-900/20"
            >
                <Moon className="h-6 w-6 fill-current" />
                {t('daily.evening.closure.sleep_mode') as string}
            </button>

            <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                <ShieldCheck className="h-4 w-4" />
                {t('daily.evening.closure.no_notifications') as string}
            </div>
        </div>
    );
}

