"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { KanbanView } from "@/components/tasks/KanbanView"
import { useTaskStore } from "@/lib/store/task-store"
import { Plus, Search, Filter } from "lucide-react"

export default function TasksPage() {
    const { addTask } = useTaskStore()

    const handleQuickAdd = () => {
        // Logic to open dialog or add dummy task for MVP
        addTask({
            title: "New Task",
            priority: 'important',
            status: 'todo',
            tags: [],
        })
    }

    return (
        <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Task Master</h1>
                    <p className="text-muted-foreground">Prioritize, delegate, and execute.</p>
                </div>
                <Button onClick={handleQuickAdd}>
                    <Plus className="h-4 w-4 mr-2" /> New Task
                </Button>
            </div>

            <div className="flex items-center gap-4 py-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Filter tasks..." className="pl-8" />
                </div>
                <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
            </div>

            <div className="flex-1 overflow-hidden">
                <KanbanView />
            </div>
        </div>
    )
}
