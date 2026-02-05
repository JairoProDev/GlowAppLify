-- Migration: Add Life Areas System
-- Description: Adds life_areas table, area_connections table, and updates existing tables.

-- 1. Create LIFE AREAS table
create table public.life_areas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  area_type text not null, -- 'finances', 'health', 'learning', 'career', 'relationships', 'wellness', 'creativity', 'growth'
  status text default 'active', -- 'principal', 'active', 'maintenance', 'inactive'
  
  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  
  -- Constraint: One area type per user (e.g. user can't have 2 "Health" areas, simplicity rule)
  unique(user_id, area_type)
);

-- 2. Create AREA CONNECTIONS table (Interrelationships)
create table public.area_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  source_area_id uuid references public.life_areas(id) on delete cascade not null,
  target_area_id uuid references public.life_areas(id) on delete cascade not null,
  connection_type text, -- 'synergy', 'conflict', 'dependency'
  description text,
  detected_by text default 'user', -- 'user', 'ai'
  
  created_at timestamptz default now()
);

-- 3. Update GOALS table to link to Life Areas
-- A goal belongs to a board (execution context) AND a specific life area (category)
alter table public.goals 
add column life_area_id uuid references public.life_areas(id) on delete set null;

-- 4. Update ACTIONS table to link to Life Areas
-- Actions usually belong to a Goal, but can also be directly linked to a Life Area (e.g. maintenance habits)
alter table public.actions 
add column life_area_id uuid references public.life_areas(id) on delete set null;

-- 5. Security Policies (RLS)

-- Helper policy for life_areas
alter table public.life_areas enable row level security;
create policy "Users manage own life areas" on public.life_areas using (auth.uid() = user_id);

-- Helper policy for area_connections
alter table public.area_connections enable row level security;
create policy "Users manage own area connections" on public.area_connections using (auth.uid() = user_id);
