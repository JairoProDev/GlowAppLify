# Getting Started with GlowAppLify

Your AI-powered execution board app is ready! Here's how to start using it immediately.

## What You Have Now

A fully working MVP that does ONE thing exceptionally well:
**User tells their goal → AI creates execution board in seconds → User edits as needed → Everything saves automatically**

## Quick Start (5 Minutes)

### Step 1: Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Log in with your OpenAI account
3. Click "Create new secret key"
4. Name it "GlowAppLify"
5. Copy the key (starts with `sk-proj-` or `sk-`)
6. **Important**: Save it somewhere safe - you can't see it again!

### Step 2: Set Up the App

```bash
# Navigate to the app directory
cd app

# Copy the environment file
cp .env.example .env.local

# Open .env.local and add your API key
# Replace "your_openai_api_key_here" with your actual key
```

Your `.env.local` should look like:
```
OPENAI_API_KEY=sk-proj-abc123...your-actual-key
```

### Step 3: Run the App

```bash
# Make sure you're in the app directory
cd app

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

Open http://localhost:3000 in your browser.

## How to Use Your App

### 1. Enter Your Goal (30 seconds)

On the landing page, you'll see a simple form. Just type your goal in your own words:
- "I want to lose 20 pounds"
- "Launch my online business"
- "Learn to code"
- "Write a book"
- "Get promoted at work"

Optionally add:
- Your situation (student, 9-5, entrepreneur, etc.)
- Time available per day
- What's stopped you before

### 2. AI Generates Your Board (10-30 seconds)

The AI will create a complete 5-layer execution board:
1. **Vision**: Your future identity and mantra
2. **Goal**: SMART goal with KPIs
3. **Execution**: Daily micro-actions for 2 weeks
4. **Obstacles**: If-then plans for challenges
5. **Habits**: Morning, deep work, and evening rituals

### 3. Edit As You Want

Click "Edit Board" to customize anything:
- Change your vision statement
- Adjust daily actions
- Modify KPIs
- Update obstacles and if-then plans
- Everything saves automatically when you click "Save Changes"

### 4. Start Daily Execution

Click "Start Daily Execution" to see today's actions:
- Check off tasks as you complete them
- See your progress percentage
- Your ONE Thing is highlighted at the top
- Add evening check-in with mood and reflection

## Key Features

- **Fast**: Board generation in 10-30 seconds
- **Editable**: Change anything you want
- **Auto-save**: All edits save to your browser
- **Daily tracking**: Check off actions, track progress
- **Persistent**: Your board stays even if you close the browser
- **Cost-effective**: ~$0.10-0.20 per board generation

## Your $5 Budget

With $5 in OpenAI credits:
- You can generate 25-50 execution boards
- Each board generation costs $0.10-0.20
- Uses GPT-4o-mini (most cost-effective model)
- Daily tracking is free (no API calls)

## Testing Your App

Try it with a real goal:
1. Enter a goal you actually want to achieve
2. Review the generated board
3. Edit anything that doesn't fit
4. Start tracking today's actions
5. Use it for a week and see if it helps!

## Data Storage

Currently uses **localStorage** (browser storage):
- No database setup required
- Data stays in your browser
- Clear your browser data = lose your board
- Use same browser to access your board

Future: Supabase integration for cloud storage

## Troubleshooting

### "Failed to generate board"
- Check your API key in `.env.local`
- Make sure you have OpenAI credits
- Restart the dev server: `npm run dev`

### Board not showing up
- Check browser console for errors (F12)
- Clear localStorage and try again
- Make sure you're using the same browser

### Build errors
- Delete `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Try again: `npm run dev`

## Next Steps

Once the core feature works well:
1. ✅ Test with your own goals
2. ✅ Use it daily for a week
3. ✅ Share with friends for feedback
4. Then we can add:
   - Supabase for cloud storage
   - User authentication
   - Multiple boards
   - Advanced analytics
   - Mobile app

## Project Structure

```
app/
├── app/
│   ├── api/board/generate/  → AI board generation
│   ├── page.tsx             → Main app page
│   └── layout.tsx           → App layout
├── components/
│   ├── OnboardingForm.tsx   → Goal input form
│   ├── ExecutionBoardView.tsx → Board display
│   └── DailyView.tsx        → Daily tracking
├── lib/
│   ├── types.ts             → TypeScript types
│   └── storage.ts           → localStorage utils
├── .env.local               → Your API key (DO NOT COMMIT)
└── .env.example             → Template for API key
```

## Important Files

- `README.md` - Project documentation
- `SETUP.md` - Detailed setup instructions
- `.env.example` - Environment variables template
- `GETTING_STARTED.md` - This file

## Support

If something doesn't work:
1. Check the console (F12 in browser)
2. Review the error message
3. Check the troubleshooting section above
4. Make sure your API key is correct

## Remember

The most important thing for a startup is to **do ONE thing exceptionally well**. This app does exactly that:

**User describes goal → AI creates execution board → User uses it daily → Success**

Everything else is secondary. Get this working, use it yourself, make it useful, then we can add more features.

Good luck! 🚀
