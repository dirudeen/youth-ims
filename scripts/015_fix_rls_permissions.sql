-- Fix the can_edit_data() function to use correct role names
-- This ensures Row Level Security (RLS) properly enforces permissions

-- Removed DROP FUNCTION to avoid dependency errors with RLS policies
-- Using CREATE OR REPLACE to update the function in-place
CREATE OR REPLACE FUNCTION public.can_edit_data()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the current user has admin or data_entry role
  -- (not the old 'data_entry_clerk' role)
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() 
    AND role IN ('admin', 'data_entry')  -- Updated role names
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.can_edit_data() TO authenticated;

-- Verify the function works
SELECT public.can_edit_data() AS can_edit;
