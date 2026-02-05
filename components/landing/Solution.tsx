
"use client";

import { Sparkles, Target, Calendar, TrendingUp } from "lucide-react";

export function Solution() {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900 overflow-hidden relative">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white mb-4">
                        Meet Your Life Copilot.
                        <br />
                        <span className="text-indigo-600">AI that actually understands you.</span>
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300">
                        GlowApplify doesn't give you blank templates. It has a conversation with you—then
                        builds your entire Life System automatically.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Benefit 1 */}
                    <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">AI-Powered Onboarding</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Answer 4 simple questions. In 3 minutes, get a complete system: goals, habits,
                            routines, tracking—all personalized to YOU. No more blank pages.
                        </p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Goals That Actually Connect</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Every daily action ties directly to your big goals. Finally see how today's work =
                            tomorrow's success. No more random to-dos.
                        </p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Effortless Execution</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Your Execution Board tells you EXACTLY what to do today. No thinking required.
                            Just open the app. Do the work. Win.
                        </p>
                    </div>

                    {/* Benefit 4 */}
                    <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Progress You Can Actually See</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Every evening, track your wins. Every week, see how far you've come. Momentum builds.
                            No more wondering "am I making progress?"
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
