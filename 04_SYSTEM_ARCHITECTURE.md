# System Architecture

## 1. The "Delegated Mind" Philosophy

### 1.1 Core Concept

**Traditional Apps**: User is the strategist + executor

**Bloom**: AI is the strategist, User is the executor

**Analogy**:
- User = Hardware (muscles, brain's motor cortex)
- AI = Operating System (planning, decision-making)

**Result**: User conserves cognitive energy for execution, not planning.

### 1.2 The Equation of Execution

```
Execution Success (E) = (V × I + Σ(H × t)) / O²

Where:
V = Vision clarity (0-10)
I = Implementation Intentions count (if-then plans)
H = Atomic habits performed
t = Time in Deep Work (hours)
O = Unplanned obstacles (exponential impact)
```

**Optimization Strategy**:
- ↑ Increase numerator: Clear vision, strong plans, consistent habits
- ↓ Decrease denominator: Anticipate obstacles (Mental Contrasting)

---

## 2. Tech Stack (MVP)

### 2.1 Frontend

**Framework**: Next.js 14 (App Router)
- Why: Server Components, built-in optimization, Vercel deployment
- Alternatives considered: Remix ❌ (smaller ecosystem), Astro ❌ (not ideal for dynamic apps)

**UI Library**: React 18 + TypeScript
- Why: Type safety, component reusability
- Alternatives: Vue ❌ (less AI library support), Svelte ❌ (smaller ecosystem)

**Component Library**: Shadcn/UI + Tailwind CSS
- Why: Headless (no vendor lock-in), customizable, Tailwind-native
- Alternatives: Material UI ❌ (opinionated), Ant Design ❌ (heavy)

**Animation**: Framer Motion
- Why: Smooth micro-interactions, React-first
- Alternatives: GSAP ❌ (overkill for MVP), CSS-only ❌ (limited)

### 2.2 AI Layer

**Primary Model**: Claude 3.5 Sonnet (Anthropic API)
- Why: 200K context window, excellent instruction-following, cost-effective
- Use cases: Board generation, obstacle planning, daily action creation

**Fallback Model**: GPT-4 (OpenAI API)
- Why: Redundancy if Claude API has issues
- Use cases: Same as Claude, but secondary

**Prompt Engineering**:
- Structured output (JSON)
- Function calling for dynamic responses
- RAG (Retrieval-Augmented Generation) for user context

**Cost Optimization**:
- Cache common responses (e.g., category-specific templates)
- Limit regenerations (max 3/day in free tier)
- Use cheaper models for simple tasks (e.g., GPT-3.5 for action check-ins)

### 2.3 Backend

**Database**: Supabase (PostgreSQL)
- Why: Full Postgres, Row-Level Security, Realtime subscriptions, Auth built-in
- Alternatives: Firebase ❌ (NoSQL not ideal), Planetscale ❌ (no realtime)

**Auth**: Supabase Auth
- OAuth providers: Google, Email
- Why: Built-in, secure, free tier generous

**Edge Functions**: Supabase Edge Functions (Deno)
- Use cases: AI API calls, webhook handlers, cron jobs
- Why: Serverless, close to database, TypeScript-native

**File Storage**: Supabase Storage
- Use cases: User profile images, board background images
- Why: Integrated, CDN-backed

### 2.4 Analytics & Monitoring

**Product Analytics**: PostHog
- Why: Open-source, feature flags + A/B testing + analytics in one
- Metrics tracked: Onboarding completion, D7/D30 retention, actions completed

**Error Tracking**: Sentry
- Why: Industry standard, React integration
- Use cases: Frontend errors, API failures

**Logging**: Axiom
- Why: Fast search, generous free tier
- Use cases: API request logs, AI response analysis

### 2.5 Deployment

**Hosting**: Vercel
- Why: Next.js creator, automatic preview deployments, Edge Network
- Alternatives: Netlify ❌ (less Next.js optimization), AWS ❌ (overkill for MVP)

**Domain**: Namecheap or Vercel Domains
**SSL**: Automatic (Vercel)
**CDN**: Vercel Edge Network (built-in)

---

## 3. Database Schema

### 3.1 Core Tables

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  subscription_tier TEXT DEFAULT 'free', -- free, pro
  metadata JSONB -- Flexible for experimentation
);

-- Execution Boards
CREATE TABLE execution_boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'active', -- active, completed, archived
  created_at TIMESTAMPTZ DEFAULT NOW(),
  target_date DATE, -- 90-day deadline
  
  -- Board Layers (stored as structured JSON)
  vision_layer JSONB, -- {future_self: "...", mantra: "...", images: [...]}
  goals_layer JSONB, -- {smart_goal: "...", kpis: [...], deadline: "..."}
  execution_layer JSONB, -- {daily_actions: [...], weekly_focus: "..."}
  obstacles_layer JSONB, -- {obstacles: [...], if_then_plans: [...]}
  habits_layer JSONB -- {morning_ritual: {...}, deep_work: {...}, evening: {...}}
);

-- Daily Logs (Tracking)
CREATE TABLE daily_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID REFERENCES execution_boards(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  
  -- Completed Actions
  completed_actions JSONB, -- {action_id: true/false}
  completed_habits JSONB, -- {habit_id: true/false}
  
  -- Friction Tracking
  friction_points JSONB, -- {action_id: "reason_for_skip"}
  
  -- Reflection
  daily_reflection TEXT,
  mood_rating INT CHECK (mood_rating BETWEEN 1 AND 5),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(board_id, log_date) -- One log per day per board
);

-- AI Conversations (for context memory)
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  board_id UUID REFERENCES execution_boards(id) ON DELETE CASCADE,
  
  messages JSONB, -- [{role: "user"|"assistant", content: "..."}]
  insights JSONB, -- Patterns AI identifies over time
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics Events (PostHog backup)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  event_name TEXT NOT NULL,
  properties JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX idx_boards_user ON execution_boards(user_id);
CREATE INDEX idx_boards_status ON execution_boards(status);
CREATE INDEX idx_logs_board_date ON daily_logs(board_id, log_date DESC);
CREATE INDEX idx_events_user_time ON events(user_id, timestamp DESC);
```

### 3.2 Why JSONB for Board Layers

**Pros**:
- Flexibility during MVP iteration
- Single query to fetch entire board
- Native PostgreSQL support (indexable, queryable)

**Cons**:
- Less strict schema enforcement
- Harder to migrate if structure changes

**Decision**: Pros outweigh cons for MVP speed.

---

## 4. AI Logic: The Board Generation Engine

### 4.1 Input Processing

**User Onboarding Inputs**:
```typescript
interface OnboardingData {
  goal: string; // "Launch my MVP with 100 users"
  context: "student" | "9-to-5" | "entrepreneur" | "parent" | "mixed";
  time_available: "5-15min" | "30min" | "1hour" | "variable";
  obstacles: string[]; // ["don't know where to start", "lose motivation"]
  future_self: string; // "Confident founder with users"
}
```

**AI Prompt Template**:
```
You are a world-class execution coach with expertise in behavioral psychology.

User Goal: {goal}
Context: {context}
Time Available: {time_available}
Obstacles: {obstacles}
Future Self Vision: {future_self}

Generate a complete Execution Board in JSON format:

{
  "vision_layer": {
    "future_self": "Paraphrase user's vision with vivid detail",
    "identity": "Who they're becoming (e.g., 'I am a founder')",
    "mantra": "3-5 word operating principle"
  },
  "goals_layer": {
    "smart_goal": "Specific, Measurable, Achievable, Relevant, Time-bound version",
    "kpis": [
      {"metric": "Beta users", "target": 100, "current": 0},
      {"metric": "MVP features", "target": 100, "current": 0}
    ],
    "deadline": "YYYY-MM-DD (90 days from now)"
  },
  "execution_layer": {
    "week_1_actions": [
      {"id": "a1", "text": "Design onboarding flow", "time": 30, "impact": "high"},
      ...
    ]
  },
  "obstacles_layer": {
    "if_then_plans": [
      {
        "obstacle": "Don't know where to start",
        "if": "Feeling overwhelmed",
        "then": "Open Bloom, do just the ONE thing"
      }
    ]
  },
  "habits_layer": {
    "morning_ritual": {
      "time": "07:00",
      "duration": 15,
      "steps": ["Review ONE thing", "5-min visualization"]
    },
    "deep_work": {...},
    "evening_checkin": {...}
  }
}
```

### 4.2 Dynamic Action Generation

**Weekly Regeneration**:
- Every Sunday evening → AI generates next week's actions
- Based on: Progress last week, remaining time, adjusted difficulty

**Adaptive Difficulty**:
```python
if completion_rate > 80%:
    increase_action_difficulty(5%)
elif completion_rate < 50%:
    decrease_action_difficulty(10%)
    simplify_actions()
```

### 4.3 Obstacle Prediction Engine

**Data Sources**:
1. User's stated obstacles (onboarding)
2. Friction logs (when they skip actions)
3. Historical patterns (ML on similar users - future)

**Predictive If-Then Example**:
```
Pattern: User skips exercise on Fridays
Prediction: This Friday = high skip risk
Proactive If-Then: "If Friday, then 10-min workout (not 30-min)"
```

---

## 5. The 10 Core Protocols

### 5.1 Desire-to-Logic Engine

**Input**: Vague goal ("I want to be fit")

**Processing**:
1. Extract domain → Biology (fitness)
2. Query patterns → "fit" = lose weight OR build muscle OR endurance
3. Ask clarifying question → "What does fit mean to you?"
4. Generate SMART goal → "Lose 5kg in 90 days"

**Output**: Structured goal

### 5.2 Predictive Obstacle Mapping

**Logic**:
```python
def predict_obstacles(user_profile, goal_type):
    # Pattern matching
    if goal_type == "fitness" and user_profile.context == "busy_parent":
        return ["time constraints", "fatigue", "childcare conflicts"]
    
    # Historical data (future)
    if goal_type in user_past_failures:
        return user_past_failures[goal_type].obstacles
    
    return default_obstacles[goal_type]
```

### 5.3 If-Then Automation

**For each obstacle**:
```python
def generate_if_then(obstacle):
    return {
        "if": trigger_condition(obstacle),
        "then": micro_action(obstacle)
    }

# Example
obstacle = "Lose motivation"
→ if: "Day 3-4 and feeling unmotivated"
→ then: "Review Future Self vision + text 1 friend"
```

### 5.4 Decision Load Management

**Principle**: Reduce daily decisions to zero.

**Implementation**:
- Morning: "Your ONE thing is X"
- No choices, just execution
- If user asks "What should I do?", answer is pre-generated

### 5.5 Environment Syncing (Future - V2)

**Integrations**:
- Calendar: Block Deep Work time automatically
- Phone: Enable Do Not Disturb during work blocks
- Spotify: Auto-play focus playlist

### 5.6 Just-In-Time Micro-Interventions

**Geofencing Example**:
```
IF: User enters grocery store (location)
THEN: Notification "Buy: Spinach, Chicken, Brown Rice"
```

**Time-based Example**:
```
IF: 7:00am alarm
THEN: Morning ritual notification
```

### 5.7 Bio-Logical Feedback (Future - Wearables)

**Data**: Oura Ring, Apple Watch, Whoop

**Logic**:
```python
if hrv < threshold:
    reduce_workout_intensity(40%)
    notify("Recovery day recommended")
```

### 5.8 Need-to-Know Curation

**Default**: Hide complexity
- User sees: "Eat 1800 calories today"
- Hidden: Macros breakdown, metabolic calculations

**Optional**: "Why?" button reveals science

### 5.9 Compliance-Based Gamification

**Scoring**:
```python
executor_score = (
    actions_completed / actions_planned * 0.6 +
    adherence_to_system * 0.3 + # Did user follow if-then plans?
    consistency_streak * 0.1
)
```

**NOT** based on results (lost 10kg), only process.

### 5.10 Critical Path Optimization

**Daily Re-ordering**:
```python
def prioritize_actions(actions):
    # Sort by impact × urgency
    return sorted(actions, key=lambda a: a.impact * a.urgency, reverse=True)
```

**ONE Thing** = Top item

---

## 6. The Friction Coefficient

**Formula**:
```
Friction Coefficient (Cfd) = Options Available / Clarity of Protocol

Low Cfd (Good): 1 option / binary protocol = 1 / 2 = 0.5
High Cfd (Bad): 10 options / vague protocol = 10 / 1 = 10
```

**Goal**: Minimize Cfd → Maximize execution

---

## 7. API Architecture

### 7.1 Key Endpoints

```typescript
// Auth
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout

// Onboarding
POST /api/onboarding/submit
GET /api/onboarding/status

// Board
POST /api/board/generate // Triggers AI
GET /api/board/:id
PATCH /api/board/:id // Manual edits
DELETE /api/board/:id

// Daily Execution
GET /api/daily/:boardId/:date
POST /api/daily/:boardId/:date/action/:actionId/complete
POST /api/daily/:boardId/:date/checkin

// AI
POST /api/ai/chat // Conversational AI (future)
POST /api/ai/regenerate-week
```

### 7.2 Rate Limiting

**Free Tier**:
- 3 board regenerations/day
- 10 AI chat messages/day

**Pro Tier**:
- Unlimited regenerations
- 100 AI chat messages/day

---

## 8. Security & Privacy

### 8.1 Data Encryption

- **In Transit**: HTTPS (TLS 1.3)
- **At Rest**: Supabase encryption (AES-256)

### 8.2 Row-Level Security (RLS)

```sql
-- Users can only see their own boards
CREATE POLICY user_boards ON execution_boards
  FOR ALL
  USING (auth.uid() = user_id);

-- Users can only see their own logs
CREATE POLICY user_logs ON daily_logs
  FOR ALL
  USING (auth.uid() = user_id);
```

### 8.3 GDPR Compliance

- Data export: JSON download of all user data
- Data deletion: CASCADE deletes on user account deletion
- Consent: Clear ToS + Privacy Policy on signup

---

## 9. Performance Optimization

### 9.1 Caching Strategy

**Client-Side**:
- React Query for API response caching
- IndexedDB for offline board view (future)

**Server-Side**:
- Redis for common AI responses (e.g., fitness board templates)
- CDN for static assets (images, CSS, JS)

### 9.2 Database Optimization

- Indexes on foreign keys
- JSONB indexes for frequent queries
- Connection pooling (Supabase built-in)

### 9.3 AI Response Optimization

- Stream responses (show progress)
- Parallel API calls where possible
- Fallback to cached templates if API fails

---

## 10. Monitoring & Alerts

### 10.1 Key Metrics

**System Health**:
- API response time (<200ms p95)
- Error rate (<1%)
- Uptime (>99.9%)

**Business Metrics**:
- Daily Active Users (DAU)
- Weekly Active Execution Users (WAEU)
- Onboarding completion rate
- D7/D30 retention

### 10.2 Alerting

**Critical** (PagerDuty):
- API down >5 min
- Database connection failures

**Warning** (Email):
- Error rate >5%
- AI API costs spike >$100/day

---

## Conclusion: The Architecture Philosophy

**Bloom's architecture is designed for**:

1. **Speed**: MVP in 30 days
2. **Simplicity**: Minimal moving parts
3. **Scalability**: Serverless, edge-first
4. **Intelligence**: AI as core, not add-on
5. **Privacy**: User data sovereignty

**The result**: A system that scales from 100 to 100,000 users without architectural rewrites.
