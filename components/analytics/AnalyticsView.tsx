
"use client";

import React, { useEffect, useState } from 'react';
import { ProgressOverview } from './ProgressOverview';
import { WeeklyDeepDive } from './WeeklyDeepDive';
import { InsightsTab } from './InsightsTab';
import { MilestoneCelebration } from './MilestoneCelebration';
import { getAnalyticsData } from '@/lib/ai/analytics';
import { AnalyticsOverview } from '@/lib/types/analytics';
import { useDailyStore } from '@/lib/store/useDailyStore'; // Assuming we can get board data here
import { LayoutDashboard, List, Lightbulb, Flag, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Week } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type Tab = 'overview' | 'breakdown' | 'insights' | 'milestones';

export const AnalyticsView: React.FC = () => {
    // Use mock board data if actual store structure is complex to navigate blindly, 
    // but preferably valid types.
    // For now we'll rely on the mock service completely for data.

    const { t } = useLanguage();
    const [data, setData] = useState<AnalyticsOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [showCelebration, setShowCelebration] = useState(false);

    // Mock checking for user id/board, assuming context exists or just load
    useEffect(() => {
        const loadData = async () => {
            // Create a dummy board object to satisfy the type requirement of getAnalyticsData
            // In real app, this comes from store
            const dummyBoard: any = {
                execution_layer: {
                    weeks: Array.from({ length: 12 }, (_, i) => ({
                        weekNumber: i + 1,
                        theme: i === 0 ? "User Research" : `Week ${i + 1}`,
                        milestone: i === 0 ? "Problem Validated" : "TBD",
                        actions: [
                            { day: 1, action: "Action 1", time: "1h", timeOfDay: "morning", completed: true },
                            { day: 2, action: "Action 2", time: "1h", timeOfDay: "morning", completed: true },
                            { day: 3, action: "Action 3", time: "1h", timeOfDay: "morning", completed: true },
                            { day: 4, action: "Action 4", time: "1h", timeOfDay: "morning", completed: false },
                            { day: 5, action: "Action 5", time: "1h", timeOfDay: "morning", completed: false },
                        ]
                    }))
                }
            };

            try {
                const result = await getAnalyticsData(dummyBoard);
                setData(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">{t('analytics.analyzing') as string}</p>
            </div>
        );
    }

    if (!data) return <div className="p-8 text-center text-muted-foreground">{t('analytics.failed') as string}</div>;

    // Mock weeks for WeeklyDeepDive from the data we just created/fetched
    // Using the dummyBoard structure logic inside getAnalyticsData
    const weeks: Week[] = Array.from({ length: 12 }, (_, i) => ({
        weekNumber: i + 1,
        theme: i === 0 ? data.currentWeek.theme : `Week ${i + 1} Theme`,
        milestone: i === 0 ? data.currentWeek.milestone : "Upcoming Milestone",
        actions: i === 0 ? data.currentWeek.actions : [],
        isCompleted: i < data.currentWeek.weekNumber - 1
    }));

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 pb-32">

            {showCelebration && (
                <MilestoneCelebration
                    weekNumber={1}
                    milestoneTitle="Problem Validated with 10 Users"
                    onClose={() => setShowCelebration(false)}
                />
            )}

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 bg-gray-100/80 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-1 rounded-2xl mb-8 overflow-x-auto">
                <TabButton
                    active={activeTab === 'overview'}
                    onClick={() => setActiveTab('overview')}
                    icon={<LayoutDashboard size={18} />}
                    label={t('analytics.overview') as string}
                />
                <TabButton
                    active={activeTab === 'breakdown'}
                    onClick={() => setActiveTab('breakdown')}
                    icon={<List size={18} />}
                    label={t('analytics.weeks') as string}
                />
                <TabButton
                    active={activeTab === 'insights'}
                    onClick={() => setActiveTab('insights')}
                    icon={<Lightbulb size={18} />}
                    label={t('analytics.insights') as string}
                />
                <TabButton
                    active={activeTab === 'milestones'}
                    onClick={() => setActiveTab('milestones')}
                    icon={<Flag size={18} />}
                    label={t('analytics.milestones') as string}
                />
            </div>

            {/* Content */}
            <div className="min-h-[500px]">
                {activeTab === 'overview' && (
                    <ProgressOverview
                        data={data}
                        onViewDetails={() => setActiveTab('breakdown')}
                    />
                )}

                {activeTab === 'breakdown' && (
                    <WeeklyDeepDive
                        weeks={weeks}
                        currentWeekNumber={data.currentWeek.weekNumber}
                    />
                )}

                {activeTab === 'insights' && (
                    <InsightsTab insights={data.insights} />
                )}

                {activeTab === 'milestones' && (
                    <div className="text-center py-20">
                        <button
                            onClick={() => setShowCelebration(true)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition"
                        >
                            {t('analytics.demo_celebration') as string}
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
            active
                ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-200/50 dark:hover:bg-zinc-800/50"
        )}
    >
        {icon}
        <span>{label}</span>
    </button>
);

