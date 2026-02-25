"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDailyStore } from "@/lib/store/useDailyStore"
import { useTaskStore } from "@/lib/store/task-store"
import { useRoutineStore } from "@/lib/store/routine-store"
import { useNoteStore } from "@/lib/store/note-store"
import { useJournalStore } from "@/lib/store/journal-store"
import { CheckCircle2, Flame, Target, TrendingUp, Plus, Calendar, ListTodo, Book, Sparkles } from "lucide-react"
import Link from "next/link"
import { format, formatDistanceToNow } from "date-fns"
import { es, enUS } from "date-fns/locale"
import { AreasDashboard } from "@/components/areas/AreasDashboard"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { dashboardContent } from "@/lib/i18n/dashboardContent"

export default function DashboardPage() {
    const { oneThing, otherActions } = useDailyStore()
    const streak = useDailyStore(state => state.user.streak)
    const tasks = useTaskStore(state => state.tasks)
    const routines = useRoutineStore(state => state.routines)
    const notes = useNoteStore(state => state.notes)
    const entries = useJournalStore(state => state.entries)
    const { language } = useLanguage()
    const t = dashboardContent[language]
    const dateLocale = language === 'es' ? es : enUS

    // Calculate quick stats
    const completedTasks = tasks.filter(t => t.status === 'done').length
    const pendingTasks = tasks.filter(t => t.status !== 'done').length
    const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

    // Recent notes
    const recentNotes = notes
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 3)

    // Today's routines status
    const morningRoutine = routines.find(r => r.id === 'morning-1')
    const eveningRoutine = routines.find(r => r.id === 'evening-1')
    const todayString = format(new Date(), 'yyyy-MM-dd')
    const morningDone = morningRoutine?.completedDates?.includes(todayString)
    const eveningDone = eveningRoutine?.completedDates?.includes(todayString)

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t.welcome.title}</h1>
                    <p className="text-muted-foreground">{t.welcome.subtitle}</p>
                </div>
                <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full capitalize">
                    {format(new Date(), 'EEEE, d MMMM', { locale: dateLocale })}
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.stats.focus.title}</CardTitle>
                        <Target className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        {oneThing ? (
                            <>
                                <div className="text-lg font-bold truncate">{oneThing.title}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {oneThing.completed ? t.stats.focus.completed : `~${oneThing.duration}`}
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="text-lg font-bold text-muted-foreground">{t.stats.focus.notSet}</div>
                                <Link href="/daily" className="text-xs text-primary hover:underline">
                                    {t.stats.focus.cta}
                                </Link>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.stats.streak.title}</CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{streak || 0} {t.stats.streak.unit}</div>
                        <p className="text-xs text-muted-foreground">{t.stats.streak.subtitle}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.stats.tasks.title}</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedTasks}/{tasks.length}</div>
                        <p className="text-xs text-muted-foreground">{completionRate}% {t.stats.tasks.rate}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.stats.routines.title}</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 items-center">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${morningDone ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                                {t.stats.routines.morning}
                            </div>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${eveningDone ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                                {t.stats.routines.evening}
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            {morningDone && eveningDone ? t.stats.routines.allDone : t.stats.routines.inProgress}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Life Areas Section */}
            <div className="py-2">
                <AreasDashboard />
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>{t.quickActions.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Link href="/tasks">
                            <Button variant="outline" className="w-full justify-start">
                                <ListTodo className="mr-2 h-4 w-4" />
                                {t.quickActions.viewTasks}
                            </Button>
                        </Link>
                        <Link href="/calendar">
                            <Button variant="outline" className="w-full justify-start">
                                <Calendar className="mr-2 h-4 w-4" />
                                {t.quickActions.calendar}
                            </Button>
                        </Link>
                        <Link href="/journal">
                            <Button variant="outline" className="w-full justify-start">
                                <Book className="mr-2 h-4 w-4" />
                                {t.quickActions.journal}
                            </Button>
                        </Link>
                        <Link href="/coach">
                            <Button variant="outline" className="w-full justify-start">
                                <Sparkles className="mr-2 h-4 w-4" />
                                {t.quickActions.aiCoach}
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Bottom Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Pending Tasks */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>{t.pendingTasks.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {pendingTasks} {t.pendingTasks.remaining}
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {tasks
                                .filter(t => t.status !== 'done')
                                .slice(0, 5)
                                .map(task => (
                                    <div key={task.id} className="flex items-center justify-between pb-3 border-b last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-2 w-2 rounded-full ${task.priority === 'urgent' ? 'bg-red-500' :
                                                task.priority === 'important' ? 'bg-orange-500' :
                                                    'bg-blue-500'
                                                }`} />
                                            <div>
                                                <p className="text-sm font-medium">{task.title}</p>
                                                {task.tags && task.tags.length > 0 && (
                                                    <div className="flex gap-1 mt-1">
                                                        {task.tags.slice(0, 2).map(tag => (
                                                            <span key={tag} className="text-xs bg-secondary px-2 py-0.5 rounded">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground capitalize">
                                            {task.status}
                                        </span>
                                    </div>
                                ))}
                            {pendingTasks === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>{t.pendingTasks.allDone}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Notes */}
                <Card className="col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{t.recentNotes.title}</CardTitle>
                        <Link href="/notes">
                            <Button variant="ghost" size="sm">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentNotes.length > 0 ? (
                                recentNotes.map(note => (
                                    <Link key={note.id} href="/notes">
                                        <div className="flex flex-col gap-1 pb-3 border-b last:border-0 hover:bg-accent/50 p-2 -m-2 rounded-lg transition-colors cursor-pointer">
                                            <span className="text-sm font-medium truncate">{note.title}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true, locale: dateLocale })}
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Book className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">{t.recentNotes.empty}</p>
                                    <Link href="/notes">
                                        <Button variant="link" size="sm" className="mt-2">
                                            {t.recentNotes.create}
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
