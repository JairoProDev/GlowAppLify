
"use client"

import { motion } from "framer-motion"
import { Sparkles, Eye, EyeOff, Brain, Wand2 } from "lucide-react"
import { OnboardingAnswers } from "@/lib/onboarding/types"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

interface StepProps {
    goal: string;
    wantsVisualization: boolean;
    futureSelfVision: string;
    onChange: (key: keyof OnboardingAnswers, val: any) => void;
    onNext: () => void;
    content: any;
}

export function Step4Future({
    goal,
    wantsVisualization,
    futureSelfVision,
    onChange,
    onNext,
    content
}: StepProps) {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-card rounded-2xl p-6 border shadow-sm relative flex-1">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                        {content.bubble}
                    </p>
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-card border-l border-t rotate-45" />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pl-14 space-y-8"
            >
                {/* Visualization Toggle */}
                <div className="flex items-center justify-between p-6 rounded-2xl bg-secondary/50 border border-primary/10">
                    <div className="flex gap-4 items-center">
                        <div className={`p-3 rounded-full ${wantsVisualization ? 'bg-primary/20 text-primary' : 'bg-zinc-200 text-zinc-400'}`}>
                            {wantsVisualization ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
                        </div>
                        <div>
                            <p className="font-bold text-lg">{content.visualizationLabel}</p>
                            <p className="text-sm text-muted-foreground">{content.visualizationSub}</p>
                        </div>
                    </div>
                    <Switch
                        checked={wantsVisualization}
                        onCheckedChange={(val) => onChange('wantsVisualization', val)}
                    />
                </div>

                {wantsVisualization && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4"
                    >
                        <Textarea
                            value={futureSelfVision}
                            onChange={(e) => onChange('futureSelfVision', e.target.value)}
                            placeholder={content.placeholder.replace('{{goal}}', goal)}
                            className="min-h-[150px] text-lg p-6 rounded-2xl bg-background border-2 focus:border-primary transition-all shadow-inner"
                        />

                        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 dark:bg-amber-500/10">
                            <Brain className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed italic">
                                {content.scienceFact}
                            </p>
                        </div>
                    </motion.div>
                )}

                <div className="flex justify-end pt-4">
                    <button
                        onClick={onNext}
                        className="group flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-lg transition-all bg-primary text-primary-foreground hover:scale-105 shadow-2xl shadow-primary/30"
                    >
                        <Wand2 className="h-5 w-5" />
                        {content.createButton}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
