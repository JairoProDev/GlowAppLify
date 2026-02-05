
# 📘 GLOWAPPLIFY - MASTER PLATFORM DOCUMENTATION

> **Confidential Knowledge Base**
> **Product Version:** 0.2.0 (Alpha)
> **Last Updated:** February 5, 2026
> **Scope:** Full Technical & Functional Analysis

---

## 📑 TABLE OF CONTENTS

1.  [PRODUCT VISION & PHILOSOPHY](#1-product-vision--philosophy)
2.  [PLATFORM ARCHITECTURE (THE BRAIN)](#2-platform-architecture-the-brain)
3.  [USER JOURNEY: THE "GOLDEN PATH"](#3-user-journey-the-golden-path)
4.  [DETAILED COMPONENT ANALYSIS](#4-detailed-component-analysis)
    *   [A. The Onboarding Wizard](#a-the-onboarding-wizard)
    *   [B. The Daily Dashboard (Main HUD)](#b-the-daily-dashboard-main-hud)
    *   [C. Deep Work Mode](#c-deep-work-mode)
    *   [D. Evening Review](#d-evening-review)
    *   [E. Execution Board & Secondary Views](#e-execution-board--secondary-views)
5.  [AI INTEGRATION & DATA FLOW](#5-ai-integration--data-flow)
6.  [STATE MANAGEMENT & PERSISTENCE (ZUSTAND)](#6-state-management--persistence-zustand)
7.  [GAP ANALYSIS & CRITICAL ISSUES](#7-gap-analysis--critical-issues)
8.  [FUTURE ROADMAP](#8-future-roadmap)

---

## 1. 👁️ PRODUCT VISION & PHILOSOPHY

### The "One Thing" Methodology
GlowAppLify is not a generic To-Do list. It is an **Elite Execution System** designed to force high performance through **radical focus**.
-   **Core Belief:** Success comes from doing the *right* thing, not *everything*.
-   **The Loop:** 
    1.  **Define:** AI strategizes a 90-day goal.
    2.  **Focus:** Each day has exactly ONE primary high-leverage task.
    3.  **Execute:** A dedicated "Deep Work" interface blocks distractions.
    4.  **Reflect:** Evening check-ins optimize the system daily.

### Design Language: "Premium Dopamine"
The UI/UX is built to elicit a psychological response:
-   **Glassmorphism & Gradients:** Creating a sense of depth and modernity.
-   **Micro-interactions:** Buttons glow, progress bars shimmer, completion triggers celebrations.
-   **Tone:** The copy is motivational, slightly elite, and personalized (Coach "Bloom").

---

## 2. 🧠 PLATFORM ARCHITECTURE (THE BRAIN)

The application behaves like a Single Page Application (SPA) with persistent local state, mimicking a full SaaS product.

### Core Tech Stack
-   **Frontend:** Next.js 15 (App Router).
-   **Styling:** Tailwind CSS + Framer Motion (for all complex animations).
-   **State:** Zustand (Global Store) + Persist Middleware (LocalStorage).
-   **Icons:** Lucide React.
-   **AI:** OpenAI GPT-4o (via Serverless API routes).

### Data Segregation (The Lobes)
Instead of a monolithic database, the app currently uses fragmented "Stores" acting as local tables:
1.  **`useDailyStore`**: The central nervous system. Manages the *User Session*, *Current View Mode* (Morning/Work/Evening), and the primary *One Thing*.
2.  **`task-store`**: The Project Management backlog. Handles tags, priorities (`urgent-important` matrix), and task statuses.
3.  **`routine-store`**: The Habit tracker. Manages repetitive daily protocols (Morning/Evening routines).
4.  **`calendar-store`**: Time-blocking engine. Manages start/end times for Deep Work blocks.

---

## 3. 🛤️ USER JOURNEY: THE "GOLDEN PATH"

This is the exact flow a new user experiences, from zero to "Flow State".

### Phase 1: Injection (Onboarding)
*Route: `/onboarding`*
1.  **Input:** User answers questions about their big 90-day Goal, Constraints, and Work Style.
    *   *Interaction:* Typewriter effects, chat-like simple inputs.
2.  **AI Analysis:** The system sends this context to `/api/onboarding`.
3.  **System Generation:**
    *   GPT-4o creates a complete "Execution System".
    *   **Tasks** are generated and sorted by impact.
    *   **Habits** are designed to support the goal.
    *   **Calendar Blocks** are reserved for Deep Work.
4.  **Implantation:** The app automatically populates all Zustand stores with this data.

### Phase 2: The Daily Loop (Dashboard)
*Route: `/daily`*
1.  **Morning View:** The user is greeted. The "One Thing" is presented front and center. "Other Actions" are visible but secondary.
2.  **Selection:** User clicks "Start" on the One Thing.

### Phase 3: The Zone (Deep Work)
1.  **Visual Shift:** The UI transforms. Sidebar disappears. Everything fades except the Timer and the Task.
2.  **Execution:** User works.
3.  **Completion:** User marks task done.

### Phase 4: Release (Celebration & Review)
1.  **Dopamine Hit:** Full-screen animation (confetti/particles).
2.  **Evening Check-in:** At end of day, user reflects.
    *   "Did I achieve the One Thing?" -> System updates streak/progress.
    *   System resets to "Morning View" for the next day.

---

## 4. 🧩 DETAILED COMPONENT ANALYSIS

### A. The Onboarding Wizard
**File:** `components/onboarding/OnboardingFlow.tsx`
-   **Logic:** Multi-step state machine.
-   **Key Feature:** "Dev Skip" button (allows skipping manual input for testing).
-   **Loading Screen (`OnboardingLoading.tsx`):**
    -   Displays fake "Process Steps" (e.g., "Designing neural pathways...", "Optimizing schedule...").
    -   *Why?* To mask the 5-10s latency of GPT-4 and build anticipation.

### B. The Daily Dashboard (Main HUD)
**File:** `app/daily/page.tsx`
-   **Structure:** Acts as a "Swapper". It checks `currentView` from store and renders one of:
    -   `<MorningView />`
    -   `<DeepWorkView />`
    -   `<CelebrationView />`
    -   `<EveningView />`
-   **Bug Warning:** Previously showed "Syncing..." indefinitely. This was because `loading` state defaulted to `true` and wasn't cleared. *Status: Fixed via `setInitialData` patch.*
-   **(Hidden) Dev Controls:** A small overlay in the bottom-right allows forcing view switches for debugging.

### C. Deep Work Mode
**File:** `components/daily/DeepWorkView.tsx`
-   **Features:**
    -   **Timer:** Countdown logic.
    -   **Task Focus:** Shows the active task title in large typography.
    -   **Ambient Mode:** (Planned) Audio/Visual isolation.

### D. Evening Review
**File:** `components/daily/EveningView.tsx`
-   **Flow:** Question 1 ("Did you win?") -> Question 2 ("Habits done?") -> Closing.
-   **Purpose:** Closes the feedback loop and updates "Streak".

### E. Execution Board & Secondary Views
1.  **Execution Board:** Kanban view of the `task-store`.
    -   Columns: To Do, In Progress, Done.
2.  **Calendar:** Visual representation of `calendar-store`.
    -   Shows "Deep Work" blocks generated by AI.
3.  **Routine:** List of checkboxes for Morning/Evening habits.

---

## 5. 🤖 AI INTEGRATION & DATA FLOW

### The Brain (`app/api/onboarding/route.ts`)
This is the intelligence layer.
-   **Prompt Engineering:** The prompt forces the LLM to act as "Bloom", an elite productivity coach.
-   **Structured Output:** We strictly enforce JSON Mode.
    ```json
    {
      "vision": { ... },
      "executionBoard": { "tasks": [{ "priority": "urgent-important", ... }] },
      "habits": { "morning": [...], "evening": [...] },
      "calendar": { "blocks": [...] }
    }
    ```
-   **Injection:** The frontend receives this JSON and maps it explicitly to the different Stores in `OnboardingFlow.tsx`.

---

## 6. 💾 STATE MANAGEMENT & PERSISTENCE (ZUSTAND)

We use **Zustand** for state, avoiding Prop Drilling and Context Hell.

### Storage Strategy
-   **Persistence:** Uses `persist` middleware to save state to `localStorage`.
-   **Keys:**
    -   `glow-daily-storage`: Main session data.
    -   `glow-tasks-storage`: Task database.
    -   `glow-routine-store`: Habit database.
    -   `glow-calendar-storage`: Events.

*Implication:* If the user clears browser cache, **all data is lost**. This is the biggest limitation of the current Alpha version.

---

## 7. ⚠️ GAP ANALYSIS & CRITICAL ISSUES

### A. "The Syncing Bug" & User Confusion
-   **Issue:** User reported "Syncing your execution board..." stuck forever.
-   **Root Cause:** The `useDailyStore` initialized with `loading: true`. When data was injected via `setInitialData`, we forgot to flip it to `false`.
-   **Fix:** Updated `setInitialData` to `{ ..., loading: false }`.
-   **UX Friction:** The platform has many buttons/views. Without a guided "Tour" (Coach Marks), users feel overwhelmed instantly after onboarding.

### B. Missing Core Infrastructure
1.  **Real Backend:** Currently, there is NO sync between devices. Mobile view > Desktop view = Different data.
    -   *Solution Needed:* Sync Zustand with Supabase Database.
2.  **Authentication:** The app essentially has "fake auth". Anyone at URL `/daily` sees the localstorage data.
3.  **Robust Error Handling:** If the AI API fails, the app has weak fallbacks.

### C. UI/UX Gaps
-   **Calendar:** We have data, but the visual Calendar View is primitive compared to screenshots of competitors.
-   **Mobile Responsiveness:** The complex Dashboard grids break on small screens.

---

## 8. 🗺️ FUTURE ROADMAP

### Phase 2: "Solidification"
1.  **Connect Supabase:** Replace LocalStorage with Postgres.
2.  **Auth Guards:** Protect `/daily` routes.
3.  **Settings Page:** Allow editing the "AI Plan" after generation.

### Phase 3: "Intelligence"
1.  **Dynamic Re-planning:** If I miss 3 days, AI should pop up and say: "Let's adjustment the plan?" (Auto-Reschedule).
2.  **Voice Mode:** Talk to "Bloom" to add tasks.
3.  **Integrations:** Google Calendar 2-way sync.

---

> **Note to Development Team:**
> This platform is currently in a "High-Fidelity Prototype" state. It looks and feels real, and interacts with real AI, but the data persistence layer is client-side. The next sprint must focus on **Supabase Integration** to make this a viable SaaS product.
