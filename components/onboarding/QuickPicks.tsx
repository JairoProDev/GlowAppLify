
import React from 'react';
import { cn } from '@/lib/utils';

interface QuickPicksProps {
    options: string[];
    onSelect: (option: string) => void;
    className?: string;
}

export const QuickPicks: React.FC<QuickPicksProps> = ({ options, onSelect, className }) => {
    return (
        <div className={cn("flex flex-wrap gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-backwards", className)}>
            {options.map((option, index) => (
                <button
                    key={option}
                    onClick={() => onSelect(option)}
                    type="button"
                    className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};
