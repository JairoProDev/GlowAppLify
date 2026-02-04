## 🧠 PARTE 3: LAS 5 CAPAS - DISEÑO CIENTÍFICO

### 3.1 LAYER 1: VISION (El WHY emocional)

**Propósito:** Emotional anchor cuando la motivación cae

**Ciencia:**
- **Mental Contrasting** (Gabriele Oettingen): Contraste entre futuro ideal y presente realista = máxima motivación
- **Self-Determination Theory** (Deci & Ryan): Motivación intrínseca > extrínseca
- **Visualization research** (Taylor et al.): Imaginar éxito aumenta probabilidad

**Contenido:**
1. **Future Self Vision** (2-3 sentences, present tense)
   - Cómo te SIENTES al lograr el goal
   - Qué CAMBIÓ en tu vida
   - Qué estás HACIENDO diferente

2. **Mantra** (5-7 words)
   - Frase memorable que recuerdas en momentos difíciles
   - Ejemplos: "Ship fast, learn faster, scale smart"
             "Progress over perfection, always"
             "Small steps, big impact"

**Diseño visual:**

```
┌─────────────────────────────────────────────────────┐
│  🌟 VISION LAYER                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  YOUR FUTURE SELF (90 days from now):               │
│                                                     │
│  "You're sitting in a coffee shop, laptop open,    │
│  reviewing your analytics. 10 paying customers.    │
│  You feel electric - you actually did it. Your     │
│  startup isn't just an idea anymore, it's real.    │
│  You wake up excited to work on it every day."     │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  YOUR MANTRA:                                       │
│  "Ship fast, learn faster, scale smart" 🚀         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specs:**
```css
.vision-layer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 1.5rem;
}

.future-vision-text {
  font-size: 1.125rem; /* 18px */
  line-height: 1.75;
  font-style: italic;
  margin: 1rem 0;
}

.mantra {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(255,255,255,0.3);
}
```

**Interacción:**
- Hover: Subtle glow effect
- Click mantra: Copy to clipboard + "Copied! ✓" feedback
- Mobile: Vision layer es collapsible (default: expanded)

---

### 3.2 LAYER 2: GOAL (El WHAT medible)

**Propósito:** Claridad absoluta de qué defines como "éxito"

**Ciencia:**
- **Goal-Setting Theory** (Locke & Latham, 1990): Goals específicas + desafiantes = 90% mejor performance que "do your best"
- **SMART Framework**: Specific, Measurable, Achievable, Relevant, Time-bound
- **KPI Psychology**: 3 métricas clave (más = overwhelm, menos = falta de cobertura)

**Contenido:**
1. **SMART Goal Statement** (1 sentence)
   - Template: "[Action] [Measurable outcome] by [Deadline]"
   - Ejemplo: "Launch MVP with 10 paying customers by May 1st"

2. **3 Key KPIs** (leading indicators)
   - KPI 1: Input metric (lo que controlas)
   - KPI 2: Process metric (avance medio)
   - KPI 3: Output metric (resultado final)
   
3. **Deadline** (specific date)
   - 90 days from start (optimal timeframe para goal significativo pero achievable)

4. **Progress bar** (visual)
   - % completion basado en KPIs cumplidos + tiempo transcurrido

**Diseño visual:**

```
┌─────────────────────────────────────────────────────┐
│  🎯 GOAL LAYER                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  Launch MVP with 10 paying customers by May 1st    │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  KEY MILESTONES:                                    │
│                                                     │
│  ✅ KPI 1: Core features shipped by Mar 15         │
│     └─ Status: DONE (shipped Mar 12) 🎉            │
│                                                     │
│  🔄 KPI 2: 50 beta users onboarded by Apr 1        │
│     └─ Status: 32/50 users (64%) - On track ✓      │
│                                                     │
│  ⏳ KPI 3: 10 paid conversions by May 1            │
│     └─ Status: 3/10 conversions (30%) - 45d left   │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  OVERALL PROGRESS:                                  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░ 65% complete                 │
│                                                     │
│  ⏰ 45 days remaining                               │
│  📊 Pace: Slightly ahead of schedule               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specs:**
```css
.goal-layer {
  background: white;
  border: 2px solid #E9ECEF;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.goal-statement {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  color: #212529;
  margin-bottom: 1.5rem;
}

.kpi-item {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.kpi-status {
  font-size: 0.875rem;
  color: #6C757D;
  margin-left: 1.5rem;
}

.kpi-done {
  color: #28A745;
}

.kpi-in-progress {
  color: #FFC107;
}

.kpi-not-started {
  color: #6C757D;
}

.progress-bar-container {
  width: 100%;
  height: 24px;
  background: #E9ECEF;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #00C853, #00E676);
  transition: width 0.5s ease;
  border-radius: 12px;
}

.progress-bar-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  font-weight: 600;
  color: #212529;
}
```

**Interacción:**
- Progress bar anima cuando página carga (0% → 65% smooth)
- KPI status actualiza en real-time cuando completas actions
- Hover sobre KPI: muestra mini-breakdown de progreso

---

### 3.3 LAYER 3: EXECUTION (El HOW concreto)

**Propósito:** Convertir goal grande en acciones diarias factibles

**Ciencia:**
- **Implementation Intentions** (Gollwitzer): Planes if-then específicos aumentan completion 3x
- **Chunking** (Miller, 1956): Breaking big tasks into small chunks reduce cognitive load
- **The ONE Thing** (Gary Keller): Focus en acción más impactante cada día
- **Timeboxing research**: Time constraints increase focus + productivity

**Contenido:**
1. **12 Weekly Themes** (90 days ≈ 12-13 semanas)
   - Cada semana tiene un THEME (ejemplo: "User Research", "Build Core Features", etc.)
   
2. **5 Daily Actions per week** (35h/week máx para 2h/día user)
   - Cada action: Specific task + Time estimate
   - Template: "[Verb] [Specific deliverable] ([Time])"
   - Ejemplo: "Interview 3 potential users (2h)"

3. **Weekly milestones**
   - Mini-goal al final de cada semana
   - Ejemplo: "End of Week 1: Problem validated with 10 interviews"

**Diseño visual:**

```
┌─────────────────────────────────────────────────────┐
│  📋 EXECUTION LAYER                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  ▼ WEEK 1: User Research & Problem Validation      │
│    Milestone: Problem validated with 10 interviews │
│    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│    ✅ Day 1: Define core user problem (2h)         │
│    ✅ Day 2: Sketch 3 solution concepts (1h)       │
│    ✅ Day 3: Interview 5 potential users (3h)      │
│    🔄 Day 4: Analyze feedback patterns (1h)        │
│    ⏳ Day 5: Decide on MVP scope (2h)              │
│                                                     │
│  ▼ WEEK 2: MVP Scope & Tech Stack Decision         │
│    Milestone: Tech stack chosen, architecture doc  │
│    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│    ⏳ Day 1: Research tech options (1.5h)          │
│    ⏳ Day 2: Write architecture doc (2h)           │
│    ⏳ Day 3: Setup dev environment (1.5h)          │
│    ⏳ Day 4: Create project structure (1h)         │
│    ⏳ Day 5: Build "Hello World" deployed (2h)     │
│                                                     │
│  ▶ WEEK 3: Core Feature #1 - User Auth             │
│    Milestone: Users can signup/login               │
│    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│    ⏳ Day 1-5: [Click to expand]                   │
│                                                     │
│  ▶ WEEK 4-12: [Collapsed - Click to view]          │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  📊 EXECUTION STATS:                                │
│  • Completed actions: 8/60 (13%)                   │
│  • Current week: Week 1 (Day 4)                    │
│  • Actions this week: 3/5 done (60%) ✓             │
│  • Streak: 3 days 🔥                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specs:**
```css
.execution-layer {
  background: white;
  border: 2px solid #E9ECEF;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.week-section {
  margin: 1rem 0;
  border-left: 3px solid #E9ECEF;
  padding-left: 1rem;
}

.week-section.current-week {
  border-left-color: #00C853;
  background: rgba(0, 200, 83, 0.05);
  padding: 1rem;
  border-radius: 8px;
}

.week-header {
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.week-header:hover {
  color: #00C853;
}

.week-milestone {
  font-size: 0.875rem;
  color: #6C757D;
  font-style: italic;
  margin-top: 0.25rem;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.action-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #DEE2E6;
  border-radius: 4px;
  cursor: pointer;
}

.action-checkbox.done {
  background: #00C853;
  border-color: #00C853;
}

.action-text {
  flex: 1;
  font-size: 0.875rem;
}

.action-text.done {
  text-decoration: line-through;
  color: #ADB5BD;
}

.action-time {
  font-size: 0.75rem;
  color: #6C757D;
  background: #F8F9FA;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}
```

**Interacción:**
- **Expandir/colapsar semanas**: Click en header
- **Current week auto-expanded**: Resto collapsed
- **Drag to reorder actions**: Dentro de la misma semana
- **Checkbox animation**: Scale + confetti cuando completas
- **Progress bars update**: En tiempo real

**AI Logic para generar:**
```typescript
// Weekly theme generation
const generateWeeklyThemes = (goal, timeframe, constraint) => {
  // Example for "Launch startup" goal
  return [
    { week: 1, theme: "User Research & Problem Validation" },
    { week: 2, theme: "MVP Scope & Tech Stack" },
    { week: 3, theme: "Core Feature #1 - Auth" },
    { week: 4, theme: "Core Feature #2 - Main Function" },
    { week: 5, theme: "UI/UX Polish" },
    { week: 6, theme: "Beta Testing Setup" },
    { week: 7, theme: "Onboard 25 Beta Users" },
    { week: 8, theme: "Iteration Based on Feedback" },
    { week: 9, theme: "Onboard 25 More Users (total 50)" },
    { week: 10, theme: "Payment Integration" },
    { week: 11, theme: "Convert 10 to Paid" },
    { week: 12, theme: "Polish & Launch Prep" }
  ];
};

// Daily actions generation
const generateDailyActions = (weekTheme, userConstraint) => {
  // AI considers:
  // - Available time per day (from onboarding)
  // - User's energy patterns (from onboarding)
  // - Complexity of tasks
  // - Dependencies between tasks
  
  // Example for Week 1
  if (weekTheme === "User Research") {
    return [
      { 
        day: 1, 
        action: "Define core user problem",
        description: "Write 1-page doc: Who are users? What problem do they have?",
        time: "2h",
        timeOfDay: "morning" // User said they have energy in mornings
      },
      {
        day: 2,
        action: "Sketch 3 solution concepts",
        description: "Low-fidelity wireframes, don't overthink",
        time: "1h",
        timeOfDay: "morning"
      },
      // ... etc
    ];
  }
};
```

---

### 3.4 LAYER 4: OBSTACLES (El IF-THEN proactivo)

**Propósito:** Anticipar fracasos comunes y tener plan B ready

**Ciencia:**
- **WOOP Method** (Oettingen): Wish, Outcome, Obstacle, Plan = 2x goal achievement
- **Implementation Intentions** (Gollwitzer): "If X, then Y" plans increase follow-through
- **Precommitment** (Behavioral Economics): Deciding in advance reduces future temptation
- **Obstacle Anticipation** (Koestner et al.): Anticipating obstacles improves goal pursuit

**Contenido:**
1. **5 If-Then Plans**
   - IF: Obstáculo específico (basado en respuestas onboarding)
   - THEN: Acción concreta pre-decidida
   
2. **Categorías de obstáculos:**
   - Motivación (lost motivation)
   - Tiempo (got too busy)
   - Progreso (not seeing results)
   - Overwhelm (feeling stuck)
   - Externos (life events)

**Diseño visual:**

```
┌─────────────────────────────────────────────────────┐
│  🛡️ OBSTACLE LAYER                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  WHEN OBSTACLES HIT (and they will), DO THIS:      │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  1️⃣ IF you lose motivation                         │
│     THEN:                                           │
│     • Re-read your Vision Layer                    │
│     • Call your accountability buddy               │
│     • Ask: "Why did I start this?"                 │
│                                                     │
│  2️⃣ IF you get too busy with client work           │
│     THEN:                                           │
│     • Protect 7-9am as sacred (no meetings)        │
│     • Say NO to new client requests this week      │
│     • Remember: This is YOUR future                │
│                                                     │
│  3️⃣ IF you skip 2 days in a row                    │
│     THEN:                                           │
│     • Do just 30 min tomorrow (momentum>perfect)   │
│     • Don't quit, just start smaller               │
│     • Reset streak, don't beat yourself up         │
│                                                     │
│  4️⃣ IF you don't see progress by Week 4            │
│     THEN:                                           │
│     • Review KPIs: are they realistic?             │
│     • Talk to a mentor/advisor                     │
│     • Adjust timeline OR reduce scope              │
│                                                     │
│  5️⃣ IF unexpected life event happens               │
│     THEN:                                           │
│     • Pause board (don't delete progress)          │
│     • Set new start date                           │
│     • Life happens. This will wait for you.        │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  💡 TIP: Read this when struggling, not when        │
│  motivated. Future You will thank Present You.     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specs:**
```css
.obstacle-layer {
  background: #FFF3E0; /* Light orange */
  border: 2px solid #FFB74D;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.obstacle-item {
  margin: 1.5rem 0;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border-left: 4px solid #FF9800;
}

.obstacle-if {
  font-weight: 600;
  color: #E65100;
  margin-bottom: 0.5rem;
}

.obstacle-then {
  font-weight: 600;
  color: #1B5E20;
  margin: 0.5rem 0;
}

.obstacle-actions {
  list-style: none;
  padding-left: 1.5rem;
}

.obstacle-actions li {
  margin: 0.25rem 0;
  color: #424242;
}

.obstacle-actions li:before {
  content: "•";
  color: #FF9800;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}
```

**Interacción:**
- **Hover**: Obstacle card lifts (subtle elevation)
- **AI trigger**: Si user skips 2 days, app shows notification "Check Obstacle #3"
- **Smart reminders**: Context-aware (if lost motivation detected → show obstacle #1)

**AI Logic para generar:**
```typescript
const generateObstaclePlans = (pastAttempts, userConstraint) => {
  const obstacles = [];
  
  // From onboarding: "What stopped you before?"
  if (pastAttempts.includes("Lost motivation")) {
    obstacles.push({
      if: "you lose motivation",
      then: [
        "Re-read your Vision Layer",
        "Call your accountability buddy",
        'Ask: "Why did I start this?"'
      ]
    });
  }
  
  if (pastAttempts.includes("Got too busy")) {
    obstacles.push({
      if: "you get too busy with [competing priority]",
      then: [
        `Protect ${userMorningTime} as sacred (no meetings)`,
        "Say NO to new requests this week",
        "Remember: This is YOUR future"
      ]
    });
  }
  
  // Universal obstacles (everyone faces these)
  obstacles.push({
    if: "you skip 2 days in a row",
    then: [
      "Do just 30min tomorrow (momentum > perfection)",
      "Don't quit, just start smaller",
      "Reset streak, don't beat yourself up"
    ]
  });
  
  obstacles.push({
    if: "you don't see progress by Week 4",
    then: [
      "Review KPIs: are they realistic?",
      "Talk to a mentor/advisor",
      "Adjust timeline OR reduce scope"
    ]
  });
  
  obstacles.push({
    if: "unexpected life event happens",
    then: [
      "Pause board (don't delete progress)",
      "Set new start date",
      "Life happens. This will wait for you."
    ]
  });
  
  return obstacles;
};
```

---

### 3.5 LAYER 5: HABITS (El FOUNDATION sostenible)

**Propósito:** Sistema diario que hace el goal inevitable con tiempo

**Ciencia:**
- **Habit Formation** (Lally et al., 2010): Takes 66 days average to automate habit
- **Atomic Habits** (James Clear): Small habits compound over time
- **Habit Stacking** (BJ Fogg): Stack new habit after existing cue
- **Keystone Habits** (Duhigg): One habit triggers cascade of other good habits

**Contenido:**
1. **Morning Ritual** (5-15 min)
   - Prime your day
   - Set intention
   - Review ONE Thing
   
2. **Deep Work Block** (1-3h)
   - Distraction-free execution
   - Work on most important action
   - Protected time (no meetings, no interruptions)
   
3. **Evening Check-in** (5-10 min)
   - Review day
   - Mark actions complete
   - Preview tomorrow

**Diseño visual:**

```
┌─────────────────────────────────────────────────────┐
│  ⚡ HABITS LAYER                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  DAILY RITUALS (The foundation of your system)     │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  ☀️ MORNING RITUAL (6:30-6:45am)                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  1. Open GlowApplify (1 min)                       │
│  2. Read your Vision + Mantra (2 min)              │
│  3. Identify your ONE Thing today (2 min)          │
│  4. Set intention: "Today I will ___" (1 min)      │
│  5. Take 3 deep breaths (1 min)                    │
│                                                     │
│  Streak: 🔥🔥🔥🔥🔥🔥🔥 7 days                        │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  🔥 DEEP WORK BLOCK (7:00-9:00am)                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  • Phone in airplane mode                          │
│  • Email closed, Slack off                         │
│  • Work ONLY on your ONE Thing                     │
│  • No context switching                            │
│  • 2 hours of pure focus                           │
│                                                     │
│  Streak: 🔥🔥🔥🔥🔥 5 days                           │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  🌙 EVENING CHECK-IN (9:00-9:10pm)                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  1. Mark completed actions ✅ (2 min)              │
│  2. Rate your day: 😊 😐 😕 (1 min)               │
│  3. One sentence reflection (2 min)                │
│  4. Preview tomorrow's ONE Thing (1 min)           │
│  5. Celebrate progress 🎉 (1 min)                  │
│                                                     │
│  Streak: 🔥🔥🔥🔥🔥🔥 6 days                         │
│                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                     │
│  📊 HABIT STATS:                                    │
│  • Longest streak: 12 days (Morning Ritual)        │
│  • Consistency: 85% (6/7 days this week)           │
│  • Compound effect: 7 days = 14h deep work done    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specs:**
```css
.habits-layer {
  background: white;
  border: 2px solid #E9ECEF;
  border-radius: 16px;
  padding: 2rem;
}

.habit-section {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%);
  border-radius: 12px;
}

.habit-section.morning {
  border-left: 4px solid #FFA726; /* Orange for morning */
}

.habit-section.deep-work {
  border-left: 4px solid #EF5350; /* Red for intensity */
}

.habit-section.evening {
  border-left: 4px solid #5C6BC0; /* Blue for evening */
}

.habit-header {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.habit-steps {
  list-style: none;
  padding: 0;
}

.habit-steps li {
  padding: 0.5rem 0;
  color: #495057;
}

.habit-streak {
  margin-top: 1rem;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  font-size: 1.25rem;
  text-align: center;
}

.fire-emoji {
  font-size: 1.5rem;
}
```

**Interacción:**
- **Streak animation**: Fire emoji grows when you hit 7, 21, 66 days
- **Reminder notifications**: 
  - 6:30am: "Time for your morning ritual 🌅"
  - 7:00am: "Deep work starts now 🔥 Phone off?"
  - 9:00pm: "Evening check-in time 🌙"
- **Habit completion tracking**: Auto-detects (if user opens app 6:30-7am → morning ritual likely done)

---
## 🎨 PARTE 4: DISEÑO VISUAL COMPLETO DEL BOARD

### 4.1 DESKTOP VIEW (Full board en una página)

```
┌─────────────────────────────────────────────────────────────────────┐
│  GLOWAPPLIFY                              [Daily View] [Settings]   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  🌟 VISION LAYER                                              │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ │
│  │  YOUR FUTURE SELF (90 days): "You're celebrating..."         │ │
│  │  MANTRA: "Ship fast, learn faster"                           │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  🎯 GOAL LAYER                                                │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ │
│  │  Launch MVP with 10 paying customers by May 1st              │ │
│  │  Progress: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░ 65%                         │ │
│  │  KPIs: [Expandable]                                          │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  📋 EXECUTION LAYER                                           │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ │
│  │  ▼ WEEK 1: User Research (Current)                           │ │
│  │    ✅ ✅ ✅ 🔄 ⏳                                              │ │
│  │  ▶ WEEK 2-12: [Collapsed]                                    │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  🛡️ OBSTACLE LAYER                                            │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ │
│  │  5 If-Then Plans [Click to expand]                           │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  ⚡ HABITS LAYER                                              │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ │
│  │  Morning: 🔥🔥🔥🔥🔥🔥🔥 | Deep Work: 🔥🔥🔥🔥🔥                │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Layout specs:**
- Max width: 1200px
- Centered on screen
- Each layer: Card with 16px border-radius
- Spacing between layers: 24px
- Responsive: Stacks vertically on mobile

---

### 4.2 MOBILE VIEW (One layer at a time)

```
┌──────────────────────────┐
│  ≡ GlowApplify      👤   │
├──────────────────────────┤
│                          │
│  [← Vision] [Goal →]     │ ← Swipeable tabs
│                          │
│  🌟 VISION LAYER         │
│  ━━━━━━━━━━━━━━━━━━━━   │
│                          │
│  YOUR FUTURE SELF:       │
│                          │
│  "You're celebrating..." │
│  [Scrollable text]       │
│                          │
│  ━━━━━━━━━━━━━━━━━━━━   │
│                          │
│  YOUR MANTRA:            │
│  "Ship fast, learn       │
│  faster" 🚀              │
│                          │
│                          │
│  [Swipe for next →]      │
│                          │
└──────────────────────────┘
```

**Mobile interactions:**
- Horizontal swipe between layers
- Tab indicator shows current layer (5 dots, 1 highlighted)
- Each layer optimized for mobile (larger text, touch-friendly)
- Quick nav: Bottom nav bar con íconos (Vision / Goal / Execute / Obstacles / Habits)

---