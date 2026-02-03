import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExecutionBoard } from "@/lib/types"
import { Flame, CheckCircle2 } from "lucide-react"

interface HabitsWidgetProps {
    board: ExecutionBoard
}

export function HabitsWidget({ board }: HabitsWidgetProps) {
    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-1 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Habits</CardTitle>
                <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {board.habits.slice(0, 3).map((habit, i) => (
                        <div key={i} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    {habit.time.split(':')[0]}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium leading-none">{habit.description}</span>
                                    <span className="text-[10px] text-muted-foreground capitalize">{habit.type}</span>
                                </div>
                            </div>
                            <button className="h-6 w-6 rounded-full border-2 border-muted hover:border-primary hover:bg-primary/10 transition-colors flex items-center justify-center">
                                {/* Check icon logic would go here */}
                            </button>
                        </div>
                    ))}
                    {board.habits.length > 3 && (
                        <div className="text-center pt-2">
                            <span className="text-xs text-muted-foreground">+{board.habits.length - 3} more habits</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
