
import React, { useEffect, useState } from 'react';
import { Trophy, Star, ArrowRight, Share2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MilestoneCelebrationProps {
    weekNumber: number;
    milestoneTitle: string;
    onClose: () => void;
}

export const MilestoneCelebration: React.FC<MilestoneCelebrationProps> = ({ weekNumber, milestoneTitle, onClose }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Animation sequence
        const timers = [
            setTimeout(() => setStep(1), 500), // Title
            setTimeout(() => setStep(2), 1500), // List
            setTimeout(() => setStep(3), 3000), // Impact
            setTimeout(() => setStep(4), 4500), // Footer
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
            <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">

                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-purple-500/10 pointer-events-none" />

                <div className="relative p-8 text-center">

                    {/* Trophy Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 animate-pulse"></div>
                            <Trophy className="text-yellow-500 relative z-10 animate-bounce" size={64} />
                        </div>
                    </div>

                    {/* Title */}
                    <div className={cn("transition-all duration-700", step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                            WEEK {weekNumber} COMPLETE!
                        </h2>
                        <p className="text-lg text-yellow-600 dark:text-yellow-400 font-bold mb-8">
                            {milestoneTitle}
                        </p>
                    </div>

                    {/* Accomplishments List */}
                    <div className={cn("text-left space-y-3 mb-8 transition-all duration-700 delay-100", step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">What You Accomplished</h3>
                        {[
                            "Interviewed 10 users",
                            "Identified core problem",
                            "Validated 3 solution concepts",
                            "Defined MVP scope"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800/50 p-3 rounded-xl">
                                <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                                <span className="font-medium text-gray-700 dark:text-gray-200">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Impact Stats */}
                    <div className={cn("grid grid-cols-2 gap-4 mb-8 transition-all duration-700 delay-200", step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">
                            <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase mb-1">Progress</div>
                            <div className="text-xl font-black text-blue-900 dark:text-white">0% → 8%</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl">
                            <div className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase mb-1">Momentum</div>
                            <div className="text-xl font-black text-purple-900 dark:text-white">Strong 🔥</div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className={cn("flex flex-col gap-3 transition-all duration-700 delay-300", step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            Continue to Week {weekNumber + 1} <ArrowRight size={20} />
                        </button>
                        <button className="w-full py-3 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                            <Share2 size={18} /> Share This Win
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
