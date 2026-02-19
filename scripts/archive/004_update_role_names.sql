-- Update role names to match requirements: admin, data_entry, viewer
-- This script updates the existing system to use the correct role names

-- First, update the check constraint on the users table
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE public.users ADD CONSTRAINT users_role_check 
  CHECK (role IN ('admin', 'data_entry', 'viewer'));

-- Update existing data_entry_clerk roles to data_entry
UPDATE public.users SET role = 'data_entry' WHERE role = 'data_entry_clerk';

-- Update all RLS policies to use the new role names
-- The policies will automatically work with the updated role values

-- Update the handle_new_user function to use correct default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NULL),
    COALESCE(NEW.raw_user_meta_data->>'role', 'viewer')
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Update RLS policies for all data tables to use 'data_entry' instead of 'data_entry_clerk'
-- Helper function to check if user can edit
CREATE OR REPLACE FUNCTION public.can_edit_data()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() 
    AND role IN ('admin', 'data_entry')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update all table policies to use the helper function
DO $$
DECLARE
  table_name text;
  table_names text[] := ARRAY[
    'youth_population',
    'youth_with_disabilities', 
    'youth_without_disabilities',
    'human_trafficking',
    'youth_migration',
    'nyc_activities',
    'nsc_participants',
    'nyss_programs',
    'nyss_graduates',
    'indicator_data',
    'registered_youth_orgs',
    'gnyc_activities',
    'nedi_programs'
  ];
BEGIN
  FOREACH table_name IN ARRAY table_names
  LOOP
    -- Drop and recreate INSERT policy
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', table_name || '_insert_editors', table_name);
    EXECUTE format('
      CREATE POLICY %I ON public.%I
      FOR INSERT
      WITH CHECK (public.can_edit_data())
    ', table_name || '_insert_editors', table_name);
    
    -- Drop and recreate UPDATE policy
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', table_name || '_update_editors', table_name);
    EXECUTE format('
      CREATE POLICY %I ON public.%I
      FOR UPDATE
      USING (public.can_edit_data())
    ', table_name || '_update_editors', table_name);
    
    -- Drop and recreate DELETE policy
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', table_name || '_delete_editors', table_name);
    EXECUTE format('
      CREATE POLICY %I ON public.%I
      FOR DELETE
      USING (public.can_edit_data())
    ', table_name || '_delete_editors', table_name);
  END LOOP;
END $$;
