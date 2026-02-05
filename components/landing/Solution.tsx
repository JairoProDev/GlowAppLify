
"use client";

import { Sparkles, Target, Calendar, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";
import { InteractiveTrigger } from "@/components/landing/InteractiveTrigger";
import { deepDivesEn, deepDivesEs } from "@/lib/landing/deepDiveContent";

export function Solution() {
    const { language } = useLanguage();
    const t = landingContent[language].solution;
    const currentDeepDives = language === 'es' ? deepDivesEs : deepDivesEn;

    const icons = [Sparkles, Target, Calendar, TrendingUp];
    const colors = [
        { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-600" },
        { bg: "bg-cyan-100 dark:bg-cyan-900/40", text: "text-cyan-600" },
        { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-600" },
        { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-600" }
    ];

    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900 overflow-hidden relative">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white mb-4">
                        {t.headline}
                        <br />
                        <span className="text-blue-600 dark:text-blue-400">{t.subheadline}</span>
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300">
                        {t.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {t.benefits.map((benefit, i) => {
                        const Icon = icons[i];
                        const color = colors[i];
                        const deepDiveIds = ["solution-onboarding", "solution-goals", "solution-execution", "solution-progress"];

                        const content = (
                            <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 h-full text-left">
                                <div className={`w-12 h-12 ${color.bg} rounded-xl flex items-center justify-center ${color.text} mb-6`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{benefit.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    {benefit.desc}
                                </p>
                            </div>
                        );

                        return (
                            <InteractiveTrigger key={i} diveData={currentDeepDives[deepDiveIds[i]]} className="h-full">
                                {content}
                            </InteractiveTrigger>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
