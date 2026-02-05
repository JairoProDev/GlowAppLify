
"use client";

import { BrainCircuit, CheckCircle2, ListTodo, Route, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { landingContent } from '@/lib/i18n/landingContent';
import { InteractiveTrigger } from '@/components/landing/InteractiveTrigger';
import { deepDivesEn, deepDivesEs } from '@/lib/landing/deepDiveContent';

const EntropyVisual = ({ text }: { text: any }) => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Abstract Noise Background */}
        <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-red-500/30 animate-pulse"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 10 + 2}px`,
                        height: `${Math.random() * 10 + 2}px`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${Math.random() * 3 + 1}s`
                    }}></div>
            ))}
        </div>

        {/* Floating "Stress" Nodes */}
        <div className="relative z-10 w-full max-w-[80%] h-32">
            <div className="absolute top-0 right-10 p-2 bg-white dark:bg-zinc-800 shadow-md rounded-lg border border-red-200 dark:border-red-900/50 flex items-center gap-2 animate-[float_4s_ease-in-out_infinite]">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                <div className="text-[10px] font-mono text-zinc-600 dark:text-zinc-300">{text.overthinking}</div>
            </div>
            <div className="absolute bottom-2 left-4 p-2 bg-white dark:bg-zinc-800 shadow-md rounded-lg border border-red-200 dark:border-red-900/50 flex items-center gap-2 animate-[float_5s_ease-in-out_infinite_reverse]">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                <div className="text-[10px] font-mono text-zinc-600 dark:text-zinc-300">{text.noPlan}</div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-red-50 dark:bg-red-900/20 shadow-xl rounded-xl border border-red-300 dark:border-red-500/50 flex flex-col items-center gap-1 animate-[shake_0.5s_infinite]">
                <div className="text-red-500 font-bold text-xs uppercase tracking-widest">{text.systemOverload}</div>
                <div className="text-[10px] text-red-400 font-mono">Entropy: 98%</div>
            </div>
        </div>
    </div>
);

const ProcessVisual = ({ text }: { text: any }) => (
    <div className="w-full h-full flex flex-col p-4 font-mono text-[10px]">
        <div className="flex-grow bg-zinc-900 rounded-lg p-3 text-emerald-400 overflow-hidden relative border border-zinc-800 shadow-inner">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent,rgba(16,185,129,0.1),transparent)] animate-[scan_2s_linear_infinite]"></div>
            <div className="space-y-1 opacity-80">
                <div className="flex gap-2"><span className="text-blue-400">root@ai:~$</span> <span>{text.analyzingIntent}</span></div>
                <div className="flex gap-2"><span className="text-zinc-500">{'>'}</span> <span>{text.vectorizing}</span></div>
                <div className="flex gap-2"><span className="text-zinc-500">{'>'}</span> <span>{text.constraints}</span></div>
                <div className="flex gap-2"><span className="text-yellow-400">{'>'}</span> <span>{text.optimizing}</span></div>
                <div className="flex gap-2"><span className="text-emerald-400">{'>'}</span> <span>{text.scheduleSuccess}</span></div>
            </div>
        </div>
        <div className="mt-3 flex gap-2">
            <div className="flex-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-[width_1s_ease-out_infinite]" style={{ width: '75%' }}></div>
            </div>
            <div className="text-[9px] text-zinc-400">32ms</div>
        </div>
    </div>
);

const OrderVisual = ({ text }: { text: any }) => (
    <div className="w-full h-full p-4 flex gap-4">
        {/* Left: Timeline */}
        <div className="w-12 flex flex-col items-center gap-4 text-[10px] text-zinc-400 font-mono border-r border-zinc-100 dark:border-zinc-800 pr-2">
            <div>07:00</div>
            <div>08:30</div>
            <div>09:00</div>
            <div>12:00</div>
        </div>

        {/* Right: Cards */}
        <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 p-2 bg-white dark:bg-zinc-800 rounded-lg border-l-4 border-l-blue-500 shadow-sm animate-[slide-in_0.4s_ease-out_forwards]">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-600"><CheckCircle2 size={12} /></div>
                <div>
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{text.morningProtocol}</div>
                    <div className="text-[10px] text-zinc-500">{text.highImpact}</div>
                </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-white dark:bg-zinc-800 rounded-lg border-l-4 border-l-purple-500 shadow-sm animate-[slide-in_0.4s_ease-out_0.2s_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded text-purple-600"><BrainCircuit size={12} /></div>
                <div>
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{text.deepWork}</div>
                    <div className="text-[10px] text-zinc-500">{text.goalAlignment}</div>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
                <div className="h-0.5 flex-grow bg-emerald-500/20 rounded-full">
                    <div className="h-full bg-emerald-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
                <div className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">{text.score}</div>
            </div>
        </div>
    </div>
);

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

                    <div className="flex-grow flex items-center justify-center relative bg-zinc-50 dark:bg-zinc-900/50 rounded-lg overflow-hidden p-0">
                        {type === 'entropy' && <EntropyVisual text={content.mock.visuals} />}
                        {type === 'process' && <ProcessVisual text={content.mock.visuals} />}
                        {type === 'order' && <OrderVisual text={content.mock.visuals} />}
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
    const currentDeepDives = language === 'es' ? deepDivesEs : deepDivesEn;

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
        <InteractiveTrigger diveData={currentDeepDives["hero-visual"]} className="w-full block">
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
