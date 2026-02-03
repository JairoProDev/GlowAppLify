"use client"

import { Button } from "@/components/ui/button"
import { useNoteStore } from "@/lib/store/note-store"
import { NoteEditor } from "@/components/notes/NoteEditor"
import { Plus, Trash2, FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export default function NotesPage() {
    const { notes, activeNoteId, addNote, setActiveNote, updateNote, deleteNote } = useNoteStore()

    const activeNote = notes.find(n => n.id === activeNoteId)

    return (
        <div className="flex h-[calc(100vh-8rem)] animate-in fade-in duration-500 rounded-xl overflow-hidden border bg-card shadow-sm">

            {/* Sidebar List */}
            <div className="w-64 border-r flex flex-col bg-secondary/10">
                <div className="p-4 border-b space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold flex items-center gap-2">
                            <FileText className="h-4 w-4" /> Notes
                        </h2>
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={addNote}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search..." className="pl-8 h-8 text-xs" />
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="flex flex-col gap-1 p-2">
                        {notes.map(note => (
                            <button
                                key={note.id}
                                onClick={() => setActiveNote(note.id)}
                                className={cn(
                                    "flex flex-col items-start gap-1 p-3 rounded-lg text-left transition-colors hover:bg-muted",
                                    activeNoteId === note.id && "bg-primary/10 text-primary hover:bg-primary/15"
                                )}
                            >
                                <span className="font-medium text-sm truncate w-full">{note.title || 'Untitled'}</span>
                                <span className="text-[10px] text-muted-foreground truncate w-full opacity-70">
                                    {note.content.substring(0, 30) || 'No content'}
                                </span>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col bg-background">
                {activeNote ? (
                    <>
                        <div className="flex justify-end p-2 border-b">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => deleteNote(activeNote.id)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </Button>
                        </div>
                        <NoteEditor
                            note={activeNote}
                            onUpdate={(updates) => updateNote(activeNote.id, updates)}
                        />
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                            <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            <p>Select a note or create a new one</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
