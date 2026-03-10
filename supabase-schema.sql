-- Run this in your Supabase SQL editor to set up the database schema

-- Posts table (for blog CMS)
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  published boolean default false,
  cover_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Leads table (newsletter sign-ups)
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  name text,
  source text default 'newsletter',
  created_at timestamptz default now()
);

-- Contacts table (palestra / consultoria form)
create table if not exists public.contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.posts enable row level security;
alter table public.leads enable row level security;
alter table public.contacts enable row level security;

-- Public can read published posts
create policy "Public read published posts"
  on public.posts for select
  using (published = true);

-- Service role can do everything (used by admin panel)
create policy "Service role full access posts"
  on public.posts for all
  using (true)
  with check (true);

create policy "Service role full access leads"
  on public.leads for all
  using (true)
  with check (true);

create policy "Service role full access contacts"
  on public.contacts for all
  using (true)
  with check (true);

-- Anyone can insert leads and contacts (public forms)
create policy "Public insert leads"
  on public.leads for insert
  with check (true);

create policy "Public insert contacts"
  on public.contacts for insert
  with check (true);

-- Updated_at trigger for posts
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at
  before update on public.posts
  for each row execute procedure public.handle_updated_at();
