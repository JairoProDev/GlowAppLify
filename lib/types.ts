// Execution Board Types - Revolutionary GlowApplify Spec

export interface VisionLayer {
  futureVision: string; // "Expand their exact words into 2-3 vivid sentences, present tense"
  mantra: string; // "Create 5-7 word mantra that captures essence"
}

export interface KPI {
  metric: string; // "Input metric (what they control)"
  target: string | number; // "Specific number"
  deadline: string; // "30 days from now"
}

export interface GoalLayer {
  smartGoal: string; // "Make their goal SMART"
  deadline: string; // "90 days from today"
  kpis: KPI[];
}

export interface Action {
  day: number; // 1-7
  action: string; // "[Verb] [specific deliverable]"
  time: string; // "[realistic hours]"
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  completed?: boolean;
}

export interface Week {
  weekNumber: number;
  theme: string; // "Specific theme (not generic)"
  milestone: string; // "Concrete deliverable by end of week"
  actions: Action[]; // 5 actions per week
  isCompleted?: boolean;
}

export interface ExecutionLayer {
  weeks: Week[];
}

export interface IfThenPlan {
  if: string; // "Specific obstacle"
  then: string[]; // ["Concrete action 1", "Concrete action 2"]
}

export interface ObstacleLayer {
  plans: IfThenPlan[];
}

export interface HabitStep {
  name: string;
}

export interface HabitRoutine {
  time: string; // "08:00"
  duration: string; // "15 min"
  steps: string[]; // ["Step 1", "Step 2"]
  rules?: string[]; // Optional rules like "No phone"
}

export interface HabitsLayer {
  morning: HabitRoutine;
  deepWork: HabitRoutine;
  evening: HabitRoutine;
}

export interface ExecutionBoard {
  id?: string;
  userId?: string;
  createdAt?: string;

  // 5 Layers
  vision_layer: VisionLayer;
  goal_layer: GoalLayer;
  execution_layer: ExecutionLayer;
  obstacle_layer: ObstacleLayer;
  habits_layer: HabitsLayer;

  // Meta
  settings?: any;
}

export interface OnboardingData {
  goal: string;
  context: {
    timePerDay: string;
    energyLevel?: string;
  };
  pastAttempts: {
    obstacles: string[];
  };
  futureSelf: {
    vision: string;
  };
}

export interface DailyLog {
  id?: string;
  boardId: string;
  date: string;
  completedActions: string[];
  mood?: number;
  reflection?: string;
  createdAt?: string;
}
