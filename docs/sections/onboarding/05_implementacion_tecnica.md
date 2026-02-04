## ⚙️ PARTE 5: IMPLEMENTACIÓN TÉCNICA

### 5.1 TECH STACK

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Hook Form (form management)
- Zustand (state management)

**Backend:**
- Next.js API Routes
- Supabase (database + auth)
- Claude API (Anthropic)
- Vercel (deployment)

**Analytics:**
- PostHog (product analytics)
- Sentry (error tracking)

---

### 5.2 DATABASE SCHEMA

```sql
-- Users table (Supabase Auth handles most of this)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Onboarding data (temporary, deleted after board creation)
CREATE TABLE onboarding_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  step INT DEFAULT 1,
  data JSONB, -- Stores all answers
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  abandoned BOOLEAN DEFAULT FALSE
);

-- Execution boards
CREATE TABLE execution_boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  goal TEXT NOT NULL,
  vision_layer JSONB,
  goal_layer JSONB,
  execution_layer JSONB,
  obstacle_layer JSONB,
  habits_layer JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deadline DATE,
  is_active BOOLEAN DEFAULT TRUE
);

-- Analytics (onboarding funnel)
CREATE TABLE onboarding_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES onboarding_sessions(id),
  event_type TEXT, -- 'step_viewed', 'step_completed', 'abandoned'
  step_number INT,
  time_spent_seconds INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 5.3 AI PROMPT (Claude API)

```typescript
// /app/api/board/generate/route.ts

export async function POST(req: Request) {
  const { goal, context, pastAttempts, futureSelf } = await req.json();
  
  const prompt = `You are Bloom AI, an expert execution coach.

CONTEXT:
- User's goal: ${goal}
- Biggest constraint: ${context.constraint}
- Available time: ${context.timePerDay}
- Past attempts: ${pastAttempts.tried ? 'Yes' : 'No'}
- What stopped them: ${pastAttempts.obstacles.join(', ')}
- Future Self vision: "${futureSelf}"

TASK:
Generate a complete Execution Board with 5 layers:

1. VISION LAYER
   - Expand their Future Self vision into a vivid 2-3 sentence description
   - Use present tense ("You're celebrating...")
   - Include specific details from their input
   - Add a short mantra (5-7 words)

2. GOAL LAYER
   - Make their goal SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
   - Set deadline: 90 days from today
   - Define 3 key KPIs with specific targets
   - Each KPI should have a mini-deadline

3. EXECUTION LAYER
   - Break goal into 12 weekly themes (90 days = ~12 weeks)
   - For each week: 5 concrete daily actions
   - Each action: specific task + estimated time
   - Actions should fit their available time (${context.timePerDay}/day)
   - Consider their constraint (${context.constraint})

4. OBSTACLE LAYER
   - Address their specific past obstacles: ${pastAttempts.obstacles.join(', ')}
   - Create 5 if-then plans (implementation intentions)
   - Format: "IF [obstacle], THEN [specific action]"
   - Make them concrete and actionable

5. HABITS LAYER
   - Design 3 daily habits that support the goal
   - Format: Morning routine, Deep work block, Evening check-in
   - Each habit: specific time, duration, what to do
   - Make them realistic for ${context.timePerDay}/day

OUTPUT FORMAT:
Return ONLY valid JSON matching this structure:

{
  "visionLayer": {
    "futureVision": "string (2-3 sentences)",
    "mantra": "string (5-7 words)"
  },
  "goalLayer": {
    "smartGoal": "string",
    "deadline": "YYYY-MM-DD",
    "kpis": [
      { "metric": "string", "target": "string", "deadline": "YYYY-MM-DD" }
    ]
  },
  "executionLayer": {
    "weeks": [
      {
        "weekNumber": 1,
        "theme": "string",
        "actions": [
          { "day": 1, "action": "string", "duration": "string" }
        ]
      }
    ]
  },
  "obstacleLayer": {
    "plans": [
      { "if": "string", "then": "string" }
    ]
  },
  "habitsLayer": {
    "morning": { "time": "string", "duration": "string", "habit": "string" },
    "deepWork": { "time": "string", "duration": "string", "habit": "string" },
    "evening": { "time": "string", "duration": "string", "habit": "string" }
  }
}`;

  // Call Claude API
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })
  });

  const data = await response.json();
  const boardData = JSON.parse(data.content[0].text);
  
  // Save to database
  const { data: board } = await supabase
    .from('execution_boards')
    .insert({
      user_id: userId,
      goal,
      vision_layer: boardData.visionLayer,
      goal_layer: boardData.goalLayer,
      execution_layer: boardData.executionLayer,
      obstacle_layer: boardData.obstacleLayer,
      habits_layer: boardData.habitsLayer,
      deadline: boardData.goalLayer.deadline
    })
    .select()
    .single();

  return NextResponse.json({ board });
}
```

---

### 5.4 ADAPTIVE QUESTIONING LOGIC

```typescript
// /app/onboarding/page.tsx

const [step, setStep] = useState(1);
const [answers, setAnswers] = useState({});

const getNextQuestion = (currentStep, currentAnswers) => {
  switch(currentStep) {
    case 2: // Context
      if (currentAnswers.constraint === 'Time') {
        return {
          type: 'slider',
          question: 'How many hours per day can you dedicate?',
          min: 0.25, // 15 min
          max: 8,
          step: 0.25
        };
      } else if (currentAnswers.constraint === 'Money') {
        return {
          type: 'select',
          question: "What's your budget for this goal?",
          options: ['< $100', '$100-$500', '$500-$1000', '> $1000']
        };
      } else if (currentAnswers.constraint === 'Skills') {
        return {
          type: 'text',
          question: 'What skill do you need most?'
        };
      }
      break;
      
    case 3: // Past attempts
      if (currentAnswers.tried === 'No, first time') {
        // Skip obstacle question, go straight to step 4
        return { skip: true, nextStep: 4 };
      } else {
        return {
          type: 'checkbox',
          question: 'What typically stops you?',
          options: [
            'Lost motivation',
            'Got too busy',
            "Didn't see progress",
            'Felt overwhelmed',
            'Life got in the way',
            "Didn't know what to do next"
          ]
        };
      }
      break;
  }
};
```

---

### 5.5 ANALYTICS TRACKING

```typescript
// Track every step
posthog.capture('onboarding_step_viewed', {
  step: stepNumber,
  question: questionText
});

posthog.capture('onboarding_step_completed', {
  step: stepNumber,
  timeSpent: timeSpentSeconds,
  answer: answerValue
});

posthog.capture('onboarding_abandoned', {
  step: stepNumber,
  reason: 'user_closed_tab' | 'took_too_long' | 'unknown'
});

posthog.capture('onboarding_completed', {
  totalTime: totalSeconds,
  goal: goalText,
  completionRate: (completedSteps / totalSteps) * 100
});

posthog.capture('board_generated', {
  goal: goalText,
  generationTime: apiCallDuration,
  success: true
});
```

---