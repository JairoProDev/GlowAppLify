
import React from 'react';
import { AnalyticsOverview } from '@/lib/types/analytics';
import { Target, Calendar, CheckCircle, Clock, TrendingUp, Trophy, Flame } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this utility exists

interface ProgressOverviewProps {
    data: AnalyticsOverview;
    onViewDetails: () => void;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({ data, onViewDetails }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Info */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Your Progress</h2>
                    <p className="text-gray-500 dark:text-gray-400">{data.currentDate}</p>
                </div>
            </div>

            {/* 90-Day Goal Progress */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                        <Target size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">90-Day Goal</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{data.goal}</p>
                    </div>
                </div>

                <div className="relative h-8 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-out flex items-center justify-end px-3"
                        style={{ width: `${data.overallCompletionRate}%` }}
                    >
                    </div>
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-sm text-gray-700 dark:text-gray-300">
                        {data.overallCompletionRate}% Complete
                    </span>
                </div>

                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Week {data.currentWeek.weekNumber} of 12</span>
                    <span>{data.daysActive} days in • {90 - data.daysActive} days to go</span>
                </div>
            </div>

            {/* Current Week Progress */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Current Week: {data.currentWeek.theme}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-2 w-24 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${data.currentWeek.completionRate}%` }} />
                            </div>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{data.currentWeek.completionRate}%</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Milestone</p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{data.currentWeek.milestone}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {data.currentWeek.actions.map((action, idx) => (
                        <div key={idx} className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border transition-all",
                            action.completed
                                ? "bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30 opacity-70"
                                : "bg-gray-50 dark:bg-zinc-800/50 border-transparent"
                        )}>
                            <div className={cn(
                                "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2",
                                action.completed
                                    ? "bg-green-500 border-green-500 text-white"
                                    : "border-gray-300 dark:border-gray-600 text-transparent"
                            )}>
                                {action.completed && <CheckCircle size={14} />}
                            </div>
                            <div className="flex-1">
                                <p className={cn("text-sm font-medium", action.completed ? "text-gray-500 line-through" : "text-gray-900 dark:text-white")}>
                                    {action.action}
                                </p>
                                <p className="text-xs text-gray-500">{action.time} • {action.timeOfDay}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Story Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-3xl border-l-4 border-blue-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Trophy size={64} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                    <Flame className="text-orange-500" size={20} />
                    {data.story.title}
                </h3>
                <div className="space-y-3 text-blue-800 dark:text-blue-200 text-sm leading-relaxed max-w-2xl">
                    {data.story.content.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                {data.story.stats && (
                    <div className="flex gap-4 mt-6">
                        {data.story.stats.map((stat, i) => (
                            <div key={i} className="bg-white/50 dark:bg-black/20 px-3 py-1.5 rounded-lg text-sm">
                                <span className="text-blue-600 dark:text-blue-300 font-semibold">{stat.label}:</span>{' '}
                                <span className="font-bold text-blue-900 dark:text-white">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<Flame className="text-orange-500" />}
                    label="Streak"
                    value={`${data.streak} Days`}
                />
                <StatCard
                    icon={<CheckCircle className="text-green-500" />}
                    label="Completed"
                    value={`${data.totalActionsCompleted}/${data.totalActions}`}
                />
                <StatCard
                    icon={<Clock className="text-blue-500" />}
                    label="Time Focused"
                    value="6.5h"
                />
                <StatCard
                    icon={<Target className="text-purple-500" />}
                    label="Milestones"
                    value="0/12"
                />
            </div>

            <div className="flex justify-center pt-4">
                <button
                    onClick={onViewDetails}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors underline decoration-dotted"
                >
                    View Weekly Breakdown
                </button>
            </div>

        </div>
    );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
        <div className="mb-2 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-sm">{icon}</div>
        <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
    </div>
);
