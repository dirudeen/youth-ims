# Database Setup Guide

This guide will help you set up the complete database structure for the Youth Information Management System.

## Prerequisites

- Supabase project connected to this v0 workspace
- Admin access to run SQL scripts

## Setup Steps

### 1. Create Users Table and Authentication

Run these scripts in order:

1. **scripts/auth/001_create_users_table.sql**
   - Creates the users table with role-based access
   - Sets up Row Level Security (RLS) policies
   - Creates triggers for auto-profile creation
   - Adds indexes for performance

2. **scripts/auth/002_create_admin_user.sql**
   - After the first user signs up, run this to make them an admin
   - Replace the email with the actual admin email

### 2. Add RLS to All Data Tables

Run **scripts/auth/003_add_rls_to_all_tables.sql**

This script:
- Enables Row Level Security on all data tables
- Creates helper functions for permission checks
- Adds policies for SELECT (all authenticated users)
- Adds policies for INSERT/UPDATE/DELETE (admin and data_entry_clerk only)

### 3. Verify Setup

After running all scripts, verify:

1. **Authentication Works**
   - Go to `/auth/sign-up` and create a test account
   - Check your email for confirmation
   - Confirm your email
   - Sign in at `/login`

2. **User Table Populated**
   - After sign-up, check that a record was created in `public.users`
   - Verify the role is set correctly

3. **RLS is Active**
   - Try to query data tables - should work when authenticated
   - Try to insert data as a viewer - should fail
   - Try to insert data as data_entry_clerk - should succeed

4. **User Management Works**
   - Upgrade your user to admin using script 002
   - Go to `/user-management`
   - Create a new user
   - Edit user roles
   - Verify permissions work correctly

## Database Schema

### Users Table

\`\`\`sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('data_entry_clerk', 'viewer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

### Roles

- **admin**: Full access - can manage users, edit all data, view everything
- **data_entry_clerk**: Can add and edit records in data tables, view everything
- **viewer**: Can only view data, no editing permissions

### RLS Policies

All data tables have these policies:
- **SELECT**: Any authenticated user can view
- **INSERT/UPDATE/DELETE**: Only admin and data_entry_clerk can modify

## Troubleshooting

### Users can't sign up
- Check that the users table exists
- Verify the trigger `on_auth_user_created` is active
- Check Supabase logs for errors

### RLS blocking legitimate queries
- Ensure user is authenticated (check `auth.uid()`)
- Verify user has correct role in `public.users`
- Check that RLS policies are created correctly

### Import not working
- Verify user has data_entry_clerk or admin role
- Check that RLS policies allow INSERT
- Ensure CSV columns match database schema

## Next Steps

1. Run all SQL scripts in order
2. Create your first admin user
3. Test authentication and permissions
4. Start importing data using the Import Data feature
5. Create additional users as needed

## Support

If you encounter issues:
1. Check the Supabase logs
2. Verify all SQL scripts ran successfully
3. Ensure environment variables are set correctly
4. Check that RLS is enabled on all tables
