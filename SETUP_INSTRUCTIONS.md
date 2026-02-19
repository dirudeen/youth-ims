# Youth IMS - Supabase Setup Instructions

## Step 1: Create Admin User in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Users**
4. Click **Add User** → **Create new user**
5. Enter the following details:
   - **Email**: `admin@doys.gov.gm`
   - **Password**: `admin@doys.gov.gm`
   - **Auto Confirm User**: ✅ (checked)
6. Click **Create User**

## Step 2: Run Database Setup Script

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `scripts/001_create_users_table_and_admin.sql`
4. Click **Run** to execute the script

This script will:
- Create a trigger to automatically create user profiles when new users sign up
- Set up Row Level Security (RLS) policies for the users table
- Configure proper permissions for authenticated users

## Step 3: Set Admin Role

After creating the user and running the script:

1. Go to **SQL Editor** in Supabase Dashboard
2. Run this query to set the admin role:

\`\`\`sql
UPDATE public.users 
SET role = 'admin', name = 'System Administrator'
WHERE email = 'admin@doys.gov.gm';
\`\`\`

## Step 4: Login to the System

1. Go to your application login page
2. Enter credentials:
   - Email: `admin@doys.gov.gm`
   - Password: `admin@doys.gov.gm`
3. Click **Sign In**

## User Roles

The system supports three roles:

- **admin**: Full access to all features, can manage users and all data
- **data_entry_clerk**: Can add and edit data in all tables
- **viewer**: Can only view data, cannot modify anything

## Creating Additional Users

Once logged in as admin:

1. Navigate to **User Management** in the sidebar
2. Click **Add New User**
3. Fill in user details and assign appropriate role
4. The user will receive an email to set their password

## Troubleshooting

### Can't login?
- Verify the user was created in Supabase Auth
- Check that the SQL script ran successfully
- Ensure the user's role is set to 'admin' in the users table

### RLS Policy Errors?
- Make sure all SQL scripts have been run
- Check that RLS is enabled on all tables
- Verify the user's role in the database matches their intended permissions

### Data not showing?
- Check browser console for errors
- Verify Supabase environment variables are set correctly
- Ensure RLS policies allow the user to read data based on their role
