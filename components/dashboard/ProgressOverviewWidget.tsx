import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

export function ProgressOverviewWidget() {
    // Mock data for visual
    const weeklyCompletion = 68
    const streak = 12

    return (
        <Card className="col-span-1 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
                <Activity className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-1">
                    <span className="text-2xl font-bold">{weeklyCompletion}%</span>
                    <p className="text-xs text-muted-foreground">Completion Rate</p>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <div className="flex -space-x-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                            <div
                                key={day}
                                className={`h-6 w-1 rounded-full ${day <= 4 ? 'bg-primary' : 'bg-muted'}`}
                            />
                        ))}
                    </div>
                    <div className="ml-auto text-xs font-medium text-emerald-600">
                        {streak} Day Streak 🔥
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
