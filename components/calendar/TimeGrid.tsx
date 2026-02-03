"use client"

import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from "date-fns"
import { cn } from "@/lib/utils"
import { Task } from "@/lib/store/task-store"
import { Badge } from "@/components/ui/badge"

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

    const getTasksForDay = (date: Date) => {
        return tasks.filter(task => {
            if (!task.deadline) return false
            const taskDate = new Date(task.deadline)
            return isSameDay(taskDate, date)
        })
    }

    return (
        <div className="flex flex-col h-full overflow-hidden border rounded-xl bg-card shadow-sm">
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
                        {/* Daily Summary / All Day Events Area */}
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
            <div className="flex-1 overflow-y-auto scrollbar-hide relative">
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
                                // For now, since we don't have time on tasks, we'll render them in the 9AM slot or just list them if they match the day
                                // This is a "simulated" schedule for the MVP "Best in World" claim implies strictly strictly functional
                                // We will just scatter them for demo or show "Free time"
                                // Actually, let's render tasks at the top if no time, or map them if we add time later.
                                // For this MVP, we will render tasks in the FIRST slot (e.g. 9am) just to show they appear.

                                return (
                                    <div
                                        key={day.toISOString()}
                                        className={cn(
                                            "flex-1 border-r last:border-r-0 relative group p-1",
                                            isToday(day) ? "bg-primary/5" : "hover:bg-muted/10"
                                        )}
                                    >
                                        {/* Grid lines */}
                                        <div className="absolute top-1/2 left-0 right-0 h-px bg-border/30 border-dashed" />

                                        {/* Render Tasks arbitrarily at 9am for demo purposes if mapped to day */}
                                        {hour === 9 && dayTasks.map((task, idx) => (
                                            <div key={task.id} className="mb-1">
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
                <div className="absolute top-[380px] left-16 right-0 h-px bg-red-400 z-20 flex items-center pointer-events-none">
                    <div className="h-2 w-2 rounded-full bg-red-400 -ml-1" />
                </div>
            </div>
        </div>
    )
}
