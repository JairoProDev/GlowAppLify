"use client"

import React, { useRef, useEffect } from 'react'
import {
    format,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameDay,
    addMinutes,
    startOfDay,
    differenceInMinutes
} from 'date-fns'
import { CalendarEvent, EVENT_COLORS } from '@/lib/calendar/types'
import { cn } from '@/lib/utils'
import { useCalendarStore } from '@/lib/store/calendar-store'

interface WeekViewProps {
    currentDate: Date
}

export function WeekView({ currentDate }: WeekViewProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { events } = useCalendarStore()

    const start = startOfWeek(currentDate, { weekStartsOn: 1 }) // Monday start
    const end = endOfWeek(currentDate, { weekStartsOn: 1 })
    const days = eachDayOfInterval({ start, end })

    // Scroll to 8am on mount
    useEffect(() => {
        if (containerRef.current) {
            const scrollHeight = containerRef.current.scrollHeight
            const hourHeight = scrollHeight / 24
            containerRef.current.scrollTop = hourHeight * 8
        }
    }, [])

    // Time slots (every hour)
    const hours = Array.from({ length: 24 }, (_, i) => i)

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background">
            {/* Week Header */}
            <div className="flex border-b pl-16 pr-4 py-2 bg-background z-10 sticky top-0">
                {days.map((day) => {
                    const isToday = isSameDay(day, new Date())
                    return (
                        <div key={day.toString()} className="flex-1 text-center">
                            <div className={cn("text-xs font-medium uppercase mb-1", isToday ? "text-primary" : "text-muted-foreground")}>
                                {format(day, 'EEE')}
                            </div>
                            <div className={cn(
                                "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all",
                                isToday ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "text-foreground hover:bg-muted"
                            )}>
                                {format(day, 'd')}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Grid */}
            <div ref={containerRef} className="flex-1 overflow-y-auto relative custom-scrollbar">
                {/* Time Grid Background */}
                <div className="absolute inset-0 w-full pointer-events-none">
                    {hours.map((hour) => (
                        <div key={hour} className="flex h-16 border-b border-dashed border-border/50">
                            <div className="w-16 flex-shrink-0 -mt-2.5 text-xs text-muted-foreground text-right pr-4">
                                {format(new Date().setHours(hour, 0), 'h a')}
                            </div>
                            <div className="flex-1 flex">
                                {days.map((_, i) => (
                                    <div key={i} className="flex-1 border-r border-dashed border-border/50 last:border-r-0" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Current Time Indicator */}
                {days.some(d => isSameDay(d, new Date())) && (
                    <CurrentTimeIndicator startOfWeek={start} />
                )}

                {/* Events Layer */}
                <div className="absolute inset-0 pl-16 w-full flex pointer-events-none">
                    {days.map((day, dayIndex) => {
                        const dayEvents = events.filter(e => isSameDay(new Date(e.startTime), day))

                        return (
                            <div key={day.toISOString()} className="flex-1 relative h-[1536px] pointer-events-auto">
                                {dayEvents.map(event => (
                                    <EventItem key={event.id} event={event} />
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function CurrentTimeIndicator({ startOfWeek }: { startOfWeek: Date }) {
    const [now, setNow] = React.useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 60000)
        return () => clearInterval(interval)
    }, [])

    // Need to figure out which column (day)
    // and vertical position
    // For simplicity, let's just draw a line across the whole week at the right Y position?
    // A more precise one would be only in the current day's column.

    // Y position calculation:
    // 24 hours * 64px = 1536px total height
    const minutesSinceMidnight = differenceInMinutes(now, startOfDay(now))
    const topPosition = (minutesSinceMidnight / 60) * 64

    // If today is in the week view
    // (Assuming startOfWeek is correct)

    return (
        <div
            className="absolute left-16 right-0 z-20 border-t-2 border-red-500 pointer-events-none flex items-center"
            style={{ top: `${topPosition}px` }}
        >
            <div className="w-2 h-2 rounded-full bg-red-500 -ml-1 -mt-[1px]" />
        </div>
    )
}

function EventItem({ event }: { event: CalendarEvent }) {
    const start = new Date(event.startTime)
    const end = new Date(event.endTime)
    const startMin = differenceInMinutes(start, startOfDay(start))
    const durationMin = differenceInMinutes(end, start)

    // 64px per hour = 64/60 px per minute
    const top = (startMin / 60) * 64
    const height = (durationMin / 60) * 64

    const styles = EVENT_COLORS[event.type] || EVENT_COLORS.BLOCKER

    return (
        <div
            className={cn(
                "absolute inset-x-1 rounded-md border p-2 text-xs transition-all hover:z-20 cursor-pointer overflow-hidden",
                "group shadow-sm hover:shadow-md",
                styles.bg,
                styles.border,
                styles.text,
                styles.hover
            )}
            style={{
                top: `${top}px`,
                height: `${height}px`,
                minHeight: '28px'
            }}
        >
            <div className="flex flex-col h-full">
                <div className="font-semibold truncate flex items-center gap-1">
                    {event.energyRequired === 'high' && <span title="High Energy">⚡</span>}
                    {event.title}
                </div>
                {height > 40 && (
                    <div className="opacity-80 truncate mt-0.5 text-[10px]">
                        {format(start, 'h:mm a')} - {format(end, 'h:mm a')}
                    </div>
                )}
            </div>

            {/* Resize handle (Visual only for now) */}
            <div className="absolute bottom-0 inset-x-0 h-1 cursor-ns-resize group-hover:bg-foreground/10" />
        </div>
    )
}
