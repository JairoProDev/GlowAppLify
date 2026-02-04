"use client"

import { useState, useEffect } from 'react';
import { ExecutionBoard } from '@/lib/types';
import { detectLanguage, t, Language } from '@/lib/i18n';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Save, X, Globe, Target, Layers, ShieldAlert, Repeat } from "lucide-react";
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

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLang);
      window.dispatchEvent(new Event('language-change'));
    }
  };

  const currentBoard = isEditing ? editedBoard : board;

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in zoom-in duration-500">

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card rounded-2xl p-6 shadow-sm border shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Execution Board
          </h1>
          <p className="text-muted-foreground">Your 90-day transformation tactical plan.</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Language toggle or other actions */}
          <Button variant="outline" size="sm" onClick={toggleLanguage}>
            <Globe className="h-4 w-4 mr-2" />
            {language === 'en' ? 'ES' : 'EN'}
          </Button>

          {isEditing ? (
            <>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
              Edit Board
            </Button>
          )}
        </div>
      </div>

      {/* Tabs for Navigation */}
      <Tabs defaultValue="vision" className="flex-1 flex flex-col overflow-hidden">
        <div className="overflow-x-auto pb-2 shrink-0">
          <TabsList className="w-full justify-start h-auto p-1 bg-secondary/30 gap-1 rounded-xl">
            <TabsTrigger value="vision" className="gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sparkles className="h-4 w-4" /> Vision
            </TabsTrigger>
            <TabsTrigger value="goal" className="gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Target className="h-4 w-4" /> Goal
            </TabsTrigger>
            <TabsTrigger value="execution" className="gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Layers className="h-4 w-4" /> Execution
            </TabsTrigger>
            <TabsTrigger value="obstacles" className="gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShieldAlert className="h-4 w-4" /> Obstacles
            </TabsTrigger>
            <TabsTrigger value="habits" className="gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Repeat className="h-4 w-4" /> Habits
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto mt-2 pr-2 scrollbar-thin pb-10">
          <TabsContent value="vision" className="mt-0 h-full">
            <VisionSection
              vision={currentBoard.vision_layer}
              isEditing={isEditing}
            />
          </TabsContent>

          <TabsContent value="goal" className="mt-0 h-full">
            <GoalSection
              goal={currentBoard.goal_layer}
              isEditing={isEditing}
            />
          </TabsContent>

          <TabsContent value="execution" className="mt-0 h-full">
            <ExecutionSection
              execution={currentBoard.execution_layer}
              isEditing={isEditing}
            />
          </TabsContent>

          <TabsContent value="obstacles" className="mt-0 h-full">
            <ObstaclesSection
              obstacles={currentBoard.obstacle_layer}
              isEditing={isEditing}
            />
          </TabsContent>

          <TabsContent value="habits" className="mt-0 h-full">
            <HabitsSection
              habits={currentBoard.habits_layer}
              isEditing={isEditing}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
