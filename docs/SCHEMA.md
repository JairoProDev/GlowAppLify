
# Database Schema for Execution Board

To support the revolutionary 5-layer execution board, please ensure your Supabase `execution_boards` table has the following structure.

Since the application sends the board object directly, the table columns must match the JSON keys.

## Table: `execution_boards`

| Column Name       | Type      | Description                                      |
| ----------------- | --------- | ------------------------------------------------ |
| `id`              | uuid      | Primary Key, default `gen_random_uuid()`         |
| `created_at`      | timestamp | Default `now()`                                  |
| `updated_at`      | timestamp | Default `now()`                                  |
| `user_id`         | uuid      | Foreign Key to `auth.users.id` (nullable for MVP)|
| `vision_layer`    | jsonb     | Stores Vision & Mantra                           |
| `goal_layer`      | jsonb     | Stores SMART Goal & KPIs                         |
| `execution_layer` | jsonb     | Stores Weekly Plan & Actions                     |
| `obstacle_layer`  | jsonb     | Stores Impediments & If-Then Plans               |
| `habits_layer`    | jsonb     | Stores Daily Routines                            |

## SQL Setup Script

You can run this in your Supabase SQL Editor:

```sql
create table public.execution_boards (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone null default now(),
  user_id uuid null references auth.users (id),
  vision_layer jsonb null,
  goal_layer jsonb null,
  execution_layer jsonb null,
  obstacle_layer jsonb null,
  habits_layer jsonb null,
  
  constraint execution_boards_pkey primary key (id)
);

-- Enable RLS
alter table public.execution_boards enable row level security;

-- Policy for Public/Anon Access (For MVP/Testing only - restrict in production)
create policy "Enable insert for all users" on public.execution_boards
  for insert with check (true);

create policy "Enable select for all users" on public.execution_boards
  for select using (true);
```

## Note on Data
The application generates the board using AI and stores it here. The frontend reads this structure directly.
