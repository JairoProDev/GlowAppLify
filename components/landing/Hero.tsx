
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Lock, Users, Zap, BrainCircuit, Activity, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";
import { useRouter } from "next/navigation";
import { InteractiveTrigger } from "@/components/landing/InteractiveTrigger";
import { deepDives } from "@/lib/landing/deepDiveContent";
import { HeroVisualCarousel } from "@/components/landing/HeroVisualCarousel";

export function Hero() {
    const { language } = useLanguage();
    const t = landingContent[language].hero;
    const [goal, setGoal] = useState("");
    const router = useRouter();

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to onboarding with goal as query param (to be implemented in onboarding)
        const params = new URLSearchParams();
        if (goal) params.set("goal", goal);
        router.push(`/onboarding?${params.toString()}`);
    };

    return (
        <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-white dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                    <div className="lg:col-span-6 text-center lg:text-left pt-10 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wide mb-6 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400 cursor-help" title="Click to see why we are different">
                            <Zap className="w-3 h-3" /> {t.badge}
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-white mb-6 leading-tight">
                            <InteractiveTrigger diveData={deepDives["hero-headline"]}>
                                <span className="block text-blue-600 dark:text-blue-400 drop-shadow-sm hover:underline decoration-blue-400/30 underline-offset-4 decoration-2 transition-all cursor-pointer">{t.headline}</span>
                            </InteractiveTrigger>
                            <span className="block font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">{t.subheadline1}</span>
                            <InteractiveTrigger diveData={deepDives["hero-time"]}>
                                <span className="block text-2xl sm:text-3xl mt-2 font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-500 transition-colors cursor-pointer w-fit mx-auto lg:mx-0">
                                    {t.subheadline2}
                                </span>
                            </InteractiveTrigger>
                        </h1>

                        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {t.description}
                        </p>

                        {/* Interactive Input Demo */}
                        <div className="mt-10 max-w-lg mx-auto lg:mx-0">
                            <form onSubmit={handleStart} className="relative group">
                                <InteractiveTrigger diveData={deepDives["hero-input"]} className="w-full">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative flex flex-col sm:flex-row gap-2 p-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl cursor-default">
                                        <Input
                                            type="text"
                                            placeholder={t.inputPlaceholder}
                                            className="border-0 shadow-none focus-visible:ring-0 text-base h-12 bg-transparent flex-grow z-10 relative"
                                            value={goal}
                                            onChange={(e) => setGoal(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />

                                        <InteractiveTrigger diveData={deepDives["hero-cta"]} onCtaClick={() => {
                                            const params = new URLSearchParams();
                                            if (goal) params.set("goal", goal);
                                            router.push(`/onboarding?${params.toString()}`);
                                        }}>
                                            <Button type="submit" size="lg" className="h-12 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 shrink-0 z-20 relative">
                                                <Sparkles className="w-4 h-4 mr-2" />
                                                {t.cta}
                                            </Button>
                                        </InteractiveTrigger>
                                    </div>
                                </InteractiveTrigger>
                            </form>
                        </div>

                        <div className="mt-6 text-sm text-zinc-500 font-medium flex flex-wrap items-center justify-center lg:justify-start gap-3">
                            {t.microCopy.split('•').map((item, i) => (
                                <span key={i} className="flex items-center gap-2">
                                    {i > 0 && <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:block"></span>}
                                    {item.trim()}
                                </span>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-y-4 gap-x-8 justify-center lg:justify-start text-sm text-zinc-600 dark:text-zinc-400">
                            <div className="flex items-center gap-2">
                                <Lock className="w-4 h-4 text-blue-500" />
                                {t.trust.privacy}
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-500" />
                                {t.trust.users}
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-blue-500" />
                                {t.trust.science}
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-6 relative mt-16 lg:mt-0">
                        <HeroVisualCarousel />
                    </div>
                </div>
            </div >
        </section >
    );
}
