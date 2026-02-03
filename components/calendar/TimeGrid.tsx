"use client"

import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from "date-fns"
import { cn } from "@/lib/utils"
import { Task } from "@/lib/store/task-store"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { TaskDialog } from "@/components/tasks/TaskDialog"

interface TimeGridProps {
    currentDate: Date
    view: 'day' | 'week'
    tasks: Task[]
}

export function TimeGrid({ currentDate, view, tasks = [] }: TimeGridProps) {
    const hours = Array.from({ length: 24 }, (_, i) => i)

    const days = view === 'week'
        ? eachDayOfInterval({ start: startOfWeek(currentDate, { weekStartsOn: 1 }), end: endOfWeek(currentDate, { weekStartsOn: 1 }) })
        : [currentDate]

    // Event Creation State
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

    const getTasksForDay = (date: Date) => {
        return tasks.filter(task => {
            if (!task.deadline) return false
            const taskDate = new Date(task.deadline)
            return isSameDay(taskDate, date)
        })
    }

    const handleCellClick = (date: Date, hour: number) => {
        // Create a date object with the specific hour
        const clickedDate = new Date(date)
        clickedDate.setHours(hour, 0, 0, 0)

        setSelectedDate(clickedDate)
        setCreateDialogOpen(true)
    }

    return (
        <>
            <div className="flex flex-col h-full overflow-hidden border rounded-xl bg-card shadow-sm select-none">
                {/* Header Row (Days) */}
                <div className="flex border-b bg-card z-10 sticky top-0">
                    <div className="w-16 border-r shrink-0 bg-background/50"></div>
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
                                "text-xl font-bold h-8 w-8 rounded-full flex items-center justify-center mx-auto mt-1 transition-colors",
                                isToday(day) && "bg-primary text-primary-foreground shadow-sm"
                            )}>
                                {format(day, "d")}
                            </div>
                            <div className="mt-2 text-xs h-6">
                                {getTasksForDay(day).length > 0 && (
                                    <span className="bg-secondary px-2 py-0.5 rounded-full text-[10px] text-muted-foreground font-medium">
                                        {getTasksForDay(day).length} tasks
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scrollable Time Grid */}
                <div className="flex-1 overflow-y-auto scrollbar-hide relative group/grid">
                    <div className="absolute inset-0 w-full">
                        {hours.map((hour) => (
                            <div key={hour} className="flex h-20 border-b last:border-b-0">
                                {/* Time Label */}
                                <div className="w-16 border-r shrink-0 text-xs text-muted-foreground p-1 text-right pr-2 -mt-2 bg-background/50 sticky left-0 z-10">
                                    {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : hour === 0 ? '12 AM' : `${hour} AM`}
                                </div>

                                {/* Columns for days */}
                                {days.map((day) => {
                                    const dayTasks = getTasksForDay(day);

                                    return (
                                        <div
                                            key={day.toISOString()}
                                            className={cn(
                                                "flex-1 border-r last:border-r-0 relative group p-1 transition-colors cursor-pointer",
                                                isToday(day) ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"
                                            )}
                                            onClick={() => handleCellClick(day, hour)}
                                        >
                                            {/* Grid lines */}
                                            <div className="absolute top-1/2 left-0 right-0 h-px bg-border/30 border-dashed pointer-events-none" />

                                            {/* Hover Add Indicator */}
                                            <div className="absolute inset-x-2 top-2 h-6 bg-primary/10 rounded border border-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-primary pointer-events-none">
                                                + Add
                                            </div>

                                            {/* Render Tasks arbitrarily at 9am for demo purposes if mapped to day */}
                                            {hour === 9 && dayTasks.map((task, idx) => (
                                                <div key={task.id} className="mb-1 relative z-20" onClick={(e) => { e.stopPropagation(); /* TODO: Open Edit */ }}>
                                                    <Badge variant="secondary" className={cn(
                                                        "w-full justify-start text-[10px] font-normal cursor-pointer hover:bg-primary hover:text-primary-foreground truncate transition-colors",
                                                        task.priority === 'urgent-important' ? "border-l-2 border-l-red-500" : ""
                                                    )}>
                                                        {task.title}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Current Time Line Mockup */}
                    <div className="absolute top-[380px] left-16 right-0 h-px bg-red-400 z-20 flex items-center pointer-events-none opacity-60">
                        <div className="h-2 w-2 rounded-full bg-red-400 -ml-1" />
                    </div>
                </div>
            </div>

            <TaskDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                defaultDate={selectedDate}
            />
        </>
    )
}
