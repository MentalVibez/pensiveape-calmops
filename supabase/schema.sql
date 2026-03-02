-- CalmOps MVP schema

create table if not exists public.incident_resets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trigger_type text not null,
  stress_level_before int not null check (stress_level_before between 1 and 10),
  stress_level_after int check (stress_level_after between 1 and 10),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.incident_resets enable row level security;

create policy "Users can read own resets"
  on public.incident_resets for select
  using (auth.uid() = user_id);

create policy "Users can insert own resets"
  on public.incident_resets for insert
  with check (auth.uid() = user_id);
