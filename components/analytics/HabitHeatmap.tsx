import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function HabitHeatmap() {
    // Generate mock heatmap data for last 3 months
    // Just random levels 0-4
    const weeks = 12;
    const daysPerWeek = 7;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Habit Consistency</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-1 overflow-x-auto pb-2 justify-center">
                    {Array.from({ length: weeks }).map((_, w) => (
                        <div key={w} className="flex flex-col gap-1">
                            {Array.from({ length: daysPerWeek }).map((_, d) => {
                                // Random intensity
                                const intensity = Math.floor(Math.random() * 5); // 0-4
                                const colorClass = [
                                    "bg-secondary", // 0
                                    "bg-emerald-200 dark:bg-emerald-900", // 1
                                    "bg-emerald-300 dark:bg-emerald-800", // 2
                                    "bg-emerald-400 dark:bg-emerald-700", // 3
                                    "bg-emerald-500 dark:bg-emerald-600", // 4
                                ][intensity];

                                return (
                                    <div
                                        key={d}
                                        className={cn("h-3 w-3 rounded-sm", colorClass)}
                                        title={`Day ${d + 1}, Week ${w + 1}: Level ${intensity}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 justify-end">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="h-3 w-3 bg-secondary rounded-sm" />
                        <div className="h-3 w-3 bg-emerald-200 dark:bg-emerald-900 rounded-sm" />
                        <div className="h-3 w-3 bg-emerald-400 dark:bg-emerald-700 rounded-sm" />
                        <div className="h-3 w-3 bg-emerald-500 dark:bg-emerald-600 rounded-sm" />
                    </div>
                    <span>More</span>
                </div>
            </CardContent>
        </Card>
    )
}
