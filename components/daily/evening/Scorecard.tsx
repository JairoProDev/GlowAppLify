
import { useDailyStore } from "@/lib/store/useDailyStore";
import { CheckCircle2, Circle, Trophy, ArrowRight, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScorecardProps {
    onContinue: () => void;
}

export default function Scorecard({ onContinue }: ScorecardProps) {
    const { oneThing, otherActions, user } = useDailyStore();

    const allActions = [oneThing, ...otherActions];
    const completedActions = allActions.filter(a => a.completed);
    const incompleteActions = allActions.filter(a => !a.completed);

    const completionRate = Math.round((completedActions.length / allActions.length) * 100);

    return (
        <div className="w-full max-w-2xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-500">

            {/* Header */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Today's Scorecard</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Review what you accomplished</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-zinc-200/50 ring-1 ring-zinc-100 dark:bg-zinc-900 dark:shadow-zinc-950/50 dark:ring-zinc-800">

                {/* Completed Section */}
                {completedActions.length > 0 && (
                    <div className="mb-8">
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-5 w-5" /> Completed
                        </h3>
                        <div className="space-y-3">
                            {completedActions.map(action => (
                                <div key={action.id} className="flex items-start gap-4 rounded-xl bg-emerald-50/50 p-4 border-l-4 border-emerald-500 dark:bg-emerald-900/10 dark:border-emerald-600">
                                    <div className="mt-1">
                                        {action.priority === 'one-thing' ? (
                                            <Trophy className="h-5 w-5 text-amber-500 fill-amber-100 dark:fill-amber-900/40" />
                                        ) : (
                                            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-zinc-900 dark:text-white text-lg leading-tight">
                                            {action.title}
                                        </h4>
                                        {action.priority === 'one-thing' && (
                                            <span className="mt-2 inline-block rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-400 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                                                Your ONE Thing - Crushed it! ⭐
                                            </span>
                                        )}
                                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{action.duration}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Incomplete Section */}
                {incompleteActions.length > 0 && (
                    <div className="mb-8">
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500">
                            <Circle className="h-5 w-5" /> Didn't Finish
                        </h3>
                        <div className="space-y-3">
                            {incompleteActions.map(action => (
                                <div key={action.id} className="flex items-start gap-4 rounded-xl bg-amber-50/50 p-4 border-l-4 border-amber-400 dark:bg-amber-900/10 dark:border-amber-600/50">
                                    <div className="mt-1">
                                        <Circle className="h-5 w-5 text-amber-400 dark:text-amber-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-zinc-900 dark:text-white text-lg leading-tight">
                                            {action.title}
                                        </h4>
                                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                            No worries - we'll handle this in a moment.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats Summary */}
                <div className="mt-6 flex divide-x divide-zinc-100 rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-800/30 dark:divide-zinc-700">
                    <div className="flex-1 text-center px-4">
                        <div className="mb-1 text-2xl font-bold text-zinc-900 dark:text-white">{completedActions.length}/{allActions.length}</div>
                        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">Actions Done</div>
                    </div>
                    <div className="flex-1 text-center px-4">
                        <div className="mb-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">{user.weeklyProgress}%</div>
                        <div className="flex items-center justify-center gap-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                            <TrendingUp className="h-3 w-3" /> Week
                        </div>
                    </div>
                    <div className="flex-1 text-center px-4">
                        <div className="mb-1 text-2xl font-bold text-orange-500">{user.streak}</div>
                        <div className="flex items-center justify-center gap-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                            <Calendar className="h-3 w-3" /> Streak
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={onContinue}
                    className="group flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-zinc-900 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                    Continue
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
}
