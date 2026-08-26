-- Create test auth user
insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values (
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'admin@mini-crm.com',
  crypt('12345678', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now()
);

-- Create identity for the user
insert into auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  created_at,
  updated_at
)
values (
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  jsonb_build_object(
    'sub', '11111111-1111-1111-1111-111111111111',
    'email', 'admin@mini-crm.com'
  ),
  'email',
  'admin@mini-crm.com',
  now(),
  now()
);

-- Create profile
insert into public.profiles (
  id,
  first_name,
  last_name,
  phone,
  role,
  department,
  is_active,
  first_login
)
values (
  '11111111-1111-1111-1111-111111111111',
  'Mohamed',
  'Shehata',
  '+201000000000',
  'admin',
  'full_stack',
  true,
  true
);