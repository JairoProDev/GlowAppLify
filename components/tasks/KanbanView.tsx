"use client"

import { Button } from "@/components/ui/button"
import { Task, TaskStatus, useTaskStore } from "@/lib/store/task-store"
import { TaskCard } from "./TaskCard"
import { Plus } from "lucide-react"

export function KanbanView() {
    const { tasks } = useTaskStore()

    const columns: { id: TaskStatus; label: string }[] = [
        { id: 'todo', label: 'To Do' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'blocked', label: 'Blocked' },
        { id: 'done', label: 'Done' },
    ]

    const getTasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status)

    return (
        <div className="flex h-full gap-6 overflow-x-auto pb-4">
            {columns.map(col => (
                <div key={col.id} className="min-w-[300px] w-[300px] flex flex-col bg-secondary/20 rounded-xl p-4 h-full border border-dashed hover:border-solid transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                            {col.label} <span className="ml-2 text-xs bg-secondary px-2 py-0.5 rounded-full text-foreground opacity-70">{getTasksByStatus(col.id).length}</span>
                        </h3>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin pr-2">
                        {getTasksByStatus(col.id).map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                        {getTasksByStatus(col.id).length === 0 && (
                            <div className="h-24 border-2 border-dashed rounded-lg border-muted flex items-center justify-center text-muted-foreground text-xs">
                                No tasks
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
