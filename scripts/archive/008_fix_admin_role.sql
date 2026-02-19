-- Fix the admin user role
-- Run this in Supabase SQL Editor to give your user admin access

-- Update the existing user to admin role
UPDATE users 
SET role = 'admin', 
    name = 'System Administrator',
    updated_at = NOW()
WHERE email = 'admin@doys.gov.gm';

-- Verify the update
SELECT id, email, name, role, created_at 
FROM users 
WHERE email = 'admin@doys.gov.gm';
