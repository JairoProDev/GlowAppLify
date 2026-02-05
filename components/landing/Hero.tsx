
"use client";

import Link from "next/link";
import { ArrowRight, Lock, Users, Zap, BrainCircuit, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";

export function Hero() {
    const { language } = useLanguage();
    const t = landingContent[language].hero;

    return (
        <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-white dark:from-blue-950 dark:via-zinc-950 dark:to-zinc-950 pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-6 text-center lg:text-left pt-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wide mb-6 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400">
                            <Zap className="w-3 h-3" /> {t.badge}
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-white mb-6">
                            <span className="block text-blue-600 dark:text-blue-400 drop-shadow-sm">{t.headline}</span>
                            <span className="block font-bold">{t.subheadline1}</span>
                            <span className="block text-2xl sm:text-3xl mt-2 font-medium text-zinc-600 dark:text-zinc-300">
                                {t.subheadline2}
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {t.description}
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/onboarding">
                                <Button size="lg" className="w-full sm:w-auto text-lg h-14 rounded-xl bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-200 dark:shadow-blue-900/20">
                                    {t.cta} <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-4 text-sm text-zinc-500 font-medium flex items-center justify-center lg:justify-start gap-2">
                            {t.microCopy.split('•').map((item, i) => (
                                <span key={i} className="flex items-center gap-2">
                                    {i > 0 && <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>}
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
                        <div className="relative rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-6 border border-white/50 dark:border-zinc-800 shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-700 ease-out group">
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-30"></div>

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
                                    <div className="relative h-40 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
                                        {/* Simulated Graph Nodes */}
                                        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)] z-10 animate-[pulse_2s_infinite]"></div>
                                        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10 animate-[pulse_3s_infinite]"></div>
                                        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] z-10 animate-[pulse_2.5s_infinite]"></div>

                                        {/* Connecting Lines (SVG) */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                            <path d="M80 80 Q160 30 240 60 T300 120" stroke="url(#line-gradient)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                                            <defs>
                                                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#FBBF24" /> {/* Amber */}
                                                    <stop offset="100%" stopColor="#3B82F6" /> {/* Blue */}
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        <div className="absolute bottom-2 right-2 text-[10px] text-zinc-400 font-mono">
                                            System_Entropy: Optimizing...
                                        </div>
                                    </div>

                                    {/* Footer: Success State */}
                                    <div className="flex justify-between items-center pt-2">
                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
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
            </div>
        </section>
    );
}
