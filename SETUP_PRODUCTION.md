
# 🚀 Production Setup Guide for GlowApplify

This guide will walk you through the steps to connect your local application to the real world: a live database (Supabase) and a live AI brain (OpenAI).

## 1. Setup Database (Supabase)
We use **Supabase** for the database and authentication.

1.  **Create a Project**: Go to [Supabase.com](https://supabase.com) and create a new project.
2.  **Get Credentials**:
    *   Go to **Project Settings > API**.
    *   Copy the `Project URL` (e.g., `https://xyz.supabase.co`).
    *   Copy the `anon` / `public` API Key.
3.  **Configure Environment**:
    *   Open `.env.local` in your project root.
    *   Update/Add these lines:
        ```bash
        NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
        ```
4.  **Initialize Database**:
    *   Go to the **SQL Editor** in your Supabase dashboard.
    *   Open the file `lib/db/schema.sql` in your IDE.
    *   Copy **ALL** the content of `schema.sql`.
    *   Paste it into the Supabase SQL Editor and click **Run**.
    *   *Success!* You should see your tables (`execution_boards`, `actions`, `daily_logs` etc.) created.

## 2. Setup AI (OpenAI)
We use **OpenAI** (GPT-4o) for the intelligent insights.

1.  **Get API Key**:
    *   Go to [OpenAI Platform](https://platform.openai.com/api-keys).
    *   Create a new secret key.
2.  **Configure Environment**:
    *   Add this line to your `.env.local`:
        ```bash
        OPENAI_API_KEY=sk-proj-your-secret-key-here
        ```
    *   *Note*: This key is secret. Never commit it to GitHub.

## 3. Verify Authentication
The provided schema automatically creates a user profile when a user signs up.

1.  Go to **Authentication > Providers** in Supabase.
2.  Ensure **Email/Password** is enabled.
3.  (Optional) Enable Google/GitHub login if you want social auth.

## 4. Run the App
1.  Restart your development server to load the new env vars:
    ```bash
    npm run dev
    ```
2.  Open the app. It will try to fetch data.
3.  Since you are a new user, you might see "empty" states or mock fallbacks until you create some data via the Onboarding flow (which will need to be hooked up to write to these tables if not already).

## 5. Deployment (Vercel)
To put this on the internet:

1.  Push your code to **GitHub**.
2.  Go to [Vercel.com](https://vercel.com) and import your repo.
3.  **Environment Variables**:
    *   Vercel will ask for Environment Variables.
    *   Copy-paste the same values from your `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `OPENAI_API_KEY`).
4.  Click **Deploy**.

**Congratulations!** Your "Revolutionary Execution" app is complete and connected to real infrastructure.
