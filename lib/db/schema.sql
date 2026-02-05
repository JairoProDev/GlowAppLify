
-- GLOWAPPLIFY UNIFIED SCHEMA (Production Ready)
-- Run this in your Supabase SQL Editor to initialize the database.

-- 1. USERS & PROFILES (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  timezone text default 'UTC',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. EXECUTION BOARD (The Core Strategy Layer)
create table public.execution_boards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text default 'My Execution Board',
  vision_statement text, -- Future self vision
  created_at timestamptz default now(),
  is_active boolean default true
);

-- 3. GOAL LAYERS (Within a Board)
create table public.goals (
  id uuid primary key default gen_random_uuid(),
  board_id uuid references public.execution_boards(id) on delete cascade not null,
  title text not null, -- "Smart Goal"
  deadline timestamptz,
  description text,
  status text default 'active', -- active, completed
  created_at timestamptz default now()
);

-- 4. KPI/METRICS
create table public.kpis (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid references public.goals(id) on delete cascade not null,
  metric_name text not null,
  target_value text,
  current_value text,
  deadline timestamptz,
  created_at timestamptz default now()
);

-- 5. 12-WEEK YEAR EXECUTION (Weeks)
create table public.execution_weeks (
  id uuid primary key default gen_random_uuid(),
  board_id uuid references public.execution_boards(id) on delete cascade not null,
  week_number integer not null, -- 1 to 12
  theme text,
  milestone text,
  status text default 'locked', -- locked, active, completed
  start_date date,
  end_date date,
  created_at timestamptz default now()
);

-- 6. DAILY ACTIONS (Tasks)
create table public.actions (
  id uuid primary key default gen_random_uuid(),
  week_id uuid references public.execution_weeks(id) on delete cascade, -- Optional, can be standalone
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date default current_date,
  title text not null,
  description text,
  
  -- Execution details
  duration_minutes integer default 60,
  priority text default 'medium', -- one_thing, high, medium, low
  status text default 'pending', -- pending, completed, skipped, migrated
  
  -- Timing
  scheduled_time time,
  time_of_day text, -- morning, afternoon, evening
  
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- 7. DAILY LOGS (Evening Check-in & Stats)
create table public.daily_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date default current_date,
  
  -- Evening Check-in Data
  mood_score integer, -- 1-3 (Struggled, OK, Great)
  reflection text,
  
  -- Stats Snapshot
  actions_completed integer default 0,
  actions_total integer default 0,
  focus_minutes integer default 0,
  
  created_at timestamptz default now(),
  unique(user_id, date)
);

-- 8. AI INSIGHTS (Stored for history)
create table public.ai_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date default current_date,
  type text, -- pattern, prediction, recommendation
  title text,
  description text,
  actionable_step text,
  created_at timestamptz default now()
);

-- 9. SECURITY POLICIES (RLS)
alter table public.profiles enable row level security;
alter table public.execution_boards enable row level security;
alter table public.goals enable row level security;
alter table public.kpis enable row level security;
alter table public.execution_weeks enable row level security;
alter table public.actions enable row level security;
alter table public.daily_logs enable row level security;
alter table public.ai_insights enable row level security;

-- Basic policy: User access their own data
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users manage their own boards" on public.execution_boards using (auth.uid() = user_id);
create policy "Users manage own goals" on public.goals using (board_id in (select id from execution_boards where user_id = auth.uid()));
create policy "Users manage own weeks" on public.execution_weeks using (board_id in (select id from execution_boards where user_id = auth.uid()));
create policy "Users manage own actions" on public.actions using (auth.uid() = user_id);
create policy "Users manage own logs" on public.daily_logs using (auth.uid() = user_id);
create policy "Users view own insights" on public.ai_insights using (auth.uid() = user_id);

-- 10. TRIGGER FOR NEW USER
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
