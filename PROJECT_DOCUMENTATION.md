
# 🌟 GlowAppLify - Master Project Documentation

**Version:** 0.2.0 (Alpha)
**Last Updated:** February 5, 2026
**Status:** In Active Development

---

## 📖 1. Vision & Philosophy
GlowAppLify is not just a todo list; it is an **Elite Execution System**.
- **Core Philosophy:** "The One Thing". Users should focus on one high-leverage task at a time, entering a "Deep Work" state.
- **Aesthetic:** "Premium", "Glassmorphism", "Scientific", "Dopaminergic". It should feel like a futuristic tool for high performers.
- **Workflow:** Onboarding (AI Plan) -> Daily View (Execution) -> Evening Review (Reflection).

---

## 🏗️ 2. Architecture & Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with `globals.css` enforcing dark mode/premium variables).
- **Animations:** Framer Motion (heavy usage for "magical" feel).
- **State Management:** Zustand (Local First, persisted to localStorage).
- **Icons:** Lucide React.

### Backend / Infrastructure
- **Database:** Supabase (PostgreSQL). *Note: Currently used forAuth profiles, but most app data is currently mimicking local-first persistence via Zustand middlewares.*
- **AI Engine:** OpenAI GPT-4o (via `/api/onboarding`).
- **Environment:** WSL (Ubuntu) on Windows.

### Key Directory Structure
```
/app
  /api            # Next.js API Routes (Serverless)
    /onboarding   # AI Plan Generation Endpoint
  /daily          # Main Dashboard View
  /onboarding     # Wizard Flow Pages
/components
  /onboarding     # Wizard Components (Step1Goal, OnboardingLoading, etc.)
  /daily          # Dashboard Components (MorningView, OneThingCard, etc.)
/lib
  /store          # Zustand Stores (useDailyStore, task-store, routine-store, calendar-store)
  /i18n           # Translation files (onboardingContent.ts)
/stores           # *Legacy* Store location (Main useDailyStore.ts resides here currently)
```

---

## ⚙️ 3. Core Systems (Deep Dive)

### A. The "Brain" (State Management)
The application state is divided into specialized "lobes" (Stores):
1.  **useDailyStore (`stores/useDailyStore.ts`)**:
    -   **Responsibility:** Orchestrates the user's current "View" (Morning, Deep Work, Celebration) and holds the "One Thing".
    -   **Key Actions:** `setView`, `setInitialData`, `completeOneThing`.
    -   **Issue:** Currently serves as the monolith. Needs refactoring to delegate more to Task/Calendar stores.
2.  **Task Store (`lib/store/task-store.ts`)**:
    -   **Responsibility:** Your "Second Brain" backlog. Tags, Priorities (urgent-important matrix).
3.  **Routine Store (`lib/store/routine-store.ts`)**:
    -   **Responsibility:** Manages "Morning" and "Evening" protocols.
4.  **Calendar Store (`lib/store/calendar-store.ts`)**:
    -   **Responsibility:** Time-blocking system.

### B. The Onboarding Engine (`/app/onboarding`)
A high-converting, "magical" wizard that configures the user's entire operating system.
1.  **Step 1 (Goal)**: Capture the main objective. Uses Typewriter effect.
2.  **Processing (Loading)**: A fake "Real-time" visualizer that keeps user engaged while GPT generates the plan.
3.  **Generation (`/api/onboarding`)**:
    -   **Input:** Goal, Constraint, Style (Flexible/Strict).
    -   **Output:** JSON specific schema containing:
        -   `executionBoard`: Tasks split by priority.
        -   `habits`: Morning/Evening routines.
        -   `calendar`: Suggested Deep Work blocks.
    -   **Integration:** The `OnboardingFlow.tsx` receives this JSON and **immediately populates all Stores** (Daily, Task, Routine, Calendar).

### C. The Daily Dashboard (`/app/daily`)
The "Heads-up Display" for the user.
-   **Morning View:** Shows "One Thing" + "Other Actions". Minimalist.
-   **Deep Work Mode:** Full screen, timer, ambient sound (planned).
-   **Celebration:** Dopamine hit upon completion.

---

## 🚧 4. Current State & Gap Analysis

### ✅ Completed / Working
-   **Onboarding Flow:** UI is premium, AI generation works, Integration with stores is COMPLETE (System Full-Flash).
-   **AI Intelligence:** Prompt is sophisticated (outputting detailed JSON).
-   **State Persistence:** Zustand persists data to LocalStorage (user sees data after reload).

### ⚠️ Issues / Bugs
-   **"Syncing..." Spinner:** The Daily View was stuck indefinitely because `loading` state wasn't being cleared. *Fix applied: set `loading: false` in `setInitialData`.*
-   **Duplicate Stores:** `useDailyStore` exists in `stores/` (active) and `lib/store/` (likely inactive/legacy). Needs cleanup.
-   **Confusing UI:** The Dashboard might be overwhelming. Needs a better "Zero State" or "Tour".

### ❌ Missing Features (The road ahead)
1.  **Real Database Sync:** Currently data lives in LocalStorage. If I clear cache, data is gone. Need to hook up Supabase `upsert` calls to Store actions.
2.  **Auth Gates:** `/daily` and `/onboarding` are not protected. Anyone can visit.
3.  **Calendar UI:** We have a store, but no visual Calendar Component (`react-big-calendar` or custom Grid).
4.  **Settings Page:** No way to change language/theme manually yet.
5.  **Analytics:** "Weekly Progress" is currently mocked.

---

## 🔮 5. Instructions for AI Agents
*Use this context to understand where we are.*
1.  **When Coding:** Always prefer `lib/store` for new stores. Respect the "Premium" aesthetic (Tailwind `zinc-900`, `backdrop-blur`, `framer-motion`).
2.  **When Debugging:** Check `stores/useDailyStore.ts` first for main view logic.
3.  **Language:** Enforce Spanish content if `lang='es'` is set.

