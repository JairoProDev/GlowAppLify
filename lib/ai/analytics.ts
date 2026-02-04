
import { AnalyticsOverview, Insight, WeeklyProgress, StoryCardData } from '../types/analytics';
import { ExecutionBoard, Week } from '../types';

export const mockInsights: Insight[] = [
    {
        id: '1',
        type: 'pattern',
        title: 'Morning Ritual Effect',
        description: 'You complete 2x more actions on days you do your morning ritual.',
        data: { withRitual: '83%', withoutRitual: '40%' },
        action: 'Protect your 6:30am morning ritual.',
        canApplyAutomatically: false,
    },
    {
        id: '2',
        type: 'prediction',
        title: 'At Your Current Pace',
        description: 'You\'ll complete Week 1 by Friday (2 days ahead of schedule). Week 2 looks manageable.',
        action: 'Keep this momentum!',
        canApplyAutomatically: false,
    },
    {
        id: '3',
        type: 'recommendation',
        title: 'Optimize Thursday',
        description: 'Thursdays are your struggle day. Consider moving heavy tasks to Tuesday.',
        action: 'Reschedule Thursday tasks',
        canApplyAutomatically: true,
    }
];

export const mockStory: StoryCardData = {
    title: "You're crushing Week 1! 🔥",
    content: [
        "You validated your problem hypothesis with 10 user interviews. This is HUGE - most founders skip this and build the wrong thing.",
        "Your pace: Slightly ahead (60% by Day 3)",
        "Tomorrow: Analyze feedback patterns. This will clarify your MVP scope."
    ],
    sentiment: 'positive',
    stats: [
        { label: 'Pace', value: 'Ahead' },
        { label: 'Energy', value: 'High' }
    ]
};

export async function getAnalyticsData(board: ExecutionBoard): Promise<AnalyticsOverview> {
    // In a real app, this would fetch from DB/API
    // For now, we calculate based on the board + mock random completion

    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const totalWeeks = board.execution_layer.weeks.length;
    // Let's assume user is on Week 1, Day 3
    const currentWeekIndex = 0;
    const currentWeekData = board.execution_layer.weeks[currentWeekIndex];

    // Calculate mock completion
    const totalActions = 12 * 5; // 12 weeks * 5 actions
    const completedActions = 8; // Mock

    const weeklyProgress: WeeklyProgress = {
        weekNumber: currentWeekData.weekNumber,
        theme: currentWeekData.theme,
        milestone: currentWeekData.milestone,
        totalActions: currentWeekData.actions.length,
        completedActions: 3, // Mock
        completionRate: 60,
        status: 'active',
        milestoneCompleted: false,
        actions: currentWeekData.actions.map((action, idx) => ({
            ...action,
            completed: idx < 3 // First 3 completed
        }))
    };

    return {
        currentDate: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
        daysActive: 7,
        streak: 3,
        totalActionsCompleted: completedActions,
        totalActions: totalActions,
        overallCompletionRate: Math.round((completedActions / totalActions) * 100),
        goal: board.goal_layer?.smartGoal || "Launch MVP with 10 paying customers",
        goalDeadline: board.goal_layer?.deadline || "May 1st",
        currentWeek: weeklyProgress,
        story: mockStory,
        trends: {
            completionRateMovement: 'up',
            bestDay: 'Tuesday',
            struggleDay: 'Thursday',
        },
        insights: mockInsights
    };
}
