"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Note } from "@/lib/store/note-store"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"

interface NoteEditorProps {
    note: Note
    onUpdate: (updates: Partial<Note>) => void
}

export function NoteEditor({ note, onUpdate }: NoteEditorProps) {
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    // Sync state when note prop changes (switching notes)
    useEffect(() => {
        setTitle(note.title)
        setContent(note.content)
    }, [note.id]) // Only when ID changes

    // Simple debounce saving logic or onBlur
    const handleTitleBlur = () => {
        if (title !== note.title) onUpdate({ title })
    }

    const handleContentBlur = () => {
        if (content !== note.content) onUpdate({ content })
    }

    return (
        <div className="flex flex-col h-full space-y-4 p-6 overflow-hidden">
            <Input
                className="text-3xl font-bold border-none px-0 shadow-none focus-visible:ring-0 h-auto"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleBlur}
                placeholder="Note Title"
            />
            <div className="text-xs text-muted-foreground flex gap-4">
                <span>Last edited: {new Date(note.updatedAt).toLocaleString()}</span>
                <span>{content.length} characters</span>
            </div>
            <Textarea
                className="flex-1 resize-none border-none p-0 focus-visible:ring-0 font-mono text-sm leading-relaxed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={handleContentBlur}
                placeholder="Start writing..."
            />
        </div>
    )
}
