import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress" // Need to install if missing
import { Target, TrendingUp, Calendar, Zap } from "lucide-react"
import { ExecutionBoard } from "@/lib/types"

interface GoalWidgetProps {
    board: ExecutionBoard
}

export function GoalsWidget({ board }: GoalWidgetProps) {
    // Mock progress calculation - In real app, calculate from logs/checkins
    // For now, let's assume 0 if no logs, or maybe mock it visually
    const progress = 15; // static 15% for now

    return (
        <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">90 Day Goal</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div className="text-lg font-bold truncate" title={board.goal.statement}>
                            {board.goal.statement}
                        </div>
                        <p className="text-xs text-muted-foreground capitalize">
                            {board.goal.type} Goal • Due {new Date(board.goal.deadline).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium text-foreground">{progress}%</span>
                        </div>
                        {/* Using a simple div for progress bar if shadcn progress isn't installed yet, but I'll write code assuming I can add it or fallback */}
                        <div className="h-2 w-full rounded-full bg-secondary">
                            <div
                                className="h-full rounded-full bg-primary transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2">
                        {board.goal.kpis.slice(0, 3).map((kpi, i) => (
                            <div key={i} className="flex flex-col items-center justify-center rounded-lg bg-secondary/50 p-2 text-center">
                                <span className="text-xs font-bold text-foreground">{kpi.target} {kpi.unit}</span>
                                <span className="text-[10px] text-muted-foreground uppercase">{kpi.metric}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
