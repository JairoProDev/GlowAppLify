
"use client";

import { useDailyStore } from "@/lib/store/useDailyStore";
import MorningView from "@/components/daily/MorningView";
import DeepWorkView from "@/components/daily/DeepWorkView";
import CelebrationView from "@/components/daily/CelebrationView";
import EveningView from "@/components/daily/EveningView";
import { useEffect, useState } from "react";

export default function DailyPage() {
    const { currentView } = useDailyStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Avoid hydration mismatch

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-zinc-950 transition-colors duration-500">
            <div className="mx-auto max-w-5xl">
                {currentView === 'morning' && <MorningView />}
                {currentView === 'deep-work' && <DeepWorkView />}
                {currentView === 'celebration' && <CelebrationView />}
                {currentView === 'evening' && <EveningView />}
            </div>

            {/* Dev Controls */}
            <div className="fixed bottom-6 right-6 z-[9999] opacity-0 hover:opacity-100 transition-opacity duration-300">
                <DevControls />
            </div>
        </div>
    );
}

function DevControls() {
    const { setView } = useDailyStore();
    return (
        <div className="flex flex-col gap-1 bg-zinc-900/90 p-4 rounded-xl text-xs font-mono text-zinc-400 shadow-2xl backdrop-blur-md border border-zinc-800">
            <div className="font-bold text-white mb-2 tracking-widest uppercase">Debug View</div>
            <button className="text-left py-1 hover:text-emerald-400 transition-colors" onClick={() => setView('morning')}>1. Morning</button>
            <button className="text-left py-1 hover:text-emerald-400 transition-colors" onClick={() => setView('deep-work')}>2. Deep Work</button>
            <button className="text-left py-1 hover:text-emerald-400 transition-colors" onClick={() => setView('celebration')}>3. Celebration</button>
            <button className="text-left py-1 hover:text-emerald-400 transition-colors" onClick={() => setView('evening')}>4. Evening</button>
        </div>
    )
}
