-- Fix infinite recursion in users table RLS policies
-- The issue: policies were querying the users table within themselves

-- Drop all existing policies on users table
DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "users_select_admin" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "users_update_roles_admin" ON public.users;
DROP POLICY IF EXISTS "users_insert_admin" ON public.users;

-- Create a helper function to get user role (bypasses RLS with SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM public.users
  WHERE id = user_id;
  
  RETURN user_role;
END;
$$;

-- Create a helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin';
END;
$$;

-- Policy 1: Users can view their own profile
CREATE POLICY "users_select_own"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy 2: Admins can view all users (using helper function to avoid recursion)
CREATE POLICY "users_select_admin"
  ON public.users
  FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

-- Policy 3: Users can update their own profile (name, email only - not role)
CREATE POLICY "users_update_own"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    role = public.get_user_role(auth.uid())
  );

-- Policy 4: Admins can update any user including roles
CREATE POLICY "users_update_roles_admin"
  ON public.users
  FOR UPDATE
  USING (public.get_user_role(auth.uid()) = 'admin');

-- Policy 5: Admins can insert new users
CREATE POLICY "users_insert_admin"
  ON public.users
  FOR INSERT
  WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

-- Policy 6: Allow new user creation during signup (when no user exists yet)
CREATE POLICY "users_insert_signup"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Grant execute permission on helper functions
GRANT EXECUTE ON FUNCTION public.get_user_role(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
