'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Plus, Trash2, Zap, Clock, ChevronRight } from 'lucide-react';
import { useAreaModulesStore, WeeklyAction } from '@/lib/store/area-modules-store';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';

interface WeeklyActionsPanelProps {
    areaId: string;
}

function getMonday(date: Date = new Date()): string {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d.toISOString().split('T')[0];
}

export function WeeklyActionsPanel({ areaId }: WeeklyActionsPanelProps) {
    const {
        weeklyActions,
        addWeeklyAction,
        updateWeeklyAction,
        deleteWeeklyAction,
        toggleActionDone,
        getActionsForAreaWeek,
        getCurrentWeekActions,
    } = useAreaModulesStore();

    const [weekOffset, setWeekOffset] = useState(0); // 0 = current week
    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState({
        title: '',
        estimatedMinutes: 30,
        priority: 2 as WeeklyAction['priority'],
    });

    const today = new Date();
    const targetDate = weekOffset === 0 ? today : weekOffset > 0
        ? addWeeks(today, weekOffset)
        : subWeeks(today, Math.abs(weekOffset));
    const weekStart = getMonday(targetDate);
    const weekEnd = endOfWeek(new Date(weekStart), { weekStartsOn: 1 });

    const actions = getActionsForAreaWeek(areaId, weekStart);
    const completedCount = actions.filter(a => a.status === 'done').length;
    const completionRate = actions.length > 0 ? Math.round((completedCount / actions.length) * 100) : 0;

    const saveAction = () => {
        if (!form.title.trim()) return;
        addWeeklyAction({
            areaId,
            title: form.title,
            weekStart,
            status: 'todo',
            priority: form.priority,
            estimatedMinutes: form.estimatedMinutes,
        });
        setForm({ title: '', estimatedMinutes: 30, priority: 2 });
        setAdding(false);
    };

    const priorityColors: Record<number, string> = {
        1: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        2: 'bg-orange-100 text-orange-700',
        3: 'bg-blue-100 text-blue-700',
        4: 'bg-gray-100 text-gray-700',
        5: 'bg-gray-50 text-gray-500',
    };

    const priorityLabels: Record<number, string> = {
        1: '🔥 Critical', 2: '⚡ High', 3: '📌 Medium', 4: '💤 Low', 5: '🗂️ Backlog'
    };

    const sortedActions = [...actions].sort((a, b) => {
        if (a.status === 'done' && b.status !== 'done') return 1;
        if (a.status !== 'done' && b.status === 'done') return -1;
        return a.priority - b.priority;
    });

    const isCurrentWeek = weekOffset === 0;

    return (
        <div className="space-y-4">
            {/* Week Navigation */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setWeekOffset(prev => prev - 1)}
                    className="text-muted-foreground"
                >
                    ←
                </Button>
                <div className="text-center">
                    <div className="text-sm font-semibold">
                        {isCurrentWeek ? 'This Week' : format(new Date(weekStart), 'MMM d')} — {format(weekEnd, 'MMM d')}
                    </div>
                    {isCurrentWeek && (
                        <div className="text-xs text-muted-foreground">
                            {completedCount}/{actions.length} complete · {completionRate}%
                        </div>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setWeekOffset(prev => prev + 1)}
                    className="text-muted-foreground"
                    disabled={weekOffset >= 1}
                >
                    →
                </Button>
            </div>

            {/* Progress Bar */}
            {isCurrentWeek && actions.length > 0 && (
                <div className="space-y-1">
                    <Progress value={completionRate} className="h-2" />
                </div>
            )}

            {/* Actions List */}
            <div className="space-y-2">
                {sortedActions.map(action => (
                    <div
                        key={action.id}
                        className={`group flex items-center gap-3 p-3 rounded-xl border transition-all ${
                            action.status === 'done'
                                ? 'bg-muted/10 border-muted/30 opacity-60'
                                : 'bg-card hover:border-primary/30'
                        }`}
                    >
                        <button
                            onClick={() => toggleActionDone(action.id)}
                            className="flex-shrink-0"
                        >
                            {action.status === 'done' ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                                <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                            )}
                        </button>

                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${action.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>
                                {action.title}
                            </p>
                            {action.estimatedMinutes && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                    <Clock className="h-3 w-3" />
                                    {action.estimatedMinutes >= 60
                                        ? `${(action.estimatedMinutes / 60).toFixed(1)}h`
                                        : `${action.estimatedMinutes}min`}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className={`text-xs px-1.5 ${priorityColors[action.priority]}`}>
                                P{action.priority}
                            </Badge>
                            <button
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                onClick={() => deleteWeeklyAction(action.id)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Action */}
            {adding ? (
                <div className="space-y-3 p-3 rounded-xl border border-dashed border-primary/30">
                    <Input
                        placeholder="What needs to happen this week?"
                        value={form.title}
                        onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                        onKeyDown={e => e.key === 'Enter' && saveAction()}
                        autoFocus
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-muted-foreground">Priority</label>
                            <select
                                value={form.priority}
                                onChange={e => setForm(prev => ({ ...prev, priority: parseInt(e.target.value) as WeeklyAction['priority'] }))}
                                className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm mt-0.5"
                            >
                                {Object.entries(priorityLabels).map(([val, label]) => (
                                    <option key={val} value={val}>{label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">Time (min)</label>
                            <Input
                                type="number"
                                value={form.estimatedMinutes}
                                onChange={e => setForm(prev => ({ ...prev, estimatedMinutes: parseInt(e.target.value) || 30 }))}
                                className="mt-0.5"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
                        <Button size="sm" onClick={saveAction} disabled={!form.title.trim()}>
                            Add Action
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
                    Add weekly action
                </Button>
            )}

            {actions.length === 0 && !adding && (
                <div className="text-center py-6 text-muted-foreground">
                    <Zap className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">What 3-5 actions will move your objective forward this week?</p>
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => setAdding(true)}>
                        Plan this week
                    </Button>
                </div>
            )}
        </div>
    );
}
