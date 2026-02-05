'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLifeAreasStore } from '@/store/useLifeAreasStore';
import { AreaStatus, LifeArea, AREA_ICONS, AREA_LABELS } from '@/lib/types/life-areas';
import { Button } from '@/components/ui/button';
import { AreaStatusBadge } from '@/components/areas/AreaStatusBadge';
import { ArrowLeft, MoreHorizontal, Settings, Target, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

export default function AreaDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { areas, fetchAreas, updateAreaStatus, fetchAreaStats } = useLifeAreasStore();
    const [area, setArea] = useState<LifeArea | undefined>(undefined);
    const [stats, setStats] = useState({ activeGoals: 0, completedActions: 0, totalActions: 0 });

    const id = params?.id as string;

    useEffect(() => {
        if (areas.length === 0) {
            fetchAreas();
        } else {
            const found = areas.find(a => a.id === id);
            if (found) {
                setArea(found);
                const stats = fetchAreaStats(found.id);
                setStats(stats);
            } else {
                // Handle not found
                // router.push('/dashboard');
            }
        }
    }, [areas, id, fetchAreas, router]);

    if (!area) {
        return <div className="p-8 space-y-4">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-64 w-full" />
        </div>;
    }

    const handleStatusChange = async (newStatus: AreaStatus) => {
        await updateAreaStatus(area.id, newStatus);
    };

    return (
        <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="text-4xl bg-background p-2 rounded-xl border shadow-sm">
                            {AREA_ICONS[area.area_type]}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{AREA_LABELS[area.area_type]}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <AreaStatusBadge status={area.status} />
                                <span className="text-xs text-muted-foreground">• Created {new Date(area.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusChange('principal')}>Set as Principal Focus 🔥</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange('active')}>Set as Active ⚡</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange('maintenance')}>Set to Maintenance 🔄</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange('inactive')}>Set to Inactive 💤</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Focus */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Active Goal Placeholder */}
                    <Card className="border-primary/20 bg-primary/5">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Target className="h-5 w-5" />
                                    Active Goal
                                </CardTitle>
                                <Button size="sm">Edit Goal</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                                <p className="mb-4">No active goal set for this area yet.</p>
                                <Button variant="outline">Set a 90-Day Goal</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs for Actions, Habits, Journal */}
                    <Tabs defaultValue="actions" className="w-full">
                        <TabsList>
                            <TabsTrigger value="actions">Actions</TabsTrigger>
                            <TabsTrigger value="habits">Habits</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="actions" className="space-y-4 pt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Weekly Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-muted-foreground">Actions for this area will appear here.</div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="habits" className="space-y-4 pt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4" />
                                        Daily Habits
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-muted-foreground">Habits linked to this area will appear here.</div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column - Stats & Insights */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Area Health</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Completion Rate</span>
                                    <span className="font-bold">
                                        {stats.totalActions > 0
                                            ? Math.round((stats.completedActions / stats.totalActions) * 100)
                                            : 0}%
                                    </span>
                                </div>
                                <Progress value={stats.totalActions > 0 ? (stats.completedActions / stats.totalActions) * 100 : 0} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Consistency Streak</span>
                                    <span className="font-bold">0 days</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
                        <CardHeader>
                            <CardTitle className="text-base text-indigo-500">AI Coach Insight</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                "Initial setup looks good! Set a specific goal to activate this area fully."
                            </p>
                            <Button variant="link" className="px-0 text-indigo-500 mt-2 h-auto text-xs">
                                Ask Bloom 🤖 →
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
