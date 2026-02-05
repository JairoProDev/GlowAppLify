"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, TrendingUp, Clock, Lightbulb, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PrioritizationDialogProps {
    isOpen: boolean
    onClose: () => void
    result: any
    onApply: () => void
}

export function PrioritizationDialog({ isOpen, onClose, result, onApply }: PrioritizationDialogProps) {
    if (!result) return null

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-800'
            case 'important':
                return 'bg-orange-500/10 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-800'
            case 'secondary':
                return 'bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-800'
            default:
                return 'bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-800'
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl">AI Prioritization Analysis</DialogTitle>
                            <DialogDescription>
                                Strategic recommendations based on your goals and task context
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Strategic Insights */}
                    {result.insights && (
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="pt-6">
                                <div className="flex gap-3">
                                    <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Strategic Insight</h3>
                                        <p className="text-sm text-muted-foreground">{result.insights}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Recommendations */}
                    {result.recommendations && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                <h3 className="font-semibold">Recommended Action Plan</h3>
                            </div>

                            <Card>
                                <CardContent className="pt-6 space-y-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <span className="font-medium text-sm">Start With:</span>
                                        </div>
                                        <p className="text-lg font-semibold">{result.recommendations.firstTask}</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {result.recommendations.reasoning}
                                        </p>
                                    </div>

                                    {result.recommendations.schedule && result.recommendations.schedule.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="h-4 w-4 text-primary" />
                                                <span className="font-medium text-sm">Suggested Schedule:</span>
                                            </div>
                                            <div className="space-y-2">
                                                {result.recommendations.schedule.map((item: string, index: number) => (
                                                    <div key={index} className="flex items-center gap-2 text-sm">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                        <span className="text-muted-foreground">
                                                            {index === 0 ? '🌅 Morning:' : index === 1 ? '☀️ Afternoon:' : '🌙 Evening:'}
                                                        </span>
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Prioritized Tasks */}
                    {result.prioritizedTasks && result.prioritizedTasks.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold">Priority Adjustments</h3>
                            <div className="space-y-2">
                                {result.prioritizedTasks.map((task: any, index: number) => (
                                    <Card key={task.taskId} className="overflow-hidden">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-medium text-muted-foreground">
                                                            #{index + 1}
                                                        </span>
                                                        <Badge
                                                            variant="outline"
                                                            className={getPriorityColor(task.newPriority)}
                                                        >
                                                            {task.newPriority.toUpperCase()}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {task.reasoning}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex gap-2 sm:justify-between">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={onApply} className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Apply Recommendations
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
