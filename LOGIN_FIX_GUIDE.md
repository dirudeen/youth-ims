# Login Issue Fix Guide

## Problem
Your user account exists in Supabase but has the role "viewer" instead of "admin", preventing full system access.

## Solution

### Step 1: Update User Role to Admin

1. Go to your **Supabase Dashboard**
2. Click **SQL Editor** in the left menu
3. Click **New query**
4. Copy and paste this SQL:

\`\`\`sql
UPDATE users 
SET role = 'admin', 
    name = 'System Administrator',
    updated_at = NOW()
WHERE email = 'admin@doys.gov.gm';
\`\`\`

5. Click **Run** (or press Ctrl+Enter)
6. You should see: "Success. No rows returned"

### Step 2: Verify the Update

Run this query to confirm:

\`\`\`sql
SELECT id, email, name, role, created_at 
FROM users 
WHERE email = 'admin@doys.gov.gm';
\`\`\`

You should see your user with role = 'admin'

### Step 3: Login Again

1. Go back to your application
2. Logout if you're logged in
3. Login with: admin@doys.gov.gm
4. You should now have full admin access

## Alternative: Create New Admin User

If you want to start fresh:

\`\`\`sql
-- First, get your auth user ID
SELECT id, email FROM auth.users WHERE email = 'admin@doys.gov.gm';

-- Then update or insert into users table
INSERT INTO users (id, email, name, role)
VALUES (
  'YOUR_USER_ID_FROM_ABOVE',
  'admin@doys.gov.gm',
  'System Administrator',
  'admin'
)
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin',
  name = 'System Administrator',
  updated_at = NOW();
\`\`\`

## Troubleshooting

### Still Can't Login?

1. **Check RLS Policies**: Make sure you ran `scripts/005_fix_users_rls_policies.sql`
2. **Verify Auth User**: Check that the user exists in Supabase Auth (Authentication → Users)
3. **Check Email Confirmation**: Make sure the user is confirmed (not pending)
4. **Clear Browser Cache**: Try clearing cookies and localStorage, then login again

### Error: "Invalid login credentials"

- Double-check your password
- Make sure the user is confirmed in Supabase Auth
- Try resetting the password in Supabase Dashboard

### Error: "User profile not found"

- Run the SQL script above to ensure the user exists in the users table
- Make sure the user ID matches between auth.users and public.users

## Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Check Supabase logs in the Dashboard
3. Verify all SQL scripts have been run successfully
