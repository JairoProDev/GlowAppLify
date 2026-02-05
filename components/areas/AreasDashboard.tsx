'use client';

import React, { useEffect } from 'react';
import { useLifeAreasStore } from '@/store/useLifeAreasStore';
import { LifeAreaCard } from './LifeAreaCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AreaType, AREA_LABELS } from '@/lib/types/life-areas';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dashboardContent } from '@/lib/i18n/dashboardContent';

// All theoretically available areas to show available options if not created yet
const ALL_AREA_TYPES: AreaType[] = [
    'finances', 'health', 'learning', 'career',
    'relationships', 'wellness', 'creativity', 'growth'
];

const DashboardCardWrapper = ({ area }: { area: any }) => {
    const { fetchAreaStats } = useLifeAreasStore();
    const [stats, setStats] = React.useState({ activeGoals: 0, completedActions: 0, totalActions: 0 });

    useEffect(() => {
        const stats = fetchAreaStats(area.id);
        setStats(stats);
    }, [area.id, fetchAreaStats]);

    return (
        <LifeAreaCard
            area={area}
            activeGoalsCount={stats.activeGoals}
            completedActionsCount={stats.completedActions}
            totalActionsCount={stats.totalActions}
        />
    );
};

export const AreasDashboard: React.FC = () => {
    const { areas, isLoading, error, fetchAreas, createArea } = useLifeAreasStore();
    const { language } = useLanguage();
    const t = dashboardContent[language].lifeAreas;

    useEffect(() => {
        fetchAreas();
    }, [fetchAreas]);

    if (isLoading && areas.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    // Identify which areas haven't been initialized yet
    const existingTypes = new Set(areas.map(a => a.area_type));
    const availableTypes = ALL_AREA_TYPES.filter(t => !existingTypes.has(t));

    return (
        <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                        {t.title}
                    </h2>
                    <p className="text-muted-foreground mt-1">{t.subtitle}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {areas.map((area) => (
                    <DashboardCardWrapper key={area.id} area={area} />
                ))}

                {/* Quick Add Cards for missing areas */}
                {availableTypes.map((type) => (
                    <div key={type} className="border border-dashed border-muted-foreground/20 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:bg-muted/50 transition-colors group h-full min-h-[250px]">
                        <div className="p-3 bg-muted rounded-full group-hover:scale-110 transition-transform">
                            <Plus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                            <h3 className="font-semibold capitalize text-foreground/80">
                                {t.labels[type as keyof typeof t.labels] || type}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 px-4">{t.initialize}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => createArea(type)}>
                            {t.enable}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
