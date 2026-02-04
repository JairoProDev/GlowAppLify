"use client"

import { useState } from "react"
import { CalendarHeader } from "./CalendarHeader"
import { WeekView } from "./WeekView"
import { EventDialog } from "./EventDialog"
import { CalendarEvent } from "@/lib/calendar/types"

export default function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<'day' | 'week' | 'month'>('week')

    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

    const handleNewEvent = () => {
        setSelectedDate(new Date())
        setSelectedEvent(null)
        setIsDialogOpen(true)
    }

    const handleTimeSlotClick = (date: Date) => {
        setSelectedDate(date)
        setSelectedEvent(null)
        setIsDialogOpen(true)
    }

    const handleEventClick = (event: CalendarEvent) => {
        setSelectedEvent(event)
        setSelectedDate(undefined)
        setIsDialogOpen(true)
    }

    return (
        <div className="flex flex-col h-full bg-background/50 backdrop-blur-sm pt-4">
            <div className="flex-1 flex flex-col rounded-2xl border bg-card shadow-2xl overflow-hidden mx-4 mb-4">
                <CalendarHeader
                    currentDate={currentDate}
                    onDateChange={setCurrentDate}
                    view={view}
                    onViewChange={setView}
                    onNewEvent={handleNewEvent}
                />

                <div className="flex-1 relative">
                    {view === 'week' && (
                        <WeekView
                            currentDate={currentDate}
                            onTimeSlotClick={handleTimeSlotClick}
                            onEventClick={handleEventClick}
                        />
                    )}
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

            <EventDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                initialDate={selectedDate}
                eventToEdit={selectedEvent}
            />
        </div>
    )
}
