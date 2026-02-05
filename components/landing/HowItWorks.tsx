
"use client";

import Link from "next/link";
import { MessageSquare, Wand2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";

export function HowItWorks() {
    const { language } = useLanguage();
    const t = landingContent[language].howItWorks;

    return (
        <section className="py-24 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                        {t.headline}
                    </h2>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-cyan-200 to-amber-200 dark:from-blue-900 dark:via-cyan-900 dark:to-amber-900 -translate-x-1/2"></div>

                    <div className="space-y-12 lg:space-y-24">

                        {/* Step 1 */}
                        <div className="relative flex flex-col items-center lg:flex-row lg:justify-between gap-8">
                            {/* Icon Marker */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 w-12 h-12 rounded-full bg-white dark:bg-zinc-950 border-4 border-blue-100 dark:border-blue-900 z-10 flex items-center justify-center">
                                <span className="font-black text-blue-600">1</span>
                            </div>

                            <div className="lg:w-5/12 text-center lg:text-right">
                                <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl mb-4 text-blue-600">
                                    <MessageSquare className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t.steps[0].title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    {t.steps[0].desc}
                                </p>
                                <div className="mt-2 inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-zinc-500">
                                    {t.steps[0].time}
                                </div>
                            </div>
                            <div className="lg:w-5/12"></div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex flex-col items-center lg:flex-row lg:justify-between gap-8">
                            {/* Icon Marker */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-zinc-950 border-4 border-cyan-100 dark:border-cyan-900 z-10 flex items-center justify-center">
                                <span className="font-black text-cyan-600">2</span>
                            </div>

                            <div className="lg:w-5/12 order-last lg:order-first"></div>
                            <div className="lg:w-5/12 text-center lg:text-left">
                                <div className="inline-flex items-center justify-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl mb-4 text-cyan-600">
                                    <Wand2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t.steps[1].title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    {t.steps[1].desc}
                                </p>
                                <div className="mt-2 inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-zinc-500">
                                    {t.steps[1].time}
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex flex-col items-center lg:flex-row lg:justify-between gap-8">
                            {/* Icon Marker */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-zinc-950 border-4 border-amber-100 dark:border-amber-900 z-10 flex items-center justify-center">
                                <span className="font-black text-amber-600">3</span>
                            </div>

                            <div className="lg:w-5/12 text-center lg:text-right">
                                <div className="inline-flex items-center justify-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl mb-4 text-amber-600">
                                    <PartyPopper className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t.steps[2].title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    {t.steps[2].desc}
                                </p>
                                <div className="mt-2 inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-zinc-500">
                                    {t.steps[2].time}
                                </div>
                            </div>
                            <div className="lg:w-5/12"></div>
                        </div>

                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/onboarding">
                        <Button size="lg" className="h-12 px-8 rounded-full bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-lg">
                            {t.cta}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
