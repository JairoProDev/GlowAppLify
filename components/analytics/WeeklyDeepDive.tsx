
"use client";

import React, { useState } from 'react';
import { Week } from '@/lib/types'; // Base Week type
import { CheckCircle, Circle, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface WeeklyDeepDiveProps {
    weeks: Week[];
    currentWeekNumber: number;
}

export const WeeklyDeepDive: React.FC<WeeklyDeepDiveProps> = ({ weeks, currentWeekNumber }) => {
    const { t } = useLanguage();
    const [expandedWeek, setExpandedWeek] = useState<number>(currentWeekNumber);

    const toggleWeek = (weekNum: number) => {
        if (weekNum === expandedWeek) {
            setExpandedWeek(-1); // Collapse
        } else {
            setExpandedWeek(weekNum);
        }
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('analytics.week_breakdown') as string}</h2>

            {weeks.map((week) => {
                const isPast = week.weekNumber < currentWeekNumber;
                const isCurrent = week.weekNumber === currentWeekNumber;
                const isFuture = week.weekNumber > currentWeekNumber;
                const isLocked = isFuture; // Simple logic for now
                const isExpanded = expandedWeek === week.weekNumber;

                // Mock calculation for progress bar
                const progress = isPast ? 100 : isCurrent ? 60 : 0;

                return (
                    <div
                        key={week.weekNumber}
                        className={cn(
                            "rounded-2xl border transition-all duration-300 overflow-hidden",
                            isCurrent ? "bg-white dark:bg-zinc-900 border-blue-200 dark:border-blue-900 shadow-md ring-1 ring-blue-100 dark:ring-blue-900/50" :
                                isPast ? "bg-gray-50 dark:bg-zinc-900/50 border-gray-200 dark:border-zinc-800" :
                                    "bg-gray-50 dark:bg-zinc-900/30 border-gray-100 dark:border-zinc-800 opacity-70"
                        )}
                    >
                        <button
                            onClick={() => !isLocked && toggleWeek(week.weekNumber)}
                            className="w-full text-left p-5 flex items-center justify-between"
                            disabled={isLocked}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className={cn(
                                        "text-sm font-bold uppercase tracking-wider",
                                        isCurrent ? "text-blue-600 dark:text-blue-400" :
                                            isPast ? "text-green-600 dark:text-green-400" : "text-gray-400"
                                    )}>
                                        {t('analytics.week_label' as string)} {week.weekNumber}
                                    </span>
                                    {isCurrent && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{t('analytics.current_status' as string)}</span>}
                                    {isPast && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{t('analytics.complete_status_label' as string)}</span>}
                                </div>
                                <h3 className={cn("font-bold text-lg", isLocked ? "text-gray-400" : "text-gray-900 dark:text-white")}>
                                    {week.theme}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {isLocked ? t('analytics.unlock_previous') : (t('analytics.milestone_prefix') as string).replace('{milestone}', week.milestone)}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {!isLocked && (
                                    <div className="flex flex-col items-end gap-1 min-w-[3rem]">
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{progress}%</span>
                                        <div className="w-16 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }} />
                                        </div>
                                    </div>
                                )}
                                {isLocked ? (
                                    <Lock className="text-gray-300" size={20} />
                                ) : (
                                    isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />
                                )}
                            </div>
                        </button>

                        {/* Expanded Content */}
                        <div
                            className={cn(
                                "transition-all duration-300 ease-in-out border-t border-dashed border-gray-200 dark:border-zinc-800",
                                isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                            )}
                        >
                            <div className="p-5 bg-gray-50/50 dark:bg-black/20 space-y-3">
                                {week.actions.map((action, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-5 h-5 rounded-full flex items-center justify-center border",
                                            isPast || (isCurrent && idx < 3) ? "bg-green-500 border-green-500 text-white" : "border-gray-300 text-transparent"
                                        )}>
                                            <CheckCircle size={12} />
                                        </div>
                                        <span className={cn(
                                            "text-sm",
                                            isPast || (isCurrent && idx < 3) ? "text-gray-500 line-through" : "text-gray-700 dark:text-gray-300"
                                        )}>
                                            {action.action}
                                        </span>
                                    </div>
                                ))}

                                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                                    <span className="text-xs font-medium text-gray-500">
                                        {(t('analytics.est_completion') as string).replace('{day}', isCurrent ? 'Friday' : '-')}
                                    </span>
                                    <span className={cn(
                                        "text-xs font-bold px-2 py-1 rounded",
                                        isCurrent || isPast ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                    )}>
                                        {isCurrent ? t('analytics.on_track') : isPast ? t('analytics.complete_status_label') : t('analytics.locked_status')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

