"use client"

import { useMemo } from "react"
import { useCalendarStore } from "@/lib/store/calendar-store"
import { CalendarEvent, EVENT_COLORS } from "@/lib/calendar/types"
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday
} from "date-fns"
import { cn } from "@/lib/utils"

interface MonthViewProps {
    currentDate: Date
    onDateClick: (date: Date) => void
    onEventClick: (event: CalendarEvent) => void
}

export function MonthView({ currentDate, onDateClick, onEventClick }: MonthViewProps) {
    const events = useCalendarStore(state => state.events)

    // Generate calendar grid
    const calendarDays = useMemo(() => {
        const monthStart = startOfMonth(currentDate)
        const monthEnd = endOfMonth(currentDate)
        const calendarStart = startOfWeek(monthStart)
        const calendarEnd = endOfWeek(monthEnd)

        return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
    }, [currentDate])

    // Get events for a specific day
    const getEventsForDay = (day: Date) => {
        return events.filter(event =>
            isSameDay(new Date(event.startTime), day)
        ).slice(0, 3) // Show max 3 events per day
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-b bg-muted/30">
                {weekDays.map(day => (
                    <div
                        key={day}
                        className="py-2 text-center text-xs font-semibold text-muted-foreground"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-7" style={{ gridAutoRows: 'minmax(100px, 1fr)' }}>
                    {calendarDays.map(day => {
                        const dayEvents = getEventsForDay(day)
                        const moreEvents = events.filter(event =>
                            isSameDay(new Date(event.startTime), day)
                        ).length - 3

                        return (
                            <div
                                key={day.toString()}
                                className={cn(
                                    "border-r border-b p-2 cursor-pointer hover:bg-accent/20 transition-colors",
                                    !isSameMonth(day, currentDate) && "bg-muted/20 text-muted-foreground",
                                    isToday(day) && "bg-primary/5 ring-1 ring-primary/20"
                                )}
                                onClick={() => onDateClick(day)}
                            >
                                {/* Date number */}
                                <div className="flex items-center justify-between mb-1">
                                    <span
                                        className={cn(
                                            "text-sm font-medium",
                                            isToday(day) && "bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center"
                                        )}
                                    >
                                        {format(day, 'd')}
                                    </span>
                                </div>

                                {/* Events */}
                                <div className="space-y-1">
                                    {dayEvents.map(event => {
                                        const color = EVENT_COLORS[event.type as keyof typeof EVENT_COLORS] || EVENT_COLORS.BLOCKER

                                        return (
                                            <div
                                                key={event.id}
                                                className={cn(
                                                    "text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80",
                                                    color.text
                                                )}
                                                style={{
                                                    backgroundColor: color.bg,
                                                    borderLeft: `2px solid ${color.border}`
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onEventClick(event)
                                                }}
                                            >
                                                {format(new Date(event.startTime), 'h:mm a')} {event.title}
                                            </div>
                                        )
                                    })}

                                    {/* More events indicator */}
                                    {moreEvents > 0 && (
                                        <div className="text-xs text-muted-foreground font-medium px-1">
                                            +{moreEvents} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
