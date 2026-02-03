"use client"

import { ChatInterface } from "@/components/coach/ChatInterface"

export default function CoachPage() {
    return (
        <div className="h-[calc(100vh-8rem)] animate-in fade-in duration-500">
            <div className="h-full max-w-4xl mx-auto flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">AI Coach</h1>
                    <p className="text-muted-foreground">Your personal accountability partner (Beta).</p>
                </div>

                <div className="flex-1 overflow-hidden">
                    <ChatInterface />
                </div>
            </div>
        </div>
    )
}
