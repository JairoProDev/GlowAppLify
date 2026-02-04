## ⚙️ PARTE 5: IMPLEMENTACIÓN TÉCNICA

### 5.1 COMPONENT STRUCTURE

```typescript
// /app/daily/page.tsx

import ONEThingCard from '@/components/daily/ONEThingCard';
import OtherActionsSection from '@/components/daily/OtherActionsSection';
import DailyStats from '@/components/daily/DailyStats';
import EveningCheckIn from '@/components/daily/EveningCheckIn';
import CelebrationModal from '@/components/daily/CelebrationModal';

export default async function DailyView() {
  const user = await getCurrentUser();
  const board = await getActiveBoard(user.id);
  const today = new Date();
  
  // AI determines ONE Thing
  const oneThing = await determineONEThing(user, board, today);
  const otherActions = await getOtherActions(user, board, today);
  const stats = await getDailyStats(user, board);
  
  return (
    <div className="daily-view">
      <DailyHeader user={user} date={today} />
      
      <ONEThingCard 
        action={oneThing}
        onStart={handleStartDeepWork}
        onSchedule={handleSchedule}
      />
      
      <OtherActionsSection 
        actions={otherActions}
        onComplete={handleActionComplete}
      />
      
      <DailyStats stats={stats} />
      
      {showEveningCheckIn && (
        <EveningCheckIn 
          completedActions={completedActions}
          onSubmit={handleCheckInSubmit}
        />
      )}
      
      {showCelebration && (
        <CelebrationModal 
          action={completedAction}
          impact={impactStats}
        />
      )}
    </div>
  );
}
```

### 5.2 AI ALGORITHM: DETERMINE ONE THING

```typescript
// /lib/ai/determineONEThing.ts

export async function determineONEThing(user, board, date) {
  // Get all actions scheduled for today
  const todayActions = getActionsForDate(board, date);
  
  // Score each action
  const scoredActions = todayActions.map(action => ({
    ...action,
    score: calculateActionScore(action, user, board)
  }));
  
  // Sort by score (highest first)
  scoredActions.sort((a, b) => b.score - a.score);
  
  // The ONE Thing = highest score
  const oneThing = scoredActions[0];
  
  // Generate "WHY this matters" explanation
  const why = await generateWhyExplanation(oneThing, board);
  
  // Determine best timing
  const timing = determineBestTiming(oneThing, user.energyProfile);
  
  return {
    ...oneThing,
    why,
    timing
  };
}

function calculateActionScore(action, user, board) {
  // 1. Impact score (0-100)
  const impactScore = calculateImpact(action, board.goal_layer);
  
  // 2. Urgency score (0-100)
  const urgencyScore = calculateUrgency(action, board.execution_layer);
  
  // 3. Energy match score (0-100)
  const energyScore = calculateEnergyMatch(
    action.type, // 'creative' | 'analytical' | 'admin'
    user.energyProfile,
    new Date().getHours() // current hour
  );
  
  // 4. Dependency score (0-100)
  const dependencyScore = hasDependents(action, board) ? 100 : 50;
  
  // Weighted combination
  return (
    impactScore * 0.4 +      // 40% weight
    urgencyScore * 0.3 +     // 30% weight
    energyScore * 0.2 +      // 20% weight
    dependencyScore * 0.1    // 10% weight
  );
}

function calculateImpact(action, goalLayer) {
  // Which KPI does this action move?
  const relatedKPI = findRelatedKPI(action, goalLayer.kpis);
  
  if (!relatedKPI) return 30; // Generic impact
  
  // How much does it move the KPI?
  const kpiProgress = relatedKPI.current / relatedKPI.target;
  
  // Actions that move lagging KPIs = higher priority
  if (kpiProgress < 0.3) return 100; // KPI far behind
  if (kpiProgress < 0.6) return 80;  // KPI somewhat behind
  if (kpiProgress < 0.9) return 60;  // KPI on track
  return 40; // KPI ahead
}

function calculateUrgency(action, executionLayer) {
  const currentWeek = getCurrentWeekNumber();
  const actionWeek = action.weekNumber;
  const actionDay = action.day;
  
  // Is this action overdue?
  if (actionWeek < currentWeek) return 100;
  
  // Is milestone deadline approaching?
  const milestone = findMilestone(actionWeek, executionLayer);
  const daysUntilMilestone = calculateDaysUntil(milestone.deadline);
  
  if (daysUntilMilestone <= 2) return 90;
  if (daysUntilMilestone <= 5) return 70;
  if (daysUntilMilestone <= 10) return 50;
  return 30;
}

function calculateEnergyMatch(taskType, energyProfile, currentHour) {
  // User's energy levels throughout day
  const currentEnergy = energyProfile.getEnergyAt(currentHour);
  
  // Task requirements
  const taskRequirements = {
    creative: 'peak',      // Needs peak energy
    analytical: 'peak',    // Needs peak energy
    collaborative: 'medium', // Needs medium energy
    administrative: 'low'  // Can do at low energy
  };
  
  const requiredEnergy = taskRequirements[taskType];
  
  // Perfect match
  if (currentEnergy === requiredEnergy) return 100;
  
  // Acceptable matches
  if (currentEnergy === 'peak' && requiredEnergy === 'medium') return 80;
  if (currentEnergy === 'medium' && requiredEnergy === 'low') return 70;
  
  // Mismatches
  if (currentEnergy === 'low' && requiredEnergy === 'peak') return 20;
  
  return 50; // Default
}

async function generateWhyExplanation(action, board) {
  const prompt = `
  Action: ${action.action}
  Week: ${action.weekNumber}
  Milestone: ${action.milestone}
  Overall Goal: ${board.goal_layer.smartGoal}
  
  Explain in 2-3 sentences WHY this action is the most impactful 
  thing the user can do today. Connect it to their weekly milestone 
  and ultimate goal.
  
  Make it motivating but realistic. No fluff.
  `;
  
  const response = await callClaudeAPI(prompt);
  return response;
}

function determineBestTiming(action, energyProfile) {
  const taskType = categorizeTask(action); // 'creative' | 'analytical' | etc
  
  // Find time slots when user has right energy
  const optimalSlots = energyProfile.slots.filter(slot => 
    matchesRequirement(slot.energy, taskType)
  );
  
  // Return first available slot
  return {
    time: optimalSlots[0].time, // "7-9pm"
    reason: `Your peak ${taskType} energy`
  };
}
```

### 5.3 DATABASE SCHEMA (Daily Actions)

```sql
-- Daily action logs
CREATE TABLE daily_action_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID REFERENCES execution_boards(id),
  action_id TEXT NOT NULL, -- References action in execution_layer
  date DATE NOT NULL,
  is_one_thing BOOLEAN DEFAULT FALSE,
  scheduled_time TEXT, -- "7-9pm" or null
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  time_spent_minutes INT,
  mood SMALLINT, -- 1 (struggled), 2 (ok), 3 (great)
  reflection TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(board_id, action_id, date)
);

-- Daily check-ins
CREATE TABLE daily_checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID REFERENCES execution_boards(id),
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  completed_actions INT,
  total_actions INT,
  mood SMALLINT, -- 1, 2, 3
  reflection TEXT,
  preview_tomorrow TEXT, -- AI-generated
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(board_id, date)
);

-- User energy profiles
CREATE TABLE user_energy_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE,
  chronotype TEXT, -- 'morning_lark' | 'night_owl' | 'afternoon' | 'flexible'
  energy_slots JSONB, -- Array of {time, energy level}
  /* Example:
  [
    {"time": "6-9am", "energy": "medium"},
    {"time": "9am-12pm", "energy": "peak"},
    {"time": "12-2pm", "energy": "low"},
    {"time": "2-5pm", "energy": "medium"},
    {"time": "5-7pm", "energy": "low"},
    {"time": "7-10pm", "energy": "peak"}
  ]
  */
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 5.4 API ROUTES

```typescript
// /app/api/daily/one-thing/route.ts
export async function GET(req: Request) {
  const userId = await getUserId(req);
  const board = await getActiveBoard(userId);
  const oneThing = await determineONEThing(user, board, new Date());
  
  return NextResponse.json({ oneThing });
}

// /app/api/daily/actions/complete/route.ts
export async function POST(req: Request) {
  const { boardId, actionId, timeSpentMinutes } = await req.json();
  
  // Mark action complete
  await supabase
    .from('daily_action_logs')
    .update({
      completed_at: new Date(),
      time_spent_minutes: timeSpentMinutes
    })
    .match({ board_id: boardId, action_id: actionId, date: today });
  
  // Calculate impact stats
  const stats = await calculateImpactStats(boardId);
  
  // Trigger celebration
  return NextResponse.json({ 
    success: true,
    stats,
    showCelebration: true
  });
}

// /app/api/daily/check-in/route.ts
export async function POST(req: Request) {
  const { boardId, mood, reflection } = await req.json();
  
  // Save check-in
  await supabase
    .from('daily_checkins')
    .insert({
      board_id: boardId,
      date: new Date(),
      mood,
      reflection,
      completed_actions: completedCount,
      total_actions: totalCount
    });
  
  // Generate tomorrow's preview
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowOneThing = await determineONEThing(user, board, tomorrow);
  
  return NextResponse.json({
    success: true,
    tomorrow: tomorrowOneThing
  });
}
```

---