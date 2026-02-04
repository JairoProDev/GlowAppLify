export type LifeAreaName =
    | 'CAREER'
    | 'HEALTH'
    | 'RELATIONSHIPS'
    | 'LEARNING'
    | 'FINANCES'
    | 'HOBBIES';

export interface LifeArea {
    id: string;
    userId: string;
    name: LifeAreaName;
    targetPercentage: number;
    color: string;
}

export type EventType =
    | 'DEEP_WORK_CREATIVE'
    | 'DEEP_WORK_ANALYTICAL'
    | 'SHALLOW_WORK'
    | 'MEETING_GROUP'
    | 'MEETING_ONE_ON_ONE'
    | 'HEALTH_FITNESS'
    | 'RELATIONSHIP'
    | 'LEARNING'
    | 'ROUTINE'
    | 'BLOCKER';

export type EventStatus = 'scheduled' | 'completed' | 'skipped' | 'rescheduled';

export interface CalendarEvent {
    id: string;
    userId: string;
    goalId?: string;
    title: string;
    description?: string;
    startTime: Date | string;
    endTime: Date | string;
    timeZone: string;
    type: EventType;
    energyRequired: 'low' | 'medium' | 'high';
    actualEnergyLog?: number; // 0-100
    focusScore?: number; // 0-100
    status: EventStatus;
    isRecurring: boolean;
    recurrenceRule?: string;
}

export interface DraggedEvent {
    id: string;
    originalStart: Date;
    originalEnd: Date;
    newStart: Date;
    newEnd: Date;
}

// Colors for the UI based on the design system
export const EVENT_COLORS: Record<EventType, { bg: string; border: string; text: string; hover: string }> = {
    DEEP_WORK_CREATIVE: {
        bg: 'bg-orange-500/10 dark:bg-orange-500/20',
        border: 'border-orange-500/50',
        text: 'text-orange-700 dark:text-orange-200',
        hover: 'hover:bg-orange-500/20 dark:hover:bg-orange-500/30'
    },
    DEEP_WORK_ANALYTICAL: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        border: 'border-blue-500/50',
        text: 'text-blue-700 dark:text-blue-200',
        hover: 'hover:bg-blue-500/20 dark:hover:bg-blue-500/30'
    },
    SHALLOW_WORK: {
        bg: 'bg-slate-500/10 dark:bg-slate-500/20',
        border: 'border-slate-500/50',
        text: 'text-slate-700 dark:text-slate-200',
        hover: 'hover:bg-slate-500/20 dark:hover:bg-slate-500/30'
    },
    MEETING_GROUP: {
        bg: 'bg-yellow-500/10 dark:bg-yellow-500/20',
        border: 'border-yellow-500/50',
        text: 'text-yellow-700 dark:text-yellow-200',
        hover: 'hover:bg-yellow-500/20 dark:hover:bg-yellow-500/30'
    },
    MEETING_ONE_ON_ONE: {
        bg: 'bg-green-500/10 dark:bg-green-500/20',
        border: 'border-green-500/50',
        text: 'text-green-700 dark:text-green-200',
        hover: 'hover:bg-green-500/20 dark:hover:bg-green-500/30'
    },
    HEALTH_FITNESS: {
        bg: 'bg-red-500/10 dark:bg-red-500/20',
        border: 'border-red-500/50',
        text: 'text-red-700 dark:text-red-200',
        hover: 'hover:bg-red-500/20 dark:hover:bg-red-500/30'
    },
    RELATIONSHIP: {
        bg: 'bg-pink-500/10 dark:bg-pink-500/20',
        border: 'border-pink-500/50',
        text: 'text-pink-700 dark:text-pink-200',
        hover: 'hover:bg-pink-500/20 dark:hover:bg-pink-500/30'
    },
    LEARNING: {
        bg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
        border: 'border-indigo-500/50',
        text: 'text-indigo-700 dark:text-indigo-200',
        hover: 'hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30'
    },
    ROUTINE: {
        bg: 'bg-teal-500/10 dark:bg-teal-500/20',
        border: 'border-teal-500/50',
        text: 'text-teal-700 dark:text-teal-200',
        hover: 'hover:bg-teal-500/20 dark:hover:bg-teal-500/30'
    },
    BLOCKER: {
        bg: 'bg-zinc-800/80',
        border: 'border-zinc-700',
        text: 'text-zinc-400',
        hover: 'hover:bg-zinc-800'
    }
};
