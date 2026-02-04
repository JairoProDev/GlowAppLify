import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExecutionBoard } from "@/lib/types"

interface QuickActionsWidgetProps {
    board: ExecutionBoard
}

export function QuickActionsWidget({ board }: QuickActionsWidgetProps) {
    // Find current week and today's actions
    const currentWeek = board.execution_layer.weeks[0]; // Assuming first week for now

    // Map current day to 1-7 (Monday=1, Sunday=7)
    const todayIndex = new Date().getDay() || 7;

    // Find actions for today
    const todaysActions = currentWeek?.actions.filter(a => a.day === todayIndex) || [];

    // Assume the first action is the primary focus if no explicit flag
    const oneThing = todaysActions[0];

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-1 shadow-sm border-l-4 border-l-primary hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Your #1 Focus Today</CardTitle>
            </CardHeader>
            <CardContent>
                {oneThing ? (
                    <div className="space-y-3">
                        <div className="text-xl font-bold leading-none line-clamp-2">
                            {oneThing.action}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                {oneThing.time}
                            </span>
                            <span className="capitalize">{oneThing.timeOfDay}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-muted-foreground">
                        No specific actions for today (Day {todayIndex}).
                        <br />
                        <span className="text-xs">Check your execution plan or enjoy the rest!</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
