"use client"

import * as React from "react"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Search,
    LayoutDashboard,
    Target,
    CheckSquare,
    FileText,
    BookOpen,
    Zap,
    Bot
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useTaskStore } from "@/lib/store/task-store"
import { useNoteStore } from "@/lib/store/note-store"

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const { tasks } = useTaskStore()
    const { notes, setActiveNote } = useNoteStore()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <Button
                variant="outline"
                className={
                    "relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none px-3"
                }
                onClick={() => setOpen(true)}
            >
                <Search className="mr-2 h-4 w-4" />
                <span className="hidden lg:inline-flex">Search website...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Suggestions">
                        <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/board'))}>
                            <Target className="mr-2 h-4 w-4" />
                            <span>Execution Board</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/calendar'))}>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/tasks'))}>
                            <CheckSquare className="mr-2 h-4 w-4" />
                            <span>Tasks</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Tasks">
                        {tasks.slice(0, 5).map(task => (
                            <CommandItem key={task.id} onSelect={() => runCommand(() => router.push('/tasks'))}>
                                <CheckSquare className="mr-2 h-4 w-4 opacity-50" />
                                <span>{task.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Notes">
                        {notes.slice(0, 5).map(note => (
                            <CommandItem key={note.id} onSelect={() => runCommand(() => {
                                setActiveNote(note.id)
                                router.push('/notes')
                            })}>
                                <FileText className="mr-2 h-4 w-4 opacity-50" />
                                <span>{note.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Tools">
                        <CommandItem onSelect={() => runCommand(() => router.push('/journal'))}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>Journal</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/routines'))}>
                            <Zap className="mr-2 h-4 w-4" />
                            <span>Routines</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/coach'))}>
                            <Bot className="mr-2 h-4 w-4" />
                            <span>AI Coach</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
