'use client';

import { useState, useEffect } from 'react';
import { ExecutionBoard } from '@/lib/types';
import { Language, detectLanguage, t } from '@/lib/i18n';
import LoadingState from './LoadingState';
import toast from 'react-hot-toast';

interface OnboardingFormProps {
  onBoardGenerated: (board: ExecutionBoard) => void;
}

export default function OnboardingForm({ onBoardGenerated }: OnboardingFormProps) {
  const [lang, setLang] = useState<Language>('en');
  const [goal, setGoal] = useState('');
  const [context, setContext] = useState('');
  const [timeAvailable, setTimeAvailable] = useState('');
  const [obstacles, setObstacles] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLang(detectLanguage());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!goal.trim()) {
      toast.error(t('goalRequired', lang));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/board/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal: goal.trim(),
          context: context.trim() || undefined,
          timeAvailable: timeAvailable || undefined,
          obstacles: obstacles.trim() ? obstacles.split(',').map(o => o.trim()) : undefined,
          language: lang,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate board');
      }

      const board: ExecutionBoard = await response.json();
      toast.success(t('boardGenerated', lang));
      onBoardGenerated(board);
    } catch (error: any) {
      console.error('Error generating board:', error);
      toast.error(t('errorGenerate', lang));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState lang={lang} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8" style={{ background: 'var(--background-alt)' }}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl"
              style={{
                background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
                color: '#FFFFFF',
              }}
            >
              G
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold"
              style={{ color: 'var(--foreground)' }}
            >
              {t('appName', lang)}
            </h1>
          </div>
          <p
            className="text-xl md:text-2xl max-w-2xl mx-auto"
            style={{ color: 'var(--foreground-muted)' }}
          >
            {t('tagline', lang)}
          </p>

          {/* Language switcher */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setLang('en')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: lang === 'en' ? 'var(--primary-500)' : 'var(--gray-200)',
                color: lang === 'en' ? '#FFFFFF' : 'var(--foreground-muted)',
              }}
            >
              English
            </button>
            <button
              onClick={() => setLang('es')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: lang === 'es' ? 'var(--primary-500)' : 'var(--gray-200)',
                color: lang === 'es' ? '#FFFFFF' : 'var(--foreground-muted)',
              }}
            >
              Español
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div
          className="rounded-3xl p-8 md:p-12"
          style={{
            background: 'var(--background)',
            boxShadow: 'var(--shadow-2xl)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Main Goal Input */}
            <div>
              <label
                htmlFor="goal"
                className="block text-lg font-bold mb-3"
                style={{ color: 'var(--foreground)' }}
              >
                {t('goalLabel', lang)} <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <textarea
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder={t('goalPlaceholder', lang)}
                className="w-full px-6 py-4 rounded-xl resize-none text-lg focus:outline-none focus:ring-2"
                style={{
                  border: '2px solid var(--gray-300)',
                  color: 'var(--foreground)',
                  background: 'var(--background)',
                }}
                rows={4}
                disabled={loading}
              />
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="context"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  {t('contextLabel', lang)}
                </label>
                <input
                  id="context"
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder={t('contextPlaceholder', lang)}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    border: '1px solid var(--gray-300)',
                    color: 'var(--foreground)',
                    background: 'var(--background)',
                  }}
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  {t('timeLabel', lang)}
                </label>
                <input
                  id="time"
                  type="text"
                  value={timeAvailable}
                  onChange={(e) => setTimeAvailable(e.target.value)}
                  placeholder={t('timePlaceholder', lang)}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    border: '1px solid var(--gray-300)',
                    color: 'var(--foreground)',
                    background: 'var(--background)',
                  }}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="obstacles"
                className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--foreground-muted)' }}
              >
                {t('obstaclesLabel', lang)}
              </label>
              <input
                id="obstacles"
                type="text"
                value={obstacles}
                onChange={(e) => setObstacles(e.target.value)}
                placeholder={t('obstaclesPlaceholder', lang)}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  border: '1px solid var(--gray-300)',
                  color: 'var(--foreground)',
                  background: 'var(--background)',
                }}
                disabled={loading}
              />
              <p className="text-sm mt-2" style={{ color: 'var(--foreground-muted)' }}>
                {t('obstaclesHint', lang)}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !goal.trim()}
              className="w-full py-5 px-8 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
                color: '#FFFFFF',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {t('generateButton', lang)}
            </button>
          </form>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: 'var(--foreground-muted)' }}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{lang === 'es' ? 'Generación en 10-30s' : 'Generated in 10-30s'}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>{lang === 'es' ? 'Privado y seguro' : 'Private & Secure'}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>{lang === 'es' ? 'Totalmente editable' : 'Fully Editable'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
