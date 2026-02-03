'use client';

import { useState, useEffect } from 'react';
import { ExecutionBoard } from '@/lib/types';
import { detectLanguage, t, Language } from '@/lib/i18n';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Sparkles, Save, X, Globe, Download, PlayCircle } from "lucide-react";
import { VisionSection } from '@/components/board/VisionSection';
import { GoalSection } from '@/components/board/GoalSection';
import { ExecutionSection } from '@/components/board/ExecutionSection';
import { ObstaclesSection } from '@/components/board/ObstaclesSection';
import { HabitsSection } from '@/components/board/HabitsSection';

interface ExecutionBoardViewProps {
  board: ExecutionBoard;
  onBoardUpdated: (board: ExecutionBoard) => void;
  onStartDaily: () => void;
}

export default function ExecutionBoardView({ board, onBoardUpdated, onStartDaily }: ExecutionBoardViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBoard, setEditedBoard] = useState<ExecutionBoard>(board);
  const [language, setLanguage] = useState<Language>('en');

  // Sync editedBoard when board prop changes (re-fetch etc)
  useEffect(() => {
    setEditedBoard(board);
  }, [board]);

  useEffect(() => {
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
    // Mock export functionality
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(board, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "execution_board.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success("Board exported!");
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
    <div className="min-h-screen py-8 space-y-8 animate-in fade-in zoom-in duration-500">

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card rounded-2xl p-6 shadow-sm border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Execution Board
          </h1>
          <p className="text-muted-foreground">Your 90-day transformation tactical plan.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={toggleLanguage}>
            <Globe className="h-4 w-4 mr-2" />
            {language === 'en' ? 'ES' : 'EN'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          {isEditing ? (
            <>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
            </>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}

          <Button onClick={onStartDaily} className="bg-primary hover:bg-primary/90">
            <PlayCircle className="h-4 w-4 mr-2" /> Start Daily
          </Button>
        </div>
      </div>

      {/* Sections */}
      <VisionSection
        vision={currentBoard.vision}
        isEditing={isEditing}
        onChange={(v) => setEditedBoard({ ...editedBoard, vision: v })}
      />

      <GoalSection
        goal={currentBoard.goal}
        isEditing={isEditing}
        onChange={(g) => setEditedBoard({ ...editedBoard, goal: g })}
      />

      <ExecutionSection
        execution={currentBoard.execution}
        isEditing={isEditing}
      />

      <ObstaclesSection
        obstacles={currentBoard.obstacles}
        isEditing={isEditing}
      />

      <HabitsSection
        habits={currentBoard.habits}
        isEditing={isEditing}
      />

    </div>
  );
}
