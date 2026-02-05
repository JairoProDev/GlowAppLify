
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useOnboardingStore } from '@/lib/onboarding/store';
import { ContinueButton } from '../ContinueButton';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { onboardingContent } from '@/lib/i18n/onboardingContent';

export const Step5Reveal: React.FC = () => {
    const { answers } = useOnboardingStore();
    const router = useRouter();
    const { language } = useLanguage();
    const content = onboardingContent[language].step5;
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Confetti explosion
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#00C853', '#00E676', '#B9F6CA']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#00C853', '#00E676', '#B9F6CA']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();

        // Fade in content
        setTimeout(() => setShowContent(true), 500);
    }, []);

    const handleContinue = () => {
        router.push('/daily');
    };

    return (
        <div className="flex flex-col items-center justify-center text-center p-4 min-h-[70vh]">

            <div className={`transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                    {content.title}
                </h1>

                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                    {content.subtitlePart1} <strong>{answers.goal}</strong> {content.subtitlePart2}
                </p>

                {/* Board Preview Card - Simplified */}
                <div className="bg-card border border-border rounded-2xl p-8 max-w-lg mx-auto shadow-2xl mb-12 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="text-left space-y-6">
                        <div>
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{content.visionLayer}</h3>
                            <p className="text-lg font-medium italic">"{answers.futureSelfVision?.length > 80 ? answers.futureSelfVision.substring(0, 80) + '...' : answers.futureSelfVision}"</p>
                        </div>

                        <div className="h-px bg-border" />

                        <div>
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{content.executionLayer}</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-sm">{content.week1}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-sm">{content.daily}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-xs mx-auto space-y-4">
                    <ContinueButton onClick={handleContinue} className="w-full">
                        {content.enterButton}
                    </ContinueButton>

                    <p className="text-xs text-muted-foreground">
                        {content.pressEnter}
                    </p>
                </div>

            </div>
        </div>
    );
};
