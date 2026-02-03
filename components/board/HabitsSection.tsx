"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sun, Moon, Zap, Repeat } from "lucide-react"
import { ExecutionBoard } from "@/lib/types"

interface HabitsSectionProps {
    habits: ExecutionBoard['habits']
    isEditing: boolean
}

export function HabitsSection({ habits, isEditing }: HabitsSectionProps) {

    const getHabitIcon = (type: string) => {
        switch (type) {
            case 'morning': return <Sun className="h-5 w-5 text-amber-500" />
            case 'evening': return <Moon className="h-5 w-5 text-indigo-500" />
            case 'deepwork': return <Zap className="h-5 w-5 text-blue-500" />
            default: return <Repeat className="h-5 w-5 text-emerald-500" />
        }
    }

    const getGradient = (type: string) => {
        switch (type) {
            case 'morning': return 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50'
            case 'evening': return 'from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200/50'
            case 'deepwork': return 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200/50'
            default: return 'bg-card'
        }
    }

    return (
        <Card className="overflow-hidden border-none shadow-xl bg-card">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                        <Repeat className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Daily Habits</h2>
                        <p className="text-white/80 text-sm">Automating Excellence</p>
                    </div>
                </div>
            </div>

            <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {habits.map((habit, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl border p-6 bg-gradient-to-br transition-all hover:shadow-md ${getGradient(habit.type)}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="rounded-full bg-white/60 dark:bg-black/20 p-2 shadow-sm">
                                    {getHabitIcon(habit.type)}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider bg-white/50 dark:bg-black/20 px-2 py-1 rounded-md">
                                    {habit.time}
                                </span>
                            </div>

                            <h3 className="font-bold text-lg mb-2 capitalize">{habit.type} Routine</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {habit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
