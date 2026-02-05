
"use client";

import Link from "next/link";
import { MessageSquare, Wand2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";
import { InteractiveTrigger } from "@/components/landing/InteractiveTrigger";
import { deepDivesEn, deepDivesEs } from "@/lib/landing/deepDiveContent";

export function HowItWorks() {
    const { language } = useLanguage();
    const t = landingContent[language].howItWorks;
    const currentDeepDives = language === 'es' ? deepDivesEs : deepDivesEn;

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
                                <InteractiveTrigger diveData={currentDeepDives["how-step1"]} className="w-full">
                                    <div className="inline-block p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6 w-full max-w-sm mx-auto group hover:border-blue-200 transition-colors cursor-help">
                                        <div className="flex items-center gap-2 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                            <div className="text-[10px] text-zinc-400 ml-auto font-mono">Input_Stream</div>
                                        </div>
                                        <div className="space-y-2 text-left">
                                            <div className="h-2 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-[pulse_2s_infinite]"></div>
                                            <div className="h-2 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded animate-[pulse_2s_infinite_100ms]"></div>
                                            <div className="h-4 w-1 bg-blue-600 animate-[blink_1s_infinite] ml-1 inline-block align-middle"></div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t.steps[0].title}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        {t.steps[0].desc}
                                    </p>
                                    <div className="mt-2 inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-zinc-500">
                                        {t.steps[0].time}
                                    </div>
                                </InteractiveTrigger>
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
                                <InteractiveTrigger diveData={currentDeepDives["how-step2"]} className="w-full">
                                    <div className="inline-block p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6 w-full max-w-sm mx-auto overflow-hidden relative group hover:border-cyan-200 transition-colors cursor-help">
                                        <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 animate-[pulse_3s_infinite]"></div>
                                        <div className="flex justify-center items-end gap-1 h-20 mb-2">
                                            <div className="w-4 bg-cyan-400 rounded-t-sm h-[20%] animate-[grow-up_2s_infinite]"></div>
                                            <div className="w-4 bg-blue-500 rounded-t-sm h-[40%] animate-[grow-up_2s_infinite_200ms]"></div>
                                            <div className="w-4 bg-indigo-500 rounded-t-sm h-[60%] animate-[grow-up_2s_infinite_400ms]"></div>
                                            <div className="w-4 bg-purple-500 rounded-t-sm h-[80%] animate-[grow-up_2s_infinite_600ms]"></div>
                                        </div>
                                        <div className="text-center text-xs font-mono text-cyan-600 dark:text-cyan-400">
                                            Constructing_System...
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t.steps[1].title}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        {t.steps[1].desc}
                                    </p>
                                    <div className="mt-2 inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-zinc-500">
                                        {t.steps[1].time}
                                    </div>
                                </InteractiveTrigger>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex flex-col items-center lg:flex-row lg:justify-between gap-8">
                            {/* Icon Marker */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-zinc-950 border-4 border-amber-100 dark:border-amber-900 z-10 flex items-center justify-center">
                                <span className="font-black text-amber-600">3</span>
                            </div>

                            <div className="lg:w-5/12 text-center lg:text-right">
                                <InteractiveTrigger diveData={currentDeepDives["how-step3"]} className="w-full">
                                    <div className="inline-block p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6 w-full max-w-sm mx-auto group hover:border-amber-200 transition-colors cursor-help">
                                        <div className="relative h-20 w-full flex items-center justify-center">
                                            <div className="absolute w-16 h-16 rounded-full border-4 border-zinc-200 dark:border-zinc-700"></div>
                                            <div className="absolute w-16 h-16 rounded-full border-4 border-amber-500 border-t-transparent border-l-transparent -rotate-45 animate-[spin_3s_linear_infinite]"></div>
                                            <div className="text-2xl font-black text-zinc-900 dark:text-white">
                                                1%
                                            </div>
                                            <div className="absolute -top-1 -right-1 text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold shadow-sm animate-bounce">
                                                +Better
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t.steps[2].title}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        {t.steps[2].desc}
                                    </p>
                                    <div className="mt-2 inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-zinc-500">
                                        {t.steps[2].time}
                                    </div>
                                </InteractiveTrigger>
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
