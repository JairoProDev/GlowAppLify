
import { useState, useEffect } from "react";
import { useDailyStore } from "@/lib/store/useDailyStore";
import { ArrowRight, BrainCircuit, Sparkles, TrendingDown, Clock, Lightbulb } from "lucide-react";

interface InsightsScreenProps {
    onContinue: () => void;
}

export default function InsightsScreen({ onContinue }: InsightsScreenProps) {
    const [loading, setLoading] = useState(true);
    const { eveningData, oneThing, otherActions } = useDailyStore();

    // Mock AI Logic based on mood
    const mood = eveningData.mood;
    let insightContent;

    const incompleteCount = [oneThing, ...otherActions].filter(a => !a.completed).length;

    if (mood === 3) {
        insightContent = { // Great
            title: "GREAT DAY! 🎉",
            pattern: "You hit your flow state perfectly today.",
            reason: "Did creative work during peak hours (7-9pm) and maintained high energy.",
            suggestion: "Keep this momentum! Your schedule for tomorrow looks balanced.",
            actionLabel: "Keep Current Schedule"
        };
    } else if (mood === 2) { // OK
        insightContent = {
            title: "SOLID DAY 👍",
            pattern: "You hit your ONE Thing, which is what matters most.",
            reason: `You left ${incompleteCount} secondary tasks undone, but that's a smart tradeoff.`,
            suggestion: "Tomorrow is lighter. You'll easily catch up on the admin work.",
            actionLabel: "Keep It Rolling"
        };
    } else { // Struggled
        insightContent = {
            title: "TOUGH DAY, I SEE YOU 💙",
            pattern: "Creative work is taking 1.5x longer than estimated.",
            reason: "This is the 2nd time this week. It's not failure, it's just data.",
            suggestion: "I suggest adding a 1.5x buffer to tomorrow's tasks to reduce pressure.",
            actionLabel: "Apply Light Day Tomorrow"
        };
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center animate-in fade-in duration-700">
                <div className="relative mb-8">
                    <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20 duration-1000"></div>
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        <BrainCircuit className="h-10 w-10 animate-pulse" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Analyzing your day...</h2>
                <p className="mt-2 text-zinc-500 animate-pulse">Detecting patterns • Generating insights</p>
            </div>
        );
    }

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
        </div>
    );
}
