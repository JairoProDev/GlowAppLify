"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRoutineStore } from "@/lib/store/routine-store"
import { useTaskStore } from "@/lib/store/task-store"
import { useMemo } from "react"
import { startOfDay, subDays, isSameDay, format } from "date-fns"

export function HabitHeatmap() {
    const routines = useRoutineStore(state => state.routines)
    const tasks = useTaskStore(state => state.tasks)

    const heatmapData = useMemo(() => {
        const weeks = 12
        const daysPerWeek = 7
        const totalDays = weeks * daysPerWeek

        // Generate dates for the last 84 days (12 weeks)
        return Array.from({ length: weeks }).map((_, weekIndex) => {
            return Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                const dayOffset = (weeks - 1 - weekIndex) * daysPerWeek + (daysPerWeek - 1 - dayIndex)
                const date = startOfDay(subDays(new Date(), dayOffset))

                // Count activities on this day
                let activityCount = 0

                // Check routine completions
                routines.forEach(routine => {
                    if (routine.completedDates?.some(d => isSameDay(new Date(d), date))) {
                        activityCount++
                    }
                })

                // Check task completions
                const taskCompletions = tasks.filter(t =>
                    t.status === 'done' &&
                    t.completedAt &&
                    isSameDay(new Date(t.completedAt), date)
                ).length

                activityCount += taskCompletions

                // Determine intensity level (0-4)
                // 0 = no activity, 1 = 1-2, 2 = 3-4, 3 = 5-6, 4 = 7+
                const intensity = activityCount === 0 ? 0 :
                    activityCount <= 2 ? 1 :
                        activityCount <= 4 ? 2 :
                            activityCount <= 6 ? 3 : 4

                return {
                    date,
                    intensity,
                    activityCount,
                    dateString: format(date, 'MMM dd, yyyy')
                }
            })
        })
    }, [routines, tasks])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Consistency</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Tasks and routines completed (last 12 weeks)
                </p>
            </CardHeader>
            <CardContent>
                <div className="flex gap-1 overflow-x-auto pb-2 justify-center">
                    {heatmapData.map((week, w) => (
                        <div key={w} className="flex flex-col gap-1">
                            {week.map((day, d) => {
                                const colorClass = [
                                    "bg-muted hover:bg-muted/80", // 0
                                    "bg-emerald-200 dark:bg-emerald-900 hover:bg-emerald-300 dark:hover:bg-emerald-800", // 1
                                    "bg-emerald-300 dark:bg-emerald-800 hover:bg-emerald-400 dark:hover:bg-emerald-700", // 2
                                    "bg-emerald-400 dark:bg-emerald-700 hover:bg-emerald-500 dark:hover:bg-emerald-600", // 3
                                    "bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500", // 4
                                ][day.intensity]

                                return (
                                    <div
                                        key={d}
                                        className={cn("h-3 w-3 rounded-sm transition-colors cursor-pointer", colorClass)}
                                        title={`${day.dateString}: ${day.activityCount} activities`}
                                    />
                                )
                            })}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 justify-end">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="h-3 w-3 bg-muted rounded-sm" />
                        <div className="h-3 w-3 bg-emerald-200 dark:bg-emerald-900 rounded-sm" />
                        <div className="h-3 w-3 bg-emerald-400 dark:bg-emerald-700 rounded-sm" />
                        <div className="h-3 w-3 bg-emerald-500 dark:bg-emerald-600 rounded-sm" />
                    </div>
                    <span>More</span>
                </div>
            </CardContent>
        </Card>
    )
}
