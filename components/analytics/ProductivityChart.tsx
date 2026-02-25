// @ts-nocheck
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { useTaskStore } from "@/lib/store/task-store"
import { useJournalStore } from "@/lib/store/journal-store"
import { useMemo } from "react"
import { format, subDays, startOfDay, isSameDay } from "date-fns"

export function ProductivityChart() {
    const tasks = useTaskStore(state => state.tasks)
    const entries = useJournalStore(state => state.entries)

    const chartData = useMemo(() => {
        // Generate last 7 days
        const days = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), 6 - i)
            return {
                date: startOfDay(date),
                name: format(date, 'EEE'),
                fullDate: format(date, 'MMM dd')
            }
        })

        // Calculate productivity score for each day
        return days.map(day => {
            // Tasks completed on this day
            const dayTasks = tasks.filter(t =>
                t.status === 'done' &&
                t.completedAt &&
                isSameDay(new Date(t.completedAt), day.date)
            ).length

            // Mood/energy for this day
            const dayEntry = entries.find(e => isSameDay(new Date(e.date), day.date))
            const mood = dayEntry?.mood || 0

            // Calculate productivity score (0-100)
            // Formula: (tasks * 20) + (mood * 10)
            // Max: 5 tasks * 20 = 100, or mood 5 * 10 = 50
            const taskScore = Math.min(dayTasks * 20, 60)
            const moodScore = mood * 8
            const score = Math.min(Math.round(taskScore + moodScore), 100)

            return {
                name: day.name,
                score: score,
                fullDate: day.fullDate,
                tasks: dayTasks,
                mood: mood || 'N/A'
            }
        })
    }, [tasks, entries])

    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Weekly Productivity Score</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Based on task completions and mood tracking
                </p>
            </CardHeader>
            <CardContent className="pl-0">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <XAxis
                                dataKey="name"
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                                domain={[0, 100]}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--background))",
                                    borderColor: "hsl(var(--border))",
                                    borderRadius: "8px"
                                }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload
                                        return (
                                            <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                                                <p className="font-semibold text-sm mb-1">{data.fullDate}</p>
                                                <p className="text-xs text-muted-foreground">Score: {data.score}/100</p>
                                                <p className="text-xs text-muted-foreground">Tasks: {data.tasks}</p>
                                                <p className="text-xs text-muted-foreground">Mood: {data.mood}</p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorScore)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
