import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExecutionBoard } from "@/lib/types"
import { Flame, Sun, Moon, Zap } from "lucide-react"

interface HabitsWidgetProps {
    board: ExecutionBoard
}

export function HabitsWidget({ board }: HabitsWidgetProps) {
    const habits = board.habits_layer || { morning: {}, deepWork: {}, evening: {} };
    // @ts-ignore - Handle partial data gracefully
    const routines = [
        { ...habits.morning, label: 'Morning', icon: <Sun className="h-3 w-3" /> },
        { ...habits.deepWork, label: 'Deep Work', icon: <Zap className="h-3 w-3" /> },
        { ...habits.evening, label: 'Evening', icon: <Moon className="h-3 w-3" /> }
    ].filter(r => r.time); // Ensure they exist

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-1 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Habits</CardTitle>
                <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {routines.slice(0, 3).map((routine, i) => (
                        <div key={i} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    {routine.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium leading-none">{routine.label}</span>
                                    <span className="text-[10px] text-muted-foreground">{routine.time} • {routine.duration}</span>
                                </div>
                            </div>
                            <button className="h-6 w-6 rounded-full border-2 border-muted hover:border-primary hover:bg-primary/10 transition-colors flex items-center justify-center">
                                {/* Check icon logic would go here */}
                            </button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
