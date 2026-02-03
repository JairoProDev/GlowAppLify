"use client"

import { useState } from "react"
import { CalendarHeader } from "@/components/calendar/CalendarHeader"
import { TimeGrid } from "@/components/calendar/TimeGrid"
import { useTaskStore } from "@/lib/store/task-store"

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<'day' | 'week' | 'month'>('week')
    const { tasks } = useTaskStore()

    return (
        <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Focus Calendar</h1>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <CalendarHeader
                    currentDate={currentDate}
                    onDateChange={setCurrentDate}
                    view={view}
                    onViewChange={(v) => setView(v)}
                />
                <div className="flex-1 overflow-hidden min-h-0">
                    <TimeGrid
                        currentDate={currentDate}
                        view={view === 'month' ? 'week' : view}
                        tasks={tasks}
                    />
                </div>
            </div>
        </div>
    )
}
