-- Create initial admin user
-- This script should be run manually after the first user signs up
-- Replace the email with the actual admin email

-- First, the admin needs to sign up through the UI
-- Then run this script to upgrade their role to admin

-- Update user role to admin (replace with actual user email)
UPDATE public.users
SET role = 'admin'
WHERE email = 'admin@doys.gov.gm';

-- Verify the update
SELECT id, email, name, role, created_at
FROM public.users
WHERE email = 'admin@doys.gov.gm';
