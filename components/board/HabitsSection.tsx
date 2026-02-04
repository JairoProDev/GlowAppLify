"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sun, Moon, Zap, Repeat } from "lucide-react"
import { HabitsLayer, HabitRoutine } from "@/lib/types"

interface HabitsSectionProps {
    habits: HabitsLayer
    isEditing?: boolean
}

export function HabitsSection({ habits, isEditing }: HabitsSectionProps) {
    return (
        <Card className="overflow-hidden border-none shadow-xl bg-card relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-500 to-teal-500" />
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-1">
                <div className="flex items-center gap-4 p-6">
                    <div className="rounded-xl bg-emerald-100 dark:bg-emerald-900/50 p-3 text-emerald-600 dark:text-emerald-400">
                        <Repeat className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Daily Habits</h2>
                        <p className="text-sm text-muted-foreground">Automating Excellence with Routines</p>
                    </div>
                </div>
            </div>

            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <HabitCard
                        title="Morning Ritual"
                        routine={habits.morning}
                        icon={<Sun className="h-5 w-5 text-amber-500" />}
                        gradient="from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50"
                    />
                    <HabitCard
                        title="Deep Work"
                        routine={habits.deepWork}
                        icon={<Zap className="h-5 w-5 text-blue-500" />}
                        gradient="from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200/50"
                    />
                    <HabitCard
                        title="Evening Wind-down"
                        routine={habits.evening}
                        icon={<Moon className="h-5 w-5 text-indigo-500" />}
                        gradient="from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200/50"
                    />
                </div>
            </CardContent>
        </Card>
    )
}

function HabitCard({ title, routine, icon, gradient }: { title: string, routine: HabitRoutine, icon: React.ReactNode, gradient: string }) {
    if (!routine) return null;
    return (
        <div className={`rounded-2xl border p-6 bg-gradient-to-br transition-all hover:shadow-md ${gradient}`}>
            <div className="flex justify-between items-start mb-4">
                <div className="rounded-full bg-white/60 dark:bg-black/20 p-2 shadow-sm">
                    {icon}
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold uppercase tracking-wider block text-muted-foreground">Start</span>
                    <span className="text-sm font-bold bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded-md">
                        {routine.time}
                    </span>
                </div>
            </div>

            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                <Repeat className="h-3 w-3" /> {routine.duration}
            </p>

            <ul className="space-y-2">
                {routine.steps.map((step, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2 leading-snug">
                        <span className="flex-shrink-0 h-4 w-4 rounded-full border border-current opacity-50 flex items-center justify-center text-[8px] font-mono mt-0.5">{idx + 1}</span>
                        <span>{step}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
