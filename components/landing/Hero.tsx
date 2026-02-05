
"use client";

import Link from "next/link";
import { ArrowRight, Lock, Users, Zap, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#EEF2FF_0%,#FEF3C7_50%,#D1FAE5_100%)] pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pb-40 dark:bg-[linear-gradient(135deg,#1e1b4b_0%,#312e81_100%)]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-6 text-center lg:text-left pt-10">
                        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-white mb-6">
                            <span className="block text-indigo-600 dark:text-indigo-400">Your Life Copilot.</span>
                            <span className="block font-bold">AI that builds your entire personal growth system.</span>
                            <span className="block text-2xl sm:text-3xl mt-2 font-medium text-zinc-600 dark:text-zinc-300">
                                In 3 minutes.
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0">
                            No templates. No setup. No BS. Just describe your goals, and watch AI create
                            your personalized roadmap to success.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/onboarding">
                                <Button size="lg" className="w-full sm:w-auto text-lg h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-200 dark:shadow-indigo-900/20">
                                    Start Your Free Transformation <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-4 text-sm text-zinc-500 font-medium flex items-center justify-center lg:justify-start gap-2">
                            <span>Free forever</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                            <span>No credit card</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                            <span>3-minute setup</span>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-y-4 gap-x-8 justify-center lg:justify-start text-sm text-zinc-600 dark:text-zinc-400">
                            <div className="flex items-center gap-2">
                                <Lock className="w-4 h-4 text-indigo-500" />
                                Your data stays private
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-indigo-500" />
                                47,329+ transforming
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-indigo-500" />
                                Behavioral science backed
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-6 relative mt-16 lg:mt-0">
                        {/* Abstract UI Representation */}
                        <div className="relative rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-xl p-4 border border-white/50 shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-700 ease-out">
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-400 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-40"></div>

                            {/* Mock Card */}
                            <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800">
                                <div className="h-2 bg-indigo-500 w-full"></div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                                            <BrainCircuit size={20} />
                                        </div>
                                        <div>
                                            <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                                            <div className="h-3 w-20 bg-zinc-50 dark:bg-zinc-800/50 rounded mt-1"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-zinc-50 hover:border-indigo-100 dark:border-zinc-800 dark:hover:border-indigo-900/50 bg-zinc-50/50 dark:bg-zinc-800/30 transition-colors">
                                                <div className="w-5 h-5 rounded border-2 border-zinc-200 dark:border-zinc-700"></div>
                                                <div className="flex-1 h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Analysis complete</div>
                                        <div className="h-2 w-24 bg-indigo-100 rounded-full overflow-hidden">
                                            <div className="h-full w-2/3 bg-indigo-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
