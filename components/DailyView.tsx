'use client';

import { useState, useEffect } from 'react';
import { ExecutionBoard, DailyAction } from '@/lib/types';
import { getTodayLog, saveDailyLog } from '@/lib/storage';
import toast from 'react-hot-toast';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

interface DailyViewProps {
  board: ExecutionBoard;
  onBackToBoard: () => void;
}

export default function DailyView({ board, onBackToBoard }: DailyViewProps) {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [reflection, setReflection] = useState('');
  const { language, setLanguage, t } = useLanguage();
  const dateLocale = language === 'es' ? es : enUS;

  const today = new Date();
  const dayNameEn = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateString = today.toISOString().split('T')[0];

  // Get current week actions
  const currentWeek = board.execution_layer.weeks[0]; // Matching new type structure
  const todayActions: DailyAction[] = (currentWeek?.actions as any) || []; // Type cast for now

  useEffect(() => {
    // Load today's log if exists
    if (board.id) {
      const log = getTodayLog(board.id);
      if (log) {
        setCompletedActions(new Set(log.completedActions));
        setMood(log.mood || null);
        setReflection(log.reflection || '');
      }
    }
  }, [board.id]);

  const toggleAction = (actionId: string) => {
    const newCompleted = new Set(completedActions);
    if (newCompleted.has(actionId)) {
      newCompleted.delete(actionId);
      toast.success(language === 'en' ? 'Unchecked!' : '¡Desmarcado!', { duration: 1000 });
    } else {
      newCompleted.add(actionId);
      toast.success(language === 'en' ? '✓ Completed!' : '✓ ¡Completado!', { duration: 1500, icon: '🎯' });
    }
    setCompletedActions(newCompleted);

    // Auto-save
    if (board.id) {
      saveDailyLog({
        boardId: board.id,
        date: dateString,
        completedActions: Array.from(newCompleted),
        mood: mood || undefined,
        reflection: reflection || undefined,
      });
    }
  };

  const handleMoodChange = (newMood: 1 | 2 | 3 | 4 | 5) => {
    setMood(newMood);
    if (board.id) {
      saveDailyLog({
        boardId: board.id,
        date: dateString,
        completedActions: Array.from(completedActions),
        mood: newMood,
        reflection: reflection || undefined,
      });
    }
  };

  const handleSaveReflection = () => {
    if (board.id) {
      saveDailyLog({
        boardId: board.id,
        date: dateString,
        completedActions: Array.from(completedActions),
        mood: mood || undefined,
        reflection: reflection || undefined,
      });
      toast.success(t('daily.messages.saved'));
    }
  };

  const completionRate = todayActions.length > 0
    ? Math.round((completedActions.size / todayActions.length) * 100)
    : 0;

  const oneThingAction = todayActions.find(a => a.isOneThingAction);
  const oneThingCompleted = oneThingAction ? completedActions.has(oneThingAction.id) : false;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background-alt)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with gradient */}
        <div
          className="rounded-3xl shadow-2xl mb-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--accent-600) 100%)',
          }}
        >
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={onBackToBoard}
                className="px-4 py-2 rounded-xl font-medium transition-all duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                ← {t('daily.backToBoard')}
              </button>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-xl font-medium transition-all duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                🌐 {language === 'en' ? 'ES' : 'EN'}
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              >
                📅
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {t('daily.todayExecution')}
                </h1>
                <p className="text-white/90 text-lg capitalize">
                  {format(today, 'EEEE, d MMMM yyyy', { locale: dateLocale })}
                </p>
              </div>
            </div>

            {/* Beautiful progress visualization */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(255, 255, 255, 0.15)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/90 font-semibold">{t('daily.dailyProgress')}</span>
                <span className="text-3xl font-bold text-white">{completionRate}%</span>
              </div>
              <div
                className="w-full rounded-full h-4 overflow-hidden"
                style={{ background: 'rgba(0, 0, 0, 0.2)' }}
              >
                <div
                  className="h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${completionRate}%`,
                    background: completionRate === 100
                      ? 'linear-gradient(90deg, #10B981, #34D399)'
                      : 'linear-gradient(90deg, var(--accent-400), var(--accent-500))',
                    boxShadow: completionRate > 0 ? '0 0 20px rgba(16, 185, 129, 0.5)' : 'none',
                  }}
                />
              </div>
              {completionRate === 100 && (
                <p className="text-center text-white font-bold mt-3 text-lg animate-pulse">
                  🎉 {language === 'en' ? 'All tasks completed! Amazing work!' : '¡Todas las tareas completadas! ¡Increíble trabajo!'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Vision Reminder - Inspiring card */}
        <div
          className="rounded-3xl shadow-xl mb-8 p-8 overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--primary-600) 100%)',
          }}
        >
          <div className="relative z-10">
            <div className="text-4xl mb-4">✨</div>
            <p className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              {board.vision.mantra}
            </p>
            <p className="text-lg text-white/90 italic">
              {board.vision.identity}
            </p>
          </div>
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, white, transparent)',
              transform: 'translate(30%, -30%)',
            }}
          />
        </div>

        {/* ONE Thing Action - Celebratory design */}
        {oneThingAction && (
          <div
            className="rounded-3xl shadow-2xl mb-8 overflow-hidden transform transition-all duration-300 hover:scale-[1.01]"
            style={{
              background: oneThingCompleted
                ? 'linear-gradient(135deg, #10B981, #34D399)'
                : 'linear-gradient(135deg, #FCD34D, #FBBF24)',
              border: '3px solid',
              borderColor: oneThingCompleted ? '#059669' : '#F59E0B',
            }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="text-4xl animate-bounce"
                  style={{ animationDuration: '2s' }}
                >
                  {oneThingCompleted ? '🎯✓' : '⭐'}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold" style={{ color: oneThingCompleted ? 'white' : '#78350F' }}>
                  {t('daily.oneThingToday')}
                </h2>
              </div>

              <label className="flex items-start gap-5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={oneThingCompleted}
                    onChange={() => toggleAction(oneThingAction.id)}
                    className="w-8 h-8 rounded-lg appearance-none cursor-pointer transition-all duration-200"
                    style={{
                      border: '3px solid',
                      borderColor: oneThingCompleted ? 'white' : '#78350F',
                      background: oneThingCompleted ? 'white' : 'transparent',
                    }}
                  />
                  {oneThingCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-2xl" style={{ color: '#059669' }}>✓</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-xl md:text-2xl font-semibold leading-relaxed transition-all ${oneThingCompleted ? 'text-white line-through' : 'group-hover:scale-[1.02]'
                      }`}
                    style={{ color: oneThingCompleted ? 'white' : '#78350F' }}
                  >
                    {oneThingAction.description}
                  </p>
                  <p className="text-lg mt-2 flex items-center gap-2" style={{ color: oneThingCompleted ? 'white' : '#92400E' }}>
                    ⏱️ {oneThingAction.duration}
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Today's Actions - Clean checklist */}
        <div
          className="rounded-3xl shadow-xl mb-8 overflow-hidden"
          style={{ background: 'var(--background)' }}
        >
          <div
            className="p-6"
            style={{
              background: 'linear-gradient(135deg, var(--primary-600), var(--primary-700))',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              >
                ✅
              </div>
              <h2 className="text-3xl font-bold text-white">
                {t('daily.todayActions')}
              </h2>
            </div>
          </div>

          <div className="p-8">
            {todayActions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌴</div>
                <p className="text-xl" style={{ color: 'var(--gray-600)' }}>
                  {t('daily.noActions')}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayActions.filter(a => !a.isOneThingAction).map((action) => {
                  const isCompleted = completedActions.has(action.id);
                  return (
                    <label
                      key={action.id}
                      className="flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-200"
                      style={{
                        background: isCompleted
                          ? 'linear-gradient(135deg, var(--accent-50), var(--primary-50))'
                          : 'var(--gray-50)',
                        border: '2px solid',
                        borderColor: isCompleted ? 'var(--accent-300)' : 'var(--gray-200)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isCompleted) {
                          e.currentTarget.style.borderColor = 'var(--primary-300)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCompleted) {
                          e.currentTarget.style.borderColor = 'var(--gray-200)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      <div className="relative mt-1">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => toggleAction(action.id)}
                          className="w-6 h-6 rounded-lg appearance-none cursor-pointer transition-all duration-200"
                          style={{
                            border: '2px solid',
                            borderColor: isCompleted ? 'var(--accent-600)' : 'var(--gray-400)',
                            background: isCompleted ? 'var(--accent-600)' : 'white',
                          }}
                        />
                        {isCompleted && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-white font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-lg font-medium leading-relaxed transition-all ${isCompleted ? 'line-through' : ''
                            }`}
                          style={{
                            color: isCompleted ? 'var(--gray-500)' : 'var(--gray-900)',
                          }}
                        >
                          {action.description}
                        </p>
                        <p className="text-sm mt-1 flex items-center gap-1" style={{ color: 'var(--gray-500)' }}>
                          ⏱️ {action.duration}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Evening Check-in - Meaningful reflection */}
        <div
          className="rounded-3xl shadow-xl mb-8 overflow-hidden"
          style={{ background: 'var(--background)' }}
        >
          <div
            className="p-6"
            style={{
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              >
                🌙
              </div>
              <h2 className="text-3xl font-bold text-white">
                {t('daily.evening.eveningCheckin')}
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label className="block text-lg font-bold mb-4" style={{ color: 'var(--gray-800)' }}>
                {t('daily.evening.howWasDay')}
              </label>
              <div className="grid grid-cols-5 gap-3">
                {([
                  { value: 1, emoji: '😔', label: t('moods.struggled'), color: '#EF4444' },
                  { value: 2, emoji: '😕', label: t('moods.ok'), color: '#F59E0B' },
                  { value: 3, emoji: '😐', label: t('moods.good'), color: '#3B82F6' },
                  { value: 4, emoji: '😊', label: t('moods.great'), color: '#10B981' },
                  { value: 5, emoji: '🎉', label: t('moods.amazing'), color: '#8B5CF6' },
                ] as const).map(({ value, emoji, label, color }) => (
                  <button
                    key={value}
                    onClick={() => handleMoodChange(value)}
                    className="py-4 px-3 rounded-2xl transition-all duration-300 transform hover:scale-105"
                    style={{
                      background: mood === value
                        ? `linear-gradient(135deg, ${color}, ${color}dd)`
                        : 'var(--gray-100)',
                      border: '3px solid',
                      borderColor: mood === value ? color : 'transparent',
                      color: mood === value ? 'white' : 'var(--gray-700)',
                      boxShadow: mood === value ? 'var(--shadow-lg)' : 'none',
                    }}
                  >
                    <div className="text-4xl mb-2">{emoji}</div>
                    <div className="text-xs font-bold">{label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="reflection" className="block text-lg font-bold mb-3" style={{ color: 'var(--gray-800)' }}>
                {t('daily.evening.dailyReflection')}
              </label>
              <textarea
                id="reflection"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder={t('daily.evening.reflectionPlaceholder')}
                className="w-full px-5 py-4 rounded-2xl resize-none transition-all duration-200"
                style={{
                  border: '2px solid var(--gray-200)',
                  color: 'var(--gray-900)',
                  background: 'var(--gray-50)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-500)';
                  e.currentTarget.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gray-200)';
                  e.currentTarget.style.background = 'var(--gray-50)';
                }}
                rows={5}
              />
            </div>

            <button
              onClick={handleSaveReflection}
              className="w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, var(--primary-600), var(--accent-600))',
                color: 'white',
                boxShadow: 'var(--shadow-lg)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-2xl)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
            >
              💾 {t('daily.evening.saveCheckin')}
            </button>
          </div>
        </div>

        {/* Habits Reminder - Beautiful daily routine */}
        <div
          className="rounded-3xl shadow-xl mb-8 overflow-hidden"
          style={{ background: 'var(--background)' }}
        >
          <div
            className="p-6"
            style={{
              background: 'linear-gradient(135deg, var(--accent-600), var(--accent-700))',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              >
                🔄
              </div>
              <h2 className="text-3xl font-bold text-white">
                {t('daily.dailyHabits')}
              </h2>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {board.habits.map((habit, idx) => {
              const habitConfig: Record<string, { icon: string; bg: string; border: string; text: string }> = {
                morning: {
                  icon: '🌅',
                  bg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                  border: '#FCD34D',
                  text: '#78350F',
                },
                deepwork: {
                  icon: '💪',
                  bg: 'linear-gradient(135deg, var(--primary-100), var(--primary-200))',
                  border: 'var(--primary-300)',
                  text: 'var(--primary-900)',
                },
                evening: {
                  icon: '🌙',
                  bg: 'linear-gradient(135deg, #DBEAFE, #BFDBFE)',
                  border: '#93C5FD',
                  text: '#1E3A8A',
                },
              };

              const config = habitConfig[habit.type] || habitConfig.deepwork;

              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: config.bg,
                    border: `3px solid ${config.border}`,
                    boxShadow: 'var(--shadow-md)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-xl)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                >
                  <div className="text-5xl mb-4">{config.icon}</div>
                  <h3 className="font-bold text-xl mb-2 capitalize" style={{ color: config.text }}>
                    {habit.type === 'deepwork'
                      ? t('deepwork', language)
                      : t(habit.type, language)}
                  </h3>
                  <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: config.text, opacity: 0.8 }}>
                    ⏰ {habit.time}
                  </p>
                  <p className="leading-relaxed" style={{ color: config.text, opacity: 0.9 }}>
                    {habit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
