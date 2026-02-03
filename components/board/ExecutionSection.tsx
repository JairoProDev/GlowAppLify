"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Clock, Star } from "lucide-react"
import { ExecutionBoard } from "@/lib/types"

interface ExecutionSectionProps {
    execution: ExecutionBoard['execution']
    isEditing: boolean
    // Simplified onChange for now, updating execution is complex, usually just text edits in MVP
    // For now assuming viewing mostly, MVP editing logic handled in parent or complex logic
}

export function ExecutionSection({ execution, isEditing }: ExecutionSectionProps) {
    // We'll use tabs for weeks to handle the 12-week year better

    return (
        <Card className="overflow-hidden border-none shadow-xl bg-card">
            <div className="bg-gradient-to-r from-accent-600 to-accent-500 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                        <BarChart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Weekly Execution</h2>
                        <p className="text-white/80 text-sm">Your Tactical Plan</p>
                    </div>
                </div>
            </div>

            <CardContent className="p-6">
                <Tabs defaultValue="week-1" className="w-full">
                    <TabsList className="mb-6 w-full justify-start overflow-x-auto h-auto p-1 bg-secondary/30">
                        {execution.map((week) => (
                            <TabsTrigger
                                key={week.weekNumber}
                                value={`week-${week.weekNumber}`}
                                className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                            >
                                Week {week.weekNumber}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {execution.map((week) => (
                        <TabsContent key={week.weekNumber} value={`week-${week.weekNumber}`} className="space-y-6 animate-in slide-in-from-left-2 duration-300">
                            <div className="rounded-lg bg-accent/10 p-4 border border-accent/20">
                                <span className="text-xs font-bold uppercase tracking-wider text-accent-700 block mb-1">Weekly Focus</span>
                                <p className="text-lg font-semibold text-accent-900">{week.focus}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {Object.entries(week.days).map(([day, actions]) => ( // Sort days?
                                    <div key={day} className="rounded-xl border bg-card p-4 space-y-3 hover:border-primary/50 transition-colors">
                                        <h4 className="font-bold border-b pb-2 flex justify-between items-center bg-secondary/30 -mx-4 -mt-4 px-4 py-3 rounded-t-xl">
                                            {day}
                                        </h4>
                                        <ul className="space-y-3 pt-2">
                                            {actions.map((action) => (
                                                <li key={action.id} className="text-sm space-y-1">
                                                    {action.isOneThingAction && (
                                                        <div className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold text-yellow-800 border border-yellow-200">
                                                            <Star className="h-3 w-3 fill-yellow-600 text-yellow-600" />
                                                            ONE THING
                                                        </div>
                                                    )}
                                                    <p className="font-medium leading-snug">{action.description}</p>
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{action.duration}</span>
                                                    </div>
                                                </li>
                                            ))}
                                            {actions.length === 0 && (
                                                <li className="text-sm text-muted-foreground italic">Rest day</li>
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}
