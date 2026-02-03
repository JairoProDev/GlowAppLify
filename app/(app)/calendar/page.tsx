"use client"

import { useState } from "react"
import { CalendarHeader } from "@/components/calendar/CalendarHeader"
import { TimeGrid } from "@/components/calendar/TimeGrid"

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<'day' | 'week' | 'month'>('week')

    return (
        <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Focus Calendar</h1>
            </div>

            <div className="flex-1 flex flex-col">
                <CalendarHeader
                    currentDate={currentDate}
                    onDateChange={setCurrentDate}
                    view={view}
                    onViewChange={(v) => setView(v)} // Simple cast as we only implemented day/week mostly
                />
                <div className="flex-1 overflow-hidden">
                    <TimeGrid
                        currentDate={currentDate}
                        view={view === 'month' ? 'week' : view} // Fallback for month to week for now
                    />
                </div>
            </div>
        </div>
    )
}
