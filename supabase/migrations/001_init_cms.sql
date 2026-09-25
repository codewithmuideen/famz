-- Dieux website CMS schema — Phase 1 foundation.
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run.

-- ---------------------------------------------------------------------
-- Admins: who is allowed to write content. No RLS policies are defined
-- for this table on purpose, so it is unreachable via the anon/authenticated
-- client roles entirely — it's only touched from the SQL editor, or read
-- internally by the is_admin() function below (which runs as the table
-- owner via SECURITY DEFINER).
-- ---------------------------------------------------------------------
create table if not exists admins (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from admins where id = auth.uid());
$$;

-- ---------------------------------------------------------------------
-- site_content: one row per named section of a page (hero text, promise
-- blocks, FAQ intro copy, footer text, nav labels, etc). `content` holds
-- whatever shape that section needs.
-- ---------------------------------------------------------------------
create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section_key text not null,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (page, section_key)
);

alter table site_content enable row level security;

create policy "site_content readable by everyone"
  on site_content for select
  using (true);

create policy "site_content writable by admins"
  on site_content for all
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------
-- collections: repeatable items — services, industries, insights
-- articles, team members, testimonials, locations, faqs, open roles.
-- `collection` picks which list an item belongs to.
-- ---------------------------------------------------------------------
create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  collection text not null,
  slug text,
  data jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists collections_collection_slug_key
  on collections (collection, slug)
  where slug is not null;

create index if not exists collections_collection_idx on collections (collection);

alter table collections enable row level security;

create policy "collections: published rows readable by everyone"
  on collections for select
  using (published = true or is_admin());

create policy "collections writable by admins"
  on collections for all
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------
-- media: metadata for files uploaded to the "media" storage bucket.
-- ---------------------------------------------------------------------
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  url text not null,
  alt_text text,
  created_at timestamptz not null default now()
);

alter table media enable row level security;

create policy "media readable by everyone"
  on media for select
  using (true);

create policy "media writable by admins"
  on media for all
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------
-- keep updated_at fresh on every UPDATE
-- ---------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_set_updated_at on site_content;
create trigger site_content_set_updated_at
  before update on site_content
  for each row execute function set_updated_at();

drop trigger if exists collections_set_updated_at on collections;
create trigger collections_set_updated_at
  before update on collections
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------
-- Grant yourself admin rights. Run this AFTER creating your user in
-- Authentication -> Users (Info@dieux.co.uk). Replace the email if needed.
-- ---------------------------------------------------------------------
insert into admins (id)
select id from auth.users where email = 'Info@dieux.co.uk'
on conflict (id) do nothing;
