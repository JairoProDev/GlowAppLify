
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Lock, Users, Zap, BrainCircuit, Activity, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";
import { useRouter } from "next/navigation";

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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wide mb-6 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400">
                            <Zap className="w-3 h-3" /> {t.badge}
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-white mb-6 leading-tight">
                            <span className="block text-blue-600 dark:text-blue-400 drop-shadow-sm">{t.headline}</span>
                            <span className="block font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">{t.subheadline1}</span>
                            <span className="block text-2xl sm:text-3xl mt-2 font-medium text-zinc-600 dark:text-zinc-300">
                                {t.subheadline2}
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {t.description}
                        </p>

                        {/* Interactive Input Demo */}
                        <div className="mt-10 max-w-lg mx-auto lg:mx-0">
                            <form onSubmit={handleStart} className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative flex flex-col sm:flex-row gap-2 p-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
                                    <Input
                                        type="text"
                                        placeholder={t.inputPlaceholder}
                                        className="border-0 shadow-none focus-visible:ring-0 text-base h-12 bg-transparent"
                                        value={goal}
                                        onChange={(e) => setGoal(e.target.value)}
                                    />
                                    <Button type="submit" size="lg" className="h-12 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 shrink-0">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        {t.cta}
                                    </Button>
                                </div>
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
                        {/* Animated Abstract UI Representation */}
                        <div className="relative rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-6 border border-white/50 dark:border-zinc-800 shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-700 ease-out group select-none">
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

                            {/* Mock Interface: AI Analysis */}
                            <div className="bg-white dark:bg-zinc-950 rounded-xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 relative z-10 transition-transform duration-500 group-hover:translate-y-[-5px]">
                                <div className="h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 w-full"></div>

                                <div className="p-6 space-y-6">
                                    {/* Header: AI Processing */}
                                    <div className="flex items-center gap-4 border-b border-zinc-50 dark:border-zinc-800 pb-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-blue-500 rounded-full blur animate-pulse opacity-50"></div>
                                            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 relative z-10">
                                                <BrainCircuit size={24} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{t.mock.analyzing}</div>
                                            <div className="flex gap-1 mt-1">
                                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-75"></span>
                                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-150"></span>
                                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-300"></span>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Visual: Connection Graph */}
                                    <div className="relative h-48 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                                        {/* Chaos State (Left) */}
                                        <div className="absolute top-8 left-8 w-16 h-16">
                                            <div className="absolute top-0 left-0 w-2 h-2 bg-red-400 rounded-full animate-bounce delay-75"></div>
                                            <div className="absolute top-4 right-2 w-2 h-2 bg-red-400 rounded-full animate-bounce delay-150"></div>
                                            <div className="absolute bottom-2 left-4 w-2 h-2 bg-red-400 rounded-full animate-bounce delay-300"></div>
                                            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                                            <div className="text-[10px] text-red-500 font-mono mt-12 text-center opacity-70">ENTROPY</div>
                                        </div>

                                        {/* Processing Beam (Center) */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center animate-pulse z-10 block">
                                            <BrainCircuit size={16} className="text-blue-600" />
                                        </div>

                                        {/* Order State (Right) */}
                                        <div className="absolute top-8 right-8 w-24 h-24 flex flex-col justify-center items-end">
                                            <div className="flex flex-col gap-2 items-end">
                                                <div className="h-1.5 w-16 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                                                <div className="h-1.5 w-12 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                                                <div className="h-1.5 w-20 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                                            </div>
                                            <div className="absolute -top-2 right-0 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                            <div className="text-[10px] text-emerald-600 font-mono mt-4 opacity-70">SYNERGY</div>
                                        </div>

                                        {/* Connecting Particles */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                                            <path d="M60 60 Q160 60 260 60" stroke="url(#flow-gradient)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
                                            <defs>
                                                <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#F87171" stopOpacity="0" />
                                                    <stop offset="50%" stopColor="#3B82F6" />
                                                    <stop offset="100%" stopColor="#10B981" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        {/* Floating Metadata */}
                                        <div className="absolute bottom-2 right-2 text-[10px] text-zinc-400 font-mono bg-white/80 dark:bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-zinc-100 dark:border-zinc-800">
                                            Entropy_Reduction: 94%
                                        </div>
                                    </div>
                                </div>

                                {/* Footer: Success State */}
                                <div className="flex justify-between items-center pt-2">
                                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                                        <CheckCircle2 size={16} />
                                        {t.mock.complete}
                                    </div>
                                    <div className="text-xs text-zinc-400">
                                        127 data points processed
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
