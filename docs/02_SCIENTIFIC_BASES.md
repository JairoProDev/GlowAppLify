# Scientific Foundation

## 1. Core Psychological Frameworks

### 1.1 Self-Determination Theory (SDT)

**Source**: Deci & Ryan (1985-2000)

**Core Principle**: Human motivation is driven by three innate psychological needs:

1. **Autonomy**: Feeling of control over one's actions
   - *Application in Bloom*: User chooses their goal, timeline, and daily rhythm
   - *Anti-pattern*: Forcing specific habits or schedules

2. **Competence**: Feeling of progress and mastery
   - *Application in Bloom*: Daily micro-actions + visible metrics + streaks
   - *Anti-pattern*: Overwhelming goals with no intermediate wins

3. **Relatedness**: Feeling of connection and belonging
   - *Application in Bloom*: Accountability circles (3-12 people), cohort challenges
   - *Anti-pattern*: Public feeds causing comparison anxiety

**Why This Matters**: Apps satisfying all 3 needs create intrinsic motivation → long-term retention.

---

### 1.2 Goal-Setting Theory (Locke & Latham)

**Source**: Locke & Latham (1990, 2002, 2006)

**Core Finding**: Specific, challenging goals improve performance by 16% compared to vague goals.

**The 5 Principles**:

1. **Clarity**: "Lose 5kg in 3 months" > "Get healthier"
2. **Challenge**: Goals should be difficult but achievable (stretch, not stress)
3. **Commitment**: Higher when goal is self-chosen (SDT overlap)
4. **Feedback**: Regular progress updates essential
5. **Task Complexity**: Break complex goals into sub-goals

**Bloom Implementation**:

```
User Input: "I want to lose weight"
     ↓
AI Processing: Context analysis (current weight, time available, obstacles)
     ↓
Generated SMART Goal: "Lose 5kg in 90 days through 4x/week exercise + 1,800 cal/day diet"
     ↓
Micro-Actions: "30-min walk today", "Log food in app", "Sleep 7+ hours"
```

**Critical**: Goals must have:
- Specific numeric target (5kg, not "some weight")
- Deadline (90 days)
- Action plan (how: exercise + diet)

---

### 1.3 Implementation Intentions (Gollwitzer)

**Source**: Gollwitzer (1999, 2006)

**Core Principle**: "If-Then" plans increase goal achievement by 2-3x.

**The Mechanism**:
- **Vague Intention**: "I will exercise more"
  - Brain: "When? Where? What type?"
  - Result: Decision paralysis → inaction
  
- **Implementation Intention**: "If it's Monday at 7am, then I will do 30 push-ups in my bedroom"
  - Brain: Pre-committed action → automatic execution
  - Result: 91% compliance rate (vs 29% for vague intentions)

**Bloom Implementation**:

**Obstacle**: User mentions "I always forget to exercise"

**AI-Generated If-Then Plan**:
```
IF: My alarm rings at 6:30am
THEN: I put on my workout clothes BEFORE checking my phone

IF: I feel too tired to exercise
THEN: I do just 5 minutes (lowering barrier)

IF: It's raining (can't run outside)
THEN: I do 20 burpees indoors
```

**Key**: The "If" is a specific cue (time, location, emotional state), the "Then" is a concrete action.

---

### 1.4 Mental Contrasting (WOOP Method - Oettingen)

**Source**: Oettingen & Gollwitzer (2011-2018)

**Core Principle**: Visualizing success ALONE reduces motivation (dopamine hit without effort). Visualizing success + obstacles TOGETHER increases achievement.

**The Problem with Positive Thinking**:
- Visualizing achievement → Brain releases dopamine
- Feels good → Reduces urgency to act
- Result: "Vision boards" create complacency

**The WOOP Framework**:

1. **W**ish: What do you want? (e.g., "Launch my MVP")
2. **O**utcome: What's the best result? (e.g., "100 users in beta, real feedback")
3. **O**bstacle: What will REALLY stop you? (e.g., "Perfectionism, fear of shipping broken")
4. **P**lan: If obstacle occurs, then... (e.g., "If I feel it's not ready, then I ship anyway and iterate")

**Meta-Analysis Results**:
- WOOP increases goal achievement by 15-30% across 94 studies
- Effect size: d = 0.34 (small-medium)
- Works for: weight loss, academic performance, exercise adherence

**Bloom Implementation**:

```
Onboarding Question: "What obstacle stopped you last time you tried this?"

User Answer: "I lose motivation after 3-4 days"

AI-Generated Strategy:
IF: "Day 3-4 and feeling unmotivated"
THEN: "Review your 'Future Self' vision + text one accountability partner"
```

---

## 2. Behavioral Science Frameworks

### 2.1 Fogg Behavior Model (BJ Fogg)

**Formula**: B = MAP
- **B**ehavior occurs when **M**otivation, **A**bility, and **P**rompt converge

**Application in Bloom**:

| Component | How Bloom Maximizes It |
|-----------|------------------------|
| **Motivation** | Future Self vision, progress metrics, accountability circles |
| **Ability** | Micro-actions (5-15 min), AI removes planning friction, clear next step |
| **Prompt** | Morning notification "Your ONE thing today", evening check-in reminder |

**Critical Insight**: When motivation is low, reduce friction (make action easier), don't increase motivation.

**Example**:
- ❌ Bad: "User skipped gym → Send motivational quote"
- ✅ Good: "User skipped gym → Suggest 5-min home workout instead"

---

### 2.2 Atomic Habits (James Clear)

**Core Principle**: 1% improvement daily = 37x better in 1 year (compound effect)

**The 4 Laws of Behavior Change**:

1. **Make it Obvious** (Cue)
   - Bloom: Clear daily view, ONE thing highlighted
   
2. **Make it Attractive** (Craving)
   - Bloom: Progress visualization, streak counters, kudos from circles
   
3. **Make it Easy** (Response)
   - Bloom: Micro-actions, pre-generated plans, no setup needed
   
4. **Make it Satisfying** (Reward)
   - Bloom: Check animation, daily recap, weekly summary

**Habit Stacking** (Clear's concept):
- "After [current habit], I will [new habit]"
- Bloom Example: "After I drink my morning coffee (existing), I will review my ONE thing (new)"

---

### 2.3 The Zeigarnik Effect

**Principle**: The brain hates uncompleted tasks and will push to finish them.

**Application in Bloom**:
- Unchecked tasks remain visually prominent
- Daily view shows "4/5 completed" (creates tension to finish the 5th)
- No "swipe to dismiss" → task stays until done

**Why This Works**: 
- Completed tasks release dopamine → brain seeks that reward
- Uncompleted tasks create "cognitive itch" → brain wants closure

---

## 3. Why Traditional Methods Fail

### 3.1 The Vision Board Problem

**What People Do**:
- Cut out pictures of dream house, car, body
- Paste on board
- Look at it daily

**What Neuroscience Says**:
- Visualization activates Ventral Striatum (reward center)
- Dopamine release → Feels like you achieved it
- Result: **Fictional Satisfaction** → Reduced urgency to act

**Study**: Pham & Taylor (1999)
- Group A: Visualized OUTCOME (getting an A on exam)
- Group B: Visualized PROCESS (studying for exam)
- Result: Group B scored higher (actual study time: 8.5 hours vs 4.5 hours)

**Bloom's Solution**: 
- Vision Layer (for inspiration)
- **+** Execution Layer (daily process)
- **+** Obstacle Layer (mental contrasting)

---

### 3.2 Why SMART Goals Alone Don't Work

**SMART Framework**:
- Specific, Measurable, Achievable, Relevant, Time-bound

**The Problem**:
- Too "cold" (no emotional connection)
- No obstacle planning
- No daily action breakdown

**Study**: Koestner et al. (2002)
- SMART goals alone: 22% achievement rate
- SMART + Implementation Intentions: 62% achievement rate

**Bloom's Approach**: 
- SMART goals (strategic layer)
- **+** Implementation Intentions (execution layer)
- **+** Future Self vision (emotional layer)

---

### 3.3 Why To-Do Lists Fail

**The Productivity Paradox**:
- Checking off small tasks feels productive
- BUT diverts energy from high-impact work (Deep Work)

**Study**: Mark, Gonzalez & Harris (2005)
- Average time to refocus after distraction: 23 minutes
- To-do list encourages task-switching

**Bloom's Solution**:
- **ONE Thing** prioritization (Gary Keller framework)
- Max 5 actions/day (cognitive load limit)
- No "urgent but not important" tasks allowed

---

## 4. Advanced Mental Models

### 4.1 The 1% Rule (Marginal Gains)

**Source**: British Cycling Team (Dave Brailsford)

**Principle**: 1% improvement in 100 areas = 100% better (exponential)

**Bloom Application**:
- Don't aim for perfection today
- Aim for 1% system improvement
- Compounding over 90 days = transformation

---

### 4.2 Inversion (Charlie Munger)

**Principle**: Instead of "How do I succeed?", ask "How do I fail?"

**Bloom Implementation**:
- Pre-Mortem exercise in onboarding
- "Imagine you failed in 90 days. What caused it?"
- Reveals blind spots → Preventive if-then plans

---

### 4.3 Identity-Based Habits (James Clear)

**Hierarchy**:
1. **Outcome-based**: "I want to lose 10kg" ❌ (External)
2. **Process-based**: "I want to exercise 4x/week" ⚠️ (Better, but still external)
3. **Identity-based**: "I am an athlete" ✅ (Internal)

**Why Identity Wins**:
- Outcome/process: Relies on willpower
- Identity: "Athletes don't skip workouts" → Automatic behavior

**Bloom Implementation**:
- Onboarding question: "Who do you need to BECOME to achieve this?"
- Not "What do you want?" but "Who are you becoming?"
- Daily reminder: "Today, I acted as [identity]"

---

### 4.4 The Eisenhower Matrix (Modified)

**Traditional Matrix**: Urgent vs Important

**Bloom's Version**: Impact vs Effort

| Quadrant | Action | Example |
|----------|--------|---------|
| High Impact, Low Effort | DO FIRST | 5-min meditation, send 1 email |
| High Impact, High Effort | SCHEDULE (Deep Work) | Write business plan, code feature |
| Low Impact, Low Effort | DELEGATE/AUTOMATE | Routine emails |
| Low Impact, High Effort | ELIMINATE | Scrolling social media |

**AI Role**: Automatically categorizes user's tasks into quadrants.

---

## 5. Neuroscience of Execution

### 5.1 The Prefrontal Cortex (PFC)

**Function**: Planning, decision-making, impulse control

**The Problem**: PFC has limited "bandwidth"
- Average person makes 35,000 decisions/day
- Each decision depletes glucose
- Result: Decision Fatigue → Poor choices later in day

**Bloom's Solution**:
- AI acts as "External PFC"
- Pre-makes decisions for user
- User only executes, doesn't decide

**Study**: Baumeister et al. (1998) - Ego Depletion
- Self-control is a finite resource
- Conserving it for execution (not planning) = higher achievement

---

### 5.2 The Basal Ganglia (Habit Formation)

**Function**: Stores automatic behaviors (habits)

**The 21/66 Day Myth**:
- Popular belief: 21 days to form a habit
- **Actual science** (Lally et al., 2009): Average 66 days, range 18-254 days
- Complexity matters: "Drink water" (18 days) vs "Run 5km" (254 days)

**Bloom Approach**:
- No arbitrary "21-day challenge"
- Adaptive timeline based on habit complexity
- Celebrate consistency, not speed

---

### 5.3 Dopamine and Motivation

**The Loop**:
1. Cue → Craving
2. Response → Reward
3. Reward → Dopamine
4. Dopamine → Repeat

**Bloom's Healthy Dopamine Design**:
- ✅ Dopamine for ACTIONS (checking off task)
- ❌ No dopamine for passive consumption (scrolling feed)
- ✅ Variable rewards (sometimes kudos, sometimes streak milestone)
- ❌ No punishment for missing days (avoids shame spiral)

---

## 6. The Bloom Equation

Synthesizing all frameworks into one formula:

```
Execution Success (E) = (Vision × Implementation Intentions + Σ(Habits × Time)) / Obstacles²

Where:
- Vision (V): Clarity of Future Self + Emotional Connection
- Implementation Intentions (I): Number of If-Then Plans
- Habits (H): Atomic actions repeated
- Time (t): Deep Work hours
- Obstacles (O): Unplanned disruptions (squared = exponential impact)
```

**Interpretation**:
- Increase numerator: Clear vision, strong plans, consistent habits
- Decrease denominator: Anticipate obstacles (Mental Contrasting)

---

## Conclusion: The Science-Backed Difference

**Bloom isn't guessing. Every feature is grounded in decades of research:**

1. **Onboarding**: WOOP (Mental Contrasting)
2. **Goal Generation**: SMART + Locke & Latham
3. **Daily Actions**: Implementation Intentions + Atomic Habits
4. **Obstacle Handling**: If-Then Plans + Pre-Mortem
5. **Motivation**: SDT (Autonomy, Competence, Relatedness)
6. **Habit Formation**: Fogg Behavior Model + Basal Ganglia
7. **Progress Tracking**: Zeigarnik Effect + Visual Feedback

**This is not self-help pseudoscience. This is behavioral engineering.**
