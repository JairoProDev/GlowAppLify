
"use client";

import { useModalStore } from '@/lib/stores/modalStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BrainCircuit, X, Atom, Microscope, ArrowRight, Activity } from 'lucide-react';

export function DeepDiveModal() {
    const { isOpen, content, closeModal } = useModalStore();

    if (!content) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="max-w-4xl bg-zinc-950 border-zinc-800 p-0 overflow-hidden text-white shadow-2xl shadow-blue-900/20">

                {/* Header Decorator */}
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-amber-500"></div>

                <div className="grid lg:grid-cols-5 h-[80vh] lg:h-[600px]">
                    {/* Left Col: Scientific Context (3/5) */}
                    <div className="lg:col-span-3 p-8 flex flex-col overflow-y-auto custom-scrollbar bg-black/50">
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-mono mb-4 uppercase tracking-wider">
                                <Microscope size={12} />
                                {content.type.toUpperCase()} ANALYSIS
                            </div>
                            <DialogTitle className="text-3xl font-bold tracking-tight mb-2 text-white">
                                {content.title}
                            </DialogTitle>
                            {content.subtitle && (
                                <p className="text-zinc-400 text-lg">{content.subtitle}</p>
                            )}
                        </div>

                        <div className="space-y-8 flex-grow">
                            <div>
                                <p className="text-zinc-300 leading-relaxed text-lg">
                                    {content.description}
                                </p>
                            </div>

                            {content.scientificBasis && (
                                <div className="bg-blue-950/20 rounded-xl p-5 border border-blue-900/30 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Atom size={64} />
                                    </div>
                                    <h4 className="flex items-center gap-2 text-blue-400 font-bold mb-3">
                                        <Activity size={16} />
                                        The Science
                                    </h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                                        {content.scientificBasis}
                                    </p>
                                </div>
                            )}

                            {content.technicalDetail && (
                                <div className="bg-zinc-900/50 rounded-xl p-5 border border-zinc-800">
                                    <h4 className="flex items-center gap-2 text-emerald-400 font-bold mb-3">
                                        <BrainCircuit size={16} />
                                        Technical Implementation
                                    </h4>
                                    <p className="text-zinc-400 text-sm font-mono leading-relaxed">
                                        {content.technicalDetail}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Col: Visuals & CTA (2/5) */}
                    <div className="lg:col-span-2 bg-zinc-900 border-l border-zinc-800 flex flex-col">
                        {/* Visual Area */}
                        <div className="flex-grow p-6 flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-900 to-zinc-900 relative overflow-hidden">
                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

                            {content.visualComponent ? (
                                <div className="w-full relative z-10">
                                    {content.visualComponent}
                                </div>
                            ) : (
                                <div className="text-zinc-700 font-mono text-sm">No Visualization Data</div>
                            )}
                        </div>

                        {/* Stats Row */}
                        {content.stats && (
                            <div className="grid grid-cols-2 border-y border-zinc-800">
                                {content.stats.map((stat, i) => (
                                    <div key={i} className={`p-4 text-center ${i === 0 ? 'border-r border-zinc-800' : ''}`}>
                                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* CTA Area */}
                        <div className="p-6 bg-black">
                            <Button
                                onClick={content.ctaAction ? content.ctaAction : closeModal}
                                className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-bold text-base rounded-full"
                            >
                                {content.ctaText || "Understand & Continue"} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
