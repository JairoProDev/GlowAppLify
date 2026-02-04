## ⚙️ PARTE 5: IMPLEMENTACIÓN TÉCNICA

### 5.1 AI INSIGHTS GENERATION

```typescript
// /lib/ai/generateProgressInsights.ts

export async function generateProgressInsights(user, board) {
  const history = await getActionHistory(user.id, 30); // Last 30 days
  const patterns = detectPatterns(history);
  
  const prompt = `
  USER CONTEXT:
  - Goal: ${board.goal_layer.smartGoal}
  - Current week: ${getCurrentWeek()} of 12
  - Days active: ${history.length}
  
  DETECTED PATTERNS:
  ${JSON.stringify(patterns, null, 2)}
  
  TASK:
  Generate 2-3 actionable insights for this user.
  
  Focus on:
  1. What's working (reinforce positive behaviors)
  2. What's not working (identify obstacles)
  3. What to adjust (specific recommendations)
  
  RULES:
  - Be specific (use actual data, not generic)
  - Be actionable (user can DO something)
  - Be encouraging (growth mindset)
  - Connect to 90-day goal (show big picture)
  
  FORMAT:
  [
    {
      "type": "pattern" | "prediction" | "recommendation",
      "title": "Short title (5-7 words)",
      "description": "2-3 sentences explaining",
      "data": { relevant numbers },
      "action": "What user should do",
      "canApplyAutomatically": true/false
    }
  ]
  `;
  
  const response = await callClaudeAPI(prompt);
  return JSON.parse(response);
}

function detectPatterns(history) {
  return {
    // Morning ritual correlation
    morningRitualEffect: calculateCorrelation(
      history,
      'morning_ritual_done',
      'actions_completed'
    ),
    
    // Best/worst days
    bestDay: findBestDay(history),
    worstDay: findWorstDay(history),
    
    // Time of day patterns
    timeOfDayPerformance: analyzeTimePatterns(history),
    
    // Task type success
    taskTypeSuccess: {
      creative: calculateSuccessRate(history, 'creative'),
      analytical: calculateSuccessRate(history, 'analytical'),
      administrative: calculateSuccessRate(history, 'administrative')
    },
    
    // Completion trends
    completionTrend: {
      week1: calculateWeeklyAvg(history, 1),
      week2: calculateWeeklyAvg(history, 2),
      trend: calculateTrend([week1, week2]) // 'up' | 'down' | 'stable'
    },
    
    // Pace prediction
    pace: {
      current: calculateCurrentPace(history),
      needed: calculateNeededPace(board),
      status: 'ahead' | 'on_track' | 'behind'
    }
  };
}
```

### 5.2 PREDICTIVE MODELING

```typescript
// /lib/ai/predictFuture.ts

export function predictGoalCompletion(user, board, history) {
  const currentWeek = getCurrentWeek();
  const weeksRemaining = 12 - currentWeek;
  
  // Calculate historical completion rate
  const avgActionsPerWeek = calculateAverage(
    history.map(week => week.actionsCompleted)
  );
  
  // Get remaining actions
  const remainingActions = countRemainingActions(board, currentWeek);
  
  // Predict completion
  const weeksNeeded = Math.ceil(remainingActions / avgActionsPerWeek);
  
  const prediction = {
    status: weeksNeeded <= weeksRemaining ? 'on_track' : 'at_risk',
    weeksNeeded,
    weeksAvailable: weeksRemaining,
    buffer: weeksRemaining - weeksNeeded,
    completionDate: addWeeks(new Date(), weeksNeeded),
    confidence: calculateConfidence(history) // Based on consistency
  };
  
  // Generate recommendations
  if (prediction.status === 'at_risk') {
    prediction.recommendations = [
      {
        action: 'reduce_scope',
        description: `Reduce to ${avgActionsPerWeek * weeksRemaining} actions`,
        impact: 'Ensures completion on time'
      },
      {
        action: 'extend_deadline',
        description: `Extend deadline ${weeksNeeded - weeksRemaining} weeks`,
        impact: 'Keeps current pace sustainable'
      },
      {
        action: 'increase_pace',
        description: `Increase to ${Math.ceil(remainingActions / weeksRemaining)} actions/week`,
        impact: 'Challenging but possible'
      }
    ];
  }
  
  return prediction;
}
```

### 5.3 DATABASE QUERIES (Optimized)

```sql
-- Get weekly progress
CREATE OR REPLACE FUNCTION get_weekly_progress(p_board_id UUID, p_week INT)
RETURNS JSON AS $$
SELECT json_build_object(
  'week', p_week,
  'total_actions', COUNT(*),
  'completed', COUNT(*) FILTER (WHERE completed_at IS NOT NULL),
  'completion_rate', 
    ROUND(
      COUNT(*) FILTER (WHERE completed_at IS NOT NULL)::DECIMAL / 
      COUNT(*)::DECIMAL * 100
    , 0),
  'actions', json_agg(
    json_build_object(
      'action', action,
      'completed', completed_at IS NOT NULL,
      'time_spent', time_spent_minutes
    )
  )
)
FROM daily_action_logs
WHERE board_id = p_board_id
  AND action_week = p_week;
$$ LANGUAGE SQL;

-- Get pattern analysis data
CREATE OR REPLACE FUNCTION get_pattern_data(p_user_id UUID, p_days INT)
RETURNS JSON AS $$
WITH daily_stats AS (
  SELECT 
    date,
    COUNT(*) as total_actions,
    COUNT(*) FILTER (WHERE completed_at IS NOT NULL) as completed_actions,
    bool_or(morning_ritual_done) as had_morning_ritual,
    EXTRACT(DOW FROM date) as day_of_week,
    AVG(time_spent_minutes) as avg_time
  FROM daily_action_logs dal
  JOIN execution_boards eb ON dal.board_id = eb.id
  WHERE eb.user_id = p_user_id
    AND date >= CURRENT_DATE - p_days
  GROUP BY date
)
SELECT json_build_object(
  'with_morning_ritual', (
    SELECT json_build_object(
      'count', COUNT(*),
      'avg_completed', AVG(completed_actions),
      'completion_rate', AVG(completed_actions::DECIMAL / NULLIF(total_actions, 0))
    )
    FROM daily_stats
    WHERE had_morning_ritual = true
  ),
  'without_morning_ritual', (
    SELECT json_build_object(
      'count', COUNT(*),
      'avg_completed', AVG(completed_actions),
      'completion_rate', AVG(completed_actions::DECIMAL / NULLIF(total_actions, 0))
    )
    FROM daily_stats
    WHERE had_morning_ritual = false
  ),
  'by_day_of_week', (
    SELECT json_object_agg(
      day_of_week,
      json_build_object(
        'avg_completed', AVG(completed_actions),
        'completion_rate', AVG(completed_actions::DECIMAL / NULLIF(total_actions, 0))
      )
    )
    FROM daily_stats
    GROUP BY day_of_week
  )
)
FROM daily_stats
LIMIT 1;
$$ LANGUAGE SQL;
```

---