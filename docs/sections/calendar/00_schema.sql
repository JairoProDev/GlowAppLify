-- 00_schema.sql
-- Schema for GlowApplify Revolutionary Calendar
-- Based on the "Life-First" and "Energy-Aware" philosophy

-- 1. LIFE AREAS
-- The foundational pillars of the user's life
create type life_area_type as enum (
  'CAREER',
  'HEALTH',
  'RELATIONSHIPS',
  'LEARNING',
  'FINANCES',
  'HOBBIES'
);

create table life_areas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name life_area_type not null,
  target_percentage integer default 15, -- Target % of weekly time
  color text not null, -- Hex code for UI
  created_at timestamptz default now(),
  unique(user_id, name)
);

-- 2. GOALS (EXECUTION BOARD)
-- High-level goals linked to life areas
create table goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  life_area_id uuid references life_areas(id),
  title text not null,
  description text,
  deadline timestamptz,
  status text default 'active', -- active, completed, archived
  created_at timestamptz default now()
);

-- 3. ENERGY PROFILE
-- Tracks user's energy levels and chronotype
create table user_energy_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  chronotype text default 'bear', -- bear, wolf, lion, dolphin
  peak_hours_start time,
  peak_hours_end time,
  low_energy_start time,
  low_energy_end time,
  updated_at timestamptz default now()
);

-- 4. CALENDAR EVENTS & BLOCKS
-- The core calendar units
create type event_type as enum (
  'DEEP_WORK_CREATIVE',   -- High energy, creative
  'DEEP_WORK_ANALYTICAL', -- High energy, logical
  'SHALLOW_WORK',         -- Low energy, admin
  'MEETING_GROUP',
  'MEETING_ONE_ON_ONE',
  'HEALTH_FITNESS',
  'RELATIONSHIP',
  'LEARNING',
  'ROUTINE',              -- Morning/Evening routines
  'BLOCKER'               -- Generic blocker
);

create table calendar_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  goal_id uuid references goals(id), -- Optional link to a goal
  
  title text not null,
  description text,
  
  start_time timestamptz not null,
  end_time timestamptz not null,
  time_zone text default 'UTC',
  
  event_type event_type not null default 'BLOCKER',
  
  -- Energy & Focus
  energy_required text default 'medium', -- low, medium, high
  actual_energy_log integer, -- 1-100% recorded after event
  focus_score integer, -- 1-100% recorded after event
  
  -- Recurrence
  is_recurring boolean default false,
  recurrence_rule text, -- RRULE string
  
  -- Status
  status text default 'scheduled', -- scheduled, completed, skipped, rescheduled
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. DAILY LOGS & HABITS
-- Tracking daily progress and habits
create table habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  target_time time, -- Conceptual time (e.g., 07:00)
  linked_event_type event_type, -- e.g., ROUTINE
  created_at timestamptz default now()
);

create table habit_logs (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid references habits(id) on delete cascade not null,
  date date not null,
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(habit_id, date)
);

-- 6. INDEXES FOR PERFORMANCE
create index idx_calendar_events_user_range on calendar_events(user_id, start_time, end_time);
create index idx_calendar_events_type on calendar_events(event_type);
create index idx_goals_user on goals(user_id);

-- 7. RLS POLICIES (Example Security)
alter table life_areas enable row level security;
alter table goals enable row level security;
alter table user_energy_profiles enable row level security;
alter table calendar_events enable row level security;
alter table habits enable row level security;
alter table habit_logs enable row level security;

-- Policy: Users can only see their own data
create policy "Users can view own life areas" on life_areas for select using (auth.uid() = user_id);
create policy "Users can insert own life areas" on life_areas for insert with check (auth.uid() = user_id);
create policy "Users can update own life areas" on life_areas for update using (auth.uid() = user_id);

create policy "Users can view own events" on calendar_events for select using (auth.uid() = user_id);
create policy "Users can insert own events" on calendar_events for insert with check (auth.uid() = user_id);
create policy "Users can update own events" on calendar_events for update using (auth.uid() = user_id);
create policy "Users can delete own events" on calendar_events for delete using (auth.uid() = user_id);
