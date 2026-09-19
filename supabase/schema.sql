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
  -- Single-plugin-per-user enforcement. The token endpoint mints a `jti`,
  -- writes it here, and bakes it into the JWT payload. The Python backend
  -- checks JWT.jti == profiles.active_device_jti on every request — a
  -- second plugin activation rotates it, so the old plugin's next call
  -- returns 401 and it prompts the user to re-link.
  active_device_jti text,
  active_device_linked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Backfill for existing installs of the schema.
alter table public.profiles
  add column if not exists active_device_jti text,
  add column if not exists active_device_linked_at timestamptz;

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

-- OAuth 2.0 Device Authorization Grant (RFC 8628) — plugin ↔ web pairing.
--   /api/device/code   → mints a row (device_code + user_code, pending)
--   /activate page     → sets approved_user_id when the signed-in user confirms user_code
--   /api/device/token  → the plugin polls; returns a device JWT once approved
create table if not exists public.device_codes (
  device_code text primary key,                    -- opaque, base64url ~43 chars
  user_code text not null unique,                  -- 8-char, human-friendly (Crockford base32 minus IOLU)
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  poll_interval_seconds int not null default 5,
  approved_user_id uuid references auth.users (id) on delete cascade,
  approved_at timestamptz
);

create index if not exists idx_device_codes_user_code on public.device_codes (user_code);
create index if not exists idx_device_codes_expires   on public.device_codes (expires_at);

alter table public.device_codes enable row level security;
-- No policies on purpose: all reads/writes happen through service-role routes
-- (/api/device/*) and the /activate action. Ordinary users never touch this table
-- directly through the public REST API.

-- Per-request usage ledger for the LLM proxy. Python backend writes; web UI reads.
create table if not exists public.usage_ledger (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  endpoint text not null,                          -- '/v1/generate', '/v1/ask', '/v1/plan'
  model text not null,                             -- 'gemini-2.5-pro' etc.
  prompt_tokens bigint not null default 0,
  completion_tokens bigint not null default 0,
  status_code int not null default 200
);

create index if not exists idx_usage_ledger_user_created
  on public.usage_ledger (user_id, created_at desc);

alter table public.usage_ledger enable row level security;

drop policy if exists "Users can read their own usage" on public.usage_ledger;
create policy "Users can read their own usage"
  on public.usage_ledger for select to authenticated
  using ((select auth.uid()) = user_id);
-- Writes come only from the Python backend using the service role key.
