"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert, ArrowRight, AlertTriangle } from "lucide-react"
import { ObstacleLayer } from "@/lib/types"
import { useLanguage } from "@/lib/i18n/LanguageContext"

interface ObstaclesSectionProps {
    obstacles: ObstacleLayer
    isEditing?: boolean
}

export function ObstaclesSection({ obstacles, isEditing }: ObstaclesSectionProps) {
    const { t } = useLanguage()
    // Defensive check for missing data
    const plans = obstacles?.plans || [];

    return (
        <Card className="overflow-hidden border-none shadow-xl bg-card relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-500 to-amber-500" />
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 p-1">
                <div className="flex items-center gap-4 p-6">
                    <div className="rounded-xl bg-yellow-100 dark:bg-yellow-900/50 p-3 text-yellow-600 dark:text-yellow-400">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">{t('board.obstacles_title')}</h2>
                        <p className="text-sm text-muted-foreground">{t('board.obstacles_subtitle')}</p>
                    </div>
                </div>
            </div>

            <CardContent className="p-6 grid gap-4">
                {plans.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground italic">
                        {t('board.no_obstacles')}
                    </div>
                ) : (
                    plans.map((plan, idx) => (
                        <div key={idx} className="rounded-xl border bg-background/50 p-5 space-y-4 hover:shadow-md transition-all">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-foreground">{t('board.if')} {plan.if}</h4>
                                </div>
                            </div>

                            <div className="pl-8 space-y-2">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                                    <ArrowRight className="h-4 w-4" />
                                    {t('board.then')}
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2 bg-secondary/30 p-3 rounded-lg">
                                    {plan.then.map((action, i) => (
                                        <li key={i}>{action}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}

