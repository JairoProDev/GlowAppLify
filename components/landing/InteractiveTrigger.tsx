
"use client";

import React, { ReactNode } from 'react';
import { useModalStore, DeepDiveData } from '@/lib/stores/modalStore';
import { Sparkles } from 'lucide-react';

interface InteractiveTriggerProps {
    diveData: DeepDiveData;
    children: ReactNode;
    className?: string;
    asChild?: boolean;
    onCtaClick?: () => void;
}

export function InteractiveTrigger({ diveData, children, className = "", onCtaClick }: InteractiveTriggerProps) {
    const { openModal } = useModalStore();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent bubbling if nested
        e.preventDefault();

        // Merge static data with dynamic click handler if provided
        const contentToOpen = onCtaClick
            ? { ...diveData, ctaAction: onCtaClick }
            : diveData;

        openModal(contentToOpen);
    };

    return (
        <div
            className={`relative group cursor-pointer inline-block ${className}`}
            onClick={handleClick}
        >
            {/* Hover Effect: Scientific "Scan" Overlay */}
            <div className="absolute -inset-1 rounded-lg border border-blue-400/0 group-hover:border-blue-400/50 transition-all duration-300 pointer-events-none z-20">
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Label */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 font-mono flex items-center gap-1 shadow-lg whitespace-nowrap">
                    <Sparkles size={10} />
                    <span>DEEP DIVE AVAIL.</span>
                </div>
            </div>

            {children}
        </div>
    );
}
