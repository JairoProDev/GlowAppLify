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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
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
