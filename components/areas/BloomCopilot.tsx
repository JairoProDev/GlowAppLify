'use client';

/**
 * Bloom AI Copilot Panel — GlowApplify
 * The inline AI assistant for each life area.
 * Like Cursor's AI sidebar but for your life.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Sparkles, Send, RefreshCw, ChevronDown, ChevronUp,
    Lightbulb, AlertTriangle, Star, Zap, Link2, X
} from 'lucide-react';
import { useAreaModulesStore, AreaInsight, InsightType } from '@/lib/store/area-modules-store';
import { AREA_LABELS, AreaType } from '@/lib/types/life-areas';

interface BloomCopilotProps {
    areaId: string;
    areaType: AreaType;
    compact?: boolean; // For sidebar mode vs expanded mode
}

const insightIcons: Record<InsightType, React.ReactNode> = {
    insight: <Lightbulb className="h-4 w-4 text-blue-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-orange-500" />,
    celebration: <Star className="h-4 w-4 text-yellow-500" />,
    suggestion: <Zap className="h-4 w-4 text-purple-500" />,
    synergy: <Link2 className="h-4 w-4 text-green-500" />,
};

const insightBg: Record<InsightType, string> = {
    insight: 'border-blue-200/50 bg-blue-50/30 dark:border-blue-800/50 dark:bg-blue-900/10',
    warning: 'border-orange-200/50 bg-orange-50/30 dark:border-orange-800/50 dark:bg-orange-900/10',
    celebration: 'border-yellow-200/50 bg-yellow-50/30 dark:border-yellow-800/50 dark:bg-yellow-900/10',
    suggestion: 'border-purple-200/50 bg-purple-50/30 dark:border-purple-800/50 dark:bg-purple-900/10',
    synergy: 'border-green-200/50 bg-green-50/30 dark:border-green-800/50 dark:bg-green-900/10',
};

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    type?: InsightType;
    timestamp: Date;
}

export function BloomCopilot({ areaId, areaType, compact = false }: BloomCopilotProps) {
    const {
        getActiveOKRForArea,
        getCurrentWeekActions,
        getHabitsForArea,
        calculateHealthScore,
        getActiveInsightsForArea,
        addInsight,
        dismissInsight,
    } = useAreaModulesStore();

    const areaName = AREA_LABELS[areaType] || areaType;
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
    const [isExpanded, setIsExpanded] = useState(!compact);
    const [chatMode, setChatMode] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const activeInsights = getActiveInsightsForArea(areaId);
    const latestInsight = activeInsights[0];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const buildContext = () => {
        const okr = getActiveOKRForArea(areaId);
        const actions = getCurrentWeekActions(areaId);
        const habits = getHabitsForArea(areaId);
        const healthScore = calculateHealthScore(areaId);

        return {
            areaType,
            areaName,
            objective: okr?.objective,
            keyResults: okr?.keyResults,
            weeklyActions: actions,
            habits: habits.map(h => ({ title: h.title, streak: h.streak })),
            healthScore,
        };
    };

    const generateInsight = async () => {
        setIsGeneratingInsight(true);
        try {
            const context = buildContext();
            const response = await fetch('/api/areas/insight', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...context, mode: 'insight' }),
            });

            if (response.ok) {
                const data = await response.json();
                addInsight({
                    areaId,
                    content: data.insight,
                    type: data.type || 'insight',
                });
            }
        } catch (error) {
            console.error('Insight generation error:', error);
        } finally {
            setIsGeneratingInsight(false);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const context = buildContext();
            const response = await fetch('/api/areas/insight', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...context,
                    mode: 'chat',
                    userMessage: input,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const assistantMessage: ChatMessage = {
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    content: data.insight,
                    type: data.type,
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, assistantMessage]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: 'Connection issue. Try again.',
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const generateWeeklyPlan = async () => {
        setIsLoading(true);
        const context = buildContext();
        try {
            const response = await fetch('/api/areas/insight', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...context, mode: 'plan' }),
            });

            if (response.ok) {
                const data = await response.json();
                // Add as insight + show in chat
                if (data.insight) {
                    addInsight({ areaId, content: data.insight, type: 'suggestion' });
                }
                if (data.actions?.length > 0) {
                    const actionsList = data.actions
                        .map((a: any, i: number) => `${i + 1}. **${a.title}** (~${a.estimatedMinutes}min) — ${a.description}`)
                        .join('\n');
                    setMessages(prev => [...prev, {
                        id: crypto.randomUUID(),
                        role: 'assistant',
                        content: `**Bloom's Weekly Plan for ${areaName}:**\n\n${actionsList}`,
                        type: 'suggestion',
                        timestamp: new Date(),
                    }]);
                    setChatMode(true);
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (compact && !isExpanded) {
        return (
            <div
                className="flex items-center gap-2 p-3 rounded-xl border cursor-pointer hover:bg-muted/20 transition-colors"
                onClick={() => setIsExpanded(true)}
            >
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-3 w-3 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    {latestInsight ? (
                        <p className="text-sm line-clamp-1 text-muted-foreground">{latestInsight.content}</p>
                    ) : (
                        <p className="text-sm text-muted-foreground">Ask Bloom about your {areaName}</p>
                    )}
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-zinc-950 dark:bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div>
                        <span className="text-sm font-semibold text-white">Bloom</span>
                        <span className="text-xs text-zinc-500 ml-1">· {areaName} Copilot</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800"
                        onClick={generateInsight}
                        disabled={isGeneratingInsight}
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${isGeneratingInsight ? 'animate-spin' : ''}`} />
                    </Button>
                    {compact && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            onClick={() => setIsExpanded(false)}
                        >
                            <ChevronUp className="h-3.5 w-3.5" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Active Insights */}
            {activeInsights.length > 0 && !chatMode && (
                <div className="p-3 space-y-2 border-b border-zinc-800">
                    {activeInsights.slice(0, 2).map(insight => (
                        <div key={insight.id} className={`relative p-3 rounded-xl border ${insightBg[insight.type]}`}>
                            <div className="flex items-start gap-2">
                                {insightIcons[insight.type]}
                                <p className="text-sm text-zinc-200 leading-relaxed flex-1">{insight.content}</p>
                                <button
                                    onClick={() => dismissInsight(insight.id)}
                                    className="text-zinc-600 hover:text-zinc-400 flex-shrink-0 mt-0.5"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No insight yet */}
            {activeInsights.length === 0 && !chatMode && (
                <div className="p-4 text-center border-b border-zinc-800">
                    <div className="opacity-50 mb-2">
                        <Sparkles className="h-6 w-6 mx-auto text-violet-400" />
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Bloom is ready to analyze your {areaName} area</p>
                    <div className="flex gap-2 justify-center flex-wrap">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={generateInsight}
                            disabled={isGeneratingInsight}
                            className="text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                        >
                            {isGeneratingInsight ? (
                                <><RefreshCw className="h-3 w-3 mr-1 animate-spin" />Analyzing...</>
                            ) : (
                                <><Lightbulb className="h-3 w-3 mr-1" />Get Insight</>
                            )}
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={generateWeeklyPlan}
                            disabled={isLoading}
                            className="text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                        >
                            <Zap className="h-3 w-3 mr-1" />Generate Plan
                        </Button>
                    </div>
                </div>
            )}

            {/* Chat Messages */}
            {(chatMode || messages.length > 0) && (
                <div className="flex-1 overflow-hidden" style={{ maxHeight: '300px' }}>
                    <ScrollArea className="h-full">
                        <div className="p-3 space-y-3">
                            {messages.map(message => (
                                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {message.role === 'assistant' && (
                                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                                            <Sparkles className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                                            message.role === 'user'
                                                ? 'bg-violet-600 text-white rounded-br-sm'
                                                : 'bg-zinc-800 text-zinc-100 rounded-bl-sm'
                                        }`}
                                    >
                                        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mr-2">
                                        <Sparkles className="h-3 w-3 text-white" />
                                    </div>
                                    <div className="bg-zinc-800 rounded-2xl px-3 py-2">
                                        <div className="flex gap-1 items-center">
                                            {[0, 1, 2].map(i => (
                                                <div
                                                    key={i}
                                                    className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                                                    style={{ animationDelay: `${i * 0.15}s` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>
                </div>
            )}

            {/* Quick Actions (when no chat) */}
            {!chatMode && messages.length === 0 && activeInsights.length > 0 && (
                <div className="flex gap-2 px-3 py-2 border-b border-zinc-800 overflow-x-auto">
                    {[
                        { label: '📊 Analyze progress', prompt: 'Analyze my progress in this area' },
                        { label: '🎯 Next action', prompt: "What's the single most important action I should take this week?" },
                        { label: '⚡ Plan week', action: generateWeeklyPlan },
                    ].map(item => (
                        <Button
                            key={item.label}
                            variant="ghost"
                            size="sm"
                            className="text-xs whitespace-nowrap text-zinc-400 hover:text-white hover:bg-zinc-800 flex-shrink-0"
                            onClick={() => {
                                if (item.action) {
                                    item.action();
                                } else if (item.prompt) {
                                    setInput(item.prompt);
                                    setChatMode(true);
                                }
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 p-3">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (!chatMode) setChatMode(true);
                            sendMessage();
                        }
                    }}
                    placeholder={`Ask Bloom about your ${areaName}...`}
                    className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm"
                    onClick={() => setChatMode(true)}
                />
                <Button
                    size="icon"
                    onClick={() => { setChatMode(true); sendMessage(); }}
                    disabled={isLoading || !input.trim()}
                    className="bg-violet-600 hover:bg-violet-700 flex-shrink-0"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
