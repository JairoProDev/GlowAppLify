export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your life management system.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Placeholder for Widgets */}
                <div className="rounded-xl border bg-card text-card-foreground shadow w-full p-6">
                    <div className="font-semibold leading-none tracking-tight">Quick Actions</div>
                    <p className="text-sm text-muted-foreground mt-2">Widgets coming soon...</p>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow w-full p-6">
                    <div className="font-semibold leading-none tracking-tight">Progress</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow w-full p-6">
                    <div className="font-semibold leading-none tracking-tight">Goals</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow w-full p-6">
                    <div className="font-semibold leading-none tracking-tight">Habits</div>
                </div>
            </div>
        </div>
    )
}
