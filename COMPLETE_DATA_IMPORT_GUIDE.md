# Complete Data Import Guide

## Overview
This guide will help you populate ALL 14 tables in your Supabase database with sample data.

## Tables to be Populated

1. **youth_population** - 28 records (7 regions × 4 age groups)
2. **youth_with_disabilities** - 28 records (7 regions × 4 disability types)
3. **youth_without_disabilities** - 28 records (7 regions × 4 age groups)
4. **human_trafficking** - 21 records (7 regions × 3 incident types)
5. **youth_migration** - 21 records (7 regions × 3 migration types)
6. **nsc_participants** - 10 sample participants
7. **nyss_programs** - 12 training programs (2022-2024)
8. **nyss_graduates** - 10 sample graduates
9. **indicator_data** - 20 sample indicator records (NEDI, PIA, GSI, NYSS, NSC)

## Import Instructions

### Step 1: Access Supabase SQL Editor
1. Go to your Supabase Dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New query**

### Step 2: Run the Import Script
1. Open the file: `scripts/007_import_all_tables_complete.sql`
2. Copy the ENTIRE contents
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

### Step 3: Verify the Import
The script includes verification queries at the end that will show you the record count for each table.

Expected results:
\`\`\`
youth_population: 28 records
youth_with_disabilities: 28 records
youth_without_disabilities: 28 records
human_trafficking: 21 records
youth_migration: 21 records
nsc_participants: 10 records
nyss_programs: 12 records
nyss_graduates: 10 records
indicator_data: 20 records
\`\`\`

### Step 4: Check Your Application
1. Go back to your application
2. Navigate to each data page:
   - Youth Population
   - Youth with Disabilities
   - Youth without Disabilities
   - Human Trafficking
   - Youth Migration
   - NSC Participants
   - NYSS Programs
   - Indicator Data
3. You should now see data in all tables!

## Notes

- The script uses `ON CONFLICT DO UPDATE` or `ON CONFLICT DO NOTHING` so it's safe to run multiple times
- If a record already exists, it will be updated with the new values
- The data includes realistic sample data for The Gambia's 7 regions
- All data is for the year 2024 unless otherwise specified

## Troubleshooting

### If you get permission errors:
- Make sure you're logged in as an admin user
- Check that RLS policies are properly configured

### If tables are still empty:
- Check the SQL Editor output for error messages
- Verify that the tables exist in your database
- Make sure you ran the table creation scripts first

### If you need to clear data and start over:
\`\`\`sql
TRUNCATE youth_population, youth_with_disabilities, youth_without_disabilities,
         human_trafficking, youth_migration, nsc_participants,
         nyss_programs, nyss_graduates, indicator_data CASCADE;
\`\`\`

## Additional Data

The remaining tables (nyc_activities, gnyc_activities, nedi_programs, activity_logs) can be populated through the application UI as users add data.

For more comprehensive indicator data (all 200+ records), you can extend the indicator_data section in the SQL script using the data from `lib/indicator-data.ts`.
