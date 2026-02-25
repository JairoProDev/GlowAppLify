import React from 'react';
import Link from 'next/link';
import { LifeArea, AREA_ICONS, AREA_LABELS, AreaType } from '@/lib/types/life-areas';
import { AreaStatusBadge } from './AreaStatusBadge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Target, Flame, Zap } from 'lucide-react';
import { useAreaModulesStore } from '@/lib/store/area-modules-store';

interface LifeAreaCardProps {
    area: LifeArea;
}

export const LifeAreaCard: React.FC<LifeAreaCardProps> = ({ area }) => {
    const {
        getCurrentWeekActions,
        getHabitsForArea,
        calculateHealthScore,
        getActiveOKRForArea,
        getOKRProgress,
    } = useAreaModulesStore();

    const areaId = area.id;
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

    // Health score ring color
    const scoreColor = healthScore >= 70 ? '#22c55e' : healthScore >= 40 ? '#eab308' : '#ef4444';
    const circumference = 2 * Math.PI * 14;
    const strokeDashoffset = circumference - (healthScore / 100) * circumference;

    return (
        <Link href={`/areas/${area.id}`} className="block h-full group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/40 relative overflow-hidden bg-card/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl bg-background/50 p-2 rounded-xl shadow-sm border border-border/50">
                            {AREA_ICONS[area.area_type]}
                        </div>
                        <div>
                            <CardTitle className="text-base font-semibold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
                                {AREA_LABELS[area.area_type]}
                            </CardTitle>
                            {activeOKR && (
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{activeOKR.objective}</p>
                            )}
                        </div>
                    </div>
                    {/* Health Score Mini Ring */}
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <svg width="36" height="36" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/20" />
                                <circle cx="18" cy="18" r="14" fill="none" stroke={scoreColor} strokeWidth="3"
                                    strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round" transform="rotate(-90 18 18)"
                                    style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
                                <text x="18" y="22" textAnchor="middle" fontSize="9" fontWeight="bold" fill={scoreColor}>
                                    {healthScore}
                                </text>
                            </svg>
                        </div>
                        <AreaStatusBadge status={area.status} />
                    </div>
                </CardHeader>

                <CardContent className="pb-3 space-y-3">
                    {/* OKR Progress or Weekly */}
                    {activeOKR ? (
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-muted-foreground font-medium">
                                <span className="flex items-center gap-1">
                                    <Target className="h-3 w-3" /> OKR Progress
                                </span>
                                <span className="font-bold">{okrProgress}%</span>
                            </div>
                            <Progress value={okrProgress} className="h-1.5" />
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-muted-foreground font-medium">
                                <span>Weekly Actions</span>
                                <span>{weekRate}%</span>
                            </div>
                            <Progress value={weekRate} className="h-1.5" />
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                        <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
                            <Zap className="h-3.5 w-3.5 mb-0.5 text-blue-500" />
                            <span className="text-sm font-bold tabular-nums">{totalActions > 0 ? `${weekRate}%` : '—'}</span>
                            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">Actions</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
                            <Flame className="h-3.5 w-3.5 mb-0.5 text-orange-500" />
                            <span className="text-sm font-bold tabular-nums">{maxStreak}</span>
                            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">Streak</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
                            <div className="text-sm mb-0.5">✓</div>
                            <span className="text-sm font-bold tabular-nums">{habits.length > 0 ? `${habitsToday}/${habits.length}` : '—'}</span>
                            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">Habits</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-0 text-xs text-muted-foreground group-hover:text-primary transition-colors flex justify-end">
                    <div className="flex items-center gap-1 font-medium">
                        Open area <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};
