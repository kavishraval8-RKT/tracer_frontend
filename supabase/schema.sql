-- Tracer backend schema. Run once in the Supabase SQL editor (safe to re-run).

-- Profiles: one row per user, created automatically on sign-up.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  plan text not null default 'hobby' check (plan in ('hobby', 'basic', 'pro')),
  billing text check (billing in ('monthly', 'yearly')),
  subscription_status text,
  stripe_customer_id text unique,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);
-- No insert or update policies on purpose: rows come from the trigger below, and plans change
-- only through the Stripe webhook using the service role key. Users can never grant themselves a plan.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

-- Only runs as a trigger; never callable through the public API (/rest/v1/rpc).
revoke execute on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Waitlist sign-ups.
create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) <= 100),
  email text not null unique check (char_length(email) <= 254),
  role text not null,
  platform text not null,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Contact form messages.
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 254),
  topic text not null,
  message text not null check (char_length(message) <= 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
-- waitlist and contact_messages have no policies: only the server (service role) can read or write them.
