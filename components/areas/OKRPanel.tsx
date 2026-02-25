'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Edit3, Trash2, CheckCircle2, TrendingUp } from 'lucide-react';
import { useAreaModulesStore, OKR, KeyResult, calcKRProgress } from '@/lib/store/area-modules-store';
import { addDays, format } from 'date-fns';

interface OKRPanelProps {
    areaId: string;
}

export function OKRPanel({ areaId }: OKRPanelProps) {
    const {
        okrs,
        addOKR,
        updateOKR,
        updateKeyResult,
        addKeyResult,
        removeKeyResult,
        deleteOKR,
        getActiveOKRForArea,
        getOKRProgress,
    } = useAreaModulesStore();

    const [creating, setCreating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [objective, setObjective] = useState('');
    const [krs, setKRs] = useState<Omit<KeyResult, 'id' | 'progress'>[]>([
        { title: '', currentValue: 0, targetValue: 100, unit: '%' }
    ]);
    const [editingKR, setEditingKR] = useState<{ okrId: string; krId: string } | null>(null);
    const [krValue, setKRValue] = useState('');

    const activeOKR = getActiveOKRForArea(areaId);
    const allAreaOKRs = okrs.filter(o => o.areaId === areaId);

    const start90Days = () => {
        const start = new Date();
        const end = addDays(start, 90);
        return {
            start: start.toISOString().split('T')[0],
            end: end.toISOString().split('T')[0],
        };
    };

    const saveOKR = () => {
        if (!objective.trim()) return;
        const { start, end } = start90Days();
        addOKR({
            areaId,
            objective,
            keyResults: krs.filter(kr => kr.title.trim()),
            startDate: start,
            endDate: end,
            status: 'active',
        });
        setCreating(false);
        setObjective('');
        setKRs([{ title: '', currentValue: 0, targetValue: 100, unit: '%' }]);
    };

    const updateKRValue = (okrId: string, krId: string, value: number) => {
        updateKeyResult(okrId, krId, { currentValue: value });
        setEditingKR(null);
    };

    const progressColor = (p: number) =>
        p >= 70 ? 'bg-green-500' : p >= 40 ? 'bg-yellow-500' : 'bg-red-500';

    const progressTextColor = (p: number) =>
        p >= 70 ? 'text-green-600' : p >= 40 ? 'text-yellow-600' : 'text-red-600';

    const daysLeft = (endDate: string) => {
        const end = new Date(endDate);
        const today = new Date();
        const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return Math.max(0, diff);
    };

    return (
        <div className="space-y-4">
            {/* Active OKR */}
            {activeOKR ? (
                <Card className="overflow-hidden border-primary/20 shadow-md">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <Badge variant="outline" className="text-xs mb-2 border-primary/30 text-primary">
                                    Active OKR · {daysLeft(activeOKR.endDate)} days left
                                </Badge>
                                <h3 className="text-lg font-semibold leading-tight">{activeOKR.objective}</h3>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <div className={`text-2xl font-bold ${progressTextColor(getOKRProgress(activeOKR.id))}`}>
                                    {getOKRProgress(activeOKR.id)}%
                                </div>
                            </div>
                        </div>
                        <Progress
                            value={getOKRProgress(activeOKR.id)}
                            className="h-1.5 mt-2"
                        />
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Key Results
                        </div>
                        {activeOKR.keyResults.map(kr => (
                            <div key={kr.id} className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium flex-1">{kr.title}</span>
                                    <div className="flex items-center gap-2">
                                        {editingKR?.krId === kr.id ? (
                                            <div className="flex items-center gap-1">
                                                <Input
                                                    type="number"
                                                    value={krValue}
                                                    onChange={e => setKRValue(e.target.value)}
                                                    className="w-20 h-7 text-xs"
                                                    autoFocus
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') updateKRValue(activeOKR.id, kr.id, parseFloat(krValue));
                                                        if (e.key === 'Escape') setEditingKR(null);
                                                    }}
                                                />
                                                <span className="text-xs text-muted-foreground">/{kr.targetValue} {kr.unit}</span>
                                                <Button
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => updateKRValue(activeOKR.id, kr.id, parseFloat(krValue))}
                                                >
                                                    <CheckCircle2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <button
                                                className={`text-xs font-mono font-bold cursor-pointer hover:opacity-70 ${progressTextColor(kr.progress)}`}
                                                onClick={() => {
                                                    setEditingKR({ okrId: activeOKR.id, krId: kr.id });
                                                    setKRValue(kr.currentValue.toString());
                                                }}
                                            >
                                                {kr.currentValue}/{kr.targetValue} {kr.unit}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="relative">
                                    <Progress value={kr.progress} className="h-2" />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>{kr.progress}% complete</span>
                                    <button
                                        className="text-muted-foreground hover:text-destructive transition-colors"
                                        onClick={() => removeKeyResult(activeOKR.id, kr.id)}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add KR */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full border-dashed border text-muted-foreground"
                            onClick={() => {
                                const title = prompt('New Key Result:');
                                const target = parseFloat(prompt('Target value:') || '100');
                                const unit = prompt('Unit (%, $, kg, hours, x...)') || '%';
                                if (title) {
                                    addKeyResult(activeOKR.id, { title, currentValue: 0, targetValue: target, unit });
                                }
                            }}
                        >
                            <Plus className="h-3.5 w-3.5 mr-1" />
                            Add Key Result
                        </Button>

                        <div className="flex gap-2 pt-2 border-t">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs"
                                onClick={() => updateOKR(activeOKR.id, { status: 'completed' })}
                            >
                                ✓ Complete
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-muted-foreground"
                                onClick={() => updateOKR(activeOKR.id, { status: 'paused' })}
                            >
                                Pause
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="border-dashed">
                    <CardContent className="py-10 text-center">
                        <Target className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
                        <h4 className="font-semibold mb-1">No active 90-day objective</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Set a quarterly OKR to give your efforts direction
                        </p>
                        <Button onClick={() => setCreating(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Set 90-Day Objective
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Create OKR Form */}
            {creating && (
                <Card className="border-primary/30">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">New 90-Day OKR</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground">OBJECTIVE (aspirational, qualitative)</label>
                            <Input
                                className="mt-1"
                                placeholder="e.g., 'Achieve financial independence foundation'"
                                value={objective}
                                onChange={e => setObjective(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-muted-foreground">KEY RESULTS (measurable outcomes)</label>
                            <div className="space-y-2 mt-2">
                                {krs.map((kr, idx) => (
                                    <div key={idx} className="grid grid-cols-12 gap-1">
                                        <Input
                                            className="col-span-6 text-xs"
                                            placeholder="Key result title"
                                            value={kr.title}
                                            onChange={e => {
                                                const next = [...krs];
                                                next[idx] = { ...next[idx], title: e.target.value };
                                                setKRs(next);
                                            }}
                                        />
                                        <Input
                                            className="col-span-2 text-xs"
                                            placeholder="Target"
                                            type="number"
                                            value={kr.targetValue}
                                            onChange={e => {
                                                const next = [...krs];
                                                next[idx] = { ...next[idx], targetValue: parseFloat(e.target.value) || 0 };
                                                setKRs(next);
                                            }}
                                        />
                                        <Input
                                            className="col-span-3 text-xs"
                                            placeholder="Unit"
                                            value={kr.unit}
                                            onChange={e => {
                                                const next = [...krs];
                                                next[idx] = { ...next[idx], unit: e.target.value };
                                                setKRs(next);
                                            }}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="col-span-1 h-10"
                                            onClick={() => setKRs(krs.filter((_, i) => i !== idx))}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full border-dashed border text-xs"
                                    onClick={() => setKRs([...krs, { title: '', currentValue: 0, targetValue: 100, unit: '%' }])}
                                >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add Key Result
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
                            <Button onClick={saveOKR} disabled={!objective.trim()}>
                                Create 90-Day OKR
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Past OKRs */}
            {allAreaOKRs.filter(o => o.status !== 'active').length > 0 && (
                <div className="pt-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Past OKRs</div>
                    <div className="space-y-2">
                        {allAreaOKRs.filter(o => o.status !== 'active').map(okr => (
                            <div key={okr.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border">
                                <div>
                                    <span className="text-sm font-medium line-clamp-1">{okr.objective}</span>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <Badge variant="outline" className="text-xs">{okr.status}</Badge>
                                        <span className="text-xs text-muted-foreground">{okr.endDate}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold ${progressTextColor(getOKRProgress(okr.id))}`}>
                                        {getOKRProgress(okr.id)}%
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => updateOKR(okr.id, { status: 'active' })}
                                    >
                                        <TrendingUp className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!creating && !activeOKR && (
                <Button variant="ghost" size="sm" className="w-full" onClick={() => setCreating(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    New OKR
                </Button>
            )}
        </div>
    );
}
