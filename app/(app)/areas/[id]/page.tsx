'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLifeAreasStore } from '@/store/useLifeAreasStore';
import { useGoalStore } from '@/lib/store/goal-store';
import {
    ChevronLeft,
    MoreHorizontal,
    Target,
    Zap,
    Calendar,
    TrendingUp,
    History,
    Settings2,
    CheckCircle2,
    Clock,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AREA_ICONS, AREA_LABELS, AreaStatus } from '@/lib/types/life-areas';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dashboardContent } from '@/lib/i18n/dashboardContent';

export default function AreaDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { language } = useLanguage();
    const t = dashboardContent[language];
    const ad = t.areaDetail;
    const dateLocale = language === 'es' ? es : enUS;

    const { areas, fetchAreaStats, updateAreaStatus } = useLifeAreasStore();
    const goals = useGoalStore(state => state.goals);
    const area = areas.find(a => a.id === id);

    const [stats, setStats] = useState({ activeGoals: 0, completedActions: 0, totalActions: 0 });

    useEffect(() => {
        if (id) {
            const statsResult = fetchAreaStats(id as string);
            setStats(statsResult);
        }
    }, [id, fetchAreaStats]);

    if (!area) {
        return <div className="p-8 text-center">Area not found</div>;
    }

    const Icon = AREA_ICONS[area.area_type];
    const activeGoal = goals.find(g => g.lifeAreaId === area.id && g.status === 'active');

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col gap-6">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit -ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    {t.welcome.title}
                </Button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shadow-inner border border-primary/20">
                            {Icon}
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-bold tracking-tight capitalize">
                                    {t.lifeAreas.labels[area.area_type as keyof typeof t.lifeAreas.labels] || area.area_type}
                                </h1>
                                <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/5 hover:bg-primary/10 border-primary/20">
                                    {area.status}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {ad.created}: {format(new Date(area.created_at), 'MMMM d, yyyy', { locale: dateLocale })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="shadow-sm">
                                    <Settings2 className="mr-2 h-4 w-4" />
                                    {ad.configure}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => updateAreaStatus(area.id, 'principal')}>
                                    Set as Principal
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAreaStatus(area.id, 'active')}>
                                    Set as Active
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAreaStatus(area.id, 'maintenance')}>
                                    Set as Maintenance
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateAreaStatus(area.id, 'inactive')} className="text-destructive">
                                    Disable Area
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Active Goal & Progress */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="overflow-hidden border-primary/10 shadow-lg">
                        <CardHeader className="bg-primary/5 pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    {ad.activeGoal}
                                </CardTitle>
                                {activeGoal && (
                                    <Button variant="ghost" size="sm" className="text-xs h-8">
                                        {ad.editGoal}
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {activeGoal ? (
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-semibold leading-none tracking-tight">{activeGoal.title}</h3>
                                    <p className="text-muted-foreground italic text-sm">"{activeGoal.motivation}"</p>
                                    <div className="flex gap-4">
                                        <Badge variant="outline" className="text-xs">90 Days</Badge>
                                        <Badge variant="outline" className="text-xs font-mono text-primary border-primary/30">Active</Badge>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 space-y-4 border-2 border-dashed border-muted rounded-xl bg-muted/20">
                                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto opacity-50">
                                        <Target className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium text-muted-foreground">{ad.noGoal}</p>
                                        <Button className="mt-4 shadow-lg hover:shadow-primary/20 transition-all">
                                            {ad.setGoal}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Tabs defaultValue="actions" className="w-full">
                        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0 gap-8">
                            <TabsTrigger value="actions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-2 h-12 font-medium">
                                <Zap className="mr-2 h-4 w-4" />
                                {ad.tabs.actions}
                            </TabsTrigger>
                            <TabsTrigger value="habits" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-2 h-12 font-medium">
                                <Clock className="mr-2 h-4 w-4" />
                                {ad.tabs.habits}
                            </TabsTrigger>
                            <TabsTrigger value="history" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-2 h-12 font-medium">
                                <History className="mr-2 h-4 w-4" />
                                {ad.tabs.history}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="actions" className="pt-6">
                            <h4 className="font-semibold text-lg mb-4">{ad.weeklyActions}</h4>
                            <div className="text-center py-20 bg-muted/10 rounded-2xl border border-muted-foreground/10 text-muted-foreground">
                                <p className="text-sm italic">{ad.noActions}</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="habits" className="pt-6">
                            <h4 className="font-semibold text-lg mb-4">{ad.dailyHabits}</h4>
                            <div className="text-center py-20 bg-muted/10 rounded-2xl border border-muted-foreground/10 text-muted-foreground">
                                <p className="text-sm italic">{ad.noHabits}</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column: Stats & AI */}
                <div className="space-y-8">
                    <Card className="shadow-md bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-primary/5">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                {ad.health.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{ad.health.rate}</span>
                                    <span className="font-medium">{Math.round((stats.completedActions / Math.max(stats.totalActions, 1)) * 100)}%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-1000"
                                        style={{ width: `${(stats.completedActions / Math.max(stats.totalActions, 1)) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{ad.health.streak}</p>
                                    <p className="text-2xl font-bold">12 {ad.health.unit}</p>
                                </div>
                                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 text-zinc-50 border-none overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="h-24 w-24" />
                        </div>
                        <CardHeader className="relative">
                            <CardTitle className="text-base flex items-center gap-2">
                                {ad.aiCoach.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative">
                            <p className="text-sm text-zinc-400 leading-relaxed italic">
                                "Seems like you're excelling in Consistency. Your morning block is the highest leverage time for this area."
                            </p>
                            <Button variant="secondary" className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium">
                                {ad.aiCoach.ask}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
