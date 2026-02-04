
import { Week, Action } from '../types';

export type InsightType = 'pattern' | 'prediction' | 'recommendation';

export interface Insight {
    id: string;
    type: InsightType;
    title: string;
    description: string;
    data?: Record<string, any>;
    action?: string;
    canApplyAutomatically?: boolean;
}

export interface WeeklyProgress {
    weekNumber: number;
    totalActions: number;
    completedActions: number;
    completionRate: number;
    status: 'locked' | 'active' | 'completed' | 'on_track' | 'at_risk';
    milestone: string;
    milestoneCompleted: boolean;
    actions: Action[];
    theme: string;
}

export interface StoryCardData {
    title: string;
    content: string[]; // Paragraphs
    sentiment: 'positive' | 'neutral' | 'warning';
    stats?: {
        label: string;
        value: string;
    }[];
}

export interface AnalyticsOverview {
    currentDate: string;
    daysActive: number;
    streak: number;
    totalActionsCompleted: number;
    totalActions: number;
    overallCompletionRate: number;
    goal: string;
    goalDeadline: string;

    currentWeek: WeeklyProgress;
    story: StoryCardData;

    trends: {
        completionRateMovement: 'up' | 'down' | 'stable';
        bestDay: string;
        struggleDay: string;
    };

    insights: Insight[];
}
