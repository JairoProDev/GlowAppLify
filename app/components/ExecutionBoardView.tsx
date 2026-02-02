'use client';

import { useState, useEffect } from 'react';
import { ExecutionBoard } from '@/lib/types';
import { detectLanguage, t, Language } from '@/lib/i18n';
import toast from 'react-hot-toast';

interface ExecutionBoardViewProps {
  board: ExecutionBoard;
  onBoardUpdated: (board: ExecutionBoard) => void;
  onStartDaily: () => void;
}

export default function ExecutionBoardView({ board, onBoardUpdated, onStartDaily }: ExecutionBoardViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBoard, setEditedBoard] = useState<ExecutionBoard>(board);
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Detect language from localStorage or browser
    const savedLang = typeof window !== 'undefined'
      ? (localStorage.getItem('language') as Language)
      : null;
    setLanguage(savedLang || detectLanguage());
  }, []);

  const handleSave = () => {
    onBoardUpdated(editedBoard);
    setIsEditing(false);
    toast.success(t('boardUpdated', language));
  };

  const handleCancel = () => {
    setEditedBoard(board);
    setIsEditing(false);
  };

  const handleExport = () => {
    toast.success(language === 'en' ? 'Export feature coming soon!' : '¡Función de exportar próximamente!');
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLang);
    }
  };

  const currentBoard = isEditing ? editedBoard : board;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Header with Branding */}
        <div
          className="rounded-3xl shadow-2xl mb-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--primary-700) 0%, var(--primary-500) 100%)',
          }}
        >
          <div className="p-8 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    🎯
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {t('yourBoard', language)}
                    </h1>
                    <p className="text-white/80 text-sm">
                      {language === 'en' ? 'Your 90-day transformation roadmap' : 'Tu hoja de ruta de transformación de 90 días'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
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

                <button
                  onClick={handleExport}
                  className="px-4 py-2 rounded-xl font-medium transition-all duration-200"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  📤 {language === 'en' ? 'Export' : 'Exportar'}
                </button>

                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-xl font-medium"
                      style={{
                        background: 'white',
                        color: 'var(--gray-700)',
                      }}
                    >
                      {t('cancel', language)}
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 rounded-xl font-semibold text-white transition-all duration-200"
                      style={{
                        background: 'var(--accent-600)',
                        boxShadow: 'var(--shadow-lg)',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-700)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent-600)'}
                    >
                      ✓ {t('saveChanges', language)}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 rounded-xl font-medium"
                    style={{
                      background: 'white',
                      color: 'var(--primary-700)',
                    }}
                  >
                    ✏️ {t('editBoard', language)}
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={onStartDaily}
              className="w-full mt-6 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02]"
              style={{
                background: 'white',
                color: 'var(--primary-700)',
                boxShadow: 'var(--shadow-2xl)',
              }}
            >
              ▶️ {t('startDaily', language)}
            </button>
          </div>
        </div>

        {/* Layer 1: Vision - Inspiring gradient card */}
        <div
          className="rounded-3xl shadow-xl mb-8 overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
          style={{ background: 'var(--background)' }}
        >
          <div
            className="p-6"
            style={{
              background: 'linear-gradient(135deg, var(--accent-50) 0%, var(--primary-50) 100%)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-500), var(--accent-600))',
                  color: 'white',
                }}
              >
                ✨
              </div>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--primary-800)' }}>
                {t('visionTitle', language)}
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--gray-600)' }}>
                {t('identity', language)}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentBoard.vision.identity}
                  onChange={(e) => setEditedBoard({
                    ...editedBoard,
                    vision: { ...editedBoard.vision, identity: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    border: '2px solid var(--gray-200)',
                    color: 'var(--gray-900)',
                  }}
                />
              ) : (
                <p className="text-xl italic leading-relaxed" style={{ color: 'var(--gray-800)' }}>
                  "{currentBoard.vision.identity}"
                </p>
              )}
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))' }}
            >
              <label className="block text-sm font-bold uppercase tracking-wider mb-3 text-white/90">
                {t('mantra', language)}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentBoard.vision.mantra}
                  onChange={(e) => setEditedBoard({
                    ...editedBoard,
                    vision: { ...editedBoard.vision, mantra: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    border: 'none',
                    color: 'var(--gray-900)',
                  }}
                />
              ) : (
                <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                  {currentBoard.vision.mantra}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--gray-600)' }}>
                {t('futureSelf', language)}
              </label>
              {isEditing ? (
                <textarea
                  value={currentBoard.vision.futureImage}
                  onChange={(e) => setEditedBoard({
                    ...editedBoard,
                    vision: { ...editedBoard.vision, futureImage: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl resize-none"
                  style={{
                    border: '2px solid var(--gray-200)',
                    color: 'var(--gray-900)',
                  }}
                  rows={4}
                />
              ) : (
                <p className="text-lg leading-relaxed" style={{ color: 'var(--gray-700)' }}>
                  {currentBoard.vision.futureImage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Layer 2: Goal - Professional card with metrics */}
        <div
          className="rounded-3xl shadow-xl mb-8 overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
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
                🎯
              </div>
              <h2 className="text-3xl font-bold text-white">
                {t('goalTitle', language)}
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--gray-600)' }}>
                {t('smartGoal', language)}
              </label>
              {isEditing ? (
                <textarea
                  value={currentBoard.goal.statement}
                  onChange={(e) => setEditedBoard({
                    ...editedBoard,
                    goal: { ...editedBoard.goal, statement: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl resize-none"
                  style={{
                    border: '2px solid var(--gray-200)',
                    color: 'var(--gray-900)',
                  }}
                  rows={3}
                />
              ) : (
                <p className="text-xl font-medium leading-relaxed" style={{ color: 'var(--gray-800)' }}>
                  {currentBoard.goal.statement}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="p-5 rounded-2xl"
                style={{ background: 'var(--primary-50)' }}
              >
                <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--primary-700)' }}>
                  {t('type', language)}
                </label>
                <p className="text-lg font-semibold" style={{ color: 'var(--gray-900)' }}>
                  {currentBoard.goal.type}
                </p>
              </div>
              <div
                className="p-5 rounded-2xl"
                style={{ background: 'var(--primary-50)' }}
              >
                <label className="block text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--primary-700)' }}>
                  {t('deadline', language)}
                </label>
                <p className="text-lg font-semibold" style={{ color: 'var(--gray-900)' }}>
                  📅 {new Date(currentBoard.goal.deadline).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--gray-600)' }}>
                {t('kpis', language)}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentBoard.goal.kpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl flex items-center gap-3"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-50), var(--accent-50))',
                      border: '2px solid var(--primary-100)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                      style={{ background: 'var(--primary-600)' }}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: 'var(--gray-700)' }}>{kpi.metric}</p>
                      <p className="text-lg font-bold" style={{ color: 'var(--primary-700)' }}>
                        {kpi.target} {kpi.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3: Execution - Beautiful weekly grid */}
        <div
          className="rounded-3xl shadow-xl mb-8 overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
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
                📊
              </div>
              <h2 className="text-3xl font-bold text-white">
                {t('executionTitle', language)}
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {currentBoard.execution.map((week) => (
              <div
                key={week.weekNumber}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: '2px solid var(--accent-100)',
                  background: 'var(--accent-50)',
                }}
              >
                <div
                  className="p-4"
                  style={{ background: 'linear-gradient(135deg, var(--accent-100), var(--accent-200))' }}
                >
                  <h3 className="text-xl font-bold" style={{ color: 'var(--accent-900)' }}>
                    {t('week', language)} {week.weekNumber}: {week.focus}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
                  {Object.entries(week.days).map(([day, actions]) => (
                    <div
                      key={day}
                      className="rounded-xl p-4 transition-all duration-200 hover:shadow-lg"
                      style={{
                        background: 'white',
                        border: '1px solid var(--gray-200)',
                      }}
                    >
                      <h4 className="font-bold mb-3 pb-2" style={{
                        color: 'var(--accent-700)',
                        borderBottom: '2px solid var(--accent-200)',
                      }}>
                        {day}
                      </h4>
                      <ul className="space-y-3">
                        {actions.map((action) => (
                          <li key={action.id} className="text-sm">
                            {action.isOneThingAction && (
                              <span
                                className="inline-block text-xs px-2 py-1 rounded-md mb-2 font-bold"
                                style={{
                                  background: 'linear-gradient(135deg, var(--warning), #FBBF24)',
                                  color: 'white',
                                }}
                              >
                                ⭐ {t('oneThingBadge', language)}
                              </span>
                            )}
                            <p className="font-medium leading-snug mb-1" style={{ color: 'var(--gray-800)' }}>
                              {action.description}
                            </p>
                            <p className="text-xs flex items-center gap-1" style={{ color: 'var(--gray-500)' }}>
                              ⏱️ {action.duration}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 4: Obstacles - Strategic planning cards */}
        <div
          className="rounded-3xl shadow-xl mb-8 overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
          style={{ background: 'var(--background)' }}
        >
          <div
            className="p-6"
            style={{
              background: 'linear-gradient(135deg, #F97316, #EA580C)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              >
                🛡️
              </div>
              <h2 className="text-3xl font-bold text-white">
                {t('obstaclesTitle', language)}
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-4">
            {currentBoard.obstacles.map((obstacle, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl transition-all duration-200 hover:shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
                  border: '2px solid #FED7AA',
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #F97316, #EA580C)',
                      color: 'white',
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg mb-2" style={{ color: '#9A3412' }}>
                      {obstacle.description}
                    </p>
                    <div
                      className="p-3 rounded-lg"
                      style={{ background: 'white' }}
                    >
                      <p className="text-sm font-medium italic" style={{ color: '#78350F' }}>
                        💡 {obstacle.ifThenPlan}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 5: Habits - Clean daily routine cards */}
        <div
          className="rounded-3xl shadow-xl mb-8 overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
          style={{ background: 'var(--background)' }}
        >
          <div
            className="p-6"
            style={{
              background: 'linear-gradient(135deg, var(--primary-600), var(--accent-600))',
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
                {t('habitsTitle', language)}
              </h2>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentBoard.habits.map((habit, idx) => {
              const habitIcons: Record<string, string> = {
                morning: '🌅',
                deepwork: '💪',
                evening: '🌙',
              };

              const habitColors: Record<string, { bg: string; border: string; text: string }> = {
                morning: {
                  bg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                  border: '#FCD34D',
                  text: '#78350F',
                },
                deepwork: {
                  bg: 'linear-gradient(135deg, var(--primary-100), var(--primary-200))',
                  border: 'var(--primary-300)',
                  text: 'var(--primary-900)',
                },
                evening: {
                  bg: 'linear-gradient(135deg, #DBEAFE, #BFDBFE)',
                  border: '#93C5FD',
                  text: '#1E3A8A',
                },
              };

              const colors = habitColors[habit.type] || habitColors.deepwork;

              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl transition-all duration-200 hover:shadow-lg"
                  style={{
                    background: colors.bg,
                    border: `2px solid ${colors.border}`,
                  }}
                >
                  <div className="text-4xl mb-3">{habitIcons[habit.type] || '⚡'}</div>
                  <h3 className="font-bold text-xl mb-2 capitalize" style={{ color: colors.text }}>
                    {habit.type === 'deepwork' ? (language === 'en' ? 'Deep Work' : 'Trabajo Profundo') : t(habit.type, language)}
                  </h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: colors.text, opacity: 0.8 }}>
                    ⏰ {habit.time}
                  </p>
                  <p className="leading-relaxed" style={{ color: colors.text, opacity: 0.9 }}>
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
