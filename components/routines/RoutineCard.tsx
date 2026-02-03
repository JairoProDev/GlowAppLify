"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Routine } from "@/lib/store/routine-store"
import { Play, Clock, List } from "lucide-react"

interface RoutineCardProps {
    routine: Routine
    onPlay: () => void
}

export function RoutineCard({ routine, onPlay }: RoutineCardProps) {
    const totalDuration = routine.steps.reduce((acc, step) => acc + step.duration, 0);

    return (
        <Card className="hover:shadow-lg transition-all group border-l-4 border-l-primary/50 hover:border-l-primary">
            <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-start">
                    <span>{routine.title}</span>
                    <Button size="icon" className="rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground hover:scale-105" onClick={onPlay}>
                        <Play className="h-5 w-5 ml-1" />
                    </Button>
                </CardTitle>
                <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {totalDuration} min
                    </span>
                    <span className="flex items-center gap-1">
                        <List className="h-3 w-3" /> {routine.steps.length} steps
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{routine.description}</p>
                <div className="space-y-2">
                    {routine.steps.slice(0, 3).map((step, i) => (
                        <div key={i} className="flex items-center text-xs bg-secondary/30 p-2 rounded-md">
                            <div className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center mr-2 shrink-0">
                                {i + 1}
                            </div>
                            <span className="truncate flex-1">{step.title}</span>
                            <span className="text-muted-foreground ml-2">{step.duration}m</span>
                        </div>
                    ))}
                    {routine.steps.length > 3 && (
                        <p className="text-xs text-center text-muted-foreground pt-1">+{routine.steps.length - 3} more steps</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
