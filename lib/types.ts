// Execution Board Types based on the 5-layer framework

export interface Vision {
  identity: string; // "I am a..."
  mantra: string; // 3-5 words
  futureImage: string; // Description of future self
}

export interface Goal {
  statement: string; // SMART goal
  type: 'Biology' | 'Capital' | 'Intellect' | 'Legacy' | 'Social' | 'Spirit';
  kpis: {
    metric: string;
    target: number;
    unit: string;
  }[];
  deadline: string; // ISO date string (90 days from creation)
}

export interface DailyAction {
  id: string;
  description: string;
  duration: string; // "5-15 min"
  isOneThingAction: boolean; // Highest impact action
  completed?: boolean;
}

export interface WeeklyExecution {
  weekNumber: number; // 1-13 for 90 days
  focus: string; // Weekly theme
  days: {
    [key: string]: DailyAction[]; // Monday-Sunday
  };
}

export interface Obstacle {
  description: string;
  ifThenPlan: string; // "IF X happens, THEN I will Y"
}

export interface Habit {
  type: 'morning' | 'deepwork' | 'evening';
  time: string; // "7:00 AM"
  description: string;
  streak?: number;
}

export interface ExecutionBoard {
  id?: string;
  userId?: string;
  createdAt?: string;

  // 5 Layers
  vision: Vision;
  goal: Goal;
  execution: WeeklyExecution[];
  obstacles: Obstacle[];
  habits: Habit[];

  // Status
  status: 'active' | 'completed' | 'archived';
  currentWeek?: number;
}

export interface DailyLog {
  id?: string;
  boardId: string;
  date: string; // ISO date
  completedActions: string[]; // Array of action IDs
  mood?: 1 | 2 | 3 | 4 | 5;
  reflection?: string;
  createdAt?: string;
}

export interface OnboardingInput {
  goal: string;
  context?: string;
  timeAvailable?: string;
  obstacles?: string[];
}
