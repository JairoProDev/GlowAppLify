
"use client";

import { FileX, History, AlertTriangle, TrendingDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";
import { InteractiveTrigger } from "@/components/landing/InteractiveTrigger";
import { deepDivesEn, deepDivesEs } from "@/lib/landing/deepDiveContent";

// Map icons to keys since we can't store components in JSON
const iconMap = [FileX, History, AlertTriangle, TrendingDown];

export function Problem() {
    const { language } = useLanguage();
    const t = landingContent[language].problem;
    const currentDeepDives = language === 'es' ? deepDivesEs : deepDivesEn;

    return (
        <section className="bg-white py-24 sm:py-32 dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                        {t.headline}
                        <br />
                        <span className="text-zinc-500">{t.subheadline}</span>
                    </h2>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                        {t.cards.map((card, idx) => {
                            const Icon = iconMap[idx];
                            const deepDiveIds = ["problem-generic", "problem-habits", "problem-reactive", "problem-stagnation"];
                            const content = (
                                <div className="group flex flex-col items-start bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 hover:bg-white dark:hover:bg-zinc-900 border border-transparent hover:border-red-100 dark:hover:border-red-900/30 h-full text-left">
                                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 ring-1 ring-red-100 dark:ring-red-900/30 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                                    </div>
                                    <dt className="mt-4 font-semibold text-lg text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                        {card.title}
                                    </dt>
                                    <dd className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">
                                        {card.desc}
                                    </dd>
                                </div>
                            );

                            return (
                                <InteractiveTrigger key={idx} diveData={currentDeepDives[deepDiveIds[idx]]} className="h-full">
                                    {content}
                                </InteractiveTrigger>
                            );
                        })}
                    </dl>
                </div>

                <div className="mt-20 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
                    <p className="text-xl font-medium text-blue-600 dark:text-blue-400 relative z-10">
                        {t.kicker}
                    </p>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-300 relative z-10">
                        {t.kickerDesc}
                    </p>
                </div>
            </div>
        </section>
    );
}
