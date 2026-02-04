"use client"

import * as React from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Settings2, Layout, Zap, Search } from "lucide-react"
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, addDays, subDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarHeaderProps {
    currentDate: Date
    onDateChange: (date: Date) => void
    view: 'day' | 'week' | 'month'
    onViewChange: (view: 'day' | 'week' | 'month') => void
    onNewEvent?: () => void
}

export function CalendarHeader({ currentDate, onDateChange, view, onViewChange, onNewEvent }: CalendarHeaderProps) {

    const handlePrev = () => {
        if (view === 'day') onDateChange(subDays(currentDate, 1))
        else if (view === 'week') onDateChange(subWeeks(currentDate, 1))
        // Month logic can be added later
    }

    const handleNext = () => {
        if (view === 'day') onDateChange(addDays(currentDate, 1))
        else if (view === 'week') onDateChange(addWeeks(currentDate, 1))
    }

    const handleToday = () => onDateChange(new Date())

    return (
        <div className="flex flex-col gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 sticky top-0 z-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <span className="text-primary">Glow</span>Calendar
                    </h1>
                    <div className="h-6 w-px bg-border mx-2" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Button variant="ghost" size="icon" onClick={handlePrev} className="h-8 w-8 hover:bg-muted/50 transition-colors">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="font-medium text-foreground min-w-[140px] text-center">
                            {format(currentDate, "MMMM yyyy")}
                        </span>
                        <Button variant="ghost" size="icon" onClick={handleNext} className="h-8 w-8 hover:bg-muted/50 transition-colors">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleToday} className="ml-2 h-8 text-xs font-medium">
                        Today
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center bg-muted/50 rounded-lg p-1 mr-2">
                        {(['day', 'week', 'month'] as const).map((v) => (
                            <button
                                key={v}
                                onClick={() => onViewChange(v)}
                                className={cn(
                                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                    view === v
                                        ? "bg-background shadow-sm text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {v.charAt(0).toUpperCase() + v.slice(1)}
                            </button>
                        ))}
                    </div>

                    <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Settings2 className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="icon" className="h-9 w-9 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100/50" title="AI Assistant">
                        <Zap className="h-4 w-4" />
                    </Button>

                    <Button
                        className="ml-2 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                        onClick={onNewEvent}
                    >
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">New Event</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
