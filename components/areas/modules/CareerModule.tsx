'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Rocket, Brain, Target, Clock, Plus, TrendingUp,
    Eye, Zap, BarChart3, Edit3, CheckCircle2
} from 'lucide-react';
import { useAreaModulesStore, DeepWorkSession, Project } from '@/lib/store/area-modules-store';

interface CareerModuleProps {
    areaId: string;
}

export function CareerModule({ areaId }: CareerModuleProps) {
    const { getCareerData, updateCareerData } = useAreaModulesStore();
    const data = getCareerData(areaId);

    const [editingVision, setEditingVision] = useState(false);
    const [visionText, setVisionText] = useState(data.legacyVision);
    const [addingSession, setAddingSession] = useState(false);
    const [addingProject, setAddingProject] = useState(false);

    const [sessionForm, setSessionForm] = useState({
        activity: '',
        durationMinutes: 90,
        quality: 4 as DeepWorkSession['quality'],
        interruptions: 0,
        output: '',
        energyStart: 7,
        energyEnd: 6,
    });

    const [projectForm, setProjectForm] = useState({ name: '', description: '' });

    // Stats
    const today = new Date().toISOString().split('T')[0];
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    const weekStartStr = weekStart.toISOString().split('T')[0];

    const weekSessions = data.deepWorkSessions.filter(s => s.date >= weekStartStr);
    const weekDeepWorkHours = weekSessions.reduce((sum, s) => sum + s.durationMinutes, 0) / 60;
    const weekTargetHours = data.weeklyDeepWorkTarget;
    const deepWorkPercent = Math.min(100, Math.round((weekDeepWorkHours / weekTargetHours) * 100));

    const allTimeHours = data.deepWorkSessions.reduce((sum, s) => sum + s.durationMinutes, 0) / 60;
    const avgSessionQuality = data.deepWorkSessions.length > 0
        ? (data.deepWorkSessions.reduce((sum, s) => sum + s.quality, 0) / data.deepWorkSessions.length).toFixed(1)
        : '-';

    const saveVision = () => {
        updateCareerData(areaId, { legacyVision: visionText });
        setEditingVision(false);
    };

    const saveSession = () => {
        if (!sessionForm.activity) return;
        const session: DeepWorkSession = {
            id: crypto.randomUUID(),
            date: today,
            ...sessionForm,
        };
        updateCareerData(areaId, { deepWorkSessions: [...data.deepWorkSessions, session] });
        setAddingSession(false);
        setSessionForm({ activity: '', durationMinutes: 90, quality: 4, interruptions: 0, output: '', energyStart: 7, energyEnd: 6 });
    };

    const saveProject = () => {
        if (!projectForm.name) return;
        const project: Project = {
            id: crypto.randomUUID(),
            name: projectForm.name,
            description: projectForm.description,
            metrics: [],
            status: 'active',
            updatedAt: new Date().toISOString(),
        };
        updateCareerData(areaId, { projects: [...data.projects, project] });
        setAddingProject(false);
        setProjectForm({ name: '', description: '' });
    };

    const qualityLabel = (q: number) => ['', 'Poor', 'Low', 'OK', 'Good', 'Exceptional'][q] || '';
    const qualityColor = (q: number) => q >= 4 ? 'text-green-600' : q >= 3 ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="space-y-5">
            {/* Deep Work Tracker */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Brain className="h-4 w-4 text-violet-500" />
                            Deep Work Tracker
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            {!addingSession && (
                                <Button variant="ghost" size="sm" onClick={() => setAddingSession(true)}>
                                    <Plus className="h-4 w-4" />
                                    Log Session
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Weekly Progress */}
                    <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-900/20">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">This Week's Deep Work</span>
                            <span className="font-bold text-violet-600">{weekDeepWorkHours.toFixed(1)}h / {weekTargetHours}h</span>
                        </div>
                        <Progress value={deepWorkPercent} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{weekSessions.length} sessions</span>
                            <span>All-time: {allTimeHours.toFixed(0)}h · Avg quality: {avgSessionQuality}/5</span>
                        </div>
                    </div>

                    {addingSession ? (
                        <div className="space-y-3 p-3 border rounded-xl">
                            <Input
                                placeholder="What did you work on? (e.g., Product strategy, Code review)"
                                value={sessionForm.activity}
                                onChange={e => setSessionForm(prev => ({ ...prev, activity: e.target.value }))}
                            />
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="text-xs text-muted-foreground">Duration (min)</label>
                                    <Input
                                        type="number"
                                        value={sessionForm.durationMinutes}
                                        onChange={e => setSessionForm(prev => ({ ...prev, durationMinutes: parseInt(e.target.value) || 0 }))}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Interruptions</label>
                                    <Input
                                        type="number"
                                        value={sessionForm.interruptions}
                                        onChange={e => setSessionForm(prev => ({ ...prev, interruptions: parseInt(e.target.value) || 0 }))}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Quality (1-5)</label>
                                    <select
                                        value={sessionForm.quality}
                                        onChange={e => setSessionForm(prev => ({ ...prev, quality: parseInt(e.target.value) as DeepWorkSession['quality'] }))}
                                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                                    >
                                        {[1, 2, 3, 4, 5].map(q => (
                                            <option key={q} value={q}>{q} - {qualityLabel(q)}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <Input
                                placeholder="Tangible output (e.g., 'Finished v2 spec doc, 500 lines coded')"
                                value={sessionForm.output}
                                onChange={e => setSessionForm(prev => ({ ...prev, output: e.target.value }))}
                            />
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingSession(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveSession}>Log Deep Work</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {data.deepWorkSessions.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map(session => (
                                <div key={session.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/20 text-sm">
                                    <div>
                                        <span className="font-medium">{session.activity}</span>
                                        <span className="text-xs text-muted-foreground ml-2">{session.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs">{session.durationMinutes}min</span>
                                        <Badge variant="outline" className={`text-xs ${qualityColor(session.quality)}`}>
                                            {qualityLabel(session.quality)}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                            {data.deepWorkSessions.length === 0 && (
                                <div className="text-center py-4 text-sm text-muted-foreground">
                                    <p>Deep work is your competitive advantage.</p>
                                    <p>Log your first focused session to start tracking.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Weekly target editor */}
                    <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs text-muted-foreground">Weekly target:</span>
                        <Input
                            type="number"
                            value={weekTargetHours}
                            onChange={e => updateCareerData(areaId, { weeklyDeepWorkTarget: parseInt(e.target.value) || 20 })}
                            className="w-20 h-7 text-xs"
                        />
                        <span className="text-xs text-muted-foreground">hours</span>
                    </div>
                </CardContent>
            </Card>

            {/* Legacy Vision */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Eye className="h-4 w-4 text-orange-500" />
                            Legacy Vision (10 Years)
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setEditingVision(!editingVision)}>
                            <Edit3 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {editingVision ? (
                        <div className="space-y-3">
                            <Textarea
                                placeholder="In 10 years, I will have... (be specific: how many people impacted, what you built, what your legacy is)"
                                value={visionText}
                                onChange={e => setVisionText(e.target.value)}
                                rows={5}
                                className="text-sm"
                            />
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setEditingVision(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveVision}>Save Vision</Button>
                            </div>
                        </div>
                    ) : data.legacyVision ? (
                        <p className="text-sm leading-relaxed text-muted-foreground italic">"{data.legacyVision}"</p>
                    ) : (
                        <div className="text-center py-4 text-muted-foreground">
                            <Eye className="h-8 w-8 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">Define your 10-year legacy vision.</p>
                            <p className="text-xs">Where do you want to be? What will you have built?</p>
                            <Button size="sm" variant="outline" className="mt-3" onClick={() => setEditingVision(true)}>
                                Write Your Vision
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Active Projects */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Rocket className="h-4 w-4 text-blue-500" />
                            Active Projects
                        </CardTitle>
                        {!addingProject && (
                            <Button variant="ghost" size="sm" onClick={() => setAddingProject(true)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {addingProject && (
                        <div className="space-y-2 p-3 border rounded-xl">
                            <Input
                                placeholder="Project name"
                                value={projectForm.name}
                                onChange={e => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <Textarea
                                placeholder="Brief description and success metric"
                                value={projectForm.description}
                                onChange={e => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                                rows={2}
                                className="text-sm"
                            />
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingProject(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveProject}>Add Project</Button>
                            </div>
                        </div>
                    )}
                    {data.projects.filter(p => p.status === 'active').map(project => (
                        <div key={project.id} className="p-3 rounded-xl border">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{project.name}</span>
                                <div className="flex gap-1">
                                    <Badge
                                        variant="outline"
                                        className="text-xs cursor-pointer"
                                        onClick={() => updateCareerData(areaId, {
                                            projects: data.projects.map(p =>
                                                p.id === project.id
                                                    ? { ...p, status: p.status === 'active' ? 'paused' : 'active' }
                                                    : p
                                            )
                                        })}
                                    >
                                        Active
                                    </Badge>
                                </div>
                            </div>
                            {project.description && (
                                <p className="text-xs text-muted-foreground">{project.description}</p>
                            )}
                        </div>
                    ))}
                    {data.projects.filter(p => p.status === 'active').length === 0 && !addingProject && (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                            Add your active projects to track their OKRs and deep work sessions.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
