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
