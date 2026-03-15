-- Run this in your Supabase SQL editor (same project as Hair by Eunice)
-- These use separate table names so they don't clash

create table if not exists veloire_bookings (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  email text not null,
  phone text not null,
  service_id text,
  service_name text,
  date text not null,
  time text not null,
  notes text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists veloire_services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null default 0,
  duration integer default 0,
  category text default 'installs',
  created_at timestamptz default now()
);

create table if not exists veloire_blocked_dates (
  id uuid primary key default gen_random_uuid(),
  date text not null unique,
  reason text,
  created_at timestamptz default now()
);

-- Enable Row Level Security and allow public access (same as other tables)
alter table veloire_bookings enable row level security;
alter table veloire_services enable row level security;
alter table veloire_blocked_dates enable row level security;

create policy "Allow all" on veloire_bookings for all using (true) with check (true);
create policy "Allow all" on veloire_services for all using (true) with check (true);
create policy "Allow all" on veloire_blocked_dates for all using (true) with check (true);
