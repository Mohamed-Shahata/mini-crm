-- Age is collected during complete-profile, so it must stay nullable for
-- rows created at invite time (see scripts/create-user.ts).
alter table public.profiles
  add column age smallint
    check (age is null or (age between 16 and 100));