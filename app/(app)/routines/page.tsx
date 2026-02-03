"use client"

import { useState } from "react"
import { useRoutineStore } from "@/lib/store/routine-store"
import { RoutineCard } from "@/components/routines/RoutineCard"
import { RoutinePlayer } from "@/components/routines/RoutinePlayer"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function RoutinesPage() {
    const { routines } = useRoutineStore()
    const [activeRoutineId, setActiveRoutineId] = useState<string | null>(null)

    const activeRoutine = routines.find(r => r.id === activeRoutineId)

    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Routines</h1>
                    <p className="text-muted-foreground">Design your days for success.</p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" /> New Routine
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routines.map(routine => (
                    <RoutineCard
                        key={routine.id}
                        routine={routine}
                        onPlay={() => setActiveRoutineId(routine.id)}
                    />
                ))}
            </div>

            {activeRoutine && (
                <RoutinePlayer
                    routine={activeRoutine}
                    onClose={() => setActiveRoutineId(null)}
                />
            )}
        </div>
    )
}
