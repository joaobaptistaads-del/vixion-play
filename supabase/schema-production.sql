-- PRODUCTION RLS POLICIES
-- Use estas políticas em um ambiente de produção para maior segurança

-- ⚠️ IMPORTANTE: Estas políticas assumem que você está usando Supabase Auth
-- Se estiver usando NextAuth como no projeto atual, você precisará adaptar
-- Para usar estas políticas, você precisaria integrar Supabase Auth

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Users can view own lists" ON public.my_lists;
DROP POLICY IF EXISTS "Users can insert to own lists" ON public.my_lists;
DROP POLICY IF EXISTS "Users can delete from own lists" ON public.my_lists;

-- USERS TABLE - Production policies
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT
  USING (auth.email() = email);

CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT
  WITH CHECK (auth.email() = email);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE
  USING (auth.email() = email)
  WITH CHECK (auth.email() = email);

-- MY_LISTS TABLE - Production policies
CREATE POLICY "Users can view own lists" ON public.my_lists
  FOR SELECT
  USING (auth.email() = user_email);

CREATE POLICY "Users can insert to own lists" ON public.my_lists
  FOR INSERT
  WITH CHECK (auth.email() = user_email);

CREATE POLICY "Users can delete from own lists" ON public.my_lists
  FOR DELETE
  USING (auth.email() = user_email);

-- Additional security: Prevent users from modifying other users' data
ALTER TABLE public.users ADD CONSTRAINT check_own_email 
  CHECK (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Note: The above constraint requires Supabase Auth to be properly configured
-- and will only work with authenticated requests through Supabase Auth

-- ALTERNATIVE for NextAuth (current setup):
-- Since we're using NextAuth, the API routes already handle authorization
-- The simplified policies in schema.sql are acceptable for the demo
-- For production with NextAuth, ensure API routes properly validate:
-- 1. Session exists (getServerSession)
-- 2. User can only access their own data
-- 3. Proper error handling for unauthorized access
