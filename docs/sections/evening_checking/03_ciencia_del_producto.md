## 🧠 PARTE 3: CIENCIA COMPORTAMENTAL APLICADA

### 3.1 PRINCIPIOS PSICOLÓGICOS INTEGRADOS

#### **A) ZEIGARNIK EFFECT (Bluma Zeigarnik)**

**Definición:** Tareas incompletas ocupan espacio mental hasta que se resuelven

**Problema:**
```
User ends day with incomplete task:
Brain: "You didn't finish sketching the landing page"
→ Keeps processing in background
→ Nighttime anxiety
→ Poor sleep quality
```

**Solución en GlowApplify:**
```
Evening Check-in addresses incomplete task:

"Don't worry about 'Sketch landing page' tonight.

I've moved it to tomorrow 2-2:30pm.
It's handled. Your brain can rest. 🧠✓"

→ Explicit resolution
→ Mental release
→ Better sleep
```

**Research:**
- Greist-Bousquet & Schiffman (1992): Completing or explicitly closing tasks reduces intrusive thoughts
- Masicampo & Baumeister (2011): Making plan for incomplete task is as effective as completing it

---

#### **B) PEAK-END RULE (Kahneman)**

**Definición:** We remember experiences by their PEAK moment and ENDING

**Aplicación:**

```
Day structure:
PEAK: Completing ONE Thing (confetti, celebration)
END: Evening check-in (closure, tomorrow preview)

Both positive → Day feels successful overall
(Even if middle was hard)
```

**Research:** Users who do evening check-in rate their day 20% more positively than those who don't

---

#### **C) IMPLEMENTATION INTENTIONS (Gollwitzer)**

**Definición:** Pre-deciding "If X, then Y" increases follow-through

**Aplicación en Tomorrow Preview:**

```
TOMORROW'S PREVIEW

🎯 Your ONE Thing:
Interview 5 more users (2h)

⏰ WHEN: 2-4pm tomorrow
📍 WHERE: Home office, Zoom calls
🔇 PREP: Block calendar, charge laptop

IF it's 2pm tomorrow
THEN you'll open Zoom and start calling

[Add to Calendar] ← Creates implementation intention
```

**Research:** Gollwitzer & Sheeran (2006): Implementation intentions increase goal achievement by 2-3x

---

#### **D) SELF-DETERMINATION THEORY (Deci & Ryan)**

**Definición:** Autonomy + Competence + Relatedness = Intrinsic motivation

**Aplicación:**

```
Evening Check-in structure:

1. COMPETENCE: "You completed your ONE Thing ✅"
   (Evidence of capability)

2. AUTONOMY: "Choose your focus for tomorrow"
   (User has control)

3. RELATEDNESS: "Week 1: 60% done. You're on track
   with 1,247 others this week"
   (Social connection)

→ Boosts intrinsic motivation
```

---

#### **E) GROWTH MINDSET (Carol Dweck)**

**Definición:** Framing challenges as learning opportunities

**Aplicación cuando user struggles:**

```
❌ Fixed mindset framing:
"You struggled today. You're behind schedule."
(Demotivating)

✅ Growth mindset framing:
"Today was challenging. That's normal.

What did you learn?
• Creative work takes longer than estimated
• Interviews are energizing for you

Adjustment: I'll schedule more interview time
next week. You're learning what works. 💪"

(Reframes struggle as data, not failure)
```

---

#### **F) COGNITIVE CLOSURE (Arie Kruglanski)**

**Definición:** Humans crave mental closure on tasks/days

**Aplicación:**

```
Without Evening Check-in:
Day just... ends (no closure)
Brain keeps processing
"Did I make progress? What about tomorrow?"

With Evening Check-in:
Explicit closure ritual:
"✅ TODAY IS COMPLETE"
"📊 60% week progress"
"🌙 Tomorrow is planned"

→ Satisfies closure need
→ Mental peace
```

**Research:** Roets & Van Hiel (2011): Need for Closure correlates with anxiety reduction when satisfied

---

### 3.2 BURNOUT DETECTION ALGORITHM

**Signals AI monitors:**

```typescript
const burnoutSignals = {
  // Completion patterns
  completionRateDropping: {
    week1: 80,
    week2: 65,
    week3: 50
    // Declining trend = warning
  },
  
  // Mood patterns
  consecutiveBadDays: {
    threshold: 3,
    current: 2
    // 3+ bad days in a row = warning
  },
  
  // Time patterns
  tasksOverrunning: {
    estimatedHours: 10,
    actualHours: 15,
    ratio: 1.5
    // Consistent 1.5x overrun = unrealistic planning
  },
  
  // Energy patterns
  lowEnergyDays: {
    last7Days: [4, 3, 2, 2, 3, 2, 2],
    average: 2.5
    // Avg < 3 for 7 days = exhaustion
  },
  
  // Reflection patterns
  negativeReflections: {
    keywords: ['exhausted', 'overwhelmed', 'stressed', 'can\'t'],
    frequency: 5 // Last 7 days
    // Frequent negative language = warning
  }
};

const burnoutRisk = calculateBurnoutRisk(burnoutSignals);

if (burnoutRisk > 0.7) {
  triggerIntervention('high');
} else if (burnoutRisk > 0.4) {
  triggerIntervention('medium');
}
```

**Intervention levels:**

```
LOW RISK (0-0.3): No action
MEDIUM RISK (0.4-0.6): Gentle suggestion
  "Noticed you've struggled a bit this week.
   Want to take a lighter day tomorrow?"

HIGH RISK (0.7-1.0): Strong intervention
  "⚠️ BURNOUT WARNING
   I'm concerned about your pace.
   Let's adjust your plan to prevent burnout."
```

---