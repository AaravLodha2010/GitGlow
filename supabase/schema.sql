create table if not exists public.portfolio_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  username text not null,
  score smallint not null check (score between 0 and 100),
  strengths jsonb not null,
  recommendations jsonb not null,
  metrics jsonb not null default '{}'::jsonb,
  repositories jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.portfolio_reports enable row level security;

alter table public.portfolio_reports
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

alter table public.portfolio_reports
  add column if not exists metrics jsonb not null default '{}'::jsonb;

alter table public.portfolio_reports
  add column if not exists repositories jsonb not null default '[]'::jsonb;

create index if not exists portfolio_reports_user_id_created_at_idx
  on public.portfolio_reports (user_id, created_at desc);

alter table public.portfolio_reports
  add column if not exists is_public boolean not null default false;

drop policy if exists "Anyone can view public portfolio reports" on public.portfolio_reports;
create policy "Anyone can view public portfolio reports"
  on public.portfolio_reports for select
  using (is_public = true);

drop policy if exists "Users can update their own portfolio reports" on public.portfolio_reports;
create policy "Users can update their own portfolio reports"
  on public.portfolio_reports for update
  using (auth.uid() = user_id);

create table if not exists public.resume_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  username text not null,
  score smallint not null check (score between 0 and 100),
  strengths jsonb not null,
  recommendations jsonb not null,
  skill_gaps jsonb not null default '[]'::jsonb,
  project_alignment jsonb not null default '[]'::jsonb,
  experience_gaps jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.resume_reports enable row level security;

create index if not exists resume_reports_user_id_created_at_idx
  on public.resume_reports (user_id, created_at desc);

drop policy if exists "Users can view their own resume reports" on public.resume_reports;
create policy "Users can view their own resume reports"
  on public.resume_reports for select
  using (auth.uid() = user_id);

create table if not exists public.company_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  username text not null,
  company text not null,
  score smallint not null check (score between 0 and 100),
  strengths jsonb not null,
  recommendations jsonb not null,
  relevant_skills jsonb not null default '[]'::jsonb,
  missing_skills jsonb not null default '[]'::jsonb,
  project_fit jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.company_reports enable row level security;

create index if not exists company_reports_user_id_created_at_idx
  on public.company_reports (user_id, created_at desc);

drop policy if exists "Users can view their own company reports" on public.company_reports;
create policy "Users can view their own company reports"
  on public.company_reports for select
  using (auth.uid() = user_id);

create table if not exists public.interview_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  username text not null,
  score smallint not null check (score between 0 and 100),
  strengths jsonb not null,
  recommendations jsonb not null,
  questions jsonb not null default '[]'::jsonb,
  focus_areas jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.interview_reports enable row level security;

create index if not exists interview_reports_user_id_created_at_idx
  on public.interview_reports (user_id, created_at desc);

drop policy if exists "Users can view their own interview reports" on public.interview_reports;
create policy "Users can view their own interview reports"
  on public.interview_reports for select
  using (auth.uid() = user_id);
