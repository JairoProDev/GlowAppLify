"use client"

import * as React from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Settings2, Layout, Zap, Search } from "lucide-react"
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, addDays, subDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/lib/store/ui-store"

import { ThemeLanguageToggle } from "@/components/ThemeLanguageToggle"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { addMonths, subMonths } from "date-fns"

interface CalendarHeaderProps {
    currentDate: Date
    onDateChange: (date: Date) => void
    view: 'day' | 'week' | 'month'
    onViewChange: (view: 'day' | 'week' | 'month') => void
    onNewEvent?: () => void
}

export function CalendarHeader({ currentDate, onDateChange, view, onViewChange, onNewEvent }: CalendarHeaderProps) {
    const { toggleAICoach } = useUIStore()
    const { t } = useLanguage()

    const handlePrev = () => {
        if (view === 'day') onDateChange(subDays(currentDate, 1))
        else if (view === 'week') onDateChange(subWeeks(currentDate, 1))
        else if (view === 'month') onDateChange(subMonths(currentDate, 1))
    }

    const handleNext = () => {
        if (view === 'day') onDateChange(addDays(currentDate, 1))
        else if (view === 'week') onDateChange(addWeeks(currentDate, 1))
        else if (view === 'month') onDateChange(addMonths(currentDate, 1))
    }

    const handleToday = () => onDateChange(new Date())

    return (
        <div className="flex flex-col gap-4 bg-background p-2 px-4 sticky top-0 z-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <span className="text-primary">Glow</span>Calendar
                    </h1>
                    <div className="h-6 w-px bg-border mx-2" />
                    <div className="flex items-center gap-2 text-sm text-foreground">
                        <Button variant="ghost" size="icon" onClick={handlePrev} className="h-8 w-8 hover:bg-muted transition-colors">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold text-lg min-w-[140px] text-center capitalize">
                            {format(currentDate, "MMMM yyyy")}
                        </span>
                        <Button variant="ghost" size="icon" onClick={handleNext} className="h-8 w-8 hover:bg-muted transition-colors">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleToday} className="ml-2 h-7 text-xs font-medium">
                        {t('calendar.today')}
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
                                {v === 'day' ? t('common.dailyView').replace(' View', '') : v.charAt(0).toUpperCase() + v.slice(1)}
                            </button>
                        ))}
                    </div>

                    <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Search className="h-4 w-4" />
                    </Button>

                    <ThemeLanguageToggle />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100/50"
                        title="AI Assistant"
                        onClick={toggleAICoach}
                    >
                        <Zap className="h-4 w-4" />
                    </Button>

                    <Button
                        className="ml-2 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                        onClick={onNewEvent}
                    >
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">{t('calendar.new_event')}</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
