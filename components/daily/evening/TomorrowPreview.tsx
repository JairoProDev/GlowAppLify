
"use client";

import { useDailyStore } from "@/lib/store/useDailyStore";
import { ArrowRight, Calendar, Clock, MapPin, Target } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TomorrowPreviewProps {
    onContinue: () => void;
}

export default function TomorrowPreview({ onContinue }: TomorrowPreviewProps) {
    const { oneThing, otherActions } = useDailyStore();
    const { t } = useLanguage();
    const incompleteActions = [oneThing, ...otherActions].filter(a => !a.completed);

    return (
        <div className="mx-auto w-full max-w-2xl animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('daily.evening.tomorrow.title') as string}</h2>
                <p className="text-zinc-500 dark:text-zinc-400">{t('daily.evening.tomorrow.subtitle') as string}</p>
            </div>

            <div className="space-y-6">
                {/* Moved Tasks Section */}
                {incompleteActions.length > 0 && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800/50 dark:bg-amber-900/10">
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500">
                            {t('daily.evening.tomorrow.moved_title') as string}
                        </h3>
                        <div className="space-y-3">
                            {incompleteActions.map(action => (
                                <div key={action.id} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-800">
                                    <div className="rounded-lg bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-zinc-900 dark:text-white">{action.title}</div>
                                        <div className="text-xs text-zinc-500">{t('daily.evening.tomorrow.rescheduled') as string}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tomorrow's One Thing */}
                <div className="rounded-3xl bg-white p-1 shadow-xl shadow-zinc-200/50 ring-1 ring-zinc-100 dark:bg-zinc-900 dark:shadow-zinc-950/50 dark:ring-zinc-800">
                    <div className="rounded-[20px] bg-gradient-to-br from-indigo-500 to-violet-600 p-8 text-white">
                        <div className="mb-6 flex items-center gap-2 text-indigo-100">
                            <Target className="h-5 w-5" />
                            <span className="font-bold uppercase tracking-wider">{t('daily.evening.tomorrow.one_thing') as string}</span>
                        </div>

                        <h3 className="mb-4 text-3xl font-bold leading-tight">
                            Interview 5 more users
                        </h3>

                        <div className="flex flex-wrap gap-4 text-indigo-100">
                            <div className="flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 backdrop-blur-md">
                                <Clock className="h-4 w-4" /> 10am - 12pm
                            </div>
                            <div className="flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 backdrop-blur-md">
                                <MapPin className="h-4 w-4" /> Home Office
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={onContinue}
                    className="group flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-zinc-900 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                    {t('daily.evening.tomorrow.ready') as string}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
}

