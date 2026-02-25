"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap } from "lucide-react"
import { VisionLayer } from "@/lib/types"
import { useLanguage } from "@/lib/i18n/LanguageContext"

interface VisionSectionProps {
    vision: VisionLayer
    isEditing?: boolean
}

export function VisionSection({ vision, isEditing }: VisionSectionProps) {
    const { t, language } = useLanguage()
    // Defensive check
    const safeVision = vision || {
        futureVision: language === 'es' ? "Cargando visión..." : "Vision loading...",
        mantra: language === 'es' ? "Cargando..." : "Loading..."
    };

    return (
        <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-primary/10 to-transparent p-1">
                <div className="flex items-center gap-3 p-6">
                    <div className="rounded-xl bg-primary/20 p-3 text-primary ring-1 ring-primary/30">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">{t('board.vision_identity')}</h2>
                        <p className="text-sm text-muted-foreground">{t('board.emotional_anchor')}</p>
                    </div>
                </div>
            </div>

            <CardContent className="p-8 space-y-8">
                <div className="space-y-4 relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent rounded-full opacity-50" />
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-2 block">{t('board.future_vision')}</label>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/90 italic">
                        "{safeVision.futureVision}"
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-lg transform transition-all hover:scale-[1.01] hover:shadow-2xl group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Zap className="h-32 w-32 rotate-12" />
                    </div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 block">{t('board.mantra')}</label>
                    <p className="text-3xl md:text-4xl font-black tracking-tight relative z-10 drop-shadow-md">
                        {safeVision.mantra}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

