"use client"

import { ProductivityChart } from "@/components/analytics/ProductivityChart"
import { HabitHeatmap } from "@/components/analytics/HabitHeatmap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Trophy, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
    return (
        <div className="space-y-6 h-full animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-muted-foreground">Uncover patterns in your performance.</p>
                </div>
                {/* Export button could live here */}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Energy</CardTitle>
                        <Zap className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8.5/10</div>
                        <p className="text-xs text-muted-foreground">+12% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
                        <Trophy className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Across all categories</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Task Velocity</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2</div>
                        <p className="text-xs text-muted-foreground">Tasks per day avg</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                <ProductivityChart />
                <HabitHeatmap />
            </div>
        </div>
    )
}
