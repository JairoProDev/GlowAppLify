'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Flame, Plus, Trash2, CheckCircle2, Circle, Settings2 } from 'lucide-react';
import { useAreaModulesStore, AreaHabit, HabitFrequency, TimeOfDay } from '@/lib/store/area-modules-store';

interface HabitsPanelProps {
    areaId: string;
}

const timeOfDayEmoji: Record<TimeOfDay, string> = {
    morning: '☀️',
    afternoon: '⚡',
    evening: '🌙',
    anytime: '🔄',
};

const frequencyLabel: Record<HabitFrequency, string> = {
    daily: 'Daily',
    '3x_week': '3x/week',
    weekly: 'Weekly',
};

export function HabitsPanel({ areaId }: HabitsPanelProps) {
    const {
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabitDate,
        getHabitsForArea,
    } = useAreaModulesStore();

    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState({
        title: '',
        frequency: 'daily' as HabitFrequency,
        timeOfDay: 'anytime' as TimeOfDay,
        targetDaysPerWeek: 7,
        cue: '',
    });

    const habits = getHabitsForArea(areaId);
    const today = new Date().toISOString().split('T')[0];

    // Last 7 days for mini-calendar
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - 6 + i);
        return d.toISOString().split('T')[0];
    });

    const saveHabit = () => {
        if (!form.title.trim()) return;
        addHabit({
            areaId,
            title: form.title,
            frequency: form.frequency,
            timeOfDay: form.timeOfDay,
            targetDaysPerWeek: form.targetDaysPerWeek,
            cue: form.cue,
            active: true,
        });
        setForm({ title: '', frequency: 'daily', timeOfDay: 'anytime', targetDaysPerWeek: 7, cue: '' });
        setAdding(false);
    };

    const totalStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);

    return (
        <div className="space-y-4">
            {/* Streak Banner */}
            {totalStreak > 0 && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200/50 dark:border-orange-800/50">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-semibold">Best streak: {totalStreak} days</span>
                </div>
            )}

            {/* Habits List */}
            <div className="space-y-3">
                {habits.map(habit => {
                    const isCompletedToday = habit.completedDates.includes(today);
                    const weekCompleted = last7Days.filter(d => habit.completedDates.includes(d)).length;
                    const weekTarget = habit.frequency === 'daily' ? 7 : habit.frequency === '3x_week' ? 3 : 1;
                    const weekRate = Math.round((weekCompleted / weekTarget) * 100);

                    return (
                        <div
                            key={habit.id}
                            className={`p-3 rounded-xl border transition-all ${
                                isCompletedToday ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200/50 dark:border-green-800/50' : 'bg-card hover:border-primary/20'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleHabitDate(habit.id, today)}
                                    className="flex-shrink-0"
                                >
                                    {isCompletedToday ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                                    )}
                                </button>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`text-sm font-medium ${isCompletedToday ? 'text-green-600 dark:text-green-400' : ''}`}>
                                            {timeOfDayEmoji[habit.timeOfDay]} {habit.title}
                                        </span>
                                        <Badge variant="outline" className="text-xs">
                                            {frequencyLabel[habit.frequency]}
                                        </Badge>
                                        {habit.streak > 0 && (
                                            <span className="text-xs flex items-center gap-0.5">
                                                <Flame className="h-3 w-3 text-orange-500" />
                                                {habit.streak}
                                            </span>
                                        )}
                                    </div>

                                    {/* 7-day mini tracker */}
                                    <div className="flex gap-1 mt-2">
                                        {last7Days.map((date, i) => {
                                            const isCompleted = habit.completedDates.includes(date);
                                            const isToday = date === today;
                                            return (
                                                <button
                                                    key={date}
                                                    onClick={() => toggleHabitDate(habit.id, date)}
                                                    className={`h-5 w-5 rounded-sm flex-shrink-0 transition-colors border ${
                                                        isCompleted
                                                            ? 'bg-green-500 border-green-500'
                                                            : isToday
                                                                ? 'border-primary bg-primary/10'
                                                                : 'bg-muted/30 border-muted/50'
                                                    }`}
                                                    title={date}
                                                >
                                                    {isToday && !isCompleted && (
                                                        <div className="w-1 h-1 bg-primary rounded-full mx-auto" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                        <span className="text-xs text-muted-foreground ml-1">
                                            {weekCompleted}/{weekTarget} this week
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                                    onClick={() => deleteHabit(habit.id)}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            {habit.cue && (
                                <p className="text-xs text-muted-foreground mt-2 ml-8 italic">
                                    💡 Cue: {habit.cue}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Add Habit */}
            {adding ? (
                <div className="space-y-3 p-3 rounded-xl border border-dashed border-primary/30">
                    <Input
                        placeholder="Habit name (e.g., '10 minutes meditation')"
                        value={form.title}
                        onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                        onKeyDown={e => e.key === 'Enter' && saveHabit()}
                        autoFocus
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-muted-foreground">Frequency</label>
                            <select
                                value={form.frequency}
                                onChange={e => setForm(prev => ({ ...prev, frequency: e.target.value as HabitFrequency }))}
                                className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm mt-0.5"
                            >
                                <option value="daily">Daily</option>
                                <option value="3x_week">3x per week</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">Time of day</label>
                            <select
                                value={form.timeOfDay}
                                onChange={e => setForm(prev => ({ ...prev, timeOfDay: e.target.value as TimeOfDay }))}
                                className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm mt-0.5"
                            >
                                <option value="morning">☀️ Morning</option>
                                <option value="afternoon">⚡ Afternoon</option>
                                <option value="evening">🌙 Evening</option>
                                <option value="anytime">🔄 Anytime</option>
                            </select>
                        </div>
                    </div>
                    <Input
                        placeholder="Cue / anchor (e.g., 'After morning coffee')"
                        value={form.cue}
                        onChange={e => setForm(prev => ({ ...prev, cue: e.target.value }))}
                    />
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
                        <Button size="sm" onClick={saveHabit} disabled={!form.title.trim()}>
                            Add Habit
                        </Button>
                    </div>
                </div>
            ) : (
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full border-dashed border text-muted-foreground"
                    onClick={() => setAdding(true)}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add daily habit
                </Button>
            )}

            {habits.length === 0 && !adding && (
                <div className="text-center py-8 text-muted-foreground">
                    <Flame className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Small consistent actions beat sporadic intensity.</p>
                    <p className="text-xs mt-1">What would you do every day for 90 days to transform this area?</p>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => setAdding(true)}>
                        Create first habit
                    </Button>
                </div>
            )}
        </div>
    );
}
