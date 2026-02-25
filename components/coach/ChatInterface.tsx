"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Bot, Send, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useDailyStore } from "@/lib/store/useDailyStore"
import { useTaskStore } from "@/lib/store/task-store"
import { useJournalStore } from "@/lib/store/journal-store"

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    createdAt: Date
}

export function ChatInterface() {
    // Get context from stores
    const { oneThing } = useDailyStore()
    const streak = useDailyStore(state => state.user.streak)
    const tasks = useTaskStore(state => state.tasks)
    const entries = useJournalStore(state => state.entries)

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: oneThing?.title
                ? `Hey! I see you're working on "${oneThing.title}" today. How's it going so far?`
                : "Hello! I'm your Glow Coach. I'm here to help you stay on track with your goals, habits, and routines. How are you feeling today?",
            createdAt: new Date()
        }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            createdAt: new Date()
        }

        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsLoading(true)

        try {
            // Build context from stores
            const context = {
                goal: oneThing?.title,
                tasksPending: tasks.filter(t => t.status !== 'done').length,
                tasksCompleted: tasks.filter(t => t.status === 'done').length,
                streak: streak,
                lastCheckIn: entries.length > 0
                    ? new Date(entries[entries.length - 1].date).toLocaleDateString()
                    : null
            }

            // Call the AI API
            const response = await fetch('/api/coach/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: messages
                        .concat(userMsg)
                        .map(m => ({
                            role: m.role,
                            content: m.content
                        })),
                    context
                }),
            })

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`)
            }

            const data = await response.json()

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.message,
                createdAt: new Date()
            }

            setMessages(prev => [...prev, aiMsg])
        } catch (error) {
            console.error('Error sending message:', error)

            // Fallback response on error
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm having trouble connecting right now. But I'm here for you! In the meantime, check your task list and pick one thing to focus on.",
                createdAt: new Date()
            }

            setMessages(prev => [...prev, errorMsg])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-full border rounded-xl bg-card shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-primary/5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Bot className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold">Glow Coach</h3>
                    <p className="text-xs text-muted-foreground">Your AI accountability partner</p>
                </div>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex gap-3 max-w-[80%]",
                                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                            )}
                        >
                            <Avatar className="h-8 w-8">
                                {msg.role === 'assistant' ? (
                                    <div className="h-full w-full bg-primary flex items-center justify-center text-primary-foreground"><Bot className="h-5 w-5" /></div>
                                ) : (
                                    <div className="h-full w-full bg-secondary flex items-center justify-center"><User className="h-5 w-5" /></div>
                                )}
                            </Avatar>
                            <div
                                className={cn(
                                    "p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                                    msg.role === 'assistant' ? "bg-secondary rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none"
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3 max-w-[80%]">
                            <Avatar className="h-8 w-8">
                                <div className="h-full w-full bg-primary flex items-center justify-center text-primary-foreground"><Bot className="h-5 w-5" /></div>
                            </Avatar>
                            <div className="p-3 rounded-2xl bg-secondary rounded-tl-none flex gap-1 items-center h-10">
                                <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t bg-background">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                    }}
                    className="flex gap-2"
                >
                    <Input
                        placeholder="Ask your coach anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}
