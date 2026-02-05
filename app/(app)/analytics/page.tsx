"use client"

import { ProductivityChart } from "@/components/analytics/ProductivityChart"
import { HabitHeatmap } from "@/components/analytics/HabitHeatmap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Trophy, TrendingUp, CheckCircle2, Target, Flame } from "lucide-react"
import { useTaskStore } from "@/lib/store/task-store"
import { useJournalStore } from "@/lib/store/journal-store"
import { useDailyStore } from "@/lib/store/useDailyStore"
import { useRoutineStore } from "@/lib/store/routine-store"
import { useMemo } from "react"
import { startOfWeek, subWeeks, isAfter } from "date-fns"

export default function AnalyticsPage() {
    const tasks = useTaskStore(state => state.tasks)
    const entries = useJournalStore(state => state.entries)
    const { streak } = useDailyStore()
    const routines = useRoutineStore(state => state.routines)

    // Calculate real analytics
    const analytics = useMemo(() => {
        // Task completion metrics
        const completedTasks = tasks.filter(t => t.status === 'done')
        const totalTasks = tasks.length
        const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0

        // Tasks completed in the last 7 days
        const oneWeekAgo = subWeeks(new Date(), 1)
        const recentTasks = completedTasks.filter(t => {
            if (!t.completedAt) return false
            return isAfter(new Date(t.completedAt), oneWeekAgo)
        })
        const tasksPerDay = recentTasks.length > 0 ? (recentTasks.length / 7).toFixed(1) : 0

        // Average energy from journal entries
        const recentEntries = entries.filter(e => isAfter(new Date(e.date), oneWeekAgo))
        const avgEnergy = recentEntries.length > 0
            ? (recentEntries.reduce((sum, e) => sum + e.mood, 0) / recentEntries.length).toFixed(1)
            : 0

        // Routine completion rate
        const morningRoutine = routines.find(r => r.id === 'morning-1')
        const eveningRoutine = routines.find(r => r.id === 'evening-1')
        const routineCompletionCount = [morningRoutine, eveningRoutine]
            .filter(r => r?.completedDates && r.completedDates.length > 0)
            .reduce((sum, r) => sum + (r.completedDates?.length || 0), 0)

        return {
            completedTasks: completedTasks.length,
            totalTasks,
            completionRate,
            tasksPerDay,
            avgEnergy,
            streak: streak || 0,
            routineCompletions: routineCompletionCount,
            recentEntriesCount: recentEntries.length
        }
    }, [tasks, entries, streak, routines])

    return (
        <div className="space-y-6 h-full animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-muted-foreground">Uncover patterns in your performance.</p>
                </div>
            </div>

            {/* Top Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.streak} days</div>
                        <p className="text-xs text-muted-foreground">Keep it going!</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.completedTasks}</div>
                        <p className="text-xs text-muted-foreground">
                            {analytics.completionRate}% completion rate
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Task Velocity</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.tasksPerDay}</div>
                        <p className="text-xs text-muted-foreground">Tasks per day (7d avg)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
                        <Zap className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {analytics.avgEnergy > 0 ? `${analytics.avgEnergy}/5` : 'N/A'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {analytics.recentEntriesCount > 0
                                ? `Based on ${analytics.recentEntriesCount} entries`
                                : 'Start journaling to track mood'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                <ProductivityChart />
                <HabitHeatmap />
            </div>

            {/* Additional Insights */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Total Tasks</span>
                        </div>
                        <span className="font-semibold">{analytics.totalTasks}</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Routine Completions</span>
                        </div>
                        <span className="font-semibold">{analytics.routineCompletions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Journal Entries</span>
                        </div>
                        <span className="font-semibold">{entries.length}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
