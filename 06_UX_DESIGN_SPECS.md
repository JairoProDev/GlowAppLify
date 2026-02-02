# UX & Design Specifications

## 1. Design Philosophy

### 1.1 Core Principles

**1. Clarity Over Cleverness**
- Every element serves a purpose
- No decorative UI that doesn't add value
- F-pattern layout for scanability

**2. Speed Over Beauty**
- Fast load times > Fancy animations
- Immediate feedback > Polished transitions
- Progressive enhancement

**3. Action Over Consumption**
- Call-to-actions always visible
- No infinite scroll
- Exit points after completing actions

**4. Evidence Over Claims**
- Show data (% completion), not motivation quotes
- Visual progress bars
- Real metrics, not vanity numbers

### 1.2 Visual Language

**Color System**:
```css
/* Primary Colors */
--green-vibrant: #00C853;  /* Growth, progress, action */
--blue-deep: #1E3A8A;      /* Trust, stability, calm */
--orange-energy: #FF6B35;  /* Urgency, attention, accent */

/* Neutrals */
--gray-50: #F8F9FA;
--gray-100: #E9ECEF;
--gray-600: #495057;
--gray-900: #212529;

/* Semantic */
--success: #28A745;
--warning: #FFC107;
--error: #DC3545;
```

**Typography**:
```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Scale */
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem;  /* 36px */
```

**Spacing System**:
```css
/* 8px base unit */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

**Border Radius**:
```css
--radius-sm: 0.25rem;  /* 4px */
--radius-md: 0.5rem;   /* 8px */
--radius-lg: 0.75rem;  /* 12px */
--radius-xl: 1rem;     /* 16px */
--radius-full: 9999px;
```

---

## 2. Screen-by-Screen Design

### 2.1 Landing Page (Pre-signup)

**Layout**:
```
┌──────────────────────────────────────────────┐
│ [Logo Bloom]              [Sign In Button]  │ ← Header (sticky)
├──────────────────────────────────────────────┤
│                                              │
│          HERO SECTION (full viewport)        │
│                                              │
│   H1: Vision Boards Don't Work.             │
│       This Does. ⚡                          │
│                                              │
│   P: Turn any goal into a science-backed    │
│      execution system in 3 minutes.         │
│                                              │
│   [Create My Execution Board] ← Primary CTA │
│                                              │
│   Small text: Used by 1,247 people this     │
│   week ✓                                    │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│          SOCIAL PROOF (3 testimonials)       │
│          [Card 1] [Card 2] [Card 3]          │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│          COMPARISON TABLE                    │
│          Vision Board vs Execution Board     │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│          PREVIEW (Screenshot + bullets)      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│          HOW IT WORKS (3 steps visual)       │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│          FINAL CTA + Footer                  │
│                                              │
└──────────────────────────────────────────────┘
```

**Key Design Decisions**:
- Hero H1: 48px (mobile) to 72px (desktop), bold, high contrast
- Primary CTA: Green button (#00C853), large (px-8 py-4), rounded-xl
- Testimonials: Cards with avatar + name + 1-liner + result
- No navigation menu (single-page scroll)

**Interactions**:
- CTA hover: Slightly darker green + subtle scale (1.02)
- Scroll reveal: Sections fade in on scroll
- Mobile: Hamburger menu NOT needed (single CTA)

---

### 2.2 Signup Modal

**Layout**:
```
┌────────────────────────────────────┐
│                                    │
│   Welcome to Bloom 🌱              │
│                                    │
│   Let's create your execution      │
│   board                            │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ [G] Continue with Google       │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ [@] Continue with Email        │ │
│ └────────────────────────────────┘ │
│                                    │
│   By continuing, you agree to      │
│   Terms & Privacy                  │
│                                    │
│                           [Close X]│
└────────────────────────────────────┘
```

**Specs**:
- Modal: max-width 400px, centered, backdrop blur
- Buttons: Full width, h-12, text-base, icon + text
- Google button: White with border, Google colors
- Email button: Blue-deep background, white text

---

### 2.3 Onboarding Step 1: The Big Goal

**Layout**:
```
┌───────────────────────────────────────────┐
│ [Progress: ▓░░░░ 1/4]      [Skip >]      │
├───────────────────────────────────────────┤
│                                           │
│  👤 Bloom AI                              │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │ Hi! I'm Bloom, your execution coach.│ │
│  │                                      │ │
│  │ I'll help you build a system to     │ │
│  │ achieve your most important goal.   │ │
│  │                                      │ │
│  │ First: what's the ONE goal you want │ │
│  │ to achieve in the next 90 days?     │ │
│  │                                      │ │
│  │ 💡 Examples:                         │ │
│  │ • Launch my startup                 │ │
│  │ • Run a marathon                    │ │
│  │ • Learn to code                     │ │
│  │ • Lose 10kg                         │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │ Your goal:                           │ │
│  │ [_________________________________] │ │
│  │                                      │ │
│  │ [Continue]                           │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  Or pick one:                            │
│  [Health] [Career] [Business] [Learning] │
│  [Money] [Relationships] [Creative]      │
│                                           │
└───────────────────────────────────────────┘
```

**Specs**:
- Progress bar: 4 segments, green fill, gray unfilled
- Message bubble: Light gray background, rounded-2xl, padding-4
- Input: Border-2, focus:border-green, rounded-lg
- Category pills: Outlined buttons, hover:bg-green-50
- Continue button: Green, disabled if empty input

**Interactions**:
- Typing in input: Auto-hide category pills
- Select category: Auto-fill input, enable Continue
- Continue: Fade out, load Step 2

---

### 2.4 Onboarding Step 2: Context Assessment

**Layout**:
```
┌───────────────────────────────────────────┐
│ [Progress: ▓▓░░░ 2/4]      [Skip >]      │
├───────────────────────────────────────────┤
│                                           │
│  👤 Bloom AI                              │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │ Perfect! Now I need to understand   │ │
│  │ your real life to build a system    │ │
│  │ that works.                          │ │
│  │                                      │ │
│  │ What best describes your typical    │ │
│  │ day?                                 │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │ ○ Student                            │ │
│  │   Fixed schedule, lots of assignments││
│  │                                      │ │
│  │ ○ 9-to-5 Job                        │ │
│  │   Regular hours, moderate flexibility││
│  │                                      │ │
│  │ ○ Entrepreneur/Freelance            │ │
│  │   High autonomy, irregular schedule │ │
│  │                                      │ │
│  │ ○ Parent/Caregiver                  │ │
│  │   Unpredictable, fragmented time    │ │
│  │                                      │ │
│  │ ○ Other/Mixed                       │ │
│  │                                      │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  [Continue]                               │
│                                           │
└───────────────────────────────────────────┘
```

**Specs**:
- Radio buttons: Custom styled, green when selected
- Each option: p-4, border, hover:border-green
- Description text: text-sm, text-gray-600
- Selected state: bg-green-50, border-green-500

---

### 2.5 Loading State (AI Generation)

**Layout**:
```
┌───────────────────────────────────────────┐
│                                           │
│                                           │
│         🧠 Building your system...        │
│                                           │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░ 68%            │
│                                           │
│                                           │
│  ✓ Analyzing your context                │
│  ✓ Applying goal-setting science         │
│  ⏳ Generating micro-actions              │
│  ⏳ Creating obstacle strategies          │
│  ⏳ Building your tracking system         │
│                                           │
│                                           │
│  💡 Did you know?                         │
│  People who visualize obstacles alongside│
│  goals are 2-3x more likely to achieve   │
│  them.                                    │
│                                           │
│                                           │
└───────────────────────────────────────────┘
```

**Specs**:
- Progress bar: Animated, smooth fill, 15-45 seconds
- Checklist: Icons change color on completion
- Tip rotation: 3-4 different tips, fades in/out
- No cancel button (commit to generation)

**Animation**:
- Progress bar: Linear ease, 1% per 0.3 seconds
- Checklist items: Check appear with scale animation
- Tip: Fade in after 10 seconds, fade out at 20 seconds

---

### 2.6 Execution Board (Full View)

**Layout**:
```
┌──────────────────────────────────────────┐
│ [Bloom]  [@jairo] [Settings ⚙]          │ ← Nav
├──────────────────────────────────────────┤
│                                          │
│  🎉 Your Execution Board is ready!       │
│                                          │
│  [Start Today] [Customize Board]         │
│                                          │
├══════════════════════════════════════════┤
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ 🌟 VISION LAYER                   ┃  │
│  ┃                                    ┃  │
│  ┃ [AI Image: Future Self]            ┃  │
│  ┃                                    ┃  │
│  ┃ Your Future Self (90 days):       ┃  │
│  ┃ "Confident founder with product   ┃  │
│  ┃ in market..."                      ┃  │
│  ┃                                    ┃  │
│  ┃ Mantra: "Build. Test. Iterate."   ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                          │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ 🎯 YOUR 90-DAY GOAL                ┃  │
│  ┃                                    ┃  │
│  ┃ Launch Bloom MVP with 100 users   ┃  │
│  ┃ Deadline: May 1, 2026              ┃  │
│  ┃                                    ┃  │
│  ┃ ━━━━━━━━━━━━━━━━━━━━ 0% (45 days) ┃  │
│  ┃                                    ┃  │
│  ┃ KEY METRICS:                       ┃  │
│  ┃ • Beta users: 0/100 🎯            ┃  │
│  ┃ • Features: 0% 🎯                 ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                          │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ ⚡ DAILY ACTIONS (Week 1)          ┃  │
│  ┃                                    ┃  │
│  ┃ ☐ Design onboarding (30 min)      ┃  │
│  ┃ ☐ Code auth system (30 min)       ┃  │
│  ┃ ☐ Interview 1 user (45 min)       ┃  │
│  ┃ ☐ Write landing copy (20 min)     ┃  │
│  ┃                                    ┃  │
│  ┃ [View Full Week] [Add Action]     ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                          │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ 🛡️ OBSTACLE STRATEGIES             ┃  │
│  ┃                                    ┃  │
│  ┃ IF "feeling overwhelmed"          ┃  │
│  ┃ THEN → "Do just the ONE thing"    ┃  │
│  ┃                                    ┃  │
│  ┃ [See All Strategies]               ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                          │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ 🔁 DAILY RITUALS                   ┃  │
│  ┃                                    ┃  │
│  ┃ 🌅 Morning (7:00am)                ┃  │
│  ┃ Streak: ___ (Start tomorrow!)     ┃  │
│  ┃                                    ┃  │
│  ┃ 💻 Deep Work (9am-12pm)            ┃  │
│  ┃ Streak: ___                        ┃  │
│  ┃                                    ┃  │
│  ┃ 🌙 Evening Check-in (9pm)          ┃  │
│  ┃ Streak: ___                        ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                          │
└──────────────────────────────────────────┘
```

**Specs**:
- Each layer: Card with border-2, padding-6, margin-bottom-4
- Icons: 24px, colored to match layer theme
- Hover on cards: Show "Edit" button in top-right
- Mobile: Stack vertically, full width

---

### 2.7 Daily Execution View (Morning)

**Layout**:
```
┌──────────────────────────────────────────┐
│ [Bloom] [@jairo] [Board] [Stats]        │
├──────────────────────────────────────────┤
│                                          │
│  ☀️ Good morning, Jairo                  │
│                                          │
│  Today is DAY 1 of your Execution Board  │
│  44 days remaining                       │
│                                          │
├══════════════════════════════════════════┤
│                                          │
│  🎯 YOUR ONE THING TODAY                 │
│                                          │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃                                    ┃  │
│  ┃ Design onboarding flow             ┃  │
│  ┃                                    ┃  │
│  ┃ Estimated time: 30 minutes         ┃  │
│  ┃                                    ┃  │
│  ┃ Why this matters:                  ┃  │
│  ┃ Unlocks your entire MVP           ┃  │
│  ┃                                    ┃  │
│  ┃ [I'm doing this now] [Done ✓]     ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│  📋 OTHER ACTIONS TODAY                  │
│                                          │
│  ☐ Code auth system (30 min)            │
│  ☐ Interview 1 user (45 min)            │
│  ☐ Write landing copy (20 min)          │
│                                          │
│  [Show all 5 actions]                    │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│  🔥 YOUR STREAKS                         │
│                                          │
│  Morning Ritual: 🔲 (Start today!)      │
│  Deep Work: 🔲                           │
│  Evening Check-in: 🔲                    │
│                                          │
└──────────────────────────────────────────┘
```

**Specs**:
- ONE Thing card: bg-green-50, border-green-500, border-3
- "Done" button: Green, large (h-12), full width
- Other actions: Checkboxes, gray, text-base
- Streaks: Fire emoji + gray box (unfilled)

**Interaction**:
- Click "Done": Checkbox animation, confetti 🎉, mark as complete
- Click checkbox on other actions: Same animation, less prominent

---

## 3. Micro-Interactions

### 3.1 Action Completion Animation

**Sequence**:
1. User clicks checkbox
2. Checkmark appears with scale animation (0.8 → 1.2 → 1)
3. Green fill expands from center
4. Subtle confetti burst (5-10 particles)
5. Haptic feedback (mobile)

**Duration**: 600ms total

### 3.2 Progress Bar Fill

**Behavior**:
- Smooth transition (ease-in-out)
- Update every 1% increment
- Color gradient: Green (0-50%), Orange (51-80%), Red (81-100% overdue)

### 3.3 Streak Counter

**Display**:
- Fire emoji 🔥 repeated for each day
- Max display: 7 emojis, then "🔥 x 23"
- Gray box for unstarted
- Pulsing animation on milestone (7, 21, 66 days)

---

## 4. Responsive Design

### 4.1 Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { /* sm */ }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { /* md */ }

/* Desktop */
@media (min-width: 1025px) { /* lg */ }
```

### 4.2 Mobile-Specific Adjustments

**Navigation**:
- Bottom tab bar (Home, Board, Stats, Profile)
- No top navigation on mobile

**Cards**:
- Full width, no side padding
- Larger touch targets (min 44px)

**Input**:
- Font-size: 16px (prevents zoom on iOS)
- Auto-focus disabled (prevents keyboard jump)

---

## 5. Accessibility

### 5.1 WCAG AA Compliance

**Color Contrast**:
- Text on background: Minimum 4.5:1
- Large text (18px+): Minimum 3:1

**Keyboard Navigation**:
- All interactive elements focusable
- Visible focus indicators (outline-2, outline-blue)
- Skip to main content link

**Screen Readers**:
- Semantic HTML (header, nav, main, article)
- ARIA labels for icons
- Alt text for images

### 5.2 Focus Management

**Onboarding**:
- Auto-focus on input after step transition
- Trap focus within modal

**Daily View**:
- Focus on "ONE Thing" card on page load
- Keyboard shortcuts: Space = Check/uncheck

---

## 6. Error States

### 6.1 Form Validation

**Inline Errors**:
```
┌─────────────────────────────────┐
│ Your goal:                      │
│ [_____________________________] │
│ ⚠️ Please enter a goal          │
└─────────────────────────────────┘
```

**Specs**:
- Red text (text-error)
- Icon: Warning triangle
- Appears below input, no page jump

### 6.2 API Failures

**Board Generation Fails**:
```
┌─────────────────────────────────┐
│                                 │
│  ❌ Something went wrong        │
│                                 │
│  We couldn't generate your      │
│  board. Please try again.       │
│                                 │
│  [Try Again] [Report Issue]     │
│                                 │
└─────────────────────────────────┘
```

---

## 7. Empty States

### 7.1 No Board Yet

```
┌─────────────────────────────────┐
│                                 │
│  📋 No board yet                │
│                                 │
│  Create your first Execution    │
│  Board to get started.          │
│                                 │
│  [Create Board]                 │
│                                 │
└─────────────────────────────────┘
```

### 7.2 No Actions Today

```
┌─────────────────────────────────┐
│                                 │
│  🎉 All done for today!         │
│                                 │
│  You completed all actions.     │
│  See you tomorrow!              │
│                                 │
│  [View Board]                   │
│                                 │
└─────────────────────────────────┘
```

---

## 8. Do's and Don'ts

### 8.1 DO's ✅

- **DO** use real data in examples (not "Lorem ipsum")
- **DO** show progress immediately (no empty states on first use)
- **DO** provide undo options for destructive actions
- **DO** use consistent icon set (Lucide React)
- **DO** optimize images (WebP, lazy load)
- **DO** test on actual devices (not just browser emulation)

### 8.2 DON'Ts ❌

- **DON'T** use modals for non-critical actions
- **DON'T** auto-play videos or animations
- **DON'T** require perfect input (accept "lose weight", not "Lose 10kg by May 1st in a sustainable way")
- **DON'T** use tooltips for essential information
- **DON'T** hide primary actions in menus
- **DON'T** use placeholder text as labels

---

## Conclusion: Design for Speed

**The golden rule**: 
Every screen should answer "What do I do next?" in <3 seconds.

**If the user has to think, we failed.**
