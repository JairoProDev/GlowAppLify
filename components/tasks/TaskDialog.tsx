"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useTaskStore, TaskPriority, TaskStatus } from "@/lib/store/task-store"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "react-hot-toast"

interface TaskDialogProps {
    children?: React.ReactNode
    defaultDate?: Date
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function TaskDialog({ children, defaultDate, open: controlledOpen, onOpenChange }: TaskDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = controlledOpen !== undefined

    const open = isControlled ? controlledOpen : internalOpen
    const setOpen = isControlled ? onOpenChange! : setInternalOpen

    const { addTask } = useTaskStore()

    const [title, setTitle] = useState("")
    const [priority, setPriority] = useState<TaskPriority>('important')
    const [date, setDate] = useState<Date | undefined>(defaultDate)

    // Update date if defaultDate prop changes
    useEffect(() => {
        if (defaultDate) setDate(defaultDate)
    }, [defaultDate])

    const handleSave = () => {
        if (!title.trim()) return toast.error("Task title is required")

        addTask({
            title,
            priority,
            status: 'todo',
            deadline: date ? date.toISOString() : undefined,
            tags: []
        })

        toast.success("Task created")
        setOpen(false)
        setTitle("")
        setPriority('important')
        setDate(undefined)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children && <DialogTrigger asChild>{children}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Add a new task to your master list.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Task Title</Label>
                        <Input id="title" placeholder="e.g. Finish report" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Priority</Label>
                            <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="urgent-important">Do First (Urgent & Important)</SelectItem>
                                    <SelectItem value="important">Schedule (Important)</SelectItem>
                                    <SelectItem value="urgent">Delegate (Urgent)</SelectItem>
                                    <SelectItem value="low">Eliminate (Low)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label>Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Create Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
