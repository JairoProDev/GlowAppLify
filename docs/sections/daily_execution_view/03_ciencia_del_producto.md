## 🧠 PARTE 3: CIENCIA COMPORTAMENTAL APLICADA

### 3.1 PRINCIPIOS PSICOLÓGICOS INTEGRADOS

#### **A) THE ONE THING PRINCIPLE (Gary Keller)**

**Definición:** "What's the ONE thing I can do such that by doing it everything else becomes easier or unnecessary?"

**Aplicación en Daily View:**

```typescript
// AI algorithm para determinar ONE Thing

const calculateONEThing = (user, today) => {
  const actions = getActionsForToday(user, today);
  
  // Score cada action en 3 dimensiones:
  
  // 1. Impact hacia goal (0-100)
  const impactScore = action => {
    // Acciones que mueven KPIs principales = high impact
    // Ejemplo: "Interview users" = 90 (valida problema)
    //          "Fix typo" = 10 (nice to have)
  };
  
  // 2. Urgencia basada en deadline (0-100)
  const urgencyScore = action => {
    // Días hasta milestone / total días
    // Si milestone en 2 días y action es prerequisite = urgent
  };
  
  // 3. Dificultad vs energía disponible (0-100)
  const energyMatch = action => {
    // Creative work + morning person + 7am = 100 (perfect match)
    // Deep work + afternoon + 3pm = 50 (suboptimal)
    // Admin task + zombie mode = 30 (mismatch)
  };
  
  // Combined score
  const score = action => {
    return (
      impactScore(action) * 0.5 +  // 50% weight (most important)
      urgencyScore(action) * 0.3 + // 30% weight
      energyMatch(action) * 0.2    // 20% weight
    );
  };
  
  // The ONE Thing = highest scoring action
  return actions.sort((a, b) => score(b) - score(a))[0];
};
```

**Por qué funciona:**
- Elimina paralysis of choice
- Focus en lo que MÁS importa
- Progreso compuesto (1 cosa impactante/día = 90 en 90 días)

---

#### **B) IMPLEMENTATION INTENTIONS (Gollwitzer)**

**Definición:** Pre-deciding cuándo y dónde harás algo aumenta follow-through 3x

**Aplicación:**

```
🎯 YOUR ONE THING
Write investor deck (2h)

⏰ WHEN: Tomorrow 7-9am
📍 WHERE: Home office
🔇 ENVIRONMENT: Phone off, email closed

[Schedule in Calendar] ← Creates implementation intention

IF it's 7am tomorrow
THEN I will sit at my desk and write the deck
```

**Por qué funciona:**
- Reduce decision fatigue mañana
- Cue-based triggering (7am = automatic execution)
- Environment design (pre-decided)

---

#### **C) PROGRESS PRINCIPLE (Teresa Amabile)**

**Definición:** Small wins boost motivation más que big distant goals

**Aplicación:**

```
[After completing ONE Thing]

🎉 YOU DID IT!

📊 YOUR PROGRESS:
• Day 3 of Week 1 ✓
• 3/5 weekly actions done (60%)
• 3 days streak 🔥
• 15% towards your 90-day goal

INSIGHT:
You're ahead of schedule! At this pace,
you'll hit Week 1 milestone by Friday.

Keep going! 💪
```

**Por qué funciona:**
- Visualiza progreso (no abstracto)
- Celebra wins pequeños (dopamine)
- Conecta daily action → weekly → goal (big picture)

---

#### **D) TEMPTATION BUNDLING (Katy Milkman)**

**Definición:** Combinar actividad difícil con algo placentero

**Aplicación:**

```
🎯 YOUR ONE THING
Write investor deck (2h)

💡 MAKE IT ENJOYABLE:
• Put on your favorite focus playlist
• Grab your best coffee
• Work from that café you love
• Reward: After done, watch 1 episode

[Setup Environment]
```

**Por qué funciona:**
- Asocia hard task con placer
- Reduce aversión
- Crea positive anticipation

---

#### **E) ZEIGARNIK EFFECT (Bluma Zeigarnik)**

**Definición:** Tareas incompletas ocupan espacio mental

**Aplicación:**

```
EVENING CHECK-IN

TODAY'S STATUS:
✅ ONE Thing done
✅ Action 2 done
⏳ Action 3 incomplete

━━━━━━━━━━━━━━━━━━━━━━━━

Don't worry about Action 3 tonight.

I've moved it to tomorrow's plan.
Your mind can rest. 🧠✓

[View Tomorrow's Plan]
```

**Por qué funciona:**
- Explicit closure (brain can release)
- No guilt (AI handled it)
- Mental recovery (sleep better)

---

### 3.2 TIMING SCIENCE (Chronotypes + Ultradian Rhythms)

**Research:**
- **Daniel Pink** (When): Task-time matching crucial
- **Michael Breus** (The Power of When): 4 chronotypes
- **Ultradian rhythms**: 90-120min energy cycles

**Application in GlowApplify:**

```typescript
// User onboarding collects:
const user = {
  chronotype: "night_owl", // vs morning_lark, afternoon, flexible
  energyPeaks: [
    { time: "7-10pm", level: "peak" },
    { time: "2-5pm", level: "medium" },
    { time: "6-10am", level: "low" }
  ]
};

// AI matches task type to energy:
const taskTypes = {
  creative: "peak",      // Writing, designing, strategizing
  analytical: "peak",    // Coding, analysis, problem-solving
  collaborative: "medium", // Meetings, calls, brainstorming
  administrative: "low"   // Email, organizing, simple tasks
};

// Daily view shows:
🎯 YOUR ONE THING
Write investor deck (2h, creative work)

⏰ BEST TIME: 7-9pm tonight
💡 WHY: Peak creative energy

OTHER ACTIONS:
□ Answer investor emails (30min, admin)
  ⏰ BEST TIME: 10-10:30am (low energy OK)
```

---