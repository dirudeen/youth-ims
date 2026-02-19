# Complete Database Import Guide

## Overview
This guide will help you populate ALL empty tables in your Supabase database with sample data.

## Tables to be Populated

### 1. **gnyc_activities** (25 records)
GNYC (Gambia National Youth Council) activities from 2022-2024 including:
- Leadership development programs
- Skills training initiatives
- Environmental projects
- Sports and recreation activities
- Health and wellness campaigns
- Arts and culture events

### 2. **nyc_activities** (10 records)
NYC (National Youth Council) sports activities including:
- Professional sports programs
- National team training
- Student athlete development
- Paralympic programs
- Amateur sports leagues

### 3. **nedi_programs** (10 records)
NEDI (National Enterprise Development Initiative) programs including:
- Entrepreneurship training
- Business advisory services
- Mentoring and coaching
- Financial assistance programs
- Trade fair support

### 4. **nyss_programs** (14 records)
NYSS (National Youth Service Scheme) training programs from 2022-2025:
- Business and entrepreneurship
- Information technology
- Agriculture
- Healthcare
- Renewable energy
- Creative industries
- Construction

### 5. **nyss_graduates** (10 records)
Sample graduate profiles with:
- Personal information
- Training details
- Employment status
- Skills and certifications

### 6. **registered_youth_orgs** (5 records)
Major youth organizations in The Gambia:
- GNYC - Gambia National Youth Council
- YAAG - Young Achievers Association
- GYDA - Gambia Youth Development Association
- NBYF - North Bank Youth Forum
- LRRYC - Lower River Region Youth Council

## How to Import

### Step 1: Access Supabase SQL Editor
1. Go to your **Supabase Dashboard**
2. Click **SQL Editor** in the left sidebar
3. Click **New query**

### Step 2: Run the Import Script
1. Open the file: `scripts/009_populate_all_empty_tables.sql`
2. Copy the entire SQL script
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

### Step 3: Verify the Import
The script includes verification queries at the end that will show:
\`\`\`
table_name              | record_count
------------------------|-------------
GNYC Activities         | 25
NYC Activities          | 10
NEDI Programs           | 10
NYSS Programs           | 14
NYSS Graduates          | 10
Registered Youth Orgs   | 5
\`\`\`

**Total: 74 records imported across 6 tables**

## What the Script Does

1. **Uses ON CONFLICT DO UPDATE**: Safe to run multiple times without creating duplicates
2. **Populates all required fields**: Ensures data integrity with proper foreign keys
3. **Includes realistic data**: Based on actual program structures and regional distribution
4. **Maintains relationships**: Ensures data consistency across related tables

## After Import

### Verify Data in Your Application
1. Login to your application
2. Navigate to each section:
   - **GNYC Activities** page
   - **NYC Activities** page
   - **NEDI Programs** page
   - **NYSS Programs** page
   - **NYSS Graduates** page
   - **Youth Organizations** (if available)

3. You should see all the imported data displayed correctly

### Check Data Distribution
- **By Region**: Data covers all 7 regions (GBA, KM, WCR, NBR, CRR, LRR, URR)
- **By Year**: Programs span 2022-2025
- **By Gender**: Balanced male/female participation
- **By Status**: Mix of Completed, Ongoing, and Planned activities

## Troubleshooting

### If Import Fails
1. **Check RLS Policies**: Ensure you're logged in as an admin user
2. **Check Permissions**: Verify your user has INSERT permissions
3. **Check Table Structure**: Ensure all tables exist with correct columns
4. **Run in Sections**: If the full script fails, run each INSERT statement separately

### If Data Doesn't Appear
1. **Refresh the page**: Clear browser cache and reload
2. **Check filters**: Ensure no filters are hiding the data
3. **Verify RLS policies**: Make sure SELECT policies allow viewing
4. **Check user role**: Ensure you're logged in with appropriate permissions

## Data Summary

### Total Beneficiaries Across All Programs
- **GNYC Activities**: ~4,000 beneficiaries
- **NYC Activities**: ~1,130 beneficiaries
- **NEDI Programs**: ~1,686 beneficiaries
- **NYSS Programs**: ~1,285 graduates

### Regional Coverage
All programs cover the 7 administrative regions of The Gambia:
- Greater Banjul Area (GBA)
- Kanifing Municipality (KM)
- West Coast Region (WCR)
- North Bank Region (NBR)
- Central River Region (CRR)
- Lower River Region (LRR)
- Upper River Region (URR)

### Gender Distribution
- Balanced participation across all programs
- Special focus on women empowerment in NEDI programs
- Equal opportunities in GNYC activities

## Next Steps

After successfully importing the data:

1. **Test all features**: Navigate through all pages to ensure data displays correctly
2. **Test filtering**: Try filtering by region, year, status, etc.
3. **Test search**: Use search functionality to find specific records
4. **Test editing**: Try editing a record (if you have permissions)
5. **Test exports**: Try exporting data to CSV/Excel

## Support

If you encounter any issues:
1. Check the verification queries output
2. Review the Supabase logs for errors
3. Ensure all RLS policies are correctly configured
4. Verify your user has the correct role (admin/data_entry)

---

**Script Location**: `scripts/009_populate_all_empty_tables.sql`

**Last Updated**: 2025-01-11
