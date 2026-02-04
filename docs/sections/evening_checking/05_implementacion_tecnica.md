## ⚙️ PARTE 5: IMPLEMENTACIÓN TÉCNICA

### 5.1 COMPONENT STRUCTURE

```typescript
// /app/check-in/page.tsx

import CheckInPrompt from '@/components/checkin/CheckInPrompt';
import Scorecard from '@/components/checkin/Scorecard';
import MoodSelector from '@/components/checkin/MoodSelector';
import ReflectionInput from '@/components/checkin/ReflectionInput';
import InsightsScreen from '@/components/checkin/InsightsScreen';
import TomorrowPreview from '@/components/checkin/TomorrowPreview';
import ClosureScreen from '@/components/checkin/ClosureScreen';

export default function EveningCheckIn() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  
  const steps = [
    <CheckInPrompt onStart={() => setStep(1)} />,
    <Scorecard onContinue={() => setStep(2)} />,
    <MoodSelector onSelect={(mood) => {
      setData({...data, mood});
      setStep(3);
    }} />,
    <ReflectionInput onSave={(text) => {
      setData({...data, reflection: text});
      processCheckIn(data);
      setStep(4);
    }} />,
    <InsightsScreen 
      insights={aiInsights}
      onContinue={() => setStep(5)}
    />,
    <TomorrowPreview 
      tomorrow={tomorrowPlan}
      onContinue={() => setStep(6)}
    />,
    <ClosureScreen onComplete={enterSleepMode} />
  ];
  
  return (
    <div className="checkin-container">
      {steps[step]}
    </div>
  );
}
```

### 5.2 AI INSIGHTS GENERATION

```typescript
// /lib/ai/generateInsights.ts

export async function generateInsights(user, checkinData) {
  // Get recent history
  const last7Days = await getCheckinHistory(user.id, 7);
  const board = await getActiveBoard(user.id);
  
  // Analyze patterns
  const patterns = detectPatterns(last7Days, checkinData);
  
  // Generate insights with Claude
  const prompt = `
  USER CONTEXT:
  - Goal: ${board.goal_layer.smartGoal}
  - Week: ${getCurrentWeek()} of 12
  - Today's mood: ${checkinData.mood}
  - Completed: ${checkinData.completed.length} actions
  - Incomplete: ${checkinData.incomplete.length} actions
  
  RECENT PATTERNS:
  ${JSON.stringify(patterns, null, 2)}
  
  TODAY'S REFLECTION:
  "${checkinData.reflection}"
  
  TASK:
  Generate personalized evening insights.
  
  Based on the data:
  1. What pattern is emerging? (if any)
  2. What's the root cause? (not just symptom)
  3. What's a concrete, actionable suggestion?
  4. How does this relate to their 90-day goal?
  
  TONE:
  - Supportive but honest
  - Specific, not generic
  - Actionable, not just observational
  - Growth mindset framing
  
  FORMAT:
  {
    "pattern": "2-3 sentences describing pattern",
    "cause": "1-2 sentences on root cause",
    "suggestion": "Concrete action user can take",
    "canApplyAutomatically": true/false,
    "encouragement": "1 sentence motivational"
  }
  `;
  
  const response = await callClaudeAPI(prompt);
  return JSON.parse(response);
}

function detectPatterns(history, today) {
  return {
    // Completion trend
    completionTrend: {
      last7Days: history.map(d => d.completionRate),
      average: calculateAverage(history.map(d => d.completionRate)),
      trend: calculateTrend(history.map(d => d.completionRate)) // 'up' | 'down' | 'stable'
    },
    
    // Mood trend
    moodTrend: {
      last7Days: history.map(d => d.mood),
      consecutiveBad: countConsecutive(history, 'struggled'),
      improving: isImproving(history.map(d => d.mood))
    },
    
    // Time estimation accuracy
    timeEstimation: {
      estimatedVsActual: history.map(d => ({
        estimated: d.estimatedHours,
        actual: d.actualHours,
        ratio: d.actualHours / d.estimatedHours
      })),
      averageOverrun: calculateAverageOverrun(history)
    },
    
    // Task type patterns
    taskTypes: {
      creativeTasksOverrun: checkTaskTypePattern(history, 'creative'),
      analyticalTasksOverrun: checkTaskTypePattern(history, 'analytical'),
      adminTasksOverrun: checkTaskTypePattern(history, 'admin')
    },
    
    // Reflection sentiment
    reflectionSentiment: {
      last7Days: history.map(d => analyzeSentiment(d.reflection)),
      negativeKeywords: extractNegativeKeywords(history)
    }
  };
}
```

### 5.3 BURNOUT DETECTION

```typescript
// /lib/ai/detectBurnout.ts

export function calculateBurnoutRisk(patterns, checkinData) {
  let riskScore = 0;
  
  // Factor 1: Completion rate dropping
  if (patterns.completionTrend.trend === 'down') {
    const drop = patterns.completionTrend.last7Days[0] - 
                 patterns.completionTrend.last7Days[6];
    if (drop > 30) riskScore += 0.3; // Severe drop
    else if (drop > 15) riskScore += 0.15;
  }
  
  // Factor 2: Consecutive bad days
  if (patterns.moodTrend.consecutiveBad >= 3) {
    riskScore += 0.25;
  }
  
  // Factor 3: Consistent overrun
  if (patterns.timeEstimation.averageOverrun > 1.4) {
    riskScore += 0.2; // Consistently taking 40%+ longer
  }
  
  // Factor 4: Negative sentiment
  const negativeCount = patterns.reflectionSentiment.negativeKeywords.length;
  if (negativeCount > 10) riskScore += 0.15;
  else if (negativeCount > 5) riskScore += 0.1;
  
  // Factor 5: Skipped check-ins
  const skippedLast7 = 7 - patterns.last7Days.length;
  if (skippedLast7 > 2) riskScore += 0.1;
  
  return Math.min(riskScore, 1.0); // Cap at 1.0
}

export async function triggerBurnoutIntervention(user, riskLevel) {
  if (riskLevel === 'high') {
    // Strong intervention
    const intervention = {
      type: 'burnout_warning',
      severity: 'high',
      message: `⚠️ BURNOUT WARNING
      
      I'm concerned about your pace. You've struggled 
      5/7 days and completion is dropping.
      
      Let's make an adjustment to prevent burnout.`,
      options: [
        {
          label: 'Add Recovery Day',
          action: 'skip_tomorrow',
          description: 'Take tomorrow off completely'
        },
        {
          label: 'Reduce Weekly Load',
          action: 'reduce_actions',
          description: '3 actions/week instead of 5 for next 2 weeks'
        },
        {
          label: 'Extend Timeline',
          action: 'extend_deadline',
          description: 'Push deadline 2 weeks (still achievable)'
        },
        {
          label: 'Get Support',
          action: 'contact_buddy',
          description: 'Draft message to accountability buddy'
        }
      ]
    };
    
    await createNotification(user.id, intervention);
    
  } else if (riskLevel === 'medium') {
    // Gentle suggestion
    const suggestion = {
      type: 'wellness_check',
      severity: 'medium',
      message: `💙 Wellness Check
      
      Noticed you've had a tough few days. Want to take 
      a lighter day tomorrow?`,
      options: [
        {
          label: 'Yes, light day please',
          action: 'light_day_tomorrow'
        },
        {
          label: 'No, I'm OK',
          action: 'continue_normal'
        }
      ]
    };
    
    await createNotification(user.id, suggestion);
  }
}
```

### 5.4 DATABASE SCHEMA

```sql
-- Daily check-ins (extended from before)
ALTER TABLE daily_checkins ADD COLUMN insights JSONB;
ALTER TABLE daily_checkins ADD COLUMN burnout_risk_score DECIMAL(3,2);
ALTER TABLE daily_checkins ADD COLUMN intervention_triggered BOOLEAN DEFAULT FALSE;

-- Burnout interventions log
CREATE TABLE burnout_interventions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  board_id UUID REFERENCES execution_boards(id),
  triggered_at TIMESTAMP DEFAULT NOW(),
  risk_score DECIMAL(3,2),
  severity TEXT, -- 'low' | 'medium' | 'high'
  intervention_type TEXT,
  user_action TEXT, -- What user chose
  outcome TEXT, -- 'helped' | 'neutral' | 'ignored'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sleep mode status
CREATE TABLE sleep_mode (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  enabled BOOLEAN DEFAULT FALSE,
  sleep_start TIME DEFAULT '21:00:00',
  wake_time TIME DEFAULT '07:00:00',
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 5.5 API ROUTES

```typescript
// /app/api/check-in/save/route.ts
export async function POST(req: Request) {
  const { userId, boardId, mood, reflection } = await req.json();
  
  // Save check-in
  const checkin = await supabase
    .from('daily_checkins')
    .insert({
      user_id: userId,
      board_id: boardId,
      date: new Date(),
      mood,
      reflection,
      completed_actions: completedCount,
      total_actions: totalCount
    })
    .select()
    .single();
  
  // Generate insights
  const insights = await generateInsights(user, checkinData);
  
  // Detect burnout risk
  const patterns = await detectPatterns(userId);
  const burnoutRisk = calculateBurnoutRisk(patterns, checkinData);
  
  // Update checkin with insights
  await supabase
    .from('daily_checkins')
    .update({
      insights,
      burnout_risk_score: burnoutRisk
    })
    .eq('id', checkin.id);
  
  // Trigger intervention if needed
  if (burnoutRisk > 0.7) {
    await triggerBurnoutIntervention(user, 'high');
  } else if (burnoutRisk > 0.4) {
    await triggerBurnoutIntervention(user, 'medium');
  }
  
  // Generate tomorrow preview
  const tomorrow = await generateTomorrowPreview(user, board);
  
  return NextResponse.json({
    success: true,
    insights,
    tomorrow,
    burnoutRisk
  });
}

// /app/api/sleep-mode/enable/route.ts
export async function POST(req: Request) {
  const { userId } = await req.json();
  
  // Enable sleep mode
  await supabase
    .from('sleep_mode')
    .upsert({
      user_id: userId,
      enabled: true,
      sleep_start: '21:00:00',
      wake_time: '07:00:00'
    });
  
  // Cancel all notifications until 7am
  await cancelNotificationsUntil(userId, '07:00:00');
  
  return NextResponse.json({ success: true });
}
```

---