# Data Import Instructions

## Overview
Your Supabase tables are currently empty because the data exists in the application code (lib/*.ts files) but hasn't been imported into the database yet.

## Why Tables Are Empty

1. **Data Location**: All your data is currently stored in TypeScript files:
   - `lib/data.ts` - Youth population, disabilities, trafficking, migration data
   - `lib/indicator-data.ts` - NEDI, PIA, GSI, NYSS, NSC indicator data (1000+ records)
   - `lib/nsc-data.ts` - NSC participants data
   - `lib/nyc-data.ts` - NYC activities data
   - `lib/nedi-data.ts` - NEDI programs data

2. **Migration Status**: The application code was updated to use Supabase, but the data wasn't migrated from the code files to the database.

## How to Import All Data

### Option 1: Run SQL Scripts (Recommended)

1. **Go to Supabase Dashboard** → SQL Editor

2. **Run scripts in this order**:
   \`\`\`
   scripts/002_import_all_data.sql       (Core demographic data)
   scripts/003_import_indicator_data.sql (Indicator data - partial)
   \`\`\`

3. **Verify import**:
   \`\`\`sql
   SELECT COUNT(*) FROM youth_population;      -- Should return 8
   SELECT COUNT(*) FROM youth_with_disabilities; -- Should return 5
   SELECT COUNT(*) FROM human_trafficking;     -- Should return 5
   SELECT COUNT(*) FROM youth_migration;       -- Should return 5
   SELECT COUNT(*) FROM nsc_participants;      -- Should return 10
   SELECT COUNT(*) FROM indicator_data;        -- Should return 28+ (partial)
   \`\`\`

### Option 2: Use the Data Import Page

1. **Navigate to**: `/data-import` in your application

2. **Click "Start Import"** - This will:
   - Read data from localStorage (if any exists)
   - Transform it to match database schema
   - Bulk insert into Supabase tables
   - Show progress and results

### Option 3: Manual CSV Import

1. **Export data from the app** (if it's in localStorage)
2. **Use Supabase Dashboard** → Table Editor → Import CSV
3. **Map columns** to match the database schema

## Data Summary

### Tables and Record Counts:

| Table | Records | Description |
|-------|---------|-------------|
| `youth_population` | 8 | LGA-level youth demographics |
| `youth_with_disabilities` | 5 | Disability statistics by age group |
| `youth_without_disabilities` | 5 | Non-disability statistics |
| `human_trafficking` | 5 | Trafficking victim data |
| `youth_migration` | 5 | Migration patterns |
| `nsc_participants` | 10+ | Sports council participants |
| `indicator_data` | 100+ | NEDI, PIA, GSI, NYSS, NSC indicators |
| `nyc_activities` | TBD | National Youth Council activities |
| `nyss_programs` | TBD | Youth Service Scheme programs |
| `nyss_graduates` | TBD | NYSS graduate records |
| `registered_youth_orgs` | 150+ | Registered youth organizations |

## Next Steps

1. ✅ Run the SQL import scripts
2. ✅ Verify data in Supabase Dashboard
3. ✅ Test the application pages to ensure data displays correctly
4. ✅ Set up regular backups in Supabase

## Troubleshooting

**If import fails:**
- Check that tables exist (run `scripts/001_create_users_table_and_admin.sql` first)
- Verify RLS policies allow inserts
- Check for data type mismatches
- Review error messages in Supabase logs

**If data doesn't appear in app:**
- Clear browser cache
- Check browser console for errors
- Verify Supabase connection in app
- Ensure user is authenticated

## Support

For issues with data import, check:
1. Supabase Dashboard → Logs
2. Browser Developer Console
3. Application error messages
