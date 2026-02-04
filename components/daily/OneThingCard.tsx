
"use client";

import { useDailyStore } from "@/lib/store/useDailyStore";
import { cn } from "@/lib/utils";
import { Clock, Zap, ArrowRight, Calendar } from "lucide-react";

export default function OneThingCard() {
    const { oneThing, startDeepWork } = useDailyStore();

    if (!oneThing) return null;

    return (
        <div
            className="relative overflow-hidden rounded-[2rem] p-8 text-white shadow-xl transition-all hover:scale-[1.01] hover:shadow-2xl font-sans"
            style={{
                background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', // Emerald gradient
                boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4)'
            }}
        >
            {/* Abstract Shapes for Depth */}
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl pointer-events-none mix-blend-overlay" />
            <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-emerald-900 opacity-20 blur-3xl pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Header Badge */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-50 backdrop-blur-md ring-1 ring-white/20">
                        <Zap className="h-3.5 w-3.5" />
                        <span>Priority #1</span>
                    </div>
                    <div className="text-white/60 text-sm font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Today</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mb-8">
                    <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl drop-shadow-sm">
                        {oneThing.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-emerald-50/90 font-medium text-lg">
                        <div className="flex items-center gap-2 bg-emerald-900/20 rounded-lg px-3 py-1.5 backdrop-blur-sm border border-emerald-500/20">
                            <Clock className="h-5 w-5" />
                            <span>{oneThing.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 px-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300"></span>
                            <span className="capitalize">{oneThing.type} Work</span>
                        </div>
                    </div>
                </div>

                {/* The "WHY" Block - Crucial Motivation */}
                <div className="mb-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-md border border-white/10 shadow-inner">
                    <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100 opacity-80 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-emerald-200/50"></span>
                        Why This Matters
                    </div>
                    <p className="text-xl leading-relaxed font-medium text-white drop-shadow-sm">
                        "{oneThing.why}"
                    </p>
                </div>

                {/* Action Area */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
                    <button
                        onClick={startDeepWork}
                        className="group relative flex-[2] overflow-hidden rounded-xl bg-white py-4 px-8 text-center text-lg font-bold text-emerald-600 shadow-lg shadow-black/10 transition-all hover:bg-emerald-50 hover:scale-[1.02] active:scale-95"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            Start Deep Work
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                    </button>

                    <div className="flex flex-1 gap-2">
                        <button className="flex-1 rounded-xl border border-white/30 bg-white/5 py-4 text-center font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50 active:scale-95">
                            Schedule
                        </button>
                        <button className="flex-1 rounded-xl border border-white/30 bg-white/5 py-4 text-center font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50 active:scale-95">
                            Later
                        </button>
                    </div>
                </div>

                {/* Recommendation */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-100/80 bg-black/10 py-2 rounded-full mx-auto px-4 w-fit">
                    <Zap className="h-3 w-3 text-yellow-300" />
                    <span>Recommended: {oneThing.bestTime} for peak flow state</span>
                </div>
            </div>
        </div>
    );
}
