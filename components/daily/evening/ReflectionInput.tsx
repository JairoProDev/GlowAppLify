
"use client";

import { useState } from "react";
import { ArrowRight, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ReflectionInputProps {
    onSave: (text: string) => void;
}

export default function ReflectionInput({ onSave }: ReflectionInputProps) {
    const { t } = useLanguage();
    const [reflection, setReflection] = useState("");
    const MAX_CHARS = 200;

    const handleSubmit = () => {
        onSave(reflection);
    };

    return (
        <div className="mx-auto w-full max-w-2xl animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('daily.evening.reflection_step.title') as string}</h2>
                <p className="text-zinc-500 dark:text-zinc-400">{t('daily.evening.reflection_step.subtitle') as string}</p>
            </div>

            <div className="relative rounded-2xl bg-white p-2 shadow-xl ring-1 ring-zinc-100 focus-within:ring-2 focus-within:ring-indigo-500 dark:bg-zinc-900 dark:ring-zinc-800 dark:focus-within:ring-indigo-500 transition-shadow">
                <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value.slice(0, MAX_CHARS))}
                    placeholder={t('daily.evening.reflection_step.placeholder') as string}
                    className="w-full resize-none border-none bg-transparent p-4 text-xl leading-relaxed text-zinc-900 placeholder:text-zinc-300 focus:ring-0 dark:text-white dark:placeholder:text-zinc-700 h-32"
                    autoFocus
                />
                <div className="absolute bottom-4 right-4 text-sm font-medium text-zinc-400">
                    {reflection.length}/{MAX_CHARS}
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
                <button
                    onClick={handleSubmit}
                    disabled={reflection.length === 0}
                    className={cn(
                        "group flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
                        reflection.length === 0 && "opacity-0 pointer-events-none hidden" // Hide main button if empty
                    )}
                >
                    {t('daily.evening.reflection_step.save') as string}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

                {reflection.length === 0 && (
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 rounded-xl px-8 py-3 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                    >
                        {t('daily.evening.reflection_step.skip') as string} <SkipForward className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

