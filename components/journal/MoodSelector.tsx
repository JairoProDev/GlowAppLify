"use client"

import { Button } from "@/components/ui/button"
import { Mood } from "@/lib/store/journal-store"
import { Frown, Meh, Smile } from "lucide-react"
import { cn } from "@/lib/utils"

interface MoodSelectorProps {
    value: Mood
    onChange: (mood: Mood) => void
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
    const moods: { value: Mood; label: string; icon: React.ReactNode; color: string }[] = [
        { value: 1, label: 'Awful', icon: <Frown className="h-6 w-6" />, color: 'bg-red-100 text-red-600 border-red-200 hover:bg-red-200' },
        { value: 2, label: 'Bad', icon: <Frown className="h-6 w-6" />, color: 'bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200' },
        { value: 3, label: 'Okay', icon: <Meh className="h-6 w-6" />, color: 'bg-yellow-100 text-yellow-600 border-yellow-200 hover:bg-yellow-200' },
        { value: 4, label: 'Good', icon: <Smile className="h-6 w-6" />, color: 'bg-emerald-100 text-emerald-600 border-emerald-200 hover:bg-emerald-200' },
        { value: 5, label: 'Amazing', icon: <Smile className="h-6 w-6" />, color: 'bg-green-100 text-green-600 border-green-200 hover:bg-green-200' },
    ]

    return (
        <div className="flex gap-2">
            {moods.map((m) => (
                <button
                    key={m.value}
                    onClick={() => onChange(m.value)}
                    className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all w-20 h-20",
                        value === m.value ? `${m.color} ring-2 ring-offset-1 ring-primary` : "bg-secondary border-transparent text-muted-foreground hover:bg-secondary/80"
                    )}
                >
                    <div className="mb-1">{m.icon}</div>
                    <span className="text-xs font-medium">{m.label}</span>
                </button>
            ))}
        </div>
    )
}
