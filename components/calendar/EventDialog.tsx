"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarEvent, EventType, EVENT_COLORS, RecurrenceFrequency } from "@/lib/calendar/types"
import { useCalendarStore } from "@/lib/store/calendar-store"
import { format } from "date-fns"
import { Trash2, MapPin, RefreshCw, Zap } from "lucide-react"

interface EventDialogProps {
    isOpen: boolean
    onClose: () => void
    initialDate?: Date
    eventToEdit?: CalendarEvent | null
}

export function EventDialog({ isOpen, onClose, initialDate, eventToEdit }: EventDialogProps) {
    const { addEvent, updateEvent, deleteEvent } = useCalendarStore()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
        type: "BLOCKER" as EventType,
        energyRequired: "medium" as "low" | "medium" | "high",
        isInstant: false,
        recurrenceFrequency: "none" as RecurrenceFrequency
    })

    useEffect(() => {
        if (eventToEdit) {
            setFormData({
                title: eventToEdit.title,
                description: eventToEdit.description || "",
                location: eventToEdit.location || "",
                startTime: format(new Date(eventToEdit.startTime), "yyyy-MM-dd'T'HH:mm"),
                endTime: format(new Date(eventToEdit.endTime), "yyyy-MM-dd'T'HH:mm"),
                type: eventToEdit.type,
                energyRequired: eventToEdit.energyRequired,
                isInstant: eventToEdit.isInstant || false,
                recurrenceFrequency: eventToEdit.recurrenceFrequency || "none"
            })
        } else if (initialDate) {
            // Default to 1 hour duration
            const start = new Date(initialDate)
            const end = new Date(start.getTime() + 60 * 60 * 1000)

            setFormData({
                title: "",
                description: "",
                location: "",
                startTime: format(start, "yyyy-MM-dd'T'HH:mm"),
                endTime: format(end, "yyyy-MM-dd'T'HH:mm"),
                type: "DEEP_WORK_ANALYTICAL",
                energyRequired: "high",
                isInstant: false,
                recurrenceFrequency: "none"
            })
        }
    }, [eventToEdit, initialDate, isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validations
        if (!formData.title || !formData.startTime || (!formData.isInstant && !formData.endTime)) return

        const eventData: Omit<CalendarEvent, 'id'> = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            startTime: new Date(formData.startTime),
            endTime: formData.isInstant ? new Date(formData.startTime) : new Date(formData.endTime),
            type: formData.type,
            energyRequired: formData.energyRequired,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            status: (eventToEdit?.status || 'scheduled') as any, // Keep existing status or default
            isRecurring: formData.recurrenceFrequency !== 'none',
            recurrenceFrequency: formData.recurrenceFrequency,
            isInstant: formData.isInstant,
            userId: eventToEdit?.userId || 'current-user-id'
        }

        if (eventToEdit) {
            updateEvent(eventToEdit.id, eventData)
        } else {
            addEvent(eventData)
        }

        onClose()
    }

    const handleDelete = () => {
        if (eventToEdit) {
            deleteEvent(eventToEdit.id)
            onClose()
        }
    }

    const isNew = !eventToEdit

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isNew ? "Schedule Event" : "Edit Event"}</DialogTitle>
                    <DialogDescription>
                        {isNew ? "Plan your time effectively. Remember to align with your energy." : "Modify existing plan."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Deep Work Project X"
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="start">Start Time</Label>
                            <Input
                                id="start"
                                type="datetime-local"
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="end">End Time</Label>
                            <Input
                                id="end"
                                type="datetime-local"
                                value={formData.endTime}
                                disabled={formData.isInstant}
                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="isInstant"
                            checked={formData.isInstant}
                            onChange={(e) => {
                                const checked = e.target.checked
                                setFormData({
                                    ...formData,
                                    isInstant: checked,
                                    endTime: checked ? formData.startTime : formData.endTime
                                })
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="isInstant" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Instant Action (no duration)
                        </Label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="type">Event Type</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(val) => setFormData({ ...formData, type: val as EventType })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(EVENT_COLORS).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type.replace(/_/g, " ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="energy">Energy Required</Label>
                            <Select
                                value={formData.energyRequired}
                                onValueChange={(val) => setFormData({ ...formData, energyRequired: val as any })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select energy" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">⚡ High (Peak)</SelectItem>
                                    <SelectItem value="medium">🔋 Medium</SelectItem>
                                    <SelectItem value="low">☕ Low (Easy)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="recurrence">Recurrence</Label>
                            <Select
                                value={formData.recurrenceFrequency}
                                onValueChange={(val) => setFormData({ ...formData, recurrenceFrequency: val as any })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="None" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="interdaily">Interdaily (Every 2 days)</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g., Home, Office, Zoom"
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="desc">Description (Optional)</Label>
                        <Textarea
                            id="desc"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Add details, links, or sub-tasks..."
                        />
                    </div>

                    <DialogFooter className="flex justify-between items-center sm:justify-between">
                        {isNew ? (
                            <div /> // Spacer
                        ) : (
                            <Button type="button" variant="destructive" size="icon" onClick={handleDelete} title="Delete Event">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}

                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">{isNew ? "Schedule" : "Save Changes"}</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
