
"use client";

import { useDailyStore } from "@/lib/store/useDailyStore";
import OneThingCard from "./OneThingCard";
import OtherActions from "./OtherActions";
import { format } from "date-fns";
import { Sun } from "lucide-react";

export default function MorningView() {
    const { user } = useDailyStore();
    const today = new Date();

    return (
        <div className="px-4 py-12 animate-in fade-in zoom-in-95 duration-700">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-100/50 px-4 py-1.5 text-sm font-bold text-orange-600 ring-1 ring-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:ring-orange-900/30">
                        <Sun className="h-4 w-4" />
                        <span>{format(today, "EEEE, MMMM d")}</span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white md:text-6xl">
                        Good morning,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
                            {user.name}.
                        </span>
                    </h1>
                </div>

                <div className="flex flex-col items-end">
                    <div className="text-right">
                        <div className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-1">Current Streak</div>
                        <div className="text-3xl font-black text-orange-500 flex items-center gap-2 justify-end">
                            {user.streak} Days
                            <span className="text-2xl">🔥</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="space-y-10">
                <OneThingCard />
                <OtherActions />
            </main>

            {/* Footer Stats */}
            <footer className="mt-20 border-t border-dashed border-zinc-200 pt-10 dark:border-zinc-800">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="w-full sm:w-64">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                            <span>Weekly Goal</span>
                            <span>{user.weeklyProgress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${user.weeklyProgress}%` }} />
                        </div>
                    </div>

                    <div className="flex gap-8 text-sm font-medium text-zinc-400">
                        <span>{3} Tasks Done</span>
                        <span>{12}h Focus Time</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
