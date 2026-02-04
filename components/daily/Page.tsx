
"use client";

import { useDailyStore } from "@/stores/useDailyStore";
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
            {currentView === 'morning' && <MorningView />}
            {currentView === 'deep-work' && <DeepWorkView />}
            {currentView === 'celebration' && <CelebrationView />}
            {currentView === 'evening' && <EveningView />}

            {/* Dev Controls - remove in prod */}
            <div className="fixed bottom-4 right-4 z-[9999] opacity-0 hover:opacity-100 transition-opacity">
                <DevControls />
            </div>
        </div>
    );
}

function DevControls() {
    const { setView } = useDailyStore();
    return (
        <div className="flex flex-col gap-2 bg-black/80 p-2 rounded text-xs text-white">
            <button onClick={() => setView('morning')}>Morning</button>
            <button onClick={() => setView('deep-work')}>Deep Work</button>
            <button onClick={() => setView('celebration')}>Celebration</button>
            <button onClick={() => setView('evening')}>Evening</button>
        </div>
    )
}
