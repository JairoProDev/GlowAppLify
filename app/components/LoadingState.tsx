'use client';

import { useEffect, useState } from 'react';
import { Language, t } from '@/lib/i18n';

interface LoadingStateProps {
  lang: Language;
}

const loadingSteps = [
  { key: 'loadingStep1', duration: 6000 },
  { key: 'loadingStep2', duration: 8000 },
  { key: 'loadingStep3', duration: 10000 },
  { key: 'loadingStep4', duration: 6000 },
  { key: 'loadingStep5', duration: 5000 },
];

export default function LoadingState({ lang }: LoadingStateProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95; // Don't go to 100% until actually done
        return prev + (Math.random() * 3);
      });
    }, 300);

    // Step progression
    const stepTimers: NodeJS.Timeout[] = [];
    let currentTime = 0;

    loadingSteps.forEach((step, index) => {
      currentTime += step.duration;
      const timer = setTimeout(() => {
        setCurrentStep(index + 1);
      }, currentTime);
      stepTimers.push(timer);
    });

    return () => {
      clearInterval(progressInterval);
      stepTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const currentStepKey = currentStep < loadingSteps.length
    ? loadingSteps[currentStep].key
    : loadingSteps[loadingSteps.length - 1].key;

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--background-alt)' }}>
      <div className="w-full max-w-2xl">
        {/* Main loading card */}
        <div
          className="rounded-3xl p-12 text-center"
          style={{
            background: 'var(--background)',
            boxShadow: 'var(--shadow-2xl)',
          }}
        >
          {/* Animated logo/icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
              <div
                className="absolute inset-0 w-24 h-24 rounded-full animate-spin"
                style={{
                  border: '3px solid transparent',
                  borderTopColor: 'var(--primary-500)',
                  borderRightColor: 'var(--accent-500)',
                  animation: 'spin 1.5s linear infinite',
                }}
              />
            </div>
          </div>

          {/* Main message */}
          <h2
            className="text-3xl font-bold mb-3"
            style={{ color: 'var(--foreground)' }}
          >
            {t('generating', lang)}
          </h2>

          {/* Current step */}
          <p
            className="text-xl mb-8 min-h-[2rem]"
            style={{ color: 'var(--accent-600)' }}
          >
            {t(currentStepKey, lang)}
          </p>

          {/* Progress bar */}
          <div className="mb-6">
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: 'var(--gray-200)' }}
            >
              <div
                className="h-full transition-all duration-500 ease-out rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--primary-500), var(--accent-500))',
                }}
              />
            </div>
            <p
              className="text-sm mt-2"
              style={{ color: 'var(--foreground-muted)' }}
            >
              {Math.round(progress)}%
            </p>
          </div>

          {/* Time estimate */}
          <p
            className="text-sm"
            style={{ color: 'var(--foreground-muted)' }}
          >
            {t('loadingEstimate', lang)}
          </p>

          {/* Loading steps indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {loadingSteps.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: index <= currentStep
                    ? 'var(--accent-500)'
                    : 'var(--gray-300)',
                  transform: index === currentStep ? 'scale(1.5)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Motivational tip */}
        <div
          className="mt-6 rounded-2xl p-6 text-center"
          style={{
            background: 'var(--accent-50)',
            border: '1px solid var(--accent-200)',
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: 'var(--accent-900)' }}
          >
            💡 {lang === 'es'
              ? 'Mientras esperamos, piensa: ¿Qué pequeña acción puedes hacer HOY para acercarte a tu meta?'
              : 'While you wait, think: What small action can you take TODAY to move closer to your goal?'}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
