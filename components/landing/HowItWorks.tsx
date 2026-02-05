
"use client";

import Link from "next/link";
import { MessageSquare, Wand2, PartyPopper, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
    return (
        <section className="py-24 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                        Getting started is stupid simple.
                    </h2>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2"></div>

                    <div className="space-y-12 lg:space-y-24">

                        {/* Step 1 */}
                        <div className="relative flex flex-col items-center lg:flex-row lg:justify-between gap-8">
                            {/* Icon Marker */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 w-12 h-12 rounded-full bg-white dark:bg-zinc-950 border-4 border-indigo-100 dark:border-indigo-900 z-10 flex items-center justify-center">
                                <span className="font-black text-indigo-600">1</span>
                            </div>

                            <div className="lg:w-5/12 text-center lg:text-right">
                                <div className="inline-flex items-center justify-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl mb-4 text-indigo-600">
                                    <MessageSquare className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Tell AI About Your Life</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    In a 3-minute conversation, share your biggest goal, what's holding you back, and how you want to feel. No forms. Just talk.
                                </p>
                                <div className="mt-2 inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-zinc-500">
                                    ⏱️ Time: 3 minutes
                                </div>
                            </div>
                            <div className="lg:w-5/12"></div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex flex-col items-center lg:flex-row lg:justify-between gap-8">
                            {/* Icon Marker */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-zinc-950 border-4 border-purple-100 dark:border-purple-900 z-10 flex items-center justify-center">
                                <span className="font-black text-purple-600">2</span>
                            </div>

                            <div className="lg:w-5/12 order-last lg:order-first"></div>
                            <div className="lg:w-5/12 text-center lg:text-left">
                                <div className="inline-flex items-center justify-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl mb-4 text-purple-600">
                                    <Wand2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">AI Builds Your System</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Watch the magic happen. AI generates SMART goals, habits, routines, and a progress dashboard customized for you.
                                </p>
                                <div className="mt-2 inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-zinc-500">
                                    ⏱️ Time: 30 seconds
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex flex-col items-center lg:flex-row lg:justify-between gap-8">
                            {/* Icon Marker */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-zinc-950 border-4 border-emerald-100 dark:border-emerald-900 z-10 flex items-center justify-center">
                                <span className="font-black text-emerald-600">3</span>
                            </div>

                            <div className="lg:w-5/12 text-center lg:text-right">
                                <div className="inline-flex items-center justify-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl mb-4 text-emerald-600">
                                    <PartyPopper className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Start Living Better</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Check your plan in the morning (2 min), execute, and reflect in the evening (2 min). That's it.
                                </p>
                                <div className="mt-2 inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-zinc-500">
                                    ⏱️ Time: 2-5 minutes/day
                                </div>
                            </div>
                            <div className="lg:w-5/12"></div>
                        </div>

                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/onboarding">
                        <Button size="lg" className="h-12 px-8 rounded-full bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                            See Your Personalized System In 3 Minutes
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
