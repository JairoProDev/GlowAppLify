"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from "date-fns"

interface CalendarHeaderProps {
    currentDate: Date
    onDateChange: (date: Date) => void
    view: 'day' | 'week' | 'month'
    onViewChange: (view: 'day' | 'week' | 'month') => void
}

export function CalendarHeader({ currentDate, onDateChange, view, onViewChange }: CalendarHeaderProps) {

    const handlePrev = () => {
        if (view === 'day') onDateChange(addDays(currentDate, -1))
        if (view === 'week') onDateChange(addDays(currentDate, -7))
        // Month logic omitted for MVP
    }

    const handleNext = () => {
        if (view === 'day') onDateChange(addDays(currentDate, 1))
        if (view === 'week') onDateChange(addDays(currentDate, 7))
    }

    const handleToday = () => onDateChange(new Date())

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 mb-2 bg-card border rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                    <Button
                        variant={view === 'day' ? 'bg-background shadow-sm' : 'ghost'}
                        size="sm"
                        className={view === 'day' ? 'bg-background shadow-sm' : ''}
                        onClick={() => onViewChange('day')}
                    >
                        Day
                    </Button>
                    <Button
                        variant={view === 'week' ? 'bg-background shadow-sm' : 'ghost'}
                        size="sm"
                        className={view === 'week' ? 'bg-background shadow-sm' : ''}
                        onClick={() => onViewChange('week')}
                    >
                        Week
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrev}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleToday}>
                        Today
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNext}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <h2 className="text-xl font-bold flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                {format(currentDate, "MMMM yyyy")}
            </h2>
        </div>
    )
}
