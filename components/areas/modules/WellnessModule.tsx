'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Heart, Smile, Plus, Wind, TrendingUp } from 'lucide-react';
import { useAreaModulesStore, MoodEntry, MindfulnessSession } from '@/lib/store/area-modules-store';

interface WellnessModuleProps { areaId: string; }

const moodEmojis = ['', '😞', '😟', '😐', '🙂', '😊', '😄', '😁', '🤩', '💫', '🌟'];
const sessionTypes: MindfulnessSession['type'][] = ['meditation', 'breathing', 'journaling', 'gratitude', 'body_scan', 'other'];

export function WellnessModule({ areaId }: WellnessModuleProps) {
    const { getWellnessData, updateWellnessData } = useAreaModulesStore();
    const data = getWellnessData(areaId);

    const [addingMood, setAddingMood] = useState(false);
    const [addingSession, setAddingSession] = useState(false);
    const [moodForm, setMoodForm] = useState({ mood: 7, energy: 7, stress: 4, notes: '' });
    const [sessionForm, setSessionForm] = useState({
        type: 'meditation' as MindfulnessSession['type'],
        durationMinutes: 10,
        quality: 3 as MindfulnessSession['quality'],
        notes: '',
    });

    const today = new Date().toISOString().split('T')[0];
    const todayMood = data.moodEntries.find(m => m.date === today);

    const recentMoods = data.moodEntries
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 7);

    const avgMood = recentMoods.length > 0
        ? (recentMoods.reduce((sum, m) => sum + m.mood, 0) / recentMoods.length).toFixed(1)
        : '-';

    const avgStress = recentMoods.length > 0
        ? (recentMoods.reduce((sum, m) => sum + m.stress, 0) / recentMoods.length).toFixed(1)
        : '-';

    const weekSessions = data.mindfulnessSessions.filter(s => {
        const wStart = new Date();
        wStart.setDate(wStart.getDate() - wStart.getDay() + 1);
        return s.date >= wStart.toISOString().split('T')[0];
    });
    const weekMinutes = weekSessions.reduce((sum, s) => sum + s.durationMinutes, 0);

    const saveMood = () => {
        const entry: MoodEntry = {
            id: crypto.randomUUID(),
            date: today,
            ...moodForm,
            tags: [],
        };
        updateWellnessData(areaId, {
            moodEntries: [...data.moodEntries.filter(m => m.date !== today), entry]
        });
        setAddingMood(false);
    };

    const saveSession = () => {
        const session: MindfulnessSession = {
            id: crypto.randomUUID(),
            date: today,
            ...sessionForm,
        };
        updateWellnessData(areaId, {
            mindfulnessSessions: [...data.mindfulnessSessions, session]
        });
        setAddingSession(false);
        setSessionForm({ type: 'meditation', durationMinutes: 10, quality: 3, notes: '' });
    };

    const moodColor = (m: number) => m >= 7 ? 'text-green-500' : m >= 5 ? 'text-yellow-500' : 'text-red-500';
    const stressColor = (s: number) => s <= 4 ? 'text-green-500' : s <= 6 ? 'text-yellow-500' : 'text-red-500';

    return (
        <div className="space-y-5">
            {/* Today's Mood */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Smile className="h-4 w-4 text-yellow-500" />
                            {todayMood ? "Today's State" : "How are you today?"}
                        </CardTitle>
                        {!addingMood && (
                            <Button variant="ghost" size="sm" onClick={() => setAddingMood(true)}>
                                {todayMood ? 'Update' : 'Log Now'}
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {todayMood && !addingMood ? (
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className={`text-3xl font-bold ${moodColor(todayMood.mood)}`}>
                                    {moodEmojis[todayMood.mood]}
                                </div>
                                <div className="text-lg font-bold">{todayMood.mood}/10</div>
                                <div className="text-xs text-muted-foreground">Mood</div>
                            </div>
                            <div>
                                <div className="text-3xl">⚡</div>
                                <div className="text-lg font-bold">{todayMood.energy}/10</div>
                                <div className="text-xs text-muted-foreground">Energy</div>
                            </div>
                            <div>
                                <div className="text-3xl">🌊</div>
                                <div className={`text-lg font-bold ${stressColor(todayMood.stress)}`}>{todayMood.stress}/10</div>
                                <div className="text-xs text-muted-foreground">Stress</div>
                            </div>
                        </div>
                    ) : addingMood ? (
                        <div className="space-y-4">
                            {[
                                { label: `Mood ${moodEmojis[moodForm.mood]}`, key: 'mood', value: moodForm.mood },
                                { label: '⚡ Energy', key: 'energy', value: moodForm.energy },
                                { label: '🌊 Stress Level', key: 'stress', value: moodForm.stress },
                            ].map(field => (
                                <div key={field.key}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>{field.label}</span>
                                        <span className="font-bold">{field.value}/10</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="10" value={field.value}
                                        onChange={e => setMoodForm(prev => ({ ...prev, [field.key]: parseInt(e.target.value) }))}
                                        className="w-full accent-primary"
                                    />
                                </div>
                            ))}
                            <Textarea
                                placeholder="Optional note about how you're feeling..."
                                value={moodForm.notes}
                                onChange={e => setMoodForm(prev => ({ ...prev, notes: e.target.value }))}
                                rows={2}
                                className="text-sm"
                            />
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingMood(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveMood}>Save</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-4 text-muted-foreground">
                            <Smile className="h-8 w-8 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">Track your mood to see patterns and triggers</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* 7-Day Mood Trend */}
            {recentMoods.length > 0 && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                            7-Day Emotional Trends
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-3 text-center mb-4">
                            <div className="p-2 rounded-lg bg-muted/30">
                                <div className={`text-xl font-bold ${moodColor(parseFloat(avgMood))}`}>{avgMood}</div>
                                <div className="text-xs text-muted-foreground">Avg Mood</div>
                            </div>
                            <div className="p-2 rounded-lg bg-muted/30">
                                <div className={`text-xl font-bold ${stressColor(parseFloat(avgStress))}`}>{avgStress}</div>
                                <div className="text-xs text-muted-foreground">Avg Stress</div>
                            </div>
                            <div className="p-2 rounded-lg bg-muted/30">
                                <div className="text-xl font-bold text-purple-500">{weekMinutes}</div>
                                <div className="text-xs text-muted-foreground">Mindful min</div>
                            </div>
                        </div>
                        <div className="flex items-end gap-1 h-16">
                            {recentMoods.slice().reverse().map(entry => (
                                <div key={entry.id} className="flex-1 flex flex-col items-center gap-1">
                                    <div
                                        className="w-full rounded-sm transition-all"
                                        style={{
                                            height: `${(entry.mood / 10) * 100}%`,
                                            backgroundColor: entry.mood >= 7 ? '#22c55e' : entry.mood >= 5 ? '#eab308' : '#ef4444',
                                            opacity: 0.8,
                                        }}
                                    />
                                    <span className="text-xs text-muted-foreground">
                                        {entry.date.slice(-2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Mindfulness Tracker */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Wind className="h-4 w-4 text-purple-500" />
                            Mindfulness Practice
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{weekMinutes}min this week</span>
                            {!addingSession && (
                                <Button variant="ghost" size="sm" onClick={() => setAddingSession(true)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {addingSession ? (
                        <div className="space-y-3 p-3 border rounded-xl">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-muted-foreground">Type</label>
                                    <select
                                        value={sessionForm.type}
                                        onChange={e => setSessionForm(prev => ({ ...prev, type: e.target.value as MindfulnessSession['type'] }))}
                                        className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                                    >
                                        {sessionTypes.map(t => (
                                            <option key={t} value={t}>{t.replace('_', ' ')}</option>
                                        ))}
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
                            <Textarea
                                placeholder="Optional reflection..."
                                value={sessionForm.notes}
                                onChange={e => setSessionForm(prev => ({ ...prev, notes: e.target.value }))}
                                rows={2}
                                className="text-sm"
                            />
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingSession(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveSession}>Log Practice</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {data.mindfulnessSessions.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map(session => (
                                <div key={session.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/20 text-sm">
                                    <div>
                                        <span className="font-medium capitalize">{session.type.replace('_', ' ')}</span>
                                        <span className="text-xs text-muted-foreground ml-2">{session.date}</span>
                                    </div>
                                    <span className="text-muted-foreground">{session.durationMinutes}min</span>
                                </div>
                            ))}
                            {data.mindfulnessSessions.length === 0 && (
                                <div className="text-center py-4 text-sm text-muted-foreground">
                                    Even 10 minutes of mindfulness daily reduces stress hormones measurably.
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
