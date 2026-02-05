"use client"

import { useState, useMemo } from "react"
import { useCalendarStore } from "@/lib/store/calendar-store"
import { CalendarEvent, EVENT_COLORS } from "@/lib/calendar/types"
import { format, startOfDay, endOfDay, isSameDay, setHours, setMinutes } from "date-fns"
import { cn } from "@/lib/utils"

interface DayViewProps {
    currentDate: Date
    onTimeSlotClick: (date: Date) => void
    onEventClick: (event: CalendarEvent) => void
}

export function DayView({ currentDate, onTimeSlotClick, onEventClick }: DayViewProps) {
    const events = useCalendarStore(state => state.events)

    // Filter events for this day
    const dayEvents = useMemo(() => {
        const dayStart = startOfDay(currentDate)
        const dayEnd = endOfDay(currentDate)

        return events.filter(event =>
            isSameDay(new Date(event.startTime), currentDate)
        )
    }, [events, currentDate])

    // Generate time slots (5AM - 11PM)
    const timeSlots = useMemo(() => {
        return Array.from({ length: 19 }, (_, i) => i + 5) // 5 to 23
    }, [])

    const handleSlotClick = (hour: number) => {
        const slotDate = setMinutes(setHours(currentDate, hour), 0)
        onTimeSlotClick(slotDate)
    }

    // Calculate event positioning
    const getEventStyle = (event: CalendarEvent) => {
        const start = new Date(event.startTime)
        const end = new Date(event.endTime)

        const startHour = start.getHours() + start.getMinutes() / 60
        const endHour = end.getHours() + end.getMinutes() / 60

        // Offset from 5 AM
        const topPosition = (startHour - 5) * 60 // 60px per hour
        const height = (endHour - startHour) * 60

        return {
            top: `${Math.max(0, topPosition)}px`,
            height: `${Math.max(30, height)}px`, // Minimum 30px height
        }
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-center py-4 border-b bg-muted/30">
                <div className="text-center">
                    <div className="text-3xl font-bold">
                        {format(currentDate, 'd')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {format(currentDate, 'EEEE')}
                    </div>
                </div>
            </div>

            {/* Time slots with events */}
            <div className="flex-1 overflow-y-auto relative">
                <div className="relative">
                    {/* Time slots */}
                    {timeSlots.map(hour => (
                        <div
                            key={hour}
                            className="flex border-b hover:bg-accent/20 transition-colors cursor-pointer"
                            style={{ height: '60px' }}
                            onClick={() => handleSlotClick(hour)}
                        >
                            <div className="w-16 flex-shrink-0 py-2 px-3 text-xs text-muted-foreground border-r">
                                {format(setHours(new Date(), hour), 'h a')}
                            </div>
                            <div className="flex-1 relative" />
                        </div>
                    ))}

                    {/* Events overlay */}
                    <div className="absolute top-0 left-16 right-0 bottom-0 pointer-events-none">
                        {dayEvents.map(event => {
                            const style = getEventStyle(event)
                            const color = EVENT_COLORS[event.type as keyof typeof EVENT_COLORS] || EVENT_COLORS.BLOCKER

                            return (
                                <div
                                    key={event.id}
                                    className={cn(
                                        "absolute left-2 right-2 rounded-lg p-2 text-xs overflow-hidden cursor-pointer pointer-events-auto shadow-sm border",
                                        "hover:shadow-md hover:scale-[1.02] transition-all"
                                    )}
                                    style={{
                                        ...style,
                                        backgroundColor: color.bg,
                                        borderColor: color.border
                                    }}
                                    onClick={() => onEventClick(event)}
                                >
                                    <div className={cn("font-semibold truncate", color.text)}>
                                        {event.title}
                                    </div>
                                    <div className="text-xs opacity-70 mt-0.5">
                                        {format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
