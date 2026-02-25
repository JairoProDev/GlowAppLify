// @ts-nocheck
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Flag } from "lucide-react"
import { ExecutionBoard } from "@/lib/types"
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dashboardContent } from '@/lib/i18n/dashboardContent';

interface GoalWidgetProps {
    board: ExecutionBoard
}

export function GoalsWidget({ board }: GoalWidgetProps) {
    const { language } = useLanguage();
    const content = dashboardContent[language].goals;
    // Determine progress - for now static or 0 since we don't have progress calculation integrated yet
    const progress = 0;
    // Fallback to empty object or mock if goal_layer is missing (e.g. old data structure)
    const goal = board.goal_layer || {
        smartGoal: content.notFound,
        deadline: new Date().toISOString(),
        kpis: []
    };

    return (
        <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{content.title}</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <div className="text-lg font-bold line-clamp-2" title={goal.smartGoal}>
                            {goal.smartGoal}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <Flag className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                                {content.due} {new Date(goal.deadline).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{content.progress}</span>
                            <span className="font-medium text-foreground">{progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                            <div
                                className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2">
                        {goal.kpis.slice(0, 3).map((kpi, i) => (
                            <div key={i} className="flex flex-col items-center justify-center rounded-lg bg-secondary/50 p-2 text-center">
                                <span className="text-xs font-bold text-foreground truncate w-full">{kpi.target}</span>
                                {/* Assuming target is string/number. New KPI interface has target: string|number. */}
                                <span className="text-[10px] text-muted-foreground uppercase truncate w-full" title={kpi.metric}>{kpi.metric}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
