'use client';

import { useState } from 'react';
import { ExecutionBoard } from '@/lib/types';
import toast from 'react-hot-toast';

interface OnboardingFormProps {
  onBoardGenerated: (board: ExecutionBoard) => void;
}

export default function OnboardingForm({ onBoardGenerated }: OnboardingFormProps) {
  const [goal, setGoal] = useState('');
  const [context, setContext] = useState('');
  const [timeAvailable, setTimeAvailable] = useState('');
  const [obstacles, setObstacles] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!goal.trim()) {
      toast.error('Please enter your goal');
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
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate board');
      }

      const board: ExecutionBoard = await response.json();
      toast.success('Execution board generated!');
      onBoardGenerated(board);
    } catch (error: any) {
      console.error('Error generating board:', error);
      toast.error(error.message || 'Failed to generate board. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            GlowAppLify
          </h1>
          <p className="text-lg text-gray-600">
            Transform your goal into an execution board in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="goal" className="block text-sm font-semibold text-gray-700 mb-2">
              What's your ONE goal for the next 90 days? *
            </label>
            <textarea
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Example: I want to launch my online business, lose 20 pounds, learn to code, write a book..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="context" className="block text-sm font-semibold text-gray-700 mb-2">
              What's your situation? (optional)
            </label>
            <input
              id="context"
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Example: full-time student, working 9-5, entrepreneur, parent..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
              How much time can you dedicate per day? (optional)
            </label>
            <input
              id="time"
              type="text"
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(e.target.value)}
              placeholder="Example: 15 minutes, 1 hour, 2-3 hours..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="obstacles" className="block text-sm font-semibold text-gray-700 mb-2">
              What obstacles have stopped you before? (optional)
            </label>
            <input
              id="obstacles"
              type="text"
              value={obstacles}
              onChange={(e) => setObstacles(e.target.value)}
              placeholder="Example: lack of time, procrastination, unclear plan..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">Separate multiple obstacles with commas</p>
          </div>

          <button
            type="submit"
            disabled={loading || !goal.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating your execution board...
              </span>
            ) : (
              'Generate My Execution Board'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>This usually takes 10-30 seconds</p>
        </div>
      </div>
    </div>
  );
}
