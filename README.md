# Bloom (GlowApplify) - Execution Board MVP

## 🎯 Vision

Transform the personal development industry by creating the first AI-powered Execution Board that converts any goal into a science-backed, executable system in under 5 minutes.

**Not a vision board. An execution system.**

## 📚 Documentation Structure

This repository contains the complete strategic, scientific, and technical documentation for building Bloom MVP.

### Core Documents (Read in Order)

1. **[Market Strategy & Opportunity](docs/01_STRATEGY_MARKET.md)**
   - Why existing solutions fail
   - The "Progress Graph" blue ocean
   - Competitive analysis
   - 0→1 differentiation

2. **[Scientific Foundation](docs/02_SCIENTIFIC_BASES.md)**
   - Behavioral psychology frameworks
   - Goal-setting science (Locke & Latham, Gollwitzer, Oettingen)
   - Mental models for elite execution
   - Why vision boards fail

3. **[Product Concept](docs/03_PRODUCT_CONCEPT.md)**
   - The Execution Board architecture
   - 6 Life Verticals taxonomy
   - User journey and flows
   - Core features definition

4. **[System Architecture](docs/04_SYSTEM_ARCHITECTURE.md)**
   - AI logic and equations
   - "Delegated Mind" protocol
   - Tech stack decisions
   - Data models

5. **[MVP Roadmap](docs/05_MVP_ROADMAP.md)**
   - 30-day build plan
   - Feature prioritization
   - Success metrics
   - Go-to-market strategy

6. **[UX & Design Specs](docs/06_UX_DESIGN_SPECS.md)**
   - Screen-by-screen design
   - Micro-interactions
   - Design decisions
   - Do's and Don'ts

## 🚀 Quick Start for AI Agents

If you're Claude Code or another AI assistant:

1. Start with `01_STRATEGY_MARKET.md` to understand the WHY
2. Read `02_SCIENTIFIC_BASES.md` for the foundational frameworks
3. Review `03_PRODUCT_CONCEPT.md` for the WHAT
4. Study `04_SYSTEM_ARCHITECTURE.md` for the HOW
5. Check `05_MVP_ROADMAP.md` for execution priorities
6. Reference `06_UX_DESIGN_SPECS.md` for UI implementation

## 🎯 North Star Metric

**Weekly Active Execution Users (WAEU)**: Users who logged ≥3 completed actions in the last 7 days.

## 🧬 Core Principles

1. **Zero Friction**: User to first action in <10 minutes
2. **AI Does the Thinking**: User only executes
3. **Science-Backed**: Every feature rooted in behavioral psychology
4. **Process Over Results**: Celebrate consistency, not outcomes
5. **Evidence-Based Progress**: Proof layer for accountability

## 📊 Tech Stack (MVP)

- **Frontend**: Next.js 14 + React + TypeScript + Shadcn/UI
- **AI**: Claude API (primary) + GPT-4 (fallback)
- **Backend**: Supabase (DB + Auth + Realtime)
- **Analytics**: PostHog
- **Deployment**: Vercel

## 🎨 Brand Essence

**Tagline**: "Stop dreaming. Start executing."

**Positioning**: The Cursor of personal development - AI that understands your complete life context and generates personalized execution systems.

## 📝 Version

**Document Version**: 1.0  
**Last Updated**: February 2026  
**Status**: Pre-MVP Development

---

**Remember**: This isn't about building another productivity app. It's about creating a new category - the Execution Board - that will evolve into the social network of progress.

Build with precision. Execute with speed. 🌱

---

# GlowAppLify - Execution Board App

Transform your goals into actionable execution boards in seconds using AI.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-proj-your-key-here
```

Get your API key from: https://platform.openai.com/api-keys

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Enter Your Goal**: Tell the app your goal in your own words
2. **AI Generates Board**: ChatGPT creates a complete 5-layer execution board in seconds
3. **Edit As Needed**: Customize the board to fit your preferences
4. **Track Daily**: Use the daily view to check off actions and track progress

## Features

### 5-Layer Execution Framework

1. **Vision**: Your future identity, mantra, and vision
2. **Goal**: SMART goal with KPIs and 90-day deadline
3. **Execution**: Weekly breakdown with daily micro-actions
4. **Obstacles**: If-then plans for common obstacles
5. **Habits**: Morning, deep work, and evening rituals

### Core Functionality

- Fast AI-powered board generation (10-30 seconds)
- Inline editing of all board elements
- Daily tracking with checkboxes
- Progress visualization
- Evening check-in with mood tracking
- Local storage (no database setup required for MVP)

## Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Storage**: localStorage (Supabase integration coming soon)

## Project Structure

```
app/
├── app/
│   ├── api/board/generate/    # AI board generation endpoint
│   └── page.tsx               # Main app page
├── components/
│   ├── OnboardingForm.tsx     # Goal input form
│   ├── ExecutionBoardView.tsx # 5-layer board display
│   └── DailyView.tsx          # Daily action tracking
└── lib/
    ├── types.ts               # TypeScript types
    └── storage.ts             # localStorage utilities
```

## Cost Optimization

Using GPT-4o-mini to keep costs low:
- ~$0.10-0.20 per board generation
- $5 budget = ~25-50 boards

## Roadmap

- [ ] Supabase integration for persistent storage
- [ ] User authentication
- [ ] Weekly progress analytics
- [ ] Streak tracking
- [ ] Mobile app
- [ ] Social features

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
