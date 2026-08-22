create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  full_name text not null,

  avatar_url text,

  role text not null default 'member'
    check (role in ('admin', 'manager', 'member')),

  department text not null
    check (
      department in (
        'marketing',
        'frontend',
        'backend',
        'full_stack',
        'ui_ux',
        'content'
      )
    ),

  is_active boolean not null default true,

  invited_by uuid references public.profiles(id) on delete set null,

  last_login_at timestamptz,

  first_login boolean not null default true,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Authenticated users can view profiles"
on public.profiles
for select
to authenticated
using (true);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_updated_at();