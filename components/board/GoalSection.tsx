"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Target, Calendar as CalendarIcon, Trophy } from "lucide-react"
import { ExecutionBoard } from "@/lib/types"

interface GoalSectionProps {
    goal: ExecutionBoard['goal']
    isEditing: boolean
    onChange: (goal: ExecutionBoard['goal']) => void
}

export function GoalSection({ goal, isEditing, onChange }: GoalSectionProps) {
    return (
        <Card className="overflow-hidden border-none shadow-xl bg-card">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                        <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">90-Day Goal</h2>
                        <p className="text-primary-foreground/80 text-sm">Targeting {goal.type} Excellence</p>
                    </div>
                </div>
            </div>

            <CardContent className="p-8 space-y-8">
                <div className="space-y-3">
                    <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">SMART Goal Statement</label>
                    {isEditing ? (
                        <textarea
                            className="w-full text-xl font-medium bg-secondary/30 rounded-lg p-4 border-none focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                            rows={3}
                            value={goal.statement}
                            onChange={(e) => onChange({ ...goal, statement: e.target.value })}
                        />
                    ) : (
                        <p className="text-xl font-medium leading-relaxed">{goal.statement}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl bg-secondary/50 p-5 space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Target className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Type</span>
                        </div>
                        <span className="text-lg font-semibold">{goal.type}</span>
                    </div>

                    <div className="rounded-xl bg-secondary/50 p-5 space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Deadline</span>
                        </div>
                        <span className="text-lg font-semibold">
                            {new Date(goal.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Key Performance Indicators</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {goal.kpis.map((kpi, idx) => (
                            <div key={idx} className="relative overflow-hidden rounded-xl border bg-card p-4 transition-all hover:shadow-md">
                                <div className="absolute top-0 right-0 p-3 opacity-10">
                                    <span className="text-4xl font-black">{idx + 1}</span>
                                </div>
                                <div className="space-y-1 relative z-10">
                                    <p className="text-sm text-muted-foreground font-medium uppercase">{kpi.metric}</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-primary">{kpi.target}</span>
                                        <span className="text-sm font-medium">{kpi.unit}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
