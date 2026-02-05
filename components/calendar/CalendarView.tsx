"use client"

import { useState } from "react"
import { CalendarHeader } from "./CalendarHeader"
import { WeekView } from "./WeekView"
import { DayView } from "./DayView"
import { MonthView } from "./MonthView"
import { EventDialog } from "./EventDialog"
import { CalendarEvent } from "@/lib/calendar/types"

import { EnergyProfileDialog } from "../energy/EnergyProfileDialog"

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
        <div className="flex flex-col h-full bg-background">
            <div className="flex-1 flex flex-col overflow-hidden">
                <CalendarHeader
                    currentDate={currentDate}
                    onDateChange={setCurrentDate}
                    view={view}
                    onViewChange={setView}
                    onNewEvent={handleNewEvent}
                />

                <div className="flex-1 relative border-t">
                    {view === 'day' && (
                        <DayView
                            currentDate={currentDate}
                            onTimeSlotClick={handleTimeSlotClick}
                            onEventClick={handleEventClick}
                        />
                    )}
                    {view === 'week' && (
                        <WeekView
                            currentDate={currentDate}
                            onTimeSlotClick={handleTimeSlotClick}
                            onEventClick={handleEventClick}
                        />
                    )}
                    {view === 'month' && (
                        <MonthView
                            currentDate={currentDate}
                            onDateClick={handleTimeSlotClick}
                            onEventClick={handleEventClick}
                        />
                    )}
                </div>
            </div>

            <EventDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                initialDate={selectedDate}
                eventToEdit={selectedEvent}
            />

            <EnergyProfileDialog />
        </div>
    )
}
