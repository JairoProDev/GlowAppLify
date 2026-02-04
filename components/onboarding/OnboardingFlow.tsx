
'use client';

import React, { useEffect } from 'react';
import { useOnboardingStore } from '@/lib/onboarding/store';
import { Step1Goal } from './steps/Step1Goal';
import { Step2Context } from './steps/Step2Context';
import { Step3Past } from './steps/Step3Past';
import { Step4Future } from './steps/Step4Future';
import { Step5Reveal } from './steps/Step5Reveal';
import { OnboardingLoading } from './OnboardingLoading';
import { ProgressBar } from './ProgressBar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export default function OnboardingFlow() {
    const { currentStep, prevStep, answers, isLoading, setStep, setLoading } = useOnboardingStore();
    const router = useRouter();

    // Handle final submission when step > 4 (triggered by Step4)
    useEffect(() => {
        if (currentStep === 5 && !isLoading) {
            setLoading(true);

            const generateBoard = async () => {
                try {
                    // Trigger the API call
                    const responsePromise = fetch('/api/board/generate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(answers),
                    });

                    // Ensure minimum duration of 15s (was 30s but 15s is safer for UX balance) 
                    // to let the loading animation play out a bit
                    const minimumDurationPromise = new Promise(resolve => setTimeout(resolve, 15000));

                    const [response] = await Promise.all([responsePromise, minimumDurationPromise]);

                    if (!response.ok) {
                        throw new Error('Failed to generate board');
                    }

                    const data = await response.json();

                    setLoading(false);
                    setStep(6); // Move to Reveal Step

                } catch (error) {
                    console.error("Board generation failed", error);
                    toast.error("Something went wrong. Please try again.");
                    setLoading(false);
                    setStep(4); // Go back to last step
                }
            };

            generateBoard();
        }
    }, [currentStep, answers, isLoading, setStep, setLoading]);

    if (isLoading || currentStep === 5) {
        return <OnboardingLoading />;
    }

    if (currentStep === 6) {
        return <Step5Reveal />;
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1Goal />;
            case 2: return <Step2Context />;
            case 3: return <Step3Past />;
            case 4: return <Step4Future />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col max-w-3xl mx-auto px-4 py-8 md:py-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                {currentStep > 1 && currentStep <= 4 && (
                    <button
                        onClick={prevStep}
                        className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                )}
                <div className="flex-1 px-4">
                    <ProgressBar currentStep={Math.min(currentStep, 4)} totalSteps={4} />
                </div>
                <div className="w-10" /> {/* Spacer for balance */}
            </div>

            {/* Step Content */}
            <div className="flex-1 flex flex-col justify-center">
                {renderStep()}
            </div>

        </div>
    );
}
