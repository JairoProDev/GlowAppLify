import React from 'react';
import Link from 'next/link';
import { LifeArea, AREA_ICONS, AREA_LABELS } from '@/lib/types/life-areas';
import { AreaStatusBadge } from './AreaStatusBadge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Target, CheckCircle2 } from 'lucide-react';

interface LifeAreaCardProps {
    area: LifeArea;
    activeGoalsCount?: number;
    completedActionsCount?: number;
    totalActionsCount?: number;
}

export const LifeAreaCard: React.FC<LifeAreaCardProps> = ({
    area,
    activeGoalsCount = 0,
    completedActionsCount = 0,
    totalActionsCount = 0
}) => {
    const progress = totalActionsCount > 0
        ? (completedActionsCount / totalActionsCount) * 100
        : 0;

    return (
        <Link href={`/areas/${area.id}`} className="block h-full group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 relative overflow-hidden bg-card/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl bg-background/50 p-2 rounded-xl shadow-sm border border-border/50">
                            {AREA_ICONS[area.area_type]}
                        </div>
                        <div>
                            <CardTitle className="text-lg font-semibold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
                                {AREA_LABELS[area.area_type]}
                            </CardTitle>
                        </div>
                    </div>
                    <AreaStatusBadge status={area.status} />
                </CardHeader>

                <CardContent className="pb-3 space-y-4">
                    {/* Progress Section */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground font-medium">
                            <span>Weekly Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-muted/50" indicatorClassName="bg-primary/80" />
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
                            <Target className="h-4 w-4 mb-1 text-blue-500" />
                            <span className="text-lg font-bold tabular-nums">{activeGoalsCount}</span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Goals</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
                            <CheckCircle2 className="h-4 w-4 mb-1 text-green-500" />
                            <span className="text-lg font-bold tabular-nums">{completedActionsCount}/{totalActionsCount}</span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Actions</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-0 text-xs text-muted-foreground group-hover:text-primary transition-colors flex justify-end">
                    <div className="flex items-center gap-1 font-medium">
                        View Details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};
