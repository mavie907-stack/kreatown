-- ═══════════════════════════════════════════════════════════
--  KREATOWN — Supabase Database Schema
--  Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────
create table profiles (
  id                uuid references auth.users on delete cascade primary key,
  username          text unique not null,
  display_name      text not null,
  avatar_url        text,
  bio               text,
  website           text,
  is_creator        boolean default false,
  stripe_account_id text,          -- Stripe Connect account
  created_at        timestamptz default now()
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update their own profile"
  on profiles for update using (auth.uid() = id);

-- ─── TIERS ───────────────────────────────────────────────────
create table tiers (
  id               uuid default uuid_generate_v4() primary key,
  creator_id       uuid references profiles(id) on delete cascade,
  name             text not null,
  level            text check (level in ('free','silver','gold')) not null,
  price            int not null default 0,   -- cents, 0 = free
  description      text,
  perks            text[] default '{}',
  stripe_price_id  text,
  created_at       timestamptz default now()
);

alter table tiers enable row level security;

create policy "Tiers are public"
  on tiers for select using (true);

create policy "Creators manage their own tiers"
  on tiers for all using (auth.uid() = creator_id);

-- ─── POSTS ───────────────────────────────────────────────────
create table posts (
  id              uuid default uuid_generate_v4() primary key,
  creator_id      uuid references profiles(id) on delete cascade,
  title           text not null,
  body            text,
  media_url       text,
  media_type      text check (media_type in ('text','image','video','audio')),
  thumbnail_url   text,
  tier_required   text check (tier_required in ('free','silver','gold')) default 'free',
  published       boolean default false,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table posts enable row level security;

-- Free posts visible to all, paid posts only to members
create policy "Free posts are public"
  on posts for select
  using (tier_required = 'free' and published = true);

create policy "Creators see all their posts"
  on posts for select
  using (auth.uid() = creator_id);

create policy "Creators manage their own posts"
  on posts for all
  using (auth.uid() = creator_id);

-- ─── MEMBERSHIPS ─────────────────────────────────────────────
create table memberships (
  id                       uuid default uuid_generate_v4() primary key,
  fan_id                   uuid references profiles(id) on delete cascade,
  creator_id               uuid references profiles(id) on delete cascade,
  tier_id                  uuid references tiers(id),
  tier_level               text check (tier_level in ('free','silver','gold')),
  stripe_subscription_id   text,
  status                   text check (status in ('active','cancelled','past_due')) default 'active',
  started_at               timestamptz default now(),
  ends_at                  timestamptz,
  unique(fan_id, creator_id)
);

alter table memberships enable row level security;

create policy "Users see their own memberships"
  on memberships for select
  using (auth.uid() = fan_id or auth.uid() = creator_id);

create policy "System manages memberships"
  on memberships for all
  using (auth.uid() = fan_id or auth.uid() = creator_id);

-- ─── MESSAGES ────────────────────────────────────────────────
create table messages (
  id           uuid default uuid_generate_v4() primary key,
  sender_id    uuid references profiles(id) on delete cascade,
  receiver_id  uuid references profiles(id) on delete cascade,
  body         text not null,
  read         boolean default false,
  created_at   timestamptz default now()
);

alter table messages enable row level security;

create policy "Users see their own messages"
  on messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users send messages"
  on messages for insert
  with check (auth.uid() = sender_id);

-- ─── HELPER FUNCTIONS ────────────────────────────────────────

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Auto-update updated_at on posts
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row execute procedure update_updated_at();
