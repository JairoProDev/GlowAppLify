'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    TrendingUp, TrendingDown, DollarSign, Target, Wallet,
    AlertTriangle, CheckCircle2, Plus, Trash2, BarChart3,
    Shield, Zap, Layers
} from 'lucide-react';
import { useAreaModulesStore, FinancialData, Asset, Liability, Subscription } from '@/lib/store/area-modules-store';
import { Progress } from '@/components/ui/progress';

interface FinancesModuleProps {
    areaId: string;
}

export function FinancesModule({ areaId }: FinancesModuleProps) {
    const { getFinancialData, updateFinancialData } = useAreaModulesStore();
    const data = getFinancialData(areaId);

    const [editingIncome, setEditingIncome] = useState(false);
    const [tempIncome, setTempIncome] = useState(data.monthlyIncome.toString());
    const [tempExpenses, setTempExpenses] = useState(data.monthlyExpenses.toString());
    const [newAsset, setNewAsset] = useState({ name: '', value: '', category: 'cash' as Asset['category'] });
    const [newLiability, setNewLiability] = useState({ name: '', balance: '' });
    const [newSub, setNewSub] = useState({ name: '', monthlyAmount: '' });

    // Calculations
    const totalAssets = data.assets.reduce((sum, a) => sum + a.value, 0);
    const totalLiabilities = data.liabilities.reduce((sum, l) => sum + l.balance, 0);
    const netWorth = totalAssets - totalLiabilities;
    const monthlySavings = data.monthlyIncome - data.monthlyExpenses;
    const savingsRate = data.monthlyIncome > 0 ? Math.round((monthlySavings / data.monthlyIncome) * 100) : 0;
    const runway = data.monthlyExpenses > 0 ? Math.floor(totalAssets / data.monthlyExpenses) : 0;
    const freedomNumber = data.monthlyExpenses * 12 * 25;
    const freedomPercent = freedomNumber > 0 ? Math.min(100, Math.round((data.currentPortfolio / freedomNumber) * 100)) : 0;
    const monthlySubscriptions = data.subscriptions.filter(s => s.active).reduce((sum, s) => sum + s.monthlyAmount, 0);

    const runwayColor = runway >= 12 ? 'text-green-600' : runway >= 6 ? 'text-yellow-600' : 'text-red-600';
    const runwayBg = runway >= 12 ? 'bg-green-50 dark:bg-green-900/20' : runway >= 6 ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-red-50 dark:bg-red-900/20';

    const saveFinancials = () => {
        updateFinancialData(areaId, {
            monthlyIncome: parseFloat(tempIncome) || 0,
            monthlyExpenses: parseFloat(tempExpenses) || 0,
        });
        setEditingIncome(false);
    };

    const addAsset = () => {
        if (!newAsset.name || !newAsset.value) return;
        const asset: Asset = {
            id: crypto.randomUUID(),
            name: newAsset.name,
            category: newAsset.category,
            value: parseFloat(newAsset.value) || 0,
            currency: data.currency,
            updatedAt: new Date().toISOString(),
        };
        updateFinancialData(areaId, { assets: [...data.assets, asset] });
        setNewAsset({ name: '', value: '', category: 'cash' });
    };

    const removeAsset = (id: string) => {
        updateFinancialData(areaId, { assets: data.assets.filter(a => a.id !== id) });
    };

    const addLiability = () => {
        if (!newLiability.name || !newLiability.balance) return;
        const liability: Liability = {
            id: crypto.randomUUID(),
            name: newLiability.name,
            category: 'loan',
            balance: parseFloat(newLiability.balance) || 0,
            currency: data.currency,
            updatedAt: new Date().toISOString(),
        };
        updateFinancialData(areaId, { liabilities: [...data.liabilities, liability] });
        setNewLiability({ name: '', balance: '' });
    };

    const addSubscription = () => {
        if (!newSub.name || !newSub.monthlyAmount) return;
        const sub: Subscription = {
            id: crypto.randomUUID(),
            name: newSub.name,
            monthlyAmount: parseFloat(newSub.monthlyAmount) || 0,
            category: 'other',
            active: true,
        };
        updateFinancialData(areaId, { subscriptions: [...data.subscriptions, sub] });
        setNewSub({ name: '', monthlyAmount: '' });
    };

    const toggleSubscription = (id: string) => {
        updateFinancialData(areaId, {
            subscriptions: data.subscriptions.map(s =>
                s.id === id ? { ...s, active: !s.active } : s
            )
        });
    };

    const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: data.currency, maximumFractionDigits: 0 }).format(n);

    return (
        <div className="space-y-6">
            {/* Cash Flow Dashboard */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className={`${runwayBg} border-0`}>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Shield className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Runway</span>
                        </div>
                        <div className={`text-2xl font-bold ${runwayColor}`}>{runway}mo</div>
                        <p className="text-xs text-muted-foreground">
                            {runway >= 12 ? '✓ Safe zone' : runway >= 6 ? '⚡ Build more' : '🚨 Danger'}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-background border-0">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Savings Rate</span>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">{savingsRate}%</div>
                        <p className="text-xs text-muted-foreground">{fmt(monthlySavings)}/mo</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-background border-0">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Net Worth</span>
                        </div>
                        <div className={`text-2xl font-bold ${netWorth >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            {fmt(netWorth)}
                        </div>
                        <p className="text-xs text-muted-foreground">{fmt(totalAssets)} assets</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-background border-0">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Target className="h-4 w-4 text-purple-600" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Freedom %</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">{freedomPercent}%</div>
                        <p className="text-xs text-muted-foreground">of {fmt(freedomNumber)} goal</p>
                    </CardContent>
                </Card>
            </div>

            {/* Freedom Progress Bar */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-500" />
                        Financial Freedom Progress
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current portfolio: {fmt(data.currentPortfolio)}</span>
                        <span className="font-semibold">Freedom Number: {fmt(freedomNumber)}</span>
                    </div>
                    <Progress value={freedomPercent} className="h-3" />
                    <p className="text-xs text-muted-foreground">
                        {freedomNumber > 0
                            ? `${fmt(freedomNumber - data.currentPortfolio)} remaining · Based on ${fmt(data.monthlyExpenses * 12)}/year expenses × 25`
                            : 'Set your monthly expenses to calculate your Freedom Number'}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                const val = parseFloat(prompt('Current portfolio value ($):') || '0');
                                if (val) updateFinancialData(areaId, { currentPortfolio: val });
                            }}
                        >
                            Update Portfolio
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Income & Expenses */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            Monthly Cash Flow
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setEditingIncome(!editingIncome)}>
                            {editingIncome ? 'Cancel' : 'Edit'}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {editingIncome ? (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-muted-foreground">Monthly Income</label>
                                    <Input
                                        value={tempIncome}
                                        onChange={e => setTempIncome(e.target.value)}
                                        placeholder="5000"
                                        type="number"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Monthly Expenses</label>
                                    <Input
                                        value={tempExpenses}
                                        onChange={e => setTempExpenses(e.target.value)}
                                        placeholder="3000"
                                        type="number"
                                    />
                                </div>
                            </div>
                            <Button size="sm" onClick={saveFinancials}>Save</Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-xs text-muted-foreground">Income</div>
                                <div className="font-bold text-green-600">{fmt(data.monthlyIncome)}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Expenses</div>
                                <div className="font-bold text-red-500">{fmt(data.monthlyExpenses)}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Saved</div>
                                <div className={`font-bold ${monthlySavings >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {fmt(monthlySavings)}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Assets & Liabilities */}
            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            Assets ({fmt(totalAssets)})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {data.assets.map(asset => (
                            <div key={asset.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                                <div>
                                    <p className="text-sm font-medium">{asset.name}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{asset.category}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-green-600">{fmt(asset.value)}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeAsset(asset.id)}>
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className="flex gap-2 mt-3">
                            <Input
                                placeholder="Asset name"
                                value={newAsset.name}
                                onChange={e => setNewAsset(prev => ({ ...prev, name: e.target.value }))}
                                className="text-xs h-8"
                            />
                            <Input
                                placeholder="Value"
                                value={newAsset.value}
                                onChange={e => setNewAsset(prev => ({ ...prev, value: e.target.value }))}
                                type="number"
                                className="text-xs h-8 w-24"
                            />
                            <Button size="sm" onClick={addAsset} className="h-8">
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-red-500" />
                            Liabilities ({fmt(totalLiabilities)})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {data.liabilities.map(lib => (
                            <div key={lib.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                                <p className="text-sm font-medium">{lib.name}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-red-500">{fmt(lib.balance)}</span>
                                    <Button
                                        variant="ghost" size="icon" className="h-6 w-6"
                                        onClick={() => updateFinancialData(areaId, { liabilities: data.liabilities.filter(l => l.id !== lib.id) })}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className="flex gap-2 mt-3">
                            <Input
                                placeholder="Debt name"
                                value={newLiability.name}
                                onChange={e => setNewLiability(prev => ({ ...prev, name: e.target.value }))}
                                className="text-xs h-8"
                            />
                            <Input
                                placeholder="Balance"
                                value={newLiability.balance}
                                onChange={e => setNewLiability(prev => ({ ...prev, balance: e.target.value }))}
                                type="number"
                                className="text-xs h-8 w-24"
                            />
                            <Button size="sm" onClick={addLiability} className="h-8">
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Subscription Tracker */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            Subscription Vampire Detector
                        </CardTitle>
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                            {fmt(monthlySubscriptions)}/mo
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    {data.subscriptions.map(sub => (
                        <div
                            key={sub.id}
                            className={`flex items-center justify-between p-2 rounded-lg ${sub.active ? 'bg-muted/30' : 'bg-muted/10 opacity-50'}`}
                        >
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleSubscription(sub.id)}
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${sub.active ? 'bg-orange-500 border-orange-500' : 'border-muted-foreground'}`}
                                >
                                    {sub.active && <div className="w-2 h-2 bg-white rounded-full" />}
                                </button>
                                <span className="text-sm">{sub.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{fmt(sub.monthlyAmount)}/mo</span>
                                <Button
                                    variant="ghost" size="icon" className="h-6 w-6"
                                    onClick={() => updateFinancialData(areaId, { subscriptions: data.subscriptions.filter(s => s.id !== sub.id) })}
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-2 mt-3">
                        <Input
                            placeholder="Service name (Netflix, Gym...)"
                            value={newSub.name}
                            onChange={e => setNewSub(prev => ({ ...prev, name: e.target.value }))}
                            className="text-xs h-8"
                        />
                        <Input
                            placeholder="$/mo"
                            value={newSub.monthlyAmount}
                            onChange={e => setNewSub(prev => ({ ...prev, monthlyAmount: e.target.value }))}
                            type="number"
                            className="text-xs h-8 w-20"
                        />
                        <Button size="sm" onClick={addSubscription} className="h-8">
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                    {data.subscriptions.length > 0 && (
                        <p className="text-xs text-muted-foreground pt-1">
                            {fmt(monthlySubscriptions * 12)}/year · {fmt(monthlySubscriptions * 12 * 10)} in 10 years (opportunity cost)
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
