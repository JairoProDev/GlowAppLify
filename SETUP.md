# Setup Instructions

## Getting Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Log in with your OpenAI account
3. Click "Create new secret key"
4. Name it (e.g., "GlowAppLify")
5. Copy the key (it starts with `sk-proj-` or `sk-`)
6. Save it immediately (you won't be able to see it again)

## Setting Up the App

1. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and paste your API key:
   ```
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```

3. Save the file

## Running the App

```bash
npm run dev
```

Open http://localhost:3000 in your browser

## Budget Management

With $5 in OpenAI credits:
- Each board generation costs approximately $0.10-0.20
- You can generate 25-50 execution boards
- GPT-4o-mini is used to minimize costs

## Troubleshooting

### "Failed to generate board" error
- Check that your API key is correctly set in `.env.local`
- Make sure your OpenAI account has credits
- Check the browser console for error details

### Board not saving
- The app uses localStorage
- Clear your browser cache if you see stale data
- Use the same browser to see your saved board

## Next Steps

After the MVP is working, we can add:
- Supabase for persistent storage
- User authentication
- Multiple boards per user
- Advanced analytics
