'use client';

import { useState, useEffect } from 'react';
import { ExecutionBoard } from '@/lib/types';
import { getBoard, saveBoard } from '@/lib/storage';
import OnboardingForm from '@/components/OnboardingForm';
import ExecutionBoardView from '@/components/ExecutionBoardView';
import DailyView from '@/components/DailyView';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const [board, setBoard] = useState<ExecutionBoard | null>(null);
  const [view, setView] = useState<'onboarding' | 'board' | 'daily'>('onboarding');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user already has a board
    const existingBoard = getBoard();
    if (existingBoard) {
      setBoard(existingBoard);
      setView('board');
    }
    setLoading(false);
  }, []);

  const handleBoardGenerated = (newBoard: ExecutionBoard) => {
    saveBoard(newBoard);
    setBoard(newBoard);
    setView('board');
  };

  const handleBoardUpdated = (updatedBoard: ExecutionBoard) => {
    saveBoard(updatedBoard);
    setBoard(updatedBoard);
  };

  const handleStartDaily = () => {
    setView('daily');
  };

  const handleBackToBoard = () => {
    setView('board');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background-alt)' }}>
        <div className="text-lg" style={{ color: 'var(--gray-600)' }}>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--gray-200)',
          },
        }}
      />
      <div className="min-h-screen">
        {view === 'onboarding' && (
          <OnboardingForm onBoardGenerated={handleBoardGenerated} />
        )}

        {view === 'board' && board && (
          <ExecutionBoardView
            board={board}
            onBoardUpdated={handleBoardUpdated}
            onStartDaily={handleStartDaily}
          />
        )}

        {view === 'daily' && board && (
          <DailyView
            board={board}
            onBackToBoard={handleBackToBoard}
          />
        )}
      </div>
    </>
  );
}
