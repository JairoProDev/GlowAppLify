'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Palette, Zap, Plus, Star, MapPin, Brain } from 'lucide-react';
import { useAreaModulesStore, CreativeProject, FlowSession } from '@/lib/store/area-modules-store';

interface CreativityModuleProps { areaId: string; }

export function CreativityModule({ areaId }: CreativityModuleProps) {
    const { getCreativityData, updateCreativityData } = useAreaModulesStore();
    const data = getCreativityData(areaId);

    const [addingProject, setAddingProject] = useState(false);
    const [addingSession, setAddingSession] = useState(false);
    const [addingExperience, setAddingExperience] = useState(false);

    const [projectForm, setProjectForm] = useState({
        title: '',
        type: 'music' as CreativeProject['type'],
        currentFocus: '',
        currentLevel: 1 as CreativeProject['currentLevel'],
        targetFrequency: 'Weekly',
        nextMilestone: '',
    });

    const [sessionForm, setSessionForm] = useState({
        projectId: '',
        durationMinutes: 45,
        achievedFlow: false as boolean | 'partial',
        flowConditions: '',
        blockers: '',
    });

    const [experienceTitle, setExperienceTitle] = useState('');

    const today = new Date().toISOString().split('T')[0];
    const activeProjects = data.projects.filter(p => p.status === 'active');
    const weekSessions = data.flowSessions.filter(s => {
        const wStart = new Date();
        wStart.setDate(wStart.getDate() - wStart.getDay() + 1);
        return s.date >= wStart.toISOString().split('T')[0];
    });
    const flowRatio = weekSessions.length > 0
        ? Math.round((weekSessions.filter(s => s.achievedFlow === true).length / weekSessions.length) * 100)
        : 0;

    const saveProject = () => {
        if (!projectForm.title) return;
        const project: CreativeProject = {
            id: crypto.randomUUID(),
            ...projectForm,
            status: 'active',
            createdAt: new Date().toISOString(),
        };
        updateCreativityData(areaId, { projects: [...data.projects, project] });
        setAddingProject(false);
        setProjectForm({ title: '', type: 'music', currentFocus: '', currentLevel: 1, targetFrequency: 'Weekly', nextMilestone: '' });
    };

    const saveSession = () => {
        const session: FlowSession = {
            id: crypto.randomUUID(),
            projectId: sessionForm.projectId,
            date: today,
            durationMinutes: sessionForm.durationMinutes,
            achievedFlow: sessionForm.achievedFlow,
            flowConditions: sessionForm.flowConditions.split(',').map(s => s.trim()).filter(Boolean),
            blockers: sessionForm.blockers.split(',').map(s => s.trim()).filter(Boolean),
        };
        updateCreativityData(areaId, { flowSessions: [...data.flowSessions, session] });
        setAddingSession(false);
    };

    const addExperience = () => {
        if (!experienceTitle) return;
        updateCreativityData(areaId, {
            wantedExperiences: [...data.wantedExperiences, { title: experienceTitle, completed: false }]
        });
        setExperienceTitle('');
        setAddingExperience(false);
    };

    const toggleExperience = (idx: number) => {
        const updated = [...data.wantedExperiences];
        updated[idx] = { ...updated[idx], completed: !updated[idx].completed, date: !updated[idx].completed ? today : undefined };
        updateCreativityData(areaId, { wantedExperiences: updated });
    };

    const levelLabels = ['', 'Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
    const projectTypeIcons: Record<CreativeProject['type'], string> = {
        music: '🎵', visual_art: '🎨', writing: '✍️', sport: '🏃', crafts: '🧶', dance: '💃', other: '⭐'
    };

    return (
        <div className="space-y-5">
            {/* Flow Stats */}
            <div className="grid grid-cols-3 gap-3">
                <Card className="text-center bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-background border-0">
                    <CardContent className="p-3">
                        <Zap className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                        <div className="text-2xl font-bold">{flowRatio}%</div>
                        <div className="text-xs text-muted-foreground">Flow rate</div>
                    </CardContent>
                </Card>
                <Card className="text-center bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-background border-0">
                    <CardContent className="p-3">
                        <Palette className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                        <div className="text-2xl font-bold">{activeProjects.length}</div>
                        <div className="text-xs text-muted-foreground">Active projects</div>
                    </CardContent>
                </Card>
                <Card className="text-center bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-background border-0">
                    <CardContent className="p-3">
                        <Star className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
                        <div className="text-2xl font-bold">
                            {data.wantedExperiences.filter(e => e.completed).length}
                        </div>
                        <div className="text-xs text-muted-foreground">Experiences done</div>
                    </CardContent>
                </Card>
            </div>

            {/* Creative Projects */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Palette className="h-4 w-4 text-purple-500" />
                            Creative Projects
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setAddingProject(!addingProject)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {addingProject && (
                        <div className="space-y-2 p-3 border rounded-xl">
                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    placeholder="Project name (e.g., Learn fingerstyle guitar)"
                                    value={projectForm.title}
                                    onChange={e => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                                />
                                <select
                                    value={projectForm.type}
                                    onChange={e => setProjectForm(prev => ({ ...prev, type: e.target.value as CreativeProject['type'] }))}
                                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                                >
                                    {['music', 'visual_art', 'writing', 'sport', 'crafts', 'dance', 'other'].map(t => (
                                        <option key={t} value={t}>{t.replace('_', ' ')}</option>
                                    ))}
                                </select>
                            </div>
                            <Input
                                placeholder="Current focus (specific — e.g., 'Learning the G-C-D chord transition')"
                                value={projectForm.currentFocus}
                                onChange={e => setProjectForm(prev => ({ ...prev, currentFocus: e.target.value }))}
                            />
                            <Input
                                placeholder="Next milestone"
                                value={projectForm.nextMilestone}
                                onChange={e => setProjectForm(prev => ({ ...prev, nextMilestone: e.target.value }))}
                            />
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingProject(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveProject}>Add Project</Button>
                            </div>
                        </div>
                    )}
                    {activeProjects.map(project => (
                        <div key={project.id} className="p-3 rounded-xl border">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">{projectTypeIcons[project.type]}</span>
                                <span className="font-medium text-sm">{project.title}</span>
                                <Badge variant="outline" className="text-xs ml-auto">Lvl {levelLabels[project.currentLevel]}</Badge>
                            </div>
                            {project.currentFocus && (
                                <p className="text-xs text-muted-foreground">Focus: {project.currentFocus}</p>
                            )}
                            {project.nextMilestone && (
                                <p className="text-xs text-muted-foreground">Next: {project.nextMilestone}</p>
                            )}
                            <div className="mt-2 flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs h-7"
                                    onClick={() => {
                                        setSessionForm(prev => ({ ...prev, projectId: project.id }));
                                        setAddingSession(true);
                                    }}
                                >
                                    <Zap className="h-3 w-3 mr-1" />
                                    Log Session
                                </Button>
                            </div>
                        </div>
                    ))}
                    {activeProjects.length === 0 && !addingProject && (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                            Creative practice isn't a luxury — it's the source of your best thinking.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Log Flow Session Modal */}
            {addingSession && (
                <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-900/10">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Log Flow Session</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <select
                            value={sessionForm.projectId}
                            onChange={e => setSessionForm(prev => ({ ...prev, projectId: e.target.value }))}
                            className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                        >
                            <option value="">Select project...</option>
                            {activeProjects.map(p => (
                                <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                        </select>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-muted-foreground">Duration (min)</label>
                                <Input
                                    type="number"
                                    value={sessionForm.durationMinutes}
                                    onChange={e => setSessionForm(prev => ({ ...prev, durationMinutes: parseInt(e.target.value) || 0 }))}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Flow achieved?</label>
                                <select
                                    value={sessionForm.achievedFlow.toString()}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setSessionForm(prev => ({
                                            ...prev,
                                            achievedFlow: val === 'true' ? true : val === 'false' ? false : 'partial'
                                        }));
                                    }}
                                    className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                                >
                                    <option value="true">✅ Yes, full flow</option>
                                    <option value="partial">⚡ Partial</option>
                                    <option value="false">❌ No flow</option>
                                </select>
                            </div>
                        </div>
                        <Input
                            placeholder="What conditions helped? (e.g., 'quiet room, phone off')"
                            value={sessionForm.flowConditions}
                            onChange={e => setSessionForm(prev => ({ ...prev, flowConditions: e.target.value }))}
                        />
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setAddingSession(false)}>Cancel</Button>
                            <Button size="sm" onClick={saveSession}>Save Session</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Experiences Bucket List */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-500" />
                            Life Experiences
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setAddingExperience(!addingExperience)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    {addingExperience && (
                        <div className="flex gap-2">
                            <Input
                                placeholder="Experience (e.g., 'Travel to Japan', 'Learn to surf')"
                                value={experienceTitle}
                                onChange={e => setExperienceTitle(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addExperience()}
                            />
                            <Button size="sm" onClick={addExperience}>Add</Button>
                        </div>
                    )}
                    {data.wantedExperiences.map((exp, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/20 ${exp.completed ? 'opacity-60' : ''}`}
                            onClick={() => toggleExperience(idx)}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${exp.completed ? 'bg-green-500 border-green-500' : 'border-muted-foreground'}`}>
                                {exp.completed && <span className="text-white text-xs">✓</span>}
                            </div>
                            <span className={`text-sm ${exp.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {exp.title}
                            </span>
                            {exp.completed && exp.date && (
                                <span className="text-xs text-muted-foreground ml-auto">{exp.date}</span>
                            )}
                        </div>
                    ))}
                    {data.wantedExperiences.length === 0 && !addingExperience && (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                            Add experiences you want to live. A life well-lived is made of experiences, not possessions.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Brainstorm Space */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Brain className="h-4 w-4 text-orange-500" />
                        Brainstorm Space
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Free-form space for ideas, mind maps, creative thinking... No structure needed here."
                        value={data.brainstormNotes}
                        onChange={e => updateCreativityData(areaId, { brainstormNotes: e.target.value })}
                        rows={6}
                        className="text-sm resize-none font-mono"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
