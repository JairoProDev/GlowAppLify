"use client"

import { useState } from "react"
import { CalendarHeader } from "./CalendarHeader"
import { WeekView } from "./WeekView"
import { useCalendarStore } from "@/lib/store/calendar-store"

export default function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<'day' | 'week' | 'month'>('week')

    return (
        <div className="flex flex-col h-full bg-background/50 backdrop-blur-sm pt-4">
            {/* 
         In the future, we will put the Sidebar here.
         For now, just the main calendar area. 
      */}
            <div className="flex-1 flex flex-col rounded-2xl border bg-card shadow-2xl overflow-hidden mx-4 mb-4">
                <CalendarHeader
                    currentDate={currentDate}
                    onDateChange={setCurrentDate}
                    view={view}
                    onViewChange={setView}
                />

                <div className="flex-1 relative">
                    {view === 'week' && <WeekView currentDate={currentDate} />}
                    {view === 'day' && (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Day view coming soon
                        </div>
                    )}
                    {view === 'month' && (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Month view coming soon
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
