# How to Import Data into Supabase

Your Supabase database tables are currently empty. Follow these steps to populate them with data.

## Quick Start - Import Core Data

### Step 1: Run the Core Data Import Script

1. Open your **Supabase Dashboard**
2. Go to **SQL Editor** (left sidebar)
3. Click **"New query"**
4. Copy the contents of `scripts/006_import_core_data.sql`
5. Paste into the SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)

This will populate these tables:
- ✓ youth_population (8 LGAs)
- ✓ youth_with_disabilities (4 age groups)
- ✓ youth_without_disabilities (4 age groups)
- ✓ human_trafficking (12 records)
- ✓ youth_migration (12 records)

### Step 2: Add Data Through the Application

The remaining tables can be populated by using the application forms:

#### NSC Participants
- Navigate to `/nsc` in your application
- Click "Add New Participant"
- Fill in the form and submit

#### NYSS Programs & Graduates
- Navigate to `/nyss` in your application
- Add programs and graduates through the interface

#### NYC Activities
- Navigate to `/nyc-activities` in your application
- Register activities through the form

#### GNYC Activities
- Navigate to `/gnyc-activities` in your application
- Add activities through the interface

#### NEDI Programs
- Navigate to `/nedi-programs` in your application
- Add programs through the form

#### Indicator Data
- Navigate to `/indicator-data` in your application
- Add indicators through the interface

## Alternative: Import Sample Data for All Tables

If you want to populate ALL tables with sample data at once, I can create additional SQL scripts. Let me know which tables you want pre-populated with sample data.

## Verify Data Import

After running the import script, verify the data was imported:

\`\`\`sql
-- Check record counts
SELECT 'youth_population' as table_name, COUNT(*) as records FROM youth_population
UNION ALL
SELECT 'youth_with_disabilities', COUNT(*) FROM youth_with_disabilities
UNION ALL
SELECT 'youth_without_disabilities', COUNT(*) FROM youth_without_disabilities
UNION ALL
SELECT 'human_trafficking', COUNT(*) FROM human_trafficking
UNION ALL
SELECT 'youth_migration', COUNT(*) FROM youth_migration;
\`\`\`

You should see:
- youth_population: 8 records
- youth_with_disabilities: 4 records
- youth_without_disabilities: 4 records
- human_trafficking: 12 records
- youth_migration: 12 records

## Troubleshooting

### "permission denied" error
Make sure you're logged in as the database owner or have proper permissions.

### "relation does not exist" error
Run the table creation scripts first before importing data.

### Data not showing in application
1. Check that you're logged in with proper role (admin or data_entry)
2. Verify RLS policies are set up correctly
3. Check browser console for errors

## Need Help?

If you encounter any issues, check the application logs or contact support.
