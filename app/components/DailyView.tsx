'use client';

import { useState, useEffect } from 'react';
import { ExecutionBoard, DailyAction } from '@/lib/types';
import { getTodayLog, saveDailyLog } from '@/lib/storage';
import toast from 'react-hot-toast';

interface DailyViewProps {
  board: ExecutionBoard;
  onBackToBoard: () => void;
}

export default function DailyView({ board, onBackToBoard }: DailyViewProps) {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [reflection, setReflection] = useState('');

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateString = today.toISOString().split('T')[0];

  // Get current week actions
  const currentWeek = board.execution[0]; // For MVP, using first week
  const todayActions: DailyAction[] = currentWeek?.days[dayName] || [];

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
    } else {
      newCompleted.add(actionId);
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

  const handleSaveReflection = () => {
    if (board.id) {
      saveDailyLog({
        boardId: board.id,
        date: dateString,
        completedActions: Array.from(completedActions),
        mood: mood || undefined,
        reflection: reflection || undefined,
      });
      toast.success('Daily reflection saved!');
    }
  };

  const completionRate = todayActions.length > 0
    ? Math.round((completedActions.size / todayActions.length) * 100)
    : 0;

  const oneThingAction = todayActions.find(a => a.isOneThingAction);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <button
          onClick={onBackToBoard}
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Back to Board
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Today's Execution
        </h1>
        <p className="text-lg text-gray-600">
          {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Daily Progress</span>
            <span className="text-sm font-semibold text-gray-700">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Vision Reminder */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-xl p-6 mb-6 text-white">
        <p className="text-xl font-bold mb-2">{board.vision.mantra}</p>
        <p className="italic">{board.vision.identity}</p>
      </div>

      {/* ONE Thing Action */}
      {oneThingAction && (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-yellow-900 mb-3">⭐ Your ONE Thing Today</h2>
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={completedActions.has(oneThingAction.id)}
              onChange={() => toggleAction(oneThingAction.id)}
              className="mt-1 w-6 h-6 text-yellow-600 rounded focus:ring-2 focus:ring-yellow-500"
            />
            <div className="flex-1">
              <p className="text-lg text-gray-900 group-hover:text-yellow-900 transition-colors">
                {oneThingAction.description}
              </p>
              <p className="text-sm text-gray-600 mt-1">{oneThingAction.duration}</p>
            </div>
          </label>
        </div>
      )}

      {/* Today's Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Actions</h2>

        {todayActions.length === 0 ? (
          <p className="text-gray-600">No actions scheduled for today.</p>
        ) : (
          <div className="space-y-3">
            {todayActions.filter(a => !a.isOneThingAction).map((action) => (
              <label
                key={action.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={completedActions.has(action.id)}
                  onChange={() => toggleAction(action.id)}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <p className={`text-gray-900 ${completedActions.has(action.id) ? 'line-through text-gray-500' : ''}`}>
                    {action.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{action.duration}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Evening Check-in */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Evening Check-in</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              How did today go?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setMood(value as 1 | 2 | 3 | 4 | 5)}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                    mood === value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">
                    {value === 1 && '😔'}
                    {value === 2 && '😕'}
                    {value === 3 && '😐'}
                    {value === 4 && '😊'}
                    {value === 5 && '🎉'}
                  </div>
                  <div className="text-xs">
                    {value === 1 && 'Struggled'}
                    {value === 2 && 'OK'}
                    {value === 3 && 'Good'}
                    {value === 4 && 'Great'}
                    {value === 5 && 'Amazing'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="reflection" className="block text-sm font-semibold text-gray-700 mb-2">
              Daily Reflection (optional)
            </label>
            <textarea
              id="reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What went well? What could be improved? Any insights?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          <button
            onClick={handleSaveReflection}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Save Check-in
          </button>
        </div>
      </div>

      {/* Habits Reminder */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Daily Habits</h2>

        <div className="space-y-3">
          {board.habits.map((habit, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
              <span className="text-2xl">
                {habit.type === 'morning' && '🌅'}
                {habit.type === 'deepwork' && '💪'}
                {habit.type === 'evening' && '🌙'}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 capitalize">
                  {habit.type === 'deepwork' ? 'Deep Work' : habit.type} - {habit.time}
                </p>
                <p className="text-sm text-gray-600">{habit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
