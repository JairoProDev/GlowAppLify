// Simple storage utility for MVP
// Currently uses localStorage, can be migrated to Supabase later

import { ExecutionBoard, DailyLog } from './types';

export const STORAGE_KEYS = {
  BOARD: 'execution_board',
  LOGS: 'daily_logs',
  USER_ID: 'user_id',
};

// Generate a simple user ID (in production, use actual auth)
export function getUserId(): string {
  let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  }
  return userId;
}

// Board operations
export function saveBoard(board: ExecutionBoard): void {
  const boardWithMeta = {
    ...board,
    id: board.id || `board_${Date.now()}`,
    userId: getUserId(),
    createdAt: board.createdAt || new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.BOARD, JSON.stringify(boardWithMeta));
}

export function getBoard(): ExecutionBoard | null {
  const boardData = localStorage.getItem(STORAGE_KEYS.BOARD);
  if (!boardData) return null;
  return JSON.parse(boardData) as ExecutionBoard;
}

export function deleteBoard(): void {
  localStorage.removeItem(STORAGE_KEYS.BOARD);
}

// Daily logs operations
export function saveDailyLog(log: DailyLog): void {
  const logs = getDailyLogs();
  const logWithMeta = {
    ...log,
    id: log.id || `log_${Date.now()}`,
    createdAt: log.createdAt || new Date().toISOString(),
  };

  // Update existing log for the same date or add new one
  const existingIndex = logs.findIndex(
    l => l.boardId === log.boardId && l.date === log.date
  );

  if (existingIndex >= 0) {
    logs[existingIndex] = logWithMeta;
  } else {
    logs.push(logWithMeta);
  }

  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
}

export function getDailyLogs(): DailyLog[] {
  const logsData = localStorage.getItem(STORAGE_KEYS.LOGS);
  if (!logsData) return [];
  return JSON.parse(logsData) as DailyLog[];
}

export function getDailyLog(boardId: string, date: string): DailyLog | null {
  const logs = getDailyLogs();
  return logs.find(l => l.boardId === boardId && l.date === date) || null;
}

export function getTodayLog(boardId: string): DailyLog | null {
  const today = new Date().toISOString().split('T')[0];
  return getDailyLog(boardId, today);
}
