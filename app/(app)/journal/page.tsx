"use client"

import { useState } from "react"
import { useJournalStore } from "@/lib/store/journal-store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MoodSelector } from "@/components/journal/MoodSelector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Calendar, PenLine } from "lucide-react"

export default function JournalPage() {
    const { entries, addEntry } = useJournalStore()
    const [content, setContent] = useState("")
    const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(3)
    const [view, setView] = useState<'write' | 'history'>('write')

    const handleSave = () => {
        if (!content.trim()) return;

        addEntry({
            date: new Date().toISOString(),
            content,
            mood,
            tags: []
        })
        setContent("")
        setMood(3)
        setView('history')
    }

    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Daily Journal</h1>
                    <p className="text-muted-foreground">Reflect on your journey.</p>
                </div>
                <div className="flex bg-secondary p-1 rounded-lg">
                    <Button variant="ghost" size="sm" className={view === 'write' ? 'bg-background shadow' : ''} onClick={() => setView('write')}>
                        <PenLine className="h-4 w-4 mr-2" /> Write
                    </Button>
                    <Button variant="ghost" size="sm" className={view === 'history' ? 'bg-background shadow' : ''} onClick={() => setView('history')}>
                        <BookOpen className="h-4 w-4 mr-2" /> History
                    </Button>
                </div>
            </div>

            {view === 'write' ? (
                <div className="flex-1 flex flex-col gap-6 max-w-2xl mx-auto w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">How are you feeling today?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MoodSelector value={mood} onChange={setMood} />
                        </CardContent>
                    </Card>

                    <Card className="flex-1 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">What's on your mind?</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col gap-4">
                            <Textarea
                                className="flex-1 resize-none text-lg leading-relaxed p-4 min-h-[300px]"
                                placeholder="Today was..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <Button size="lg" onClick={handleSave} disabled={!content.trim()}>
                                    Save Entry
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <ScrollArea className="flex-1">
                    <div className="space-y-4 max-w-3xl mx-auto pb-8">
                        {entries.length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground">
                                <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <p>No entries yet. Start writing your first entry!</p>
                            </div>
                        ) : (
                            entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(entry => (
                                <Card key={entry.id} className="overflow-hidden">
                                    <div className={`h-2 w-full ${entry.mood >= 4 ? 'bg-green-500' : entry.mood === 3 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(entry.date).toLocaleString()}
                                            </span>
                                            <span className="text-2xl" title={`Mood: ${entry.mood}`}>
                                                {entry.mood >= 4 ? '😊' : entry.mood === 3 ? '😐' : '😔'}
                                            </span>
                                        </div>
                                        <p className="whitespace-pre-wrap leading-relaxed">{entry.content}</p>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </ScrollArea>
            )}
        </div>
    )
}
