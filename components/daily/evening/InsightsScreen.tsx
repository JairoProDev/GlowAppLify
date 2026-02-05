
import { useState, useEffect } from "react";
import { useDailyStore } from "@/lib/store/useDailyStore";
import { ArrowRight, BrainCircuit, Sparkles, Clock, Lightbulb, AlertTriangle } from "lucide-react";

interface InsightsScreenProps {
    onContinue: () => void;
}

interface AIInsightResponse {
    title: string;
    pattern: string;
    reason: string;
    suggestion: string;
    actionLabel: string;
}

export default function InsightsScreen({ onContinue }: InsightsScreenProps) {
    const [loading, setLoading] = useState(true);
    const [insightContent, setInsightContent] = useState<AIInsightResponse | null>(null);
    const [error, setError] = useState(false);

    const { eveningData, oneThing, otherActions } = useDailyStore();

    useEffect(() => {
        let mounted = true;

        const fetchInsights = async () => {
            try {
                const allActions = [oneThing, ...otherActions];
                const completedCount = allActions.filter(a => a.completed).length;
                const totalCount = allActions.length;

                // Call our Next.js API route
                const res = await fetch('/api/ai/evening-insight', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mood: eveningData.mood,
                        completedCount,
                        totalCount,
                        reflection: eveningData.reflection
                    })
                });

                if (!res.ok) throw new Error('API Error');

                const data = await res.json();

                if (mounted) {
                    setInsightContent(data);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                if (mounted) {
                    setError(true);
                    setLoading(false);
                    // Fallback content to ensure flow doesn't break
                    setInsightContent({
                        title: "Day Complete",
                        pattern: "You're consistently showing up.",
                        reason: "Data analysis unavailable, but your effort is recorded.",
                        suggestion: "Take some rest and prepare for tomorrow.",
                        actionLabel: "Continue"
                    });
                }
            }
        };

        // Minimum loading time for UX (animation)
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));

        Promise.all([fetchInsights(), minLoadTime]).then(() => {
            // Both finished
        });

        return () => { mounted = false; };
    }, [eveningData.mood, eveningData.reflection, oneThing, otherActions]);

    if (loading) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center animate-in fade-in duration-700">
                <div className="relative mb-8">
                    <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20 duration-1000"></div>
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        <BrainCircuit className="h-10 w-10 animate-pulse" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Connecting to AI Neural Net...</h2>
                <p className="mt-2 text-zinc-500 animate-pulse">Analyzing mood • Processing reflection • Generating strategy</p>
            </div>
        );
    }

    if (!insightContent) return null;

    return (
        <div className="mx-auto w-full max-w-2xl animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className="mb-6 flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-bold uppercase tracking-widest text-indigo-500">Your AI Insights</span>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-indigo-500/10 ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-800">
                <div className="bg-indigo-50/50 p-8 text-center dark:bg-indigo-900/10 border-b border-indigo-100 dark:border-indigo-900/50">
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">{insightContent.title}</h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300">{insightContent.pattern}</p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Analysis */}
                    <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                            <Clock className="h-6 w-6 text-zinc-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-zinc-900 dark:text-white">Why it happened</h3>
                            <p className="text-zinc-500 dark:text-zinc-400">{insightContent.reason}</p>
                        </div>
                    </div>

                    {/* Suggestion */}
                    <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-800/30">
                        <div className="flex gap-4">
                            <div className="mt-1 flex-shrink-0">
                                <Lightbulb className="h-6 w-6 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-amber-900 dark:text-amber-100">Actionable Suggestion</h3>
                                <p className="text-amber-800/80 dark:text-amber-200/70">{insightContent.suggestion}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-50 px-8 py-6 dark:bg-zinc-800/50 flex justify-center">
                    <button
                        onClick={onContinue}
                        className="group flex items-center gap-2 rounded-xl bg-zinc-900 px-8 py-3 font-bold text-white shadow-lg shadow-zinc-900/20 transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-zinc-900"
                    >
                        {insightContent.actionLabel}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            {error && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-yellow-600 dark:text-yellow-500">
                    <AlertTriangle size={16} />
                    <span>AI Service unavailable (Using offline mode)</span>
                </div>
            )}
        </div>
    );
}
