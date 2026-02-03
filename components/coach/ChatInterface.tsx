"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    createdAt: Date
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your Glow Coach. I'm here to help you stay on track with your goals, habits, and routines. How are you feeling today?",
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

        // Mock AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateMockResponse(userMsg.content),
                createdAt: new Date()
            }
            setMessages(prev => [...prev, aiMsg])
            setIsLoading(false)
        }, 1500)
    }

    // Simple rule-based logic for demo
    const generateMockResponse = (text: string) => {
        const lower = text.toLowerCase()
        if (lower.includes("tired") || lower.includes("exhausted")) return "I hear you. Rest is productive too. Have you checked your sleep hours in the Analytics tab?"
        if (lower.includes("goal") || lower.includes("stuck")) return "Let's look at your 90-day goal. What is the one small step you can take right now to move forward?"
        if (lower.includes("habit")) return "Building habits takes time. Consistency > Intensity. Keep your streak alive!"
        return "That's interesting. Tell me more about how that impacts your weekly focus?"
    }

    return (
        <div className="flex flex-col h-full border rounded-xl bg-card shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-primary/5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Bot className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold">Glow Coach</h3>
                    <p className="text-xs text-muted-foreground">Always here for you</p>
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
                                    "p-3 rounded-2xl text-sm leading-relaxed",
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
