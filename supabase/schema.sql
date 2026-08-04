create table if not exists public.portfolio_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  username text not null,
  score smallint not null check (score between 0 and 100),
  strengths jsonb not null,
  recommendations jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.portfolio_reports enable row level security;

alter table public.portfolio_reports
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

create index if not exists portfolio_reports_user_id_created_at_idx
  on public.portfolio_reports (user_id, created_at desc);

drop policy if exists "Users can view their own reports" on public.portfolio_reports;
create policy "Users can view their own reports"
  on public.portfolio_reports for select
  using (auth.uid() = user_id);
