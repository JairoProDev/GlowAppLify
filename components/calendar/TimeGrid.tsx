"use client"

import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from "date-fns"
import { cn } from "@/lib/utils"

interface TimeGridProps {
    currentDate: Date
    view: 'day' | 'week'
    events?: any[] // Todo: type properly
}

export function TimeGrid({ currentDate, view, events = [] }: TimeGridProps) {
    const hours = Array.from({ length: 24 }, (_, i) => i)

    const days = view === 'week'
        ? eachDayOfInterval({ start: startOfWeek(currentDate, { weekStartsOn: 1 }), end: endOfWeek(currentDate, { weekStartsOn: 1 }) })
        : [currentDate]

    return (
        <div className="flex flex-col h-[600px] overflow-y-auto border rounded-xl bg-card shadow-sm scrollbar-hide">
            {/* Header Row (Days) */}
            <div className="flex border-b sticky top-0 bg-card z-10">
                <div className="w-16 border-r shrink-0"></div> {/* Time axis header */}
                {days.map((day) => (
                    <div
                        key={day.toISOString()}
                        className={cn(
                            "flex-1 p-2 text-center border-r last:border-r-0 min-w-[100px]",
                            isToday(day) && "bg-primary/5"
                        )}
                    >
                        <div className={cn("text-xs font-semibold uppercase opacity-50", isToday(day) && "text-primary")}>
                            {format(day, "EEE")}
                        </div>
                        <div className={cn(
                            "text-xl font-bold h-8 w-8 rounded-full flex items-center justify-center mx-auto mt-1",
                            isToday(day) && "bg-primary text-primary-foreground"
                        )}>
                            {format(day, "d")}
                        </div>
                    </div>
                ))}
            </div>

            {/* Time Grid */}
            <div className="flex-1 relative">
                {hours.map((hour) => (
                    <div key={hour} className="flex h-16 border-b last:border-b-0">
                        {/* Time Label */}
                        <div className="w-16 border-r shrink-0 text-xs text-muted-foreground p-1 text-right pr-2 -mt-2">
                            {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : hour === 0 ? '12 AM' : `${hour} AM`}
                        </div>

                        {/* Columns for days */}
                        {days.map((day) => (
                            <div
                                key={day.toISOString()}
                                className={cn(
                                    "flex-1 border-r last:border-r-0 relative group",
                                    isToday(day) ? "bg-primary/5" : "hover:bg-muted/30"
                                )}
                            >
                                {/* Grid lines for half hours could go here */}
                            </div>
                        ))}
                    </div>
                ))}

                {/* Current Time Indicator (Visual Mockup) */}
                {/* If today is in view, logic to show line */}
            </div>
        </div>
    )
}
