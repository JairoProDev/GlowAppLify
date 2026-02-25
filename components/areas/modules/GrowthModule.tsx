'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sprout, Compass, FlameKindling, Edit3, Plus, CheckCircle2, Target } from 'lucide-react';
import { useAreaModulesStore, Value, DiscomfortChallenge } from '@/lib/store/area-modules-store';

interface GrowthModuleProps { areaId: string; }

export function GrowthModule({ areaId }: GrowthModuleProps) {
    const { getGrowthData, updateGrowthData } = useAreaModulesStore();
    const data = getGrowthData(areaId);

    const [editingMission, setEditingMission] = useState(false);
    const [missionText, setMissionText] = useState(data.missionStatement);
    const [legacyText, setLegacyText] = useState(data.legacyStatement);
    const [addingValue, setAddingValue] = useState(false);
    const [addingChallenge, setAddingChallenge] = useState(false);
    const [editingIkigai, setEditingIkigai] = useState(false);
    const [valueForm, setValueForm] = useState({ name: '', description: '' });
    const [challengeForm, setChallengeForm] = useState({ title: '', description: '', category: 'social' as DiscomfortChallenge['category'] });
    const [ikigaiForm, setIkigaiForm] = useState(data.ikigaiNotes);

    const [editingRules, setEditingRules] = useState(false);
    const [rulesText, setRulesText] = useState(data.lifeRules.join('\n'));

    const saveVision = () => {
        updateGrowthData(areaId, { missionStatement: missionText, legacyStatement: legacyText });
        setEditingMission(false);
    };

    const saveValue = () => {
        if (!valueForm.name) return;
        const value: Value = {
            id: crypto.randomUUID(),
            name: valueForm.name,
            description: valueForm.description,
            examples: [],
        };
        updateGrowthData(areaId, { values: [...data.values, value] });
        setAddingValue(false);
        setValueForm({ name: '', description: '' });
    };

    const saveChallenge = () => {
        if (!challengeForm.title) return;
        const challenge: DiscomfortChallenge = {
            id: crypto.randomUUID(),
            ...challengeForm,
            completed: false,
        };
        updateGrowthData(areaId, { discomfortChallenges: [...data.discomfortChallenges, challenge] });
        setAddingChallenge(false);
        setChallengeForm({ title: '', description: '', category: 'social' });
    };

    const toggleChallenge = (id: string) => {
        updateGrowthData(areaId, {
            discomfortChallenges: data.discomfortChallenges.map(c =>
                c.id === id ? { ...c, completed: !c.completed, date: !c.completed ? new Date().toISOString().split('T')[0] : undefined } : c
            )
        });
    };

    const saveIkigai = () => {
        updateGrowthData(areaId, { ikigaiNotes: ikigaiForm });
        setEditingIkigai(false);
    };

    const saveRules = () => {
        updateGrowthData(areaId, { lifeRules: rulesText.split('\n').map(r => r.trim()).filter(Boolean) });
        setEditingRules(false);
    };

    const categoryColors: Record<DiscomfortChallenge['category'], string> = {
        social: 'bg-blue-100 text-blue-700',
        physical: 'bg-green-100 text-green-700',
        creative: 'bg-purple-100 text-purple-700',
        intellectual: 'bg-yellow-100 text-yellow-700',
        emotional: 'bg-red-100 text-red-700',
    };

    return (
        <div className="space-y-5">
            {/* Mission & Legacy */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Target className="h-4 w-4 text-amber-500" />
                            Purpose & Legacy
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setEditingMission(!editingMission)}>
                            <Edit3 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {editingMission ? (
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground">MISSION (Why do you exist?)</label>
                                <Textarea
                                    placeholder="My mission is to... (What is your purpose? What change do you create?)"
                                    value={missionText}
                                    onChange={e => setMissionText(e.target.value)}
                                    rows={3}
                                    className="text-sm mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground">LEGACY (How do you want to be remembered?)</label>
                                <Textarea
                                    placeholder="I will be remembered as someone who... (Your epitaph)"
                                    value={legacyText}
                                    onChange={e => setLegacyText(e.target.value)}
                                    rows={2}
                                    className="text-sm mt-1"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setEditingMission(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveVision}>Save</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {data.missionStatement ? (
                                <div>
                                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Mission</div>
                                    <p className="text-sm italic">"{data.missionStatement}"</p>
                                </div>
                            ) : (
                                <div className="text-center py-3">
                                    <Target className="h-7 w-7 mx-auto mb-1 opacity-30" />
                                    <p className="text-sm text-muted-foreground">Define your personal mission statement</p>
                                </div>
                            )}
                            {data.legacyStatement && (
                                <div>
                                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Legacy</div>
                                    <p className="text-sm italic text-muted-foreground">"{data.legacyStatement}"</p>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Values Compass */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Compass className="h-4 w-4 text-blue-500" />
                            Values Compass
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setAddingValue(!addingValue)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {addingValue && (
                        <div className="space-y-2 p-3 border rounded-xl">
                            <Input
                                placeholder="Value name (e.g., Integrity, Courage, Freedom)"
                                value={valueForm.name}
                                onChange={e => setValueForm(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <Textarea
                                placeholder="What does this value mean to you specifically? How does it show up in your life?"
                                value={valueForm.description}
                                onChange={e => setValueForm(prev => ({ ...prev, description: e.target.value }))}
                                rows={2}
                                className="text-sm"
                            />
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingValue(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveValue}>Add Value</Button>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                        {data.values.map(value => (
                            <div key={value.id} className="group relative p-3 rounded-xl border hover:border-primary/50 transition-colors cursor-pointer bg-card w-full">
                                <div className="flex items-center gap-2">
                                    <Compass className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                    <span className="font-semibold text-sm">{value.name}</span>
                                </div>
                                {value.description && (
                                    <p className="text-xs text-muted-foreground mt-1">{value.description}</p>
                                )}
                            </div>
                        ))}
                        {data.values.length === 0 && !addingValue && (
                            <div className="text-center py-4 text-sm text-muted-foreground w-full">
                                Values are your decision-making compass. Without clarity on values, you drift.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Discomfort Challenges */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <FlameKindling className="h-4 w-4 text-orange-500" />
                            Discomfort Challenges
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setAddingChallenge(!addingChallenge)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    {addingChallenge && (
                        <div className="space-y-2 p-3 border rounded-xl">
                            <Input
                                placeholder="The thing you've been avoiding (e.g., 'Call the difficult client')"
                                value={challengeForm.title}
                                onChange={e => setChallengeForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                            <select
                                value={challengeForm.category}
                                onChange={e => setChallengeForm(prev => ({ ...prev, category: e.target.value as DiscomfortChallenge['category'] }))}
                                className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                            >
                                {['social', 'physical', 'creative', 'intellectual', 'emotional'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingChallenge(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveChallenge}>Add Challenge</Button>
                            </div>
                        </div>
                    )}
                    {data.discomfortChallenges.map(challenge => (
                        <div
                            key={challenge.id}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-muted/20 transition-colors ${challenge.completed ? 'opacity-60' : ''}`}
                            onClick={() => toggleChallenge(challenge.id)}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${challenge.completed ? 'bg-orange-500 border-orange-500' : 'border-muted-foreground'}`}>
                                {challenge.completed && <span className="text-white text-xs">✓</span>}
                            </div>
                            <div className="flex-1">
                                <span className={`text-sm ${challenge.completed ? 'line-through text-muted-foreground' : ''}`}>
                                    {challenge.title}
                                </span>
                            </div>
                            <Badge className={`text-xs ${categoryColors[challenge.category]}`}>
                                {challenge.category}
                            </Badge>
                        </div>
                    ))}
                    {data.discomfortChallenges.length === 0 && !addingChallenge && (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                            Growth happens just outside your comfort zone. What are you avoiding?
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Ikigai */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Sprout className="h-4 w-4 text-green-500" />
                            Ikigai — Your Reason for Being
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setEditingIkigai(!editingIkigai)}>
                            <Edit3 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {editingIkigai ? (
                        <div className="space-y-3">
                            {[
                                { key: 'love', label: '❤️ What I love', placeholder: 'Activities, subjects, experiences that energize you...' },
                                { key: 'worldNeeds', label: '🌍 What the world needs', placeholder: 'Problems you feel called to solve...' },
                                { key: 'goodAt', label: '⭐ What I am good at', placeholder: 'Natural strengths, trained skills, unique abilities...' },
                                { key: 'paidFor', label: '💰 What I can be paid for', placeholder: 'Skills/services someone would pay you for...' },
                            ].map(field => (
                                <div key={field.key}>
                                    <label className="text-xs font-semibold text-muted-foreground">{field.label}</label>
                                    <Textarea
                                        placeholder={field.placeholder}
                                        value={ikigaiForm[field.key as keyof typeof ikigaiForm]}
                                        onChange={e => setIkigaiForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                                        rows={2}
                                        className="text-sm mt-1"
                                    />
                                </div>
                            ))}
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setEditingIkigai(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveIkigai}>Save Ikigai</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { key: 'love', label: '❤️ Love', value: data.ikigaiNotes.love },
                                { key: 'worldNeeds', label: '🌍 World Needs', value: data.ikigaiNotes.worldNeeds },
                                { key: 'goodAt', label: '⭐ Good At', value: data.ikigaiNotes.goodAt },
                                { key: 'paidFor', label: '💰 Paid For', value: data.ikigaiNotes.paidFor },
                            ].map(q => (
                                <div key={q.key} className="p-3 rounded-xl border">
                                    <div className="text-xs font-semibold mb-1">{q.label}</div>
                                    <p className="text-xs text-muted-foreground line-clamp-3">
                                        {q.value || <span className="italic">Not defined yet</span>}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Life Rules / Principles */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">⚖️ Life Principles</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setEditingRules(!editingRules)}>
                            <Edit3 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {editingRules ? (
                        <div className="space-y-2">
                            <p className="text-xs text-muted-foreground">One principle per line</p>
                            <Textarea
                                value={rulesText}
                                onChange={e => setRulesText(e.target.value)}
                                rows={6}
                                placeholder={"I will never compromise on my integrity\nI prioritize health over convenience\nI default to action over overthinking"}
                                className="text-sm font-mono"
                            />
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setEditingRules(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveRules}>Save</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {data.lifeRules.map((rule, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm">
                                    <span className="text-muted-foreground font-mono text-xs mt-0.5">{idx + 1}.</span>
                                    <span>{rule}</span>
                                </div>
                            ))}
                            {data.lifeRules.length === 0 && (
                                <div className="text-center py-4 text-sm text-muted-foreground">
                                    Define non-negotiable principles that guide every decision.
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
