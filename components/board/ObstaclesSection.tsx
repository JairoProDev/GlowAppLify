"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert, ArrowRight, AlertTriangle } from "lucide-react"
import { ObstacleLayer } from "@/lib/types"

interface ObstaclesSectionProps {
    obstacles: ObstacleLayer
    isEditing?: boolean
}

export function ObstaclesSection({ obstacles, isEditing }: ObstaclesSectionProps) {
    return (
        <Card className="overflow-hidden border-none shadow-xl bg-card relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-500 to-amber-500" />
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 p-1">
                <div className="flex items-center gap-4 p-6">
                    <div className="rounded-xl bg-yellow-100 dark:bg-yellow-900/50 p-3 text-yellow-600 dark:text-yellow-400">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Anticipated Obstacles</h2>
                        <p className="text-sm text-muted-foreground">Proactive If-Then Planning</p>
                    </div>
                </div>
            </div>

                    ))}
        </div>
            </CardContent >
        </Card >
    )
}
