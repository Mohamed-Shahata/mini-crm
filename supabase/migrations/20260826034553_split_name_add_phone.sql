-- Split full_name into first_name/last_name and add a phone column to profiles.

alter table public.profiles
  add column first_name text,
  add column last_name text,
  add column phone text;

-- Best-effort backfill from existing full_name for any pre-existing rows.
update public.profiles
set
  first_name = coalesce(nullif(split_part(full_name, ' ', 1), ''), 'N/A'),
  last_name = coalesce(nullif(trim(substring(full_name from length(split_part(full_name, ' ', 1)) + 1)), ''), 'N/A')
where full_name is not null;

alter table public.profiles
  alter column first_name set not null,
  alter column last_name set not null;

alter table public.profiles
  drop column full_name;