
"use client";

import { BrainCircuit, CheckCircle2, ListTodo, Route, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { landingContent } from '@/lib/i18n/landingContent';
import { InteractiveTrigger } from '@/components/landing/InteractiveTrigger';
import { deepDives } from '@/lib/landing/deepDiveContent';

const HeroVisualCard = ({ isActive, type, content }: { isActive: boolean, type: string, content: any }) => {
    return (
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${isActive ? 'opacity-100 translate-x-0 scale-100 z-20' : 'opacity-0 translate-x-8 scale-95 pointer-events-none z-10'}`}>
            <div className="bg-white dark:bg-zinc-950 rounded-xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 h-full flex flex-col">
                <div className={`h-1.5 w-full bg-gradient-to-r ${type === 'entropy' ? 'from-red-400 to-orange-500' : type === 'process' ? 'from-blue-500 to-cyan-400' : 'from-emerald-400 to-green-500'}`}></div>
                <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 border-b border-zinc-50 dark:border-zinc-800 pb-4 mb-4">
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-full blur animate-pulse opacity-50 ${type === 'entropy' ? 'bg-red-500' : type === 'process' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 ${type === 'entropy' ? 'bg-red-50 text-red-600' : type === 'process' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                {type === 'entropy' && <BrainCircuit size={24} className="animate-pulse" />}
                                {type === 'process' && <Route size={24} className="animate-spin-slow" />}
                                {type === 'order' && <CheckCircle2 size={24} />}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                {type === 'entropy' ? content.mock.entropy : type === 'process' ? content.mock.analyzing : content.mock.complete}
                            </div>
                            <div className="flex gap-1 mt-1 h-2">
                                {(type === 'entropy' || type === 'process') && (
                                    <>
                                        <span className={`w-2 h-2 rounded-full animate-bounce delay-75 ${type === 'entropy' ? 'bg-red-400' : 'bg-blue-400'}`}></span>
                                        <span className={`w-2 h-2 rounded-full animate-bounce delay-150 ${type === 'entropy' ? 'bg-red-400' : 'bg-blue-400'}`}></span>
                                        <span className={`w-2 h-2 rounded-full animate-bounce delay-300 ${type === 'entropy' ? 'bg-red-400' : 'bg-blue-400'}`}></span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow flex items-center justify-center relative bg-zinc-50 dark:bg-zinc-900/50 rounded-lg overflow-hidden p-4">
                        {type === 'entropy' && (
                            <div className="relative w-full h-full min-h-[120px]">
                                <div className="absolute top-4 left-4 p-2 bg-white dark:bg-zinc-800 shadow-sm rounded border border-red-200 text-xs text-red-500 font-mono animate-[bounce_2s_infinite]">"Chaos"</div>
                                <div className="absolute bottom-4 right-12 p-2 bg-white dark:bg-zinc-800 shadow-sm rounded border border-red-200 text-xs text-red-500 font-mono animate-[bounce_3s_infinite]">"Entropy"</div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white dark:bg-zinc-800 shadow-sm rounded border border-red-200 text-xs text-red-500 font-mono animate-[bounce_1.5s_infinite]">"Stress"</div>
                            </div>
                        )}
                        {type === 'process' && (
                            <div className="w-full space-y-4 px-4">
                                <div className="h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 animate-[width_1.5s_ease-in-out_infinite]" style={{ width: '60%' }}></div>
                                </div>
                                <div className="h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 animate-[width_1.5s_ease-in-out_infinite_delay-100]" style={{ width: '40%' }}></div>
                                </div>
                                <div className="h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 animate-[width_1.5s_ease-in-out_infinite_delay-200]" style={{ width: '80%' }}></div>
                                </div>
                            </div>
                        )}
                        {type === 'order' && (
                            <div className="w-full flex flex-col gap-3">
                                <div className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-800 rounded shadow-sm border-l-4 border-l-emerald-500 animate-[slide-in_0.5s_forwards]">
                                    <ListTodo size={14} className="text-emerald-500" />
                                    <span className="text-xs font-mono">Daily_Habits_Optimized</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-800 rounded shadow-sm border-l-4 border-l-emerald-500 animate-[slide-in_0.5s_0.2s_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
                                    <Calendar size={14} className="text-emerald-500" />
                                    <span className="text-xs font-mono">Schedule_Aligned</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-800 rounded shadow-sm border-l-4 border-l-emerald-500 animate-[slide-in_0.5s_0.4s_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>
                                    <Route size={14} className="text-emerald-500" />
                                    <span className="text-xs font-mono">Path_Clear</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export function HeroVisualCarousel() {
    const [step, setStep] = useState(0);
    const { language } = useLanguage();
    const t = landingContent[language].hero;

    // Cycle through 3 steps: 0=Entropy, 1=Process, 2=Order
    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 3);
        }, 3500); // Change every 3.5 seconds
        return () => clearInterval(timer);
    }, []);

    // Also support hover interaction to pause or manually select? 
    // For now, auto-cycle is fine as per request.

    return (
        <InteractiveTrigger diveData={deepDives["hero-visual"]} className="w-full block">
            <div className="relative w-full h-[400px] lg:h-[450px] perspective-1000 group cursor-pointer">
                {/* Background Decor */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

                {/* Cards Container */}
                <div className="relative w-full h-full">
                    <HeroVisualCard isActive={step === 0} type="entropy" content={t} />
                    <HeroVisualCard isActive={step === 1} type="process" content={t} />
                    <HeroVisualCard isActive={step === 2} type="order" content={t} />
                </div>

                {/* Progress Indicators */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setStep(i); }}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${step === i ? 'w-8 bg-blue-500' : 'w-2 bg-zinc-300 dark:bg-zinc-700'}`}
                        ></div>
                    ))}
                </div>
            </div>
        </InteractiveTrigger>
    );
}
