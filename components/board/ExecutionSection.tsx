"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Circle, Clock, Flame, CalendarDays } from "lucide-react"
import { ExecutionLayer, Action } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ExecutionSectionProps {
    execution: ExecutionLayer
    isEditing?: boolean
}

export function ExecutionSection({ execution, isEditing }: ExecutionSectionProps) {
    // Determine current week (fallback to 1)
    const currentWeekInfo = execution.weeks.find(w => !w.isCompleted) || execution.weeks[0];
    const defaultWeek = currentWeekInfo ? `week-${currentWeekInfo.weekNumber}` : "week-1";

    return (
        <Card className="overflow-hidden border-none shadow-xl bg-card relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-500 to-red-500" />
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-1">
                <div className="flex items-center gap-4 p-6">
                    <div className="rounded-xl bg-orange-100 dark:bg-orange-900/50 p-3 text-orange-600 dark:text-orange-400">
                        <Flame className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Execution Plan</h2>
                        <p className="text-sm text-muted-foreground">Weekly Sprints & Daily Actions</p>
                    </div>
                </div>
            </div>

            <CardContent className="p-6">
                <Tabs defaultValue={defaultWeek} className="w-full">
                    <div className="mb-6 overflow-x-auto pb-2">
                        <TabsList className="bg-secondary/20 h-auto p-1 inline-flex w-max min-w-full justify-start">
                            {execution.weeks.map((week) => (
                                <TabsTrigger
                                    key={week.weekNumber}
                                    value={`week-${week.weekNumber}`}
                                    className="px-4 py-2 text-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all"
                                >
                                    Week {week.weekNumber}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {execution.weeks.map((week) => (
                        <TabsContent key={week.weekNumber} value={`week-${week.weekNumber}`} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">

                            <div className="bg-secondary/20 rounded-xl p-5 border border-border/50">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Weekly Theme</label>
                                        <p className="text-lg font-semibold">{week.theme}</p>
                                    </div>
                                    <div className="space-y-1 text-right md:text-left">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Milestone</label>
                                        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>{week.milestone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {week.actions.sort((a, b) => a.day - b.day).map((action, idx) => (
                                    <DailyActionCard key={idx} action={action} />
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}

function DailyActionCard({ action }: { action: Action }) {
    return (
        <div className="group flex items-start gap-4 p-4 rounded-xl border bg-background hover:bg-muted/30 transition-colors">
            <div className="mt-1">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-bold text-muted-foreground text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    D{action.day}
                </div>
            </div>
            <div className="flex-1 space-y-1">
                <p className="font-medium text-foreground leading-snug">{action.action}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded capitalize">
                        <CalendarDays className="h-3 w-3" />
                        {action.timeOfDay}
                    </span>
                    <span className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded">
                        <Clock className="h-3 w-3" />
                        {action.time}
                    </span>
                </div>
            </div>
            <button className="h-6 w-6 rounded-full border-2 border-muted-foreground/30 hover:border-green-500 hover:bg-green-500/10 transition-colors flex items-center justify-center">
                {/* Checkbox logic to be implemented with state */}
            </button>
        </div>
    )
}
