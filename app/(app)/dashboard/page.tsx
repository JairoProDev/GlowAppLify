"use client"

import { useEffect, useState } from "react"
import { ExecutionBoard } from "@/lib/types"
import { getBoard } from "@/lib/storage"
import { GoalsWidget } from "@/components/dashboard/GoalsWidget"
import { QuickActionsWidget } from "@/components/dashboard/QuickActionsWidget"
import { HabitsWidget } from "@/components/dashboard/HabitsWidget"
import { ProgressOverviewWidget } from "@/components/dashboard/ProgressOverviewWidget"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
    const [board, setBoard] = useState<ExecutionBoard | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // In a real app, we might want to fetch fresh data or sync here
        const data = getBoard()
        setBoard(data)
        setLoading(false)
    }, [])

    if (loading) {
        return <DashboardSkeleton />
    }

    if (!board) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <h2 className="text-2xl font-bold">No Board Found</h2>
                <p className="text-muted-foreground">Please create your Execution Board first.</p>
                {/* Add button to create board if needed, but sidebar handles navigation */}
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back. Here is your life at a glance.</p>
                </div>
                <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <QuickActionsWidget board={board} />
                <ProgressOverviewWidget />
                <GoalsWidget board={board} />
                <HabitsWidget board={board} />
            </div>

            {/* Examples of future sections */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="font-semibold leading-none tracking-tight mb-4">Weekly Focus</div>
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground bg-secondary/20 rounded-lg border border-dashed">
                        Chart / Analytics Placeholder
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="font-semibold leading-none tracking-tight mb-4">Recent Notes</div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex flex-col gap-1 pb-3 border-b last:border-0">
                                <span className="text-sm font-medium">Idea for Project X</span>
                                <span className="text-xs text-muted-foreground">Last modified 2h ago</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-[150px] rounded-xl" />
                <Skeleton className="h-[150px] rounded-xl" />
                <Skeleton className="h-[150px] rounded-xl col-span-2" />
            </div>
        </div>
    )
}
