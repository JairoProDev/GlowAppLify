## ⚙️ PARTE 5: IMPLEMENTACIÓN TÉCNICA

### 5.1 COMPONENTE STRUCTURE

```typescript
// /app/board/[id]/page.tsx

import VisionLayer from '@/components/board/VisionLayer';
import GoalLayer from '@/components/board/GoalLayer';
import ExecutionLayer from '@/components/board/ExecutionLayer';
import ObstacleLayer from '@/components/board/ObstacleLayer';
import HabitsLayer from '@/components/board/HabitsLayer';

export default async function BoardPage({ params }: { params: { id: string } }) {
  const board = await getBoard(params.id);
  
  return (
    <div className="board-container">
      <VisionLayer data={board.vision_layer} />
      <GoalLayer data={board.goal_layer} />
      <ExecutionLayer data={board.execution_layer} boardId={params.id} />
      <ObstacleLayer data={board.obstacle_layer} />
      <HabitsLayer data={board.habits_layer} />
    </div>
  );
}
```

### 5.2 DATABASE SCHEMA (Extended)

```sql
-- Execution boards (ya exists, adding more details)
ALTER TABLE execution_boards ADD COLUMN settings JSONB DEFAULT '{}';

-- Weekly progress tracking
CREATE TABLE weekly_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID REFERENCES execution_boards(id),
  week_number INT NOT NULL,
  actions_completed INT DEFAULT 0,
  actions_total INT NOT NULL,
  milestone_achieved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(board_id, week_number)
);

-- Habit tracking
CREATE TABLE habit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID REFERENCES execution_boards(id),
  habit_type TEXT NOT NULL, -- 'morning' | 'deep_work' | 'evening'
  completed_at TIMESTAMP DEFAULT NOW(),
  date DATE NOT NULL,
  UNIQUE(board_id, habit_type, date)
);

-- Board evolution (AI updates)
CREATE TABLE board_evolutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID REFERENCES execution_boards(id),
  evolution_type TEXT, -- 'weekly_update' | 'milestone_achieved' | 'user_edit'
  changes JSONB, -- What changed
  reason TEXT, -- Why AI made this change
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5.3 AI BOARD GENERATION (Complete prompt)

```typescript
// /app/api/board/generate/route.ts

const generateBoardPrompt = (onboardingData) => `
You are Bloom AI, an expert execution coach trained in behavioral science.

CONTEXT:
${JSON.stringify(onboardingData, null, 2)}

TASK:
Generate a complete 5-layer Execution Board.

CRITICAL RULES:
1. Everything must be SPECIFIC to this user's context
2. Use their exact words from Future Self vision
3. Consider their time constraint (${onboardingData.context.timePerDay}h/day)
4. Address their past obstacles: ${onboardingData.pastAttempts.obstacles.join(', ')}
5. Break goal into 12 realistic weekly themes
6. Each action must be concrete (verb + deliverable + time)
7. If-then plans must be actionable, not generic advice

LAYER 1 - VISION:
{
  "futureVision": "Expand their exact words into 2-3 vivid sentences, present tense",
  "mantra": "Create 5-7 word mantra that captures essence"
}

LAYER 2 - GOAL:
{
  "smartGoal": "Make their goal SMART",
  "deadline": "90 days from today (${new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0]})",
  "kpis": [
    {
      "metric": "Input metric (what they control)",
      "target": "Specific number",
      "deadline": "30 days from now"
    },
    {
      "metric": "Process metric (mid-journey)",
      "target": "Specific number",
      "deadline": "60 days from now"
    },
    {
      "metric": "Output metric (final result)",
      "target": "Specific number",
      "deadline": "90 days from now"
    }
  ]
}

LAYER 3 - EXECUTION:
{
  "weeks": [
    {
      "weekNumber": 1,
      "theme": "Specific theme (not generic)",
      "milestone": "Concrete deliverable by end of week",
      "actions": [
        {
          "day": 1,
          "action": "[Verb] [specific deliverable]",
          "time": "[realistic hours, considering user has ${onboardingData.context.timePerDay}h/day]",
          "timeOfDay": "morning" | "afternoon" | "evening" (based on user energy from onboarding)
        }
        // 5 actions per week
      ]
    }
    // 12 weeks total
  ]
}

LAYER 4 - OBSTACLES:
{
  "plans": [
    {
      "if": "Specific obstacle from their past attempts",
      "then": ["Concrete action 1", "Concrete action 2", "Concrete action 3"]
    }
    // 5 if-then plans total
    // MUST address: motivation, time, progress, overwhelm, life events
  ]
}

LAYER 5 - HABITS:
{
  "morning": {
    "time": "Based on their schedule",
    "duration": "5-15 min",
    "steps": ["Step 1", "Step 2", ...] // 5 steps
  },
  "deepWork": {
    "time": "Their peak energy time",
    "duration": "Match their available time",
    "rules": ["Rule 1", "Rule 2", ...] // 4-5 rules
  },
  "evening": {
    "time": "Before bed",
    "duration": "5-10 min",
    "steps": ["Step 1", "Step 2", ...] // 5 steps
  }
}

Return ONLY valid JSON matching this exact structure. No markdown, no explanation.
`;
```

### 5.4 BOARD EVOLUTION (AI weekly updates)

```typescript
// /app/api/board/evolve/route.ts

export async function POST(req: Request) {
  const { boardId } = await req.json();
  
  // Get current board + user progress
  const board = await getBoard(boardId);
  const progress = await getWeeklyProgress(boardId);
  const habitLogs = await getHabitLogs(boardId);
  
  // Analyze performance
  const analysis = {
    completionRate: calculateCompletionRate(progress),
    consistencyScore: calculateConsistency(habitLogs),
    strugglingAreas: identifyStruggles(progress),
    strengths: identifyStrengths(progress)
  };
  
  // Prompt AI to evolve board
  const evolutionPrompt = `
  CURRENT BOARD:
  ${JSON.stringify(board, null, 2)}
  
  PERFORMANCE DATA:
  ${JSON.stringify(analysis, null, 2)}
  
  TASK:
  The user has completed ${analysis.weekNumber} weeks.
  
  Based on their performance:
  - Completion rate: ${analysis.completionRate}% (target: 80%)
  - Habit consistency: ${analysis.consistencyScore}% (target: 85%)
  - Struggling with: ${analysis.strugglingAreas.join(', ')}
  - Excelling at: ${analysis.strengths.join(', ')}
  
  ADAPTATIONS NEEDED:
  1. If completion rate < 60%:
     - Reduce actions per week from 5 to 3-4
     - Simplify complex tasks
     - Add more buffer time
  
  2. If completion rate > 90%:
     - Consider stretching timeline (finish early?)
     - Add optional bonus actions
  
  3. If habit consistency low:
     - Simplify habits (reduce steps)
     - Adjust timing (maybe 6:30am is too early?)
  
  4. If specific obstacles triggered frequently:
     - Strengthen that if-then plan
     - Add more support
  
  Return updated execution_layer for next 4 weeks.
  `;
  
  // Call Claude
  const evolution = await callClaudeAPI(evolutionPrompt);
  
  // Save evolution
  await supabase
    .from('execution_boards')
    .update({ execution_layer: evolution })
    .eq('id', boardId);
  
  await supabase
    .from('board_evolutions')
    .insert({
      board_id: boardId,
      evolution_type: 'weekly_update',
      changes: evolution,
      reason: `Adapted based on ${analysis.completionRate}% completion rate`
    });
  
  return NextResponse.json({ success: true, evolution });
}
```

---