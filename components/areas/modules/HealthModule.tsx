'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Heart, Moon, Zap, Activity, Plus, Dumbbell,
    TrendingUp, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { useAreaModulesStore, ReadinessLog, SleepLog, TrainingSession } from '@/lib/store/area-modules-store';

interface HealthModuleProps {
    areaId: string;
}

export function HealthModule({ areaId }: HealthModuleProps) {
    const { getHealthData, updateHealthData } = useAreaModulesStore();
    const data = getHealthData(areaId);

    const [addingReadiness, setAddingReadiness] = useState(false);
    const [addingSleep, setAddingSleep] = useState(false);
    const [addingSession, setAddingSession] = useState(false);

    const [readinessForm, setReadinessForm] = useState({
        sleepQuality: 7,
        energyLevel: 7,
        muscleSoreness: 3,
    });

    const [sleepForm, setSleepForm] = useState({
        bedtime: '23:00',
        wakeTime: '07:00',
        quality: 7,
    });

    const [sessionForm, setSessionForm] = useState({
        type: 'strength' as TrainingSession['type'],
        name: '',
        durationMinutes: 45,
        rpe: 7,
    });

    const today = new Date().toISOString().split('T')[0];

    // Latest readiness
    const latestReadiness = data.readinessLogs
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 7);
    const todayReadiness = latestReadiness.find(r => r.date === today);

    // Sleep stats (last 7 days)
    const recentSleep = data.sleepLogs.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7);
    const avgSleepHours = recentSleep.length > 0
        ? (recentSleep.reduce((sum, s) => sum + s.durationHours, 0) / recentSleep.length).toFixed(1)
        : '-';
    const avgSleepQuality = recentSleep.length > 0
        ? Math.round(recentSleep.reduce((sum, s) => sum + s.quality, 0) / recentSleep.length)
        : 0;

    // Training stats
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    const weekSessions = data.trainingSessions.filter(s => s.date >= weekStart.toISOString().split('T')[0]);
    const totalDeepWorkThisWeek = weekSessions.reduce((sum, s) => sum + s.durationMinutes, 0);

    const calcReadiness = (form: typeof readinessForm): number => {
        const base = (form.sleepQuality * 3 + form.energyLevel * 3 - form.muscleSoreness * 2) / 8 * 10;
        return Math.max(0, Math.min(100, Math.round(base)));
    };

    const getRecommendation = (score: number): ReadinessLog['recommendation'] => {
        if (score >= 75) return 'hard';
        if (score >= 55) return 'moderate';
        if (score >= 35) return 'light';
        return 'rest';
    };

    const recommendationColors: Record<ReadinessLog['recommendation'], string> = {
        hard: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        moderate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        light: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        rest: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };

    const saveReadiness = () => {
        const score = calcReadiness(readinessForm);
        const log: ReadinessLog = {
            id: crypto.randomUUID(),
            date: today,
            ...readinessForm,
            readinessScore: score,
            recommendation: getRecommendation(score),
        };
        updateHealthData(areaId, {
            readinessLogs: [...data.readinessLogs.filter(r => r.date !== today), log]
        });
        setAddingReadiness(false);
    };

    const saveSleep = () => {
        const [bh, bm] = sleepForm.bedtime.split(':').map(Number);
        const [wh, wm] = sleepForm.wakeTime.split(':').map(Number);
        let hours = wh - bh + (wm - bm) / 60;
        if (hours < 0) hours += 24;
        const log: SleepLog = {
            id: crypto.randomUUID(),
            date: today,
            bedtime: sleepForm.bedtime,
            wakeTime: sleepForm.wakeTime,
            durationHours: Math.round(hours * 10) / 10,
            quality: sleepForm.quality,
            factors: [],
        };
        updateHealthData(areaId, {
            sleepLogs: [...data.sleepLogs.filter(s => s.date !== today), log]
        });
        setAddingSleep(false);
    };

    const saveSession = () => {
        if (!sessionForm.name) return;
        const session: TrainingSession = {
            id: crypto.randomUUID(),
            date: today,
            ...sessionForm,
        };
        updateHealthData(areaId, {
            trainingSessions: [...data.trainingSessions, session]
        });
        setAddingSession(false);
        setSessionForm({ type: 'strength', name: '', durationMinutes: 45, rpe: 7 });
    };

    const sleepQualityColor = avgSleepQuality >= 7 ? 'text-green-600' : avgSleepQuality >= 5 ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="space-y-5">
            {/* Readiness Today */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            Today's Readiness
                        </CardTitle>
                        {!addingReadiness && (
                            <Button variant="ghost" size="sm" onClick={() => setAddingReadiness(true)}>
                                {todayReadiness ? 'Update' : 'Log Today'}
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {todayReadiness ? (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold">{todayReadiness.readinessScore}</div>
                                    <div className="text-xs text-muted-foreground">/ 100</div>
                                </div>
                                <Badge className={recommendationColors[todayReadiness.recommendation]}>
                                    {todayReadiness.recommendation === 'hard' ? '🔥 Go Hard' :
                                        todayReadiness.recommendation === 'moderate' ? '⚡ Moderate' :
                                            todayReadiness.recommendation === 'light' ? '🌿 Light' : '😴 Rest'}
                                </Badge>
                            </div>
                            <Progress value={todayReadiness.readinessScore} className="h-2" />
                            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                <div className="p-2 rounded bg-muted/30">
                                    <div className="font-bold">{todayReadiness.sleepQuality}/10</div>
                                    <div className="text-muted-foreground">Sleep</div>
                                </div>
                                <div className="p-2 rounded bg-muted/30">
                                    <div className="font-bold">{todayReadiness.energyLevel}/10</div>
                                    <div className="text-muted-foreground">Energy</div>
                                </div>
                                <div className="p-2 rounded bg-muted/30">
                                    <div className="font-bold">{todayReadiness.muscleSoreness}/10</div>
                                    <div className="text-muted-foreground">Soreness</div>
                                </div>
                            </div>
                        </div>
                    ) : addingReadiness ? (
                        <div className="space-y-4">
                            {[
                                { label: 'Sleep Quality', key: 'sleepQuality', value: readinessForm.sleepQuality },
                                { label: 'Energy Level', key: 'energyLevel', value: readinessForm.energyLevel },
                                { label: 'Muscle Soreness', key: 'muscleSoreness', value: readinessForm.muscleSoreness },
                            ].map(field => (
                                <div key={field.key}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>{field.label}</span>
                                        <span className="font-bold">{field.value}/10</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={field.value}
                                        onChange={e => setReadinessForm(prev => ({ ...prev, [field.key]: parseInt(e.target.value) }))}
                                        className="w-full accent-primary"
                                    />
                                </div>
                            ))}
                            <div className="flex items-center justify-between pt-2">
                                <div className="text-sm font-semibold">
                                    Score: {calcReadiness(readinessForm)}/100 →{' '}
                                    <Badge className={recommendationColors[getRecommendation(calcReadiness(readinessForm))]}>
                                        {getRecommendation(calcReadiness(readinessForm))}
                                    </Badge>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => setAddingReadiness(false)}>Cancel</Button>
                                    <Button size="sm" onClick={saveReadiness}>Save</Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-6 text-muted-foreground">
                            <Zap className="h-8 w-8 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">Log your readiness to get today's training recommendation</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Sleep Tracker */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Moon className="h-4 w-4 text-indigo-500" />
                            Sleep Optimizer
                        </CardTitle>
                        <div className="flex items-center gap-3">
                            <span className={`text-sm font-bold ${sleepQualityColor}`}>{avgSleepHours}h avg</span>
                            {!addingSleep && (
                                <Button variant="ghost" size="sm" onClick={() => setAddingSleep(true)}>
                                    Log Sleep
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {addingSleep ? (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-muted-foreground">Bedtime</label>
                                    <Input
                                        type="time"
                                        value={sleepForm.bedtime}
                                        onChange={e => setSleepForm(prev => ({ ...prev, bedtime: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Wake Time</label>
                                    <Input
                                        type="time"
                                        value={sleepForm.wakeTime}
                                        onChange={e => setSleepForm(prev => ({ ...prev, wakeTime: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Quality</span>
                                    <span className="font-bold">{sleepForm.quality}/10</span>
                                </div>
                                <input
                                    type="range" min="1" max="10" value={sleepForm.quality}
                                    onChange={e => setSleepForm(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                                    className="w-full accent-primary"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingSleep(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveSleep}>Save</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recentSleep.slice(0, 5).map(log => (
                                <div key={log.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/20">
                                    <span className="text-muted-foreground">{log.date}</span>
                                    <div className="flex items-center gap-3">
                                        <span>{log.bedtime} → {log.wakeTime}</span>
                                        <Badge variant="outline" className={`text-xs ${log.durationHours >= 7 ? 'text-green-600 border-green-200' : log.durationHours >= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {log.durationHours}h
                                        </Badge>
                                        <span className="text-xs">⭐ {log.quality}/10</span>
                                    </div>
                                </div>
                            ))}
                            {recentSleep.length === 0 && (
                                <div className="text-center py-4 text-sm text-muted-foreground">
                                    No sleep logs yet. Tracking sleep is the highest-ROI health intervention.
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Training Log */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Dumbbell className="h-4 w-4 text-green-500" />
                            Training Log
                        </CardTitle>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{weekSessions.length} sessions this week</span>
                            {!addingSession && (
                                <Button variant="ghost" size="sm" onClick={() => setAddingSession(true)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {addingSession ? (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-muted-foreground">Type</label>
                                    <select
                                        value={sessionForm.type}
                                        onChange={e => setSessionForm(prev => ({ ...prev, type: e.target.value as TrainingSession['type'] }))}
                                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                                    >
                                        <option value="strength">Strength</option>
                                        <option value="cardio">Cardio (Zone 2)</option>
                                        <option value="mobility">Mobility/Flexibility</option>
                                        <option value="sport">Sport</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Duration (min)</label>
                                    <Input
                                        type="number"
                                        value={sessionForm.durationMinutes}
                                        onChange={e => setSessionForm(prev => ({ ...prev, durationMinutes: parseInt(e.target.value) || 0 }))}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Session Name / Focus</label>
                                <Input
                                    placeholder="e.g. Upper body push, 10K run..."
                                    value={sessionForm.name}
                                    onChange={e => setSessionForm(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>RPE (effort)</span>
                                    <span className="font-bold">{sessionForm.rpe}/10</span>
                                </div>
                                <input
                                    type="range" min="1" max="10" value={sessionForm.rpe}
                                    onChange={e => setSessionForm(prev => ({ ...prev, rpe: parseInt(e.target.value) }))}
                                    className="w-full accent-primary"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingSession(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveSession}>Log Session</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {data.trainingSessions.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6).map(session => (
                                <div key={session.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/20">
                                    <div>
                                        <span className="font-medium">{session.name}</span>
                                        <span className="text-muted-foreground text-xs ml-2">({session.date})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-xs capitalize">{session.type}</Badge>
                                        <span className="text-xs text-muted-foreground">{session.durationMinutes}min</span>
                                        <span className="text-xs">RPE {session.rpe}</span>
                                    </div>
                                </div>
                            ))}
                            {data.trainingSessions.length === 0 && (
                                <div className="text-center py-4 text-sm text-muted-foreground">
                                    Start tracking your training sessions to detect progress and plateaus.
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
