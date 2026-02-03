import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Task, TaskPriority } from "@/lib/store/task-store"
import { Calendar, Flag } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaskCardProps {
    task: Task
    onClick?: () => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
    const priorityColors: Record<TaskPriority, string> = {
        'urgent-important': 'text-red-600 bg-red-100 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900',
        'important': 'text-orange-600 bg-orange-100 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-900',
        'urgent': 'text-yellow-600 bg-yellow-100 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900',
        'low': 'text-blue-600 bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900',
    }

    // Simplified mapping for badge text
    const priorityLabel: Record<TaskPriority, string> = {
        'urgent-important': 'Do First',
        'important': 'Schedule',
        'urgent': 'Delegate',
        'low': 'Eliminate/Later',
    }

    return (
        <Card
            className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50 group"
            onClick={onClick}
        >
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <Badge variant="outline" className={cn("capitalize font-normal", priorityColors[task.priority])}>
                    {priorityLabel[task.priority]}
                </Badge>
                {task.deadline && (
                    <span className="text-[10px] flex items-center gap-1 text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.deadline).toLocaleDateString()}
                    </span>
                )}
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-2">
                <h4 className="font-medium leading-snug group-hover:text-primary transition-colors">{task.title}</h4>
                {task.description && <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>}

                <div className="flex flex-wrap gap-1 pt-1">
                    {task.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
