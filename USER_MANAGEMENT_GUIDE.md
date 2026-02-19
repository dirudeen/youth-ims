# User Management System Guide

## Overview

The Youth IMS includes a comprehensive user management system with role-based access control (RBAC) to ensure data security and proper access permissions.

## User Roles

The system supports three distinct user roles:

### 1. Admin
- **Full system access**
- Can create, edit, and delete users
- Can assign and change user roles
- Can add, edit, and delete all data records
- Access to user management interface
- Can view all system data and reports

### 2. Data Entry
- **Can add and edit data records**
- Can create new entries in all data tables
- Can modify existing data records
- Can view all system data
- Cannot manage users or change roles
- Cannot delete records (admin only)

### 3. Viewer
- **Read-only access**
- Can view all data and reports
- Cannot add, edit, or delete any records
- Cannot access user management
- Ideal for stakeholders and report viewers

## Users Table Schema

The `users` table in Supabase has the following structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, references auth.users |
| `email` | TEXT | User's email address (unique) |
| `name` | TEXT | Full name of the user |
| `role` | TEXT | User role: admin, data_entry, or viewer |
| `created_at` | TIMESTAMPTZ | Account creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

## Row-Level Security (RLS)

All database tables have RLS policies enabled to enforce permissions:

### Users Table Policies
- **SELECT**: Users can view their own profile; admins can view all users
- **INSERT**: Only admins can create new users
- **UPDATE**: Users can update their own profile (except role); admins can update any user
- **DELETE**: Only admins can delete users

### Data Tables Policies
- **SELECT**: All authenticated users can view data
- **INSERT**: Only admin and data_entry roles can add records
- **UPDATE**: Only admin and data_entry roles can modify records
- **DELETE**: Only admin and data_entry roles can delete records

## User Management Interface

### Accessing User Management
1. Log in as an admin user
2. Navigate to the sidebar menu
3. Click on "User Management"

### Creating a New User
1. Click the "Add New User" button
2. Fill in the required information:
   - Full Name
   - Email Address
   - Role (Admin, Data Entry, or Viewer)
   - Password (minimum 6 characters)
   - Confirm Password
3. Click "Create User"
4. The user will receive a confirmation email

### Editing User Details
1. Find the user in the user list
2. Click the edit icon (pencil)
3. Update the name or role
4. Click "Update User"

**Note**: Email addresses cannot be changed after account creation.

### Deleting a User
1. Find the user in the user list
2. Click the delete icon (trash)
3. Confirm the deletion in the dialog
4. The user will be permanently removed from the system

## Setup Instructions

### 1. Run Database Scripts

Execute these SQL scripts in your Supabase SQL Editor in order:

\`\`\`sql
-- 1. Create users table and RLS policies
-- Run: scripts/auth/001_create_users_table.sql

-- 2. Update role names to match requirements
-- Run: scripts/004_update_role_names.sql
\`\`\`

### 2. Create First Admin User

In Supabase Dashboard:
1. Go to Authentication → Users
2. Click "Add User"
3. Enter email: admin@doys.gov.gm
4. Enter password: admin@doys.gov.gm
5. In "User Metadata", add:
   \`\`\`json
   {
     "name": "System Administrator",
     "role": "admin"
   }
   \`\`\`
6. Click "Create User"

### 3. Verify Setup

1. Log in with the admin credentials
2. Navigate to User Management
3. Verify you can see the admin user
4. Try creating a test user with data_entry role
5. Log out and test the new user's permissions

## Permission Matrix

| Feature | Admin | Data Entry | Viewer |
|---------|-------|------------|--------|
| View Data | ✅ | ✅ | ✅ |
| Add Records | ✅ | ✅ | ❌ |
| Edit Records | ✅ | ✅ | ❌ |
| Delete Records | ✅ | ✅ | ❌ |
| Manage Users | ✅ | ❌ | ❌ |
| Assign Roles | ✅ | ❌ | ❌ |
| View Reports | ✅ | ✅ | ✅ |
| Export Data | ✅ | ✅ | ✅ |

## Security Best Practices

1. **Strong Passwords**: Enforce minimum 6-character passwords (consider increasing to 8+)
2. **Regular Audits**: Review user list regularly and remove inactive accounts
3. **Principle of Least Privilege**: Assign the minimum role necessary for each user
4. **Admin Accounts**: Limit the number of admin accounts to essential personnel only
5. **Password Changes**: Encourage users to change default passwords immediately
6. **Email Verification**: Ensure users verify their email addresses

## Troubleshooting

### User Cannot Login
- Verify the user exists in Supabase Authentication
- Check if email is verified
- Ensure the user has a profile in the users table
- Verify RLS policies are enabled

### User Cannot Access Features
- Check the user's role in the users table
- Verify RLS policies are correctly configured
- Ensure the user is authenticated
- Check browser console for permission errors

### Cannot Create Users
- Verify you're logged in as an admin
- Check Supabase connection and environment variables
- Ensure the users table exists with correct schema
- Verify RLS policies allow admin INSERT operations

## API Reference

### Check User Permissions (Server-side)

\`\`\`typescript
import { getUserPermissions } from '@/lib/permissions'

const permissions = await getUserPermissions()
if (permissions?.canEdit) {
  // User can edit data
}
\`\`\`

### Protect Routes

\`\`\`typescript
import { AuthCheck } from '@/components/auth-check'

export default function AdminPage() {
  return (
    <AuthCheck requireRole="admin">
      {/* Admin-only content */}
    </AuthCheck>
  )
}
\`\`\`

### Conditional Rendering

\`\`\`typescript
import { CanEditWrapper } from '@/components/can-edit-wrapper'

<CanEditWrapper>
  <Button>Edit Record</Button>
</CanEditWrapper>
\`\`\`

## Support

For issues or questions about user management:
1. Check this guide first
2. Review the Supabase dashboard for user status
3. Check application logs for errors
4. Contact system administrator

---

**Last Updated**: January 2025
**System Version**: 2.0
