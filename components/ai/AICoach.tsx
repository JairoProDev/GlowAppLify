"use client"

import * as React from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useUIStore } from "@/lib/store/ui-store"
import { useCalendarStore } from "@/lib/store/calendar-store"
import { useEnergyStore } from "@/lib/store/energy-store"
import { Button } from "@/components/ui/button"
import { Bot, Sparkles, Zap, ArrowRight, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { addDays, setHours, setMinutes, startOfWeek, endOfWeek, differenceInMinutes } from "date-fns"

export function AICoach() {
    const { aiCoachOpen, setAICoachOpen } = useUIStore()
    const { events, addEvent } = useCalendarStore()
    const { profile } = useEnergyStore()
    const [isThinking, setIsThinking] = React.useState(false)
    const [messages, setMessages] = React.useState<{ role: 'ai' | 'user', content: string }[]>([
        { role: 'ai', content: "Hello Jairo! I've analyzed your calendar. You have 3 hours of Peak Energy available tomorrow morning. Shall we schedule some Deep Work?" }
    ])

    const handleReviewWeek = async () => {
        setMessages(prev => [...prev, { role: 'user', content: "Review my week." }])
        setIsThinking(true)
        await new Promise(resolve => setTimeout(resolve, 1000))

        const start = startOfWeek(new Date(), { weekStartsOn: 1 })
        const end = endOfWeek(new Date(), { weekStartsOn: 1 })

        const weekEvents = events.filter(e => {
            const eDate = new Date(e.startTime)
            return eDate >= start && eDate <= end
        })

        let deepWorkMins = 0
        let meetingMins = 0
        let totalMins = 0

        weekEvents.forEach(e => {
            const duration = differenceInMinutes(new Date(e.endTime), new Date(e.startTime))
            totalMins += duration
            if (e.type.includes('DEEP_WORK')) deepWorkMins += duration
            if (e.type.includes('MEETING')) meetingMins += duration
        })

        const deepWorkHours = (deepWorkMins / 60).toFixed(1)
        const meetingHours = (meetingMins / 60).toFixed(1)

        setIsThinking(false)
        setMessages(prev => [...prev, {
            role: 'ai',
            content: `Weekly Analysis:
• Deep Work: ${deepWorkHours}h (${totalMins ? Math.round(deepWorkMins / totalMins * 100) : 0}%)
• Meetings: ${meetingHours}h
You are ${deepWorkMins > meetingMins ? 'crushing it! 🔥' : 'meeting-heavy this week. Try to block more focus time.'}`
        }])
    }

    const handleScheduleDeepWork = async () => {
        // User Message
        setMessages(prev => [...prev, { role: 'user', content: "Schedule a Deep Work block for me." }])
        setIsThinking(true)

        // Simulate AI "Thinking"
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Logic: Find first available peak hour tomorrow
        const tomorrow = addDays(new Date(), 1)
        const peakHours = profile.isSetup ? profile.peakHours : [9, 10, 11] // Default if not setup

        let foundSlot = null

        for (const hour of peakHours) {
            const potentialStart = setMinutes(setHours(tomorrow, hour), 0)
            const potentialEnd = addDays(potentialStart, 0)
            potentialEnd.setHours(hour + 2) // 2 hour block

            // Check collision
            const hasConflict = events.some(e => {
                const eStart = new Date(e.startTime)
                const eEnd = new Date(e.endTime)
                return (eStart < potentialEnd && eEnd > potentialStart)
            })

            if (!hasConflict) {
                foundSlot = { start: potentialStart, end: potentialEnd }
                break
            }
        }

        setIsThinking(false)

        if (foundSlot) {
            const newEvent = {
                userId: "user-1",
                title: "⚡ Deep Work Session",
                startTime: foundSlot.start,
                endTime: foundSlot.end,
                type: "DEEP_WORK_CREATIVE" as const,
                status: "scheduled" as const,
                energyRequired: "high" as const,
                timeZone: "local",
                isRecurring: false
            }
            addEvent(newEvent)

            const timeStr = foundSlot.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
            setMessages(prev => [...prev, {
                role: 'ai',
                content: `Done! I've secured a 2-hour Deep Work block for you tomorrow at ${timeStr}. This aligns perfectly with your ${profile.chronotype || 'energy'} peak.`
            }])
        } else {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: "I couldn't find a 2-hour continuous block in your peak hours tomorrow. You're fully booked! Consider rescheduling some lower priority meetings."
            }])
        }
    }

    return (
        <Sheet open={aiCoachOpen} onOpenChange={setAICoachOpen}>
            <SheetContent className="sm:max-w-md w-full border-l-border/50 bg-background/95 backdrop-blur-xl p-0 flex flex-col gap-0 shadow-2xl">
                {/* Header */}
                <div className="p-4 border-b bg-gradient-to-r from-background to-muted/20">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white">
                            <Bot className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg leading-tight">Glow AI Coach</h2>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                Online & Analyzing
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <ScrollArea className="flex-1 p-4 bg-muted/5">
                    <div className="flex flex-col gap-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                {msg.role === 'ai' && (
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                                        <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                )}
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-br-none'
                                        : 'bg-white dark:bg-card border rounded-bl-none'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isThinking && (
                            <div className="flex gap-3">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                                    <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[85%] bg-white dark:bg-card border rounded-bl-none flex items-center gap-2 text-muted-foreground">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    Analyzing energy levels...
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Quick Actions / Suggestions */}
                <div className="p-4 bg-background border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-3 px-1 uppercase tracking-wider">Suggested Actions</p>
                    <div className="grid gap-2">
                        <Button
                            variant="outline"
                            className="justify-start h-auto py-3 px-4 border-dashed hover:border-solid hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group text-left"
                            onClick={handleScheduleDeepWork}
                            disabled={isThinking}
                        >
                            {isThinking ? (
                                <Loader2 className="h-4 w-4 mr-3 animate-spin text-muted-foreground" />
                            ) : (
                                <Sparkles className="h-4 w-4 mr-3 text-amber-500 shrink-0" />
                            )}
                            <div className="flex flex-col items-start gap-0.5">
                                <span className="font-semibold text-sm">Schedule Deep Work</span>
                                <span className="text-[10px] text-muted-foreground group-hover:text-indigo-600/70">Find 2h block in Peak Energy</span>
                            </div>
                            {!isThinking && <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </Button>
                        <Button
                            variant="outline"
                            className="justify-start h-auto py-3 px-4 border-dashed hover:border-solid hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all group text-left"
                            onClick={handleReviewWeek}
                            disabled={isThinking}
                        >
                            {isThinking ? (
                                <Loader2 className="h-4 w-4 mr-3 animate-spin text-muted-foreground" />
                            ) : (
                                <Zap className="h-4 w-4 mr-3 text-emerald-500 shrink-0" />
                            )}
                            <div className="flex flex-col items-start gap-0.5">
                                <span className="font-semibold text-sm">Review My Week</span>
                                <span className="text-[10px] text-muted-foreground group-hover:text-emerald-600/70">Analyze balance & progress</span>
                            </div>
                            {!isThinking && <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </Button>
                    </div>

                    <div className="mt-4 relative">
                        <input
                            type="text"
                            placeholder="Ask me anything about your schedule..."
                            className="w-full h-11 pl-4 pr-12 rounded-full border bg-muted/20 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none"
                        />
                        <Button size="icon" className="absolute right-1 top-1 h-9 w-9 rounded-full shadow-sm">
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
