'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExecutionBoard } from '@/lib/types';
import { getBoard, saveBoard } from '@/lib/storage';
import OnboardingForm from '@/components/OnboardingForm';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user already has a board
    const existingBoard = getBoard();
    if (existingBoard) {
      router.push('/dashboard');
    }
    setLoading(false);
  }, [router]);

  const handleBoardGenerated = (newBoard: ExecutionBoard) => {
    saveBoard(newBoard);
    // Redirect to dashboard after generation
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Render Onboarding if checking is done and no redirect happened (so no board)
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
      <div className="min-h-screen bg-background">
        <OnboardingForm onBoardGenerated={handleBoardGenerated} />
      </div>
    </>
  );
}
