
"use client";

import React from 'react';
import { Insight } from '@/lib/types/analytics';
import { Brain, TrendingUp, Zap, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface InsightsTabProps {
    insights: Insight[];
}

export const InsightsTab: React.FC<InsightsTabProps> = ({ insights }) => {
    const { t } = useLanguage();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/50 flex items-start gap-3">
                <BrainClassName className="text-purple-600 mt-1 flex-shrink-0" size={24} />
                <div>
                    <h3 className="font-bold text-purple-900 dark:text-purple-100">{t('analytics.ai_insights') as string}</h3>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                        {t('analytics.analysis_7d') as string}
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                {insights.map((insight) => (
                    <InsightCard key={insight.id} insight={insight} />
                ))}
            </div>

            {/* Trends Summary */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="text-blue-500" /> {t('analytics.your_trends') as string}
                </h3>
                <div className="grid gap-4 text-sm">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                        <span className="text-gray-600 dark:text-gray-400">{t('analytics.completion_rate') as string}</span>
                        <span className="font-bold text-green-600">67% → 75% ↑</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                        <span className="text-gray-600 dark:text-gray-400">{t('analytics.avg_time') as string}</span>
                        <span className="font-bold text-gray-900 dark:text-white">1.5h (efficient)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                        <span className="text-gray-600 dark:text-gray-400">{t('analytics.best_day') as string}</span>
                        <span className="font-bold text-gray-900 dark:text-white">Tuesday (100%)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BrainClassName = ({ className, size }: { className?: string, size: number }) => (
    <div className={className}><Brain size={size} /></div>
)

const InsightCard: React.FC<{ insight: Insight }> = ({ insight }) => {
    const { t } = useLanguage();
    const isPattern = insight.type === 'pattern';
    const isPrediction = insight.type === 'prediction';

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
                {isPattern && <Zap className="text-yellow-500" size={18} />}
                {isPrediction && <Calendar className="text-blue-500" size={18} />}
                {!isPattern && !isPrediction && <TrendingUp className="text-green-500" size={18} />}

                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {isPattern ? t('analytics.pattern_detected') : isPrediction ? t('analytics.prediction') : t('analytics.recommendation')}
                </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{insight.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                {insight.description}
            </p>

            {/* Visualization for Pattern (Mock) */}
            {isPattern && insight.data && (
                <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4 mb-4">
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium">With Morning Ritual</span>
                                <span className="font-bold text-green-600">{insight.data.withRitual || '80%'}</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[83%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium">Without Morning Ritual</span>
                                <span className="font-bold text-gray-500">{insight.data.withoutRitual || '40%'}</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-400 w-[40%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl">
                <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">{t('analytics.suggestion_label') as string}</p>
                <p className="text-sm text-blue-700 dark:text-blue-200 mb-3">
                    {insight.action}
                </p>
                {insight.canApplyAutomatically && (
                    <button className="flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors">
                        {t('analytics.apply_auto')} <ArrowRight size={14} />
                    </button>
                )}
                {!insight.canApplyAutomatically && (
                    <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                        {t('analytics.add_reminder')}
                    </button>
                )}
            </div>
        </div>
    );
};

