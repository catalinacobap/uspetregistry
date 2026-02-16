-- Registrations table: stores all /register form data 1:1 (no fields added or removed).
-- Step answers (1–26) are in answers JSONB; dedicated form fields have their own columns.

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- All step answers keyed by step number (e.g. "1".."26"). Values: string or comma-separated for multi.
  answers jsonb not null default '{}',

  -- From email step (18)
  email text not null,
  terms_accepted boolean not null default false,

  -- From prequal step (23)
  full_name text not null default '',
  phone text not null default '',

  -- From speed step (25)
  auto_renew boolean not null default false,

  -- Optional: set after Stripe checkout success
  stripe_session_id text
);

-- Index for lookups by id (used on checkout page)
create index if not exists registrations_id_idx on public.registrations (id);

-- Optional: index for listing by created_at
create index if not exists registrations_created_at_idx on public.registrations (created_at desc);

comment on table public.registrations is 'ESA registration form data from /register; persisted when user proceeds to checkout';

-- RLS: allow insert (create registration) and select by id (load on checkout)
alter table public.registrations enable row level security;

create policy "Allow insert registrations"
  on public.registrations for insert
  to anon
  with check (true);

create policy "Allow select by id"
  on public.registrations for select
  to anon
  using (true);
