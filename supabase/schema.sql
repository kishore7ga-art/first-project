create table if not exists sections(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  code text,
  tags text[] default '{}',
  is_free boolean default true,
  dna_hash text,
  dna_color text,
  dna_color_hex text,
  dna_font text,
  dna_layout text,
  dna_animation text,
  uses_count integer default 0,
  ai_generated boolean default false,
  created_at timestamptz default now()
);

create table if not exists projects(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  name text not null default 'Untitled Project',
  sections_order jsonb default '[]',
  theme jsonb default '{}',
  brand_kit jsonb default '{}',
  niche text,
  published_url text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists project_versions(
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  snapshot jsonb not null,
  label text,
  thumbnail_url text,
  created_at timestamptz default now()
);

create table if not exists project_collaborators(
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  user_id uuid references auth.users on delete cascade,
  role text default 'editor',
  joined_at timestamptz default now()
);

create unique index if not exists idx_dna
  on sections(dna_hash) where dna_hash is not null;
create index if not exists idx_cat on sections(category);
create index if not exists idx_color on sections(dna_color);
create index if not exists idx_proj on projects(user_id);

alter table projects enable row level security;
drop policy if exists "own" on projects;
create policy "own" on projects for all using(auth.uid() = user_id);

alter table sections enable row level security;
drop policy if exists "read" on sections;
create policy "read" on sections for select using(true);
