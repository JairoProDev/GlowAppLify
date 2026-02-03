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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Clock, Play } from "lucide-react"
import { useState } from "react"
import { useRoutineStore, Routine, RoutineStep } from "@/lib/store/routine-store"
import { toast } from "react-hot-toast"

export function RoutineWizardDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const { addRoutine } = useRoutineStore()

    // Form State
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState<'morning' | 'evening' | 'custom'>('morning')
    const [steps, setSteps] = useState<RoutineStep[]>([
        { id: '1', title: 'Step 1', duration: 5 }
    ])

    const handleAddStep = () => {
        setSteps([...steps, { id: Math.random().toString(), title: '', duration: 5 }])
    }

    const handleStepChange = (id: string, field: keyof RoutineStep, value: any) => {
        setSteps(steps.map(s => s.id === id ? { ...s, [field]: value } : s))
    }

    const removeStep = (id: string) => {
        setSteps(steps.filter(s => s.id !== id))
    }

    const handleSave = () => {
        if (!title) return toast.error("Please enter a title")

        const newRoutine: Routine = {
            id: Math.random().toString(36).substring(2),
            title,
            description,
            type,
            steps: steps.filter(s => s.title.trim() !== '') // Filter empty steps
        }

        addRoutine(newRoutine)
        toast.success("Routine created successfully!")
        setOpen(false)

        // Reset form
        setTitle("")
        setDescription("")
        setSteps([{ id: '1', title: '', duration: 5 }])
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Design New Routine</DialogTitle>
                    <DialogDescription>
                        Create a sequence of habits to automate your success.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Basic Info */}
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label>Routine Name</Label>
                            <Input placeholder="e.g. Monk Mode Morning" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <Textarea placeholder="What is the purpose of this routine?" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Type</Label>
                            <Select value={type} onValueChange={(v: any) => setType(v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="morning">Morning Ritual</SelectItem>
                                    <SelectItem value="evening">Evening Shutdown</SelectItem>
                                    <SelectItem value="custom">Custom Protocol</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Steps Builder */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <Label className="uppercase text-xs text-muted-foreground font-bold tracking-wider">Routine Sequence</Label>
                            <Button size="sm" variant="ghost" onClick={handleAddStep} className="h-6">
                                <Plus className="h-3 w-3 mr-1" /> Add Step
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex gap-2 items-start group">
                                    <div className="bg-muted w-6 h-9 flex items-center justify-center rounded text-xs font-mono text-muted-foreground shrink-0 mt-0.5">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            placeholder="Action (e.g. Drink Water)"
                                            value={step.title}
                                            onChange={(e) => handleStepChange(step.id, 'title', e.target.value)}
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="w-24 shrink-0 relative">
                                        <Input
                                            type="number"
                                            min={1}
                                            value={step.duration}
                                            onChange={(e) => handleStepChange(step.id, 'duration', parseInt(e.target.value))}
                                            className="h-9 pr-8"
                                        />
                                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">min</span>
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeStep(step.id)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Create Routine</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
