
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
    onSelect: (mood: number) => void;
}

export default function MoodSelector({ onSelect }: MoodSelectorProps) {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);

    const moods = [
        { value: 3, emoji: "😊", label: "Great" },
        { value: 2, emoji: "😐", label: "OK" },
        { value: 1, emoji: "😕", label: "Struggled" },
    ];

    const handleSelect = (value: number) => {
        setSelectedMood(value);
        // Auto-advance after animation
        setTimeout(() => {
            onSelect(value);
        }, 600);
    };

    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center animate-in fade-in duration-500">
            <h2 className="mb-12 text-3xl font-bold text-zinc-900 dark:text-white">How did today feel overall?</h2>

            <div className="flex w-full max-w-3xl flex-col gap-6 sm:flex-row sm:justify-center">
                {moods.map((m) => {
                    const isSelected = selectedMood === m.value;
                    const isOtherSelected = selectedMood !== null && !isSelected;

                    return (
                        <button
                            key={m.value}
                            onClick={() => handleSelect(m.value)}
                            className={cn(
                                "group relative flex flex-1 flex-col items-center justify-center rounded-3xl border-2 border-transparent bg-white p-8 transition-all duration-500 hover:scale-105 hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800",
                                isSelected && "scale-110 border-indigo-500 bg-indigo-50 shadow-2xl dark:bg-indigo-900/20",
                                isOtherSelected && "scale-90 opacity-40 blur-sm"
                            )}
                        >
                            <span
                                className={cn(
                                    "text-7xl transition-transform duration-500 mb-4 block",
                                    isSelected ? "scale-125 rotate-6" : "group-hover:scale-110"
                                )}
                                role="img"
                                aria-label={m.label}
                            >
                                {m.emoji}
                            </span>
                            <span className={cn(
                                "text-xl font-medium text-zinc-500 transition-colors dark:text-zinc-400",
                                isSelected && "font-bold text-indigo-600 dark:text-indigo-400"
                            )}>
                                {m.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
