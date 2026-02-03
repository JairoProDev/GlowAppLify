"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert, Lightbulb } from "lucide-react"
import { ExecutionBoard } from "@/lib/types"

interface ObstacleSectionProps {
    obstacles: ExecutionBoard['obstacles']
    isEditing: boolean
}

export function ObstaclesSection({ obstacles, isEditing }: ObstacleSectionProps) {
    return (
        <Card className="overflow-hidden border-none shadow-xl bg-card">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                        <ShieldAlert className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Obstacles & Strategy</h2>
                        <p className="text-white/80 text-sm">Pre-mortem Analysis</p>
                    </div>
                </div>
            </div>

            <CardContent className="p-8 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    {obstacles.map((obstacle, idx) => (
                        <div key={idx} className="group relative overflow-hidden rounded-xl border bg-orange-50/50 dark:bg-orange-950/10 p-5 transition-all hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:shadow-md">
                            <div className="flex gap-4">
                                <div className="flex bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-sm">
                                    {idx + 1}
                                </div>
                                <div className="space-y-3 flex-1">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-orange-600/70 mb-1 block">When I face...</span>
                                        <p className="font-semibold text-foreground text-lg leading-tight">{obstacle.description}</p>
                                    </div>

                                    <div className="rounded-lg bg-background p-3 border border-orange-200/50 dark:border-orange-800/30 flex gap-3">
                                        <Lightbulb className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-orange-600/70 mb-1 block">Then I will...</span>
                                            <p className="text-sm italic text-muted-foreground">{obstacle.ifThenPlan}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
