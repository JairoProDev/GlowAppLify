'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Clock, Plus, Bell, Star, AlertTriangle } from 'lucide-react';
import { useAreaModulesStore, RelationshipContact } from '@/lib/store/area-modules-store';
import { differenceInDays, format, addDays } from 'date-fns';

interface RelationshipsModuleProps { areaId: string; }

const circleLabels = { 1: 'Intimate', 2: 'Close', 3: 'Network' };
const circleColors = {
    1: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    2: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    3: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
};
const statusColors = {
    excellent: 'text-green-600',
    good: 'text-blue-600',
    needs_attention: 'text-yellow-600',
    distant: 'text-red-600',
};
const statusIcons = { excellent: '💚', good: '💙', needs_attention: '⚠️', distant: '🔴' };

export function RelationshipsModule({ areaId }: RelationshipsModuleProps) {
    const { getRelationshipData, updateRelationshipData } = useAreaModulesStore();
    const data = getRelationshipData(areaId);
    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState({
        name: '',
        category: 'friend' as RelationshipContact['category'],
        circle: 2 as RelationshipContact['circle'],
        contactFrequency: 'monthly' as RelationshipContact['contactFrequency'],
    });

    const today = new Date();

    const needsAttention = data.contacts.filter(c => {
        if (!c.lastContact) return true;
        const days = differenceInDays(today, new Date(c.lastContact));
        const threshold = { weekly: 10, biweekly: 20, monthly: 40, quarterly: 100 }[c.contactFrequency];
        return days > threshold;
    });

    const saveContact = () => {
        if (!form.name) return;
        const contact: RelationshipContact = {
            id: crypto.randomUUID(),
            ...form,
            status: 'good',
            importantDates: [],
        };
        updateRelationshipData(areaId, { contacts: [...data.contacts, contact] });
        setAdding(false);
        setForm({ name: '', category: 'friend', circle: 2, contactFrequency: 'monthly' });
    };

    const markContacted = (id: string) => {
        const today = new Date().toISOString().split('T')[0];
        updateRelationshipData(areaId, {
            contacts: data.contacts.map(c =>
                c.id === id ? { ...c, lastContact: today, status: 'good' as const } : c
            )
        });
    };

    const getLastContactText = (contact: RelationshipContact) => {
        if (!contact.lastContact) return 'Never';
        const days = differenceInDays(today, new Date(contact.lastContact));
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        return `${days}d ago`;
    };

    const sortedContacts = [...data.contacts].sort((a, b) => a.circle - b.circle);

    return (
        <div className="space-y-5">
            {/* Needs Attention Alert */}
            {needsAttention.length > 0 && (
                <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Bell className="h-4 w-4 text-yellow-600" />
                            <span className="font-semibold text-sm text-yellow-800 dark:text-yellow-200">
                                {needsAttention.length} relationship{needsAttention.length > 1 ? 's' : ''} need attention
                            </span>
                        </div>
                        <div className="space-y-1">
                            {needsAttention.slice(0, 3).map(c => (
                                <div key={c.id} className="flex items-center justify-between text-sm">
                                    <span>{c.name} — {getLastContactText(c)}</span>
                                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => markContacted(c.id)}>
                                        ✓ Contacted
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(circle => (
                    <Card key={circle} className="text-center">
                        <CardContent className="p-3">
                            <Badge className={`text-xs mb-1 ${circleColors[circle as keyof typeof circleColors]}`}>
                                Circle {circle}
                            </Badge>
                            <div className="text-2xl font-bold">
                                {data.contacts.filter(c => c.circle === circle).length}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {circleLabels[circle as keyof typeof circleLabels]}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Personal CRM */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Heart className="h-4 w-4 text-red-500" />
                            Emotional CRM
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setAdding(!adding)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {adding && (
                        <div className="space-y-3 p-3 border rounded-xl">
                            <Input
                                placeholder="Name"
                                value={form.name}
                                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="text-xs text-muted-foreground">Category</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm(prev => ({ ...prev, category: e.target.value as RelationshipContact['category'] }))}
                                        className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                                    >
                                        {['partner', 'family', 'friend', 'mentor', 'colleague'].map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Circle</label>
                                    <select
                                        value={form.circle}
                                        onChange={e => setForm(prev => ({ ...prev, circle: parseInt(e.target.value) as RelationshipContact['circle'] }))}
                                        className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                                    >
                                        <option value={1}>1 - Intimate</option>
                                        <option value={2}>2 - Close</option>
                                        <option value={3}>3 - Network</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Contact frequency</label>
                                    <select
                                        value={form.contactFrequency}
                                        onChange={e => setForm(prev => ({ ...prev, contactFrequency: e.target.value as RelationshipContact['contactFrequency'] }))}
                                        className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                                    >
                                        <option value="weekly">Weekly</option>
                                        <option value="biweekly">Biweekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="quarterly">Quarterly</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveContact}>Add Contact</Button>
                            </div>
                        </div>
                    )}
                    {sortedContacts.map(contact => (
                        <div key={contact.id} className="flex items-center justify-between p-3 rounded-xl border hover:bg-muted/20 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                                    {contact.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm">{contact.name}</span>
                                        <Badge className={`text-xs ${circleColors[contact.circle]}`}>
                                            C{contact.circle}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className={statusColors[contact.status]}>
                                            {statusIcons[contact.status]}
                                        </span>
                                        <Clock className="h-3 w-3" />
                                        {getLastContactText(contact)}
                                        <span>· {contact.category}</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs h-7"
                                onClick={() => markContacted(contact.id)}
                            >
                                ✓ Contacted
                            </Button>
                        </div>
                    ))}
                    {data.contacts.length === 0 && !adding && (
                        <div className="text-center py-6 text-muted-foreground text-sm">
                            <Heart className="h-8 w-8 mx-auto mb-2 opacity-30" />
                            <p>Add the people who matter most to you.</p>
                            <p className="text-xs mt-1">The Harvard Study shows relationships predict happiness more than anything else.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
