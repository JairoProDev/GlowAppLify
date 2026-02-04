"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Target, Flag, CalendarCheck, TrendingUp } from "lucide-react"
import { GoalLayer } from "@/lib/types"

interface GoalSectionProps {
    goal: GoalLayer
    isEditing?: boolean
}

export function GoalSection({ goal, isEditing }: GoalSectionProps) {
    return (
        <Card className="overflow-hidden border-none shadow-xl bg-card relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-cyan-500" />
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-1">
                <div className="flex items-center gap-4 p-6">
                    <div className="rounded-xl bg-blue-100 dark:bg-blue-900/50 p-3 text-blue-600 dark:text-blue-400">
                        <Flag className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">The Goal</h2>
                        <p className="text-sm text-muted-foreground">What success looks like</p>
                    </div>
                </div>
            </div>

            <CardContent className="p-8 space-y-8">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">SMART Goal</label>
                    <p className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground">
                        {goal.smartGoal}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 bg-secondary/30 w-fit px-3 py-1 rounded-full">
                        <CalendarCheck className="h-4 w-4" />
                        <span>Deadline: <span className="font-bold text-foreground">{goal.deadline}</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {goal.kpis.map((kpi, idx) => (
                        <div key={idx} className="group relative overflow-hidden rounded-2xl border bg-background/50 hover:bg-background hover:shadow-lg transition-all p-5">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Target className="h-16 w-16 -rotate-12" />
                            </div>
                            <div className="relative z-10 space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>KPI {idx + 1}</span>
                                </div>
                                <h4 className="text-sm font-medium text-foreground/80 line-clamp-2 min-h-[2.5rem]">{kpi.metric}</h4>
                                <div className="space-y-1">
                                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{kpi.target}</p>
                                    <p className="text-xs text-muted-foreground">Target by {kpi.deadline}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
