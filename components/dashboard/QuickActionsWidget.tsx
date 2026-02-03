import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExecutionBoard } from "@/lib/types"

interface QuickActionsWidgetProps {
    board: ExecutionBoard
}

export function QuickActionsWidget({ board }: QuickActionsWidgetProps) {
    // Find current week and today's actions
    // This is simplified logic
    const currentWeek = board.execution[0]; // Assuming first week for now
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todaysActions = currentWeek?.days[today] || [];

    const oneThing = todaysActions.find(a => a.isOneThingAction);

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-1 shadow-sm border-l-4 border-l-primary hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Your #1 Focus Today</CardTitle>
            </CardHeader>
            <CardContent>
                {oneThing ? (
                    <div className="space-y-3">
                        <div className="text-xl font-bold leading-none">
                            {oneThing.description}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                {oneThing.duration}
                            </span>
                            <span>High Impact</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-muted-foreground">
                        No "One Thing" defined for today ({today}).
                        <br />
                        <span className="text-xs">Check your execution plan.</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
