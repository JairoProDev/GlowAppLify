'use client';

/**
 * Area Detail Page — GlowApplify
 * The individual life area view. Like Cursor's file editor but for a life area.
 * Each area is a complete system with: Vision → OKR → Actions → Habits → AI Copilot
 */

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLifeAreasStore } from '@/store/useLifeAreasStore';
import { useAreaModulesStore } from '@/lib/store/area-modules-store';
import {
    ChevronLeft, Settings2, Sparkles, Zap, Flame, CheckCircle2,
    Target, BarChart3, Activity, Brain, Heart, Palette, Sprout,
    DollarSign, Dumbbell, Rocket, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { AREA_ICONS, AREA_LABELS, AreaStatus, AreaType } from '@/lib/types/life-areas';
import { OKRPanel } from '@/components/areas/OKRPanel';
import { WeeklyActionsPanel } from '@/components/areas/WeeklyActionsPanel';
import { HabitsPanel } from '@/components/areas/HabitsPanel';
import { BloomCopilot } from '@/components/areas/BloomCopilot';
import { FinancesModule } from '@/components/areas/modules/FinancesModule';
import { HealthModule } from '@/components/areas/modules/HealthModule';
import { CareerModule } from '@/components/areas/modules/CareerModule';
import { RelationshipsModule } from '@/components/areas/modules/RelationshipsModule';
import { LearningModule } from '@/components/areas/modules/LearningModule';
import { WellnessModule } from '@/components/areas/modules/WellnessModule';
import { CreativityModule } from '@/components/areas/modules/CreativityModule';
import { GrowthModule } from '@/components/areas/modules/GrowthModule';

const STATUS_STYLES: Record<AreaStatus, string> = {
    principal: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300',
    active: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300',
    maintenance: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
    inactive: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400',
};

const STATUS_LABELS: Record<AreaStatus, string> = {
    principal: '🔥 Principal',
    active: '⚡ Active',
    maintenance: '🔄 Maintenance',
    inactive: '💤 Inactive',
};

const AREA_DESCRIPTIONS: Record<AreaType, string> = {
    finances: 'Capital, investments, freedom number, cash flow',
    health: 'Readiness, sleep, training, nutrition',
    career: 'Deep work, legacy vision, projects, scorecard',
    relationships: 'Personal CRM, quality time, social investment',
    learning: 'Reading, knowledge graph, courses, skill map',
    wellness: 'Mood, mindfulness, mental resilience',
    creativity: 'Flow sessions, creative projects, experiences',
    growth: 'Values, purpose, character development, Ikigai',
};

const AREA_MODULE_ICONS: Record<AreaType, React.ReactNode> = {
    finances: <DollarSign className="h-4 w-4" />,
    health: <Dumbbell className="h-4 w-4" />,
    career: <Rocket className="h-4 w-4" />,
    relationships: <Heart className="h-4 w-4" />,
    learning: <Brain className="h-4 w-4" />,
    wellness: <Activity className="h-4 w-4" />,
    creativity: <Palette className="h-4 w-4" />,
    growth: <Sprout className="h-4 w-4" />,
};

function AreaModuleComponent({ areaType, areaId }: { areaType: AreaType; areaId: string }) {
    switch (areaType) {
        case 'finances': return <FinancesModule areaId={areaId} />;
        case 'health': return <HealthModule areaId={areaId} />;
        case 'career': return <CareerModule areaId={areaId} />;
        case 'relationships': return <RelationshipsModule areaId={areaId} />;
        case 'learning': return <LearningModule areaId={areaId} />;
        case 'wellness': return <WellnessModule areaId={areaId} />;
        case 'creativity': return <CreativityModule areaId={areaId} />;
        case 'growth': return <GrowthModule areaId={areaId} />;
        default: return <div className="text-muted-foreground text-sm p-4">Module coming soon</div>;
    }
}

function HealthScoreRing({ score }: { score: number }) {
    const color = score >= 70 ? '#22c55e' : score >= 40 ? '#eab308' : '#ef4444';
    const circumference = 2 * Math.PI * 28;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/20" />
                <circle cx="36" cy="36" r="28" fill="none" stroke={color} strokeWidth="6"
                    strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round" transform="rotate(-90 36 36)"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
            </svg>
            <div className="absolute text-center">
                <div className="text-lg font-bold leading-none" style={{ color }}>{score}</div>
                <div className="text-xs text-muted-foreground">/ 100</div>
            </div>
        </div>
    );
}

function SystemStatusRow({ label, value, status, detail }: {
    label: string; value: string; status: 'good' | 'warning' | 'missing' | 'low'; detail: string;
}) {
    const s = {
        good: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
        missing: 'bg-gray-100 text-gray-500 dark:bg-gray-900/30 dark:text-gray-400',
        low: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    };
    return (
        <div className="flex items-center justify-between text-sm">
            <div className="flex-1 min-w-0">
                <div className="font-medium">{label}</div>
                <div className="text-xs text-muted-foreground truncate">{detail}</div>
            </div>
            <Badge className={`${s[status]} border-0 ml-2 flex-shrink-0`}>{value}</Badge>
        </div>
    );
}

function AreaAnalyticsPanel({ areaId, areaType }: { areaId: string; areaType: AreaType }) {
    const { weeklyActions, habits, okrs } = useAreaModulesStore();
    const weeklyData = Array.from({ length: 8 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - 7 * (7 - i));
        const day = d.getDay();
        d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
        const weekStart = d.toISOString().split('T')[0];
        const wa = weeklyActions.filter(a => a.areaId === areaId && a.weekStart === weekStart);
        const done = wa.filter(a => a.status === 'done').length;
        const rate = wa.length > 0 ? Math.round((done / wa.length) * 100) : 0;
        return { weekStart, done, total: wa.length, rate };
    });
    const areaHabits = habits.filter(h => h.areaId === areaId && h.active);
    const areaOKRs = okrs.filter(o => o.areaId === areaId);
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" /> 8-Week Action Completion
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-1 h-24">
                        {weeklyData.map((week, i) => (
                            <div key={week.weekStart} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full rounded-t-sm" style={{
                                    height: `${Math.max(4, week.total > 0 ? week.rate : 0)}%`,
                                    backgroundColor: week.rate >= 70 ? '#22c55e' : week.rate >= 40 ? '#eab308' : week.total > 0 ? '#ef4444' : '#e5e7eb',
                                    opacity: i === 7 ? 1 : 0.6,
                                }} />
                                <span className="text-xs text-muted-foreground">{i === 7 ? 'Now' : `W${i+1}`}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            {areaHabits.length > 0 && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Flame className="h-4 w-4 text-orange-500" /> Habit Consistency (30 days)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {areaHabits.map(habit => {
                            const last30 = Array.from({ length: 30 }, (_, i) => {
                                const d = new Date(); d.setDate(d.getDate() - 29 + i);
                                return d.toISOString().split('T')[0];
                            });
                            const done = last30.filter(d => habit.completedDates.includes(d)).length;
                            return (
                                <div key={habit.id}>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="font-medium">{habit.title}</span>
                                        <span className="text-muted-foreground">{Math.round((done/30)*100)}% · 🔥{habit.streak}d</span>
                                    </div>
                                    <div className="flex gap-0.5 flex-wrap">
                                        {last30.map(date => (
                                            <div key={date} className={`h-3 w-3 rounded-sm flex-shrink-0 ${habit.completedDates.includes(date) ? 'bg-green-500' : 'bg-muted/40'}`} title={date} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            )}
            {areaOKRs.length > 0 && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" /> OKR History
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {areaOKRs.map(okr => {
                            const progress = okr.keyResults.length > 0
                                ? Math.round(okr.keyResults.reduce((s, kr) => s + kr.progress, 0) / okr.keyResults.length) : 0;
                            return (
                                <div key={okr.id} className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium line-clamp-1">{okr.objective}</span>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-xs capitalize">{okr.status}</Badge>
                                            <span className="text-sm font-bold">{progress}%</span>
                                        </div>
                                    </div>
                                    <Progress value={progress} className="h-1.5" />
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default function AreaDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { areas, updateAreaStatus } = useLifeAreasStore();
    const { getCurrentWeekActions, getHabitsForArea, calculateHealthScore, getActiveOKRForArea, getOKRProgress } = useAreaModulesStore();

    const area = areas.find(a => a.id === id);
    const [activeTab, setActiveTab] = useState('okr');

    if (!area) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Area not found</h2>
                    <Button onClick={() => router.back()}>Go back</Button>
                </div>
            </div>
        );
    }

    const areaId = area.id;
    const areaType = area.area_type as AreaType;
    const Icon = AREA_ICONS[areaType];
    const areaName = AREA_LABELS[areaType];
    const weekActions = getCurrentWeekActions(areaId);
    const habits = getHabitsForArea(areaId);
    const healthScore = calculateHealthScore(areaId);
    const activeOKR = getActiveOKRForArea(areaId);
    const okrProgress = activeOKR ? getOKRProgress(activeOKR.id) : 0;
    const completedActions = weekActions.filter(a => a.status === 'done').length;
    const totalActions = weekActions.length;
    const weekRate = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;
    const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
    const today = new Date().toISOString().split('T')[0];
    const habitsToday = habits.filter(h => h.completedDates.includes(today)).length;

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
                <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground hover:text-foreground" onClick={() => router.back()}>
                    <ChevronLeft className="mr-1 h-4 w-4" /> Dashboard
                </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">
                {/* LEFT: Main content */}
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shadow-inner border border-primary/20 flex-shrink-0">
                                {Icon}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h1 className="text-3xl font-bold tracking-tight">{areaName}</h1>
                                    <Badge className={`${STATUS_STYLES[area.status]} border text-xs font-semibold px-2`}>
                                        {STATUS_LABELS[area.status]}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-0.5">{AREA_DESCRIPTIONS[areaType]}</p>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Settings2 className="mr-2 h-4 w-4" /> Configure
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuItem onClick={() => updateAreaStatus(area.id, 'principal')}>🔥 Set as Principal</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAreaStatus(area.id, 'active')}>⚡ Set as Active</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAreaStatus(area.id, 'maintenance')}>🔄 Set to Maintenance</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => updateAreaStatus(area.id, 'inactive')} className="text-destructive">💤 Disable Area</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                            <CardContent className="p-4 text-center">
                                <div className="flex justify-center mb-1"><HealthScoreRing score={healthScore} /></div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Health Score</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center space-y-1">
                                <div className="flex items-center justify-center">
                                    <Flame className="h-5 w-5 text-orange-500 mr-1" />
                                    <span className="text-2xl font-bold">{maxStreak}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Day streak</p>
                                {habitsToday > 0 && <Badge variant="secondary" className="text-xs">{habitsToday}/{habits.length} today</Badge>}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center space-y-1">
                                <div className="flex items-center justify-center gap-1">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-2xl font-bold">{weekRate}%</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Week completion</p>
                                <div className="text-xs text-muted-foreground">{completedActions}/{totalActions} actions</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center space-y-1">
                                <div className="flex items-center justify-center gap-1">
                                    <Target className="h-4 w-4 text-primary" />
                                    <span className="text-2xl font-bold">{okrProgress}%</span>
                                </div>
                                <p className="text-xs text-muted-foreground">OKR progress</p>
                                {activeOKR && <p className="text-xs text-muted-foreground line-clamp-1">{activeOKR.objective}</p>}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="w-full border-b rounded-none h-11 bg-transparent p-0 gap-0 overflow-x-auto">
                            {[
                                { value: 'okr', label: 'OKR', icon: <Target className="h-3.5 w-3.5" /> },
                                { value: 'actions', label: 'Actions', icon: <Zap className="h-3.5 w-3.5" /> },
                                { value: 'habits', label: 'Habits', icon: <Flame className="h-3.5 w-3.5" /> },
                                { value: 'tools', label: 'Tools', icon: AREA_MODULE_ICONS[areaType] },
                                { value: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-3.5 w-3.5" /> },
                            ].map(tab => (
                                <TabsTrigger key={tab.value} value={tab.value}
                                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-4 h-11 font-medium text-muted-foreground data-[state=active]:text-foreground gap-1.5 flex-shrink-0">
                                    {tab.icon}{tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <div className="pt-6">
                            <TabsContent value="okr" className="m-0"><OKRPanel areaId={areaId} /></TabsContent>
                            <TabsContent value="actions" className="m-0"><WeeklyActionsPanel areaId={areaId} /></TabsContent>
                            <TabsContent value="habits" className="m-0"><HabitsPanel areaId={areaId} /></TabsContent>
                            <TabsContent value="tools" className="m-0">
                                <div className="mb-4">
                                    <h3 className="font-semibold text-lg mb-1">{areaName} Intelligence Tools</h3>
                                    <p className="text-sm text-muted-foreground">Specialized frameworks and trackers for this area</p>
                                </div>
                                <AreaModuleComponent areaType={areaType} areaId={areaId} />
                            </TabsContent>
                            <TabsContent value="analytics" className="m-0">
                                <AreaAnalyticsPanel areaId={areaId} areaType={areaType} />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                {/* RIGHT: Bloom + Status */}
                <div className="xl:sticky xl:top-6 xl:self-start space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-4 w-4 text-violet-500" />
                            <span className="text-sm font-semibold">Bloom Copilot</span>
                            <Badge variant="outline" className="text-xs text-violet-600 border-violet-200">AI</Badge>
                        </div>
                        <BloomCopilot areaId={areaId} areaType={areaType} />
                    </div>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <Activity className="h-4 w-4 text-blue-500" /> System Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <SystemStatusRow label="OKR Active" value={activeOKR ? '✓' : '—'}
                                status={activeOKR ? 'good' : 'missing'}
                                detail={activeOKR ? `${okrProgress}% progress` : 'No 90-day objective'} />
                            <SystemStatusRow label="Weekly Actions" value={`${totalActions}`}
                                status={totalActions >= 3 ? 'good' : totalActions > 0 ? 'warning' : 'missing'}
                                detail={`${completedActions} completed this week`} />
                            <SystemStatusRow label="Daily Habits" value={`${habits.length}`}
                                status={habits.length >= 2 ? 'good' : habits.length > 0 ? 'warning' : 'missing'}
                                detail={habits.length > 0 ? `Best streak: ${maxStreak}d` : 'No habits set'} />
                            <SystemStatusRow label="Health Score" value={`${healthScore}`}
                                status={healthScore >= 60 ? 'good' : healthScore >= 40 ? 'warning' : 'low'}
                                detail={healthScore >= 70 ? 'Excellent' : healthScore >= 50 ? 'On track' : 'Needs attention'} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3"><CardTitle className="text-sm">Quick Log</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full justify-start text-sm" onClick={() => setActiveTab('actions')}>
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Mark action done
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start text-sm" onClick={() => setActiveTab('habits')}>
                                <Flame className="mr-2 h-4 w-4 text-orange-500" /> Check off habit
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start text-sm" onClick={() => setActiveTab('tools')}>
                                {AREA_MODULE_ICONS[areaType]}
                                <span className="ml-2">Open {areaName} tools</span>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
