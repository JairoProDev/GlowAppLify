"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { KanbanView } from "@/components/tasks/KanbanView"
import { useTaskStore } from "@/lib/store/task-store"
import { useDailyStore } from "@/lib/store/useDailyStore"
import { Plus, Search, Filter, Sparkles, Loader2 } from "lucide-react"
import { PrioritizationDialog } from "@/components/tasks/PrioritizationDialog"

export default function TasksPage() {
    const { tasks, addTask, updateTask } = useTaskStore()
    const { oneThing } = useDailyStore()
    const [isPrioritizing, setIsPrioritizing] = useState(false)
    const [prioritizationResult, setPrioritizationResult] = useState<any>(null)
    const [showDialog, setShowDialog] = useState(false)

    const handleQuickAdd = () => {
        addTask({
            title: "New Task",
            priority: 'important',
            status: 'todo',
            tags: [],
        })
    }

    const handleAIPrioritize = async () => {
        if (tasks.length === 0) {
            alert("Add some tasks first to prioritize them!")
            return
        }

        setIsPrioritizing(true)
        try {
            const response = await fetch('/api/tasks/prioritize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tasks: tasks.map(t => ({
                        id: t.id,
                        title: t.title,
                        priority: t.priority,
                        status: t.status,
                        tags: t.tags,
                        description: t.description
                    })),
                    goal: oneThing?.title || "General productivity",
                    context: `Current focus: ${oneThing?.title || 'Not set'}`
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to prioritize tasks')
            }

            const result = await response.json()
            setPrioritizationResult(result)
            setShowDialog(true)
        } catch (error) {
            console.error('Prioritization error:', error)
            alert('Failed to prioritize tasks. Please try again.')
        } finally {
            setIsPrioritizing(false)
        }
    }

    const handleApplyPrioritization = () => {
        if (!prioritizationResult?.prioritizedTasks) return

        // Apply the AI recommendations
        prioritizationResult.prioritizedTasks.forEach((rec: any) => {
            const task = tasks.find(t => t.id === rec.taskId)
            if (task) {
                updateTask(task.id, { priority: rec.newPriority })
            }
        })

        setShowDialog(false)
        setPrioritizationResult(null)
    }

    return (
        <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Task Master</h1>
                    <p className="text-muted-foreground">Prioritize, delegate, and execute.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={handleAIPrioritize}
                        variant="outline"
                        disabled={isPrioritizing || tasks.length === 0}
                    >
                        {isPrioritizing ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4 mr-2" />
                                AI Prioritize
                            </>
                        )}
                    </Button>
                    <Button onClick={handleQuickAdd}>
                        <Plus className="h-4 w-4 mr-2" /> New Task
                    </Button>
                </div>
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

            {prioritizationResult && (
                <PrioritizationDialog
                    isOpen={showDialog}
                    onClose={() => setShowDialog(false)}
                    result={prioritizationResult}
                    onApply={handleApplyPrioritization}
                />
            )}
        </div>
    )
}
