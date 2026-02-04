## 🧠 PARTE 3: CIENCIA COMPORTAMENTAL APLICADA

### 3.1 PRINCIPIOS PSICOLÓGICOS INTEGRADOS

#### **A) IMPLEMENTATION INTENTIONS (Gollwitzer, 1999)**

**Definición:** "If X happens, I will do Y"

**Aplicación en onboarding:**
```
Bloom AI: "One last thing. What time will you 
check your board tomorrow morning?

This small commitment increases follow-through 
by 91%."

[Time picker: 6am - 12pm]

User selects: 7:00am

Bloom AI: "Perfect! Tomorrow at 7am, you'll see 
your first action. I'll remind you. 🔔"
```

**Por qué funciona:**
- Crea un trigger específico (7am)
- Reduce decision fatigue mañana
- Commitment device (publicly stated intention)

---

#### **B) PEAK-END RULE (Kahneman)**

**Definición:** Recordamos experiencias por su peak moment y ending

**Aplicación en onboarding:**

**PEAK:** Cuando IA genera tu board (30 sec de magia)
```
[Loading animation]
"✨ Creating your personalized system..."
"Analyzing your goal..."
"Designing your execution plan..."
"Almost there..."

[Board appears with confetti animation]
"🎉 Your Execution Board is ready!"
```

**END:** Celebración + primer action
```
Bloom AI: "You're all set! 

Before you go, want to knock out your first 
action right now? It takes 5 minutes.

Action: Define your core user problem

[Do it now] [I'll do it later]"

(If they do it now → confetti + "You're 1/90 
actions complete! Momentum started! 🔥")
```

**Por qué funciona:**
- Users remember the "wow" moment (board generation)
- Users remember ending positively (first win)
- Both create positive association with product

---

#### **C) PROGRESS PRINCIPLE (Teresa Amabile)**

**Definición:** Small wins boost motivation more than big distant goals

**Aplicación en onboarding:**

```
Progress bar visible en cada step:

Step 1/4: ▓░░░ 25%
Step 2/4: ▓▓░░ 50%
Step 3/4: ▓▓▓░ 75%
Step 4/4: ▓▓▓▓ 100% ✓
```

**Micro-celebrations después de cada step:**
```
Step 1 complete: "Great start! 👍"
Step 2 complete: "You're halfway there! 🎯"
Step 3 complete: "Almost done! 🔥"
Step 4 complete: "Amazing! Let's build your board! 🚀"
```

**Por qué funciona:**
- Cada step es un pequeño win
- Progress visible reduce perceived effort
- Gamification without manipulation

---

#### **D) SOCIAL PROOF (Cialdini)**

**Aplicación en onboarding:**

```
Durante loading (mientras AI genera board):

"✨ Creating your system...

💡 Did you know?
Users who complete onboarding are 10x more 
likely to achieve their goals.

1,247 people started their journey this week. 
You're next! 🚀"
```

**Por qué funciona:**
- Reduces anxiety durante wait time
- Validates decision ("Other smart people do this")
- Creates FOMO ("Join 1,247 people")

---

#### **E) LOSS AVERSION (Kahneman & Tversky)**

**Aplicación en exit prevention:**

```
If user tries to close tab during onboarding:

[Popup]
"Wait! You're 75% done. 

If you leave now, you'll lose:
✗ Your personalized board (takes 30sec to generate)
✗ Your custom daily actions
✗ Your progress so far

[Stay & Finish] [Leave Anyway]"
```

**Por qué funciona:**
- Losses loom larger than gains
- Shows concrete value they'll lose
- Sunk cost fallacy (already invested 2 minutes)

---

#### **F) CURIOSITY GAP (Loewenstein)**

**Aplicación en cada step:**

```
Bloom AI: "Based on your goal, I have 3 
specific obstacles you'll likely face.

Want to see what they are? Most people miss 
obstacle #2..."

[Show me]
```

**Por qué funciona:**
- Creates information gap
- User MUST know what obstacle #2 is
- Increases engagement

---

### 3.2 ADAPTIVE QUESTIONING (AI-POWERED)

**Cómo funciona:**

```python
# Pseudo-code del flow adaptivo

if user.goal == "Launch startup":
    ask("What stage are you at?")
    if response == "Idea stage":
        ask("Have you validated with users?")
    elif response == "Building MVP":
        ask("What's your launch deadline?")
    
elif user.goal == "Lose weight":
    ask("How much weight?")
    ask("Have you tried before? What happened?")
    
elif user.goal == "Learn to code":
    ask("Which language interests you?")
    ask("What do you want to build?")

# Different paths for different goals
```

**Ejemplo real:**

```
User: "I want to get fit"

Bloom AI: "Awesome! Let's make 'get fit' concrete.

Which aspect of fitness matters most to you?
• Lose weight
• Build muscle
• Run a marathon
• General health
• Something else"

[User selects: Lose weight]

Bloom AI: "Got it. How much weight do you want 
to lose?"

User: "10kg"

Bloom AI: "Perfect, 10kg. Have you tried losing 
weight before?"

User: "Yes, lost 5kg then gained it back"

Bloom AI: "I hear you. Yo-yo dieting is frustrating.

What do you think caused the weight to come back?"

[User types response]

[AI now knows: goal + amount + past failure + reason]

[AI generates board addressing specific failure]
```

**Por qué esto gana:**
- Cada conversación es única
- AI entiende matices (yo-yo dieting vs never tried)
- Board generated addresses USER'S specific obstacles

---