
"use client";

import { useDailyStore } from "@/lib/store/useDailyStore";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function OtherActions() {
    const { otherActions, completeAction } = useDailyStore();
    const { t } = useLanguage();

    if (otherActions.length === 0) return null;

    return (
        <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-800">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                    {t('daily.other_actions.title') as string}
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 font-extrabold">
                        {otherActions.length}
                    </span>
                </h3>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t('daily.other_actions.queue') as string}</span>
            </div>

            <div className="flex flex-col gap-4">
                {otherActions.map((action) => (
                    <div
                        key={action.id}
                        onClick={() => completeAction(action.id)}
                        className={cn(
                            "group relative flex cursor-pointer items-center gap-5 rounded-2xl border p-5 transition-all duration-300",
                            // Styles logic
                            action.completed
                                ? "border-emerald-100 bg-emerald-50/60 dark:border-emerald-900/30 dark:bg-emerald-900/10"
                                : "border-zinc-200 bg-white hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-800/40 dark:hover:border-emerald-500/50 dark:hover:bg-zinc-800"
                        )}
                    >
                        {/* Custom Checkbox */}
                        <div
                            className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[2.5px] transition-all duration-300",
                                action.completed
                                    ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-200"
                                    : "border-zinc-300 bg-transparent group-hover:border-emerald-500 group-hover:scale-110 dark:border-zinc-600 dark:group-hover:border-emerald-400"
                            )}
                        >
                            <Check className={cn("h-5 w-5 stroke-[3] transition-transform duration-300", action.completed ? "scale-100" : "scale-0")} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className={cn(
                                "font-semibold text-lg transition-colors duration-200 truncate",
                                action.completed
                                    ? "text-zinc-400 line-through decoration-2 decoration-zinc-300 dark:text-zinc-500"
                                    : "text-zinc-800 group-hover:text-emerald-700 dark:text-zinc-200 dark:group-hover:text-emerald-400"
                            )}>
                                {action.title}
                            </h4>

                            <div className="mt-1.5 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-500 uppercase tracking-wide dark:bg-zinc-800 dark:text-zinc-400">
                                    ⏱ {action.duration}
                                </span>
                                {action.bestTime && (
                                    <span className="inline-flex items-center gap-1.5 rounded-md bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-600 uppercase tracking-wide dark:bg-purple-900/20 dark:text-purple-300">
                                        ⚡ {action.bestTime}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Hover Indicator */}
                        <div className={cn(
                            "h-2 w-2 rounded-full bg-emerald-500 opacity-0 transition-all duration-300 -translate-x-2",
                            !action.completed && "group-hover:opacity-100 group-hover:translate-x-0"
                        )} />
                    </div>
                ))}
            </div>
        </div>
    );
}

