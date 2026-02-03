"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { ExecutionBoard } from "@/lib/types"

interface VisionSectionProps {
    vision: ExecutionBoard['vision']
    isEditing: boolean
    onChange: (vision: ExecutionBoard['vision']) => void
}

export function VisionSection({ vision, isEditing, onChange }: VisionSectionProps) {
    return (
        <div className="space-y-6">
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-1">
                    <div className="flex items-center gap-3 p-6">
                        <div className="rounded-xl bg-primary/20 p-3 text-primary">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">Vision & Identity</h2>
                    </div>
                </div>

                <CardContent className="p-8 space-y-8">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Identity</label>
                        {isEditing ? (
                            <input
                                className="w-full text-2xl font-medium bg-transparent border-b-2 border-primary/20 focus:border-primary focus:outline-none py-2 transition-colors"
                                value={vision.identity}
                                onChange={(e) => onChange({ ...vision, identity: e.target.value })}
                            />
                        ) : (
                            <p className="text-2xl font-medium leading-relaxed">"{vision.identity}"</p>
                        )}
                    </div>

                    <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground shadow-lg transform transition-transform hover:scale-[1.01]">
                        <label className="text-sm font-bold uppercase tracking-wider text-primary-foreground/80 mb-2 block">Mantra</label>
                        {isEditing ? (
                            <input
                                className="w-full text-3xl font-bold bg-transparent border-none focus:ring-0 placeholder-primary-foreground/50"
                                value={vision.mantra}
                                onChange={(e) => onChange({ ...vision, mantra: e.target.value })}
                            />
                        ) : (
                            <p className="text-3xl font-bold">{vision.mantra}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Future Self (90 Days)</label>
                        {isEditing ? (
                            <textarea
                                className="w-full min-h-[100px] bg-background/50 rounded-lg p-4 border focus:ring-2 focus:ring-primary/20 outline-none"
                                value={vision.futureImage}
                                onChange={(e) => onChange({ ...vision, futureImage: e.target.value })}
                            />
                        ) : (
                            <p className="text-lg leading-relaxed text-muted-foreground">{vision.futureImage}</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
