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
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { CommandGroup } from "cmdk"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useTaskStore } from "@/lib/store/task-store"
import { useNoteStore } from "@/lib/store/note-store"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const { tasks } = useTaskStore()
    const { notes, setActiveNote } = useNoteStore()
    const { t } = useLanguage()

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
                <span className="hidden lg:inline-flex">{t('search.placeholder')}</span>
                <span className="inline-flex lg:hidden">{t('common.search')}...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder={t('search.command_placeholder')} />
                <CommandList>
                    <CommandEmpty>{t('search.no_results')}</CommandEmpty>

                    <CommandGroup heading={t('search.suggestions')}>
                        <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>{t('common.dashboard')}</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/board'))}>
                            <Target className="mr-2 h-4 w-4" />
                            <span>{t('common.executionBoard')}</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/calendar'))}>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{t('common.calendar')}</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/tasks'))}>
                            <CheckSquare className="mr-2 h-4 w-4" />
                            <span>{t('common.tasks')}</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading={t('common.tasks')}>
                        {tasks.slice(0, 5).map(task => (
                            <CommandItem key={task.id} onSelect={() => runCommand(() => router.push('/tasks'))}>
                                <CheckSquare className="mr-2 h-4 w-4 opacity-50" />
                                <span>{task.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading={t('common.notes')}>
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

                    <CommandGroup heading={t('search.tools')}>
                        <CommandItem onSelect={() => runCommand(() => router.push('/journal'))}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>{t('common.journal')}</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/routines'))}>
                            <Zap className="mr-2 h-4 w-4" />
                            <span>{t('common.routines')}</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/coach'))}>
                            <Bot className="mr-2 h-4 w-4" />
                            <span>{t('common.aiCoach')}</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>{t('common.settings')}</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}

