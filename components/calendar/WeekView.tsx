"use client"

import React, { useRef, useEffect } from 'react'
import {
    format,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameDay,
    startOfDay,
    differenceInMinutes,
    addMinutes,
    setHours,
    setMinutes
} from 'date-fns'
import { CalendarEvent, EVENT_COLORS } from '@/lib/calendar/types'
import { cn } from '@/lib/utils'
import { useCalendarStore } from '@/lib/store/calendar-store'

interface WeekViewProps {
    currentDate: Date
    onEventClick: (event: CalendarEvent) => void
    onTimeSlotClick: (date: Date) => void
}

export function WeekView({ currentDate, onEventClick, onTimeSlotClick }: WeekViewProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { events, updateEvent } = useCalendarStore()

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

    const handleSlotClick = (day: Date, hour: number) => {
        const clickedDate = setMinutes(setHours(day, hour), 0)
        onTimeSlotClick(clickedDate)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (e: React.DragEvent, day: Date, hour: number) => {
        e.preventDefault()
        const eventId = e.dataTransfer.getData('eventId')
        const durationStr = e.dataTransfer.getData('duration')

        if (eventId && durationStr) {
            const durationMin = parseInt(durationStr, 10)
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
            const offsetY = e.clientY - rect.top

            // 64px height = 60 minutes
            const minutesInSlot = Math.floor((offsetY / 64) * 60)
            const snappedMinutes = Math.round(minutesInSlot / 15) * 15 // Snap to 15 min

            const newStart = setMinutes(setHours(day, hour), snappedMinutes)
            const newEnd = addMinutes(newStart, durationMin)

            updateEvent(eventId, {
                startTime: newStart,
                endTime: newEnd
            })
        }
    }

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background">
            {/* Week Header */}
            <div className="flex border-b pl-16 pr-4 py-2 bg-background z-10 sticky top-0 shadow-sm">
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
                {/* Time Grid Background & Click Targets */}
                <div className="absolute inset-0 w-full">
                    {hours.map((hour) => (
                        <div key={hour} className="flex h-16 border-b border-dashed border-border/50 relative group">
                            <div className="w-16 flex-shrink-0 -mt-2.5 text-xs text-muted-foreground text-right pr-4 pointer-events-none select-none">
                                {format(new Date().setHours(hour, 0), 'h a')}
                            </div>
                            <div className="flex-1 flex">
                                {days.map((day, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 border-r border-dashed border-border/50 last:border-r-0 hover:bg-accent/30 transition-colors cursor-pointer"
                                        onClick={() => handleSlotClick(day, hour)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, day, hour)}
                                    />
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
                    {days.map((day) => {
                        const dayEvents = events.filter(e => isSameDay(new Date(e.startTime), day))

                        return (
                            <div key={day.toISOString()} className="flex-1 relative h-[1536px] pointer-events-auto">
                                {dayEvents.map(event => (
                                    <EventItem key={event.id} event={event} onClick={() => onEventClick(event)} />
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

    const minutesSinceMidnight = differenceInMinutes(now, startOfDay(now))
    const topPosition = (minutesSinceMidnight / 60) * 64

    return (
        <div
            className="absolute left-16 right-0 z-20 border-t-2 border-red-500 pointer-events-none flex items-center shadow-[0_0_10px_rgba(239,68,68,0.5)]"
            style={{ top: `${topPosition}px` }}
        >
            <div className="w-2 h-2 rounded-full bg-red-500 -ml-1 -mt-[1px]" />
        </div>
    )
}

function EventItem({ event, onClick }: { event: CalendarEvent, onClick: () => void }) {
    const start = new Date(event.startTime)
    const end = new Date(event.endTime)
    const startMin = differenceInMinutes(start, startOfDay(start))
    const durationMin = differenceInMinutes(end, start)

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('eventId', event.id)
        e.dataTransfer.setData('duration', durationMin.toString())
        e.dataTransfer.effectAllowed = 'move'
    }

    const top = (startMin / 60) * 64
    const height = Math.max((durationMin / 60) * 64, 28) // Minimum height for readability

    const styles = EVENT_COLORS[event.type] || EVENT_COLORS.BLOCKER

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onClick={(e) => {
                e.stopPropagation()
                onClick()
            }}
            className={cn(
                "absolute inset-x-1 rounded-md border p-2 text-xs transition-all hover:z-30 cursor-pointer overflow-hidden",
                "group shadow-sm hover:shadow-lg hover:scale-[1.02] duration-200",
                styles.bg,
                styles.border,
                styles.text,
                styles.hover
            )}
            style={{
                top: `${top}px`,
                height: `${height}px`,
            }}
        >
            <div className="flex flex-col h-full">
                <div className="font-semibold truncate flex items-center gap-1">
                    {event.energyRequired === 'high' && <span title="High Energy">⚡</span>}
                    {event.title}
                </div>
                {height > 40 && (
                    <div className="opacity-80 truncate mt-0.5 text-[10px] items-center flex gap-1">
                        <span>{format(start, 'h:mm a')}</span>
                        <span>-</span>
                        <span>{format(end, 'h:mm a')}</span>
                    </div>
                )}
            </div>

            {/* Resize handle (Visual only for now) */}
            <div className="absolute bottom-0 inset-x-0 h-1 cursor-ns-resize group-hover:bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    )
}
