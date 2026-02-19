# Import 301 Registered Youth Organizations

## Overview
This script imports all 301 registered youth organizations distributed across The Gambia's regions.

## Distribution by Region
- **National**: 42 organizations
- **Banjul (BJL)**: 11 organizations
- **Kanifing (KMC)**: 17 organizations
- **West Coast Region (WCR)**: 45 organizations
- **Lower River Region (LRR)**: 20 organizations
- **North Bank Region (NBR)**: 76 organizations
- **Central River Region (CRR)**: 39 organizations
- **Upper River Region (URR)**: 51 organizations

**Total**: 301 organizations

## How to Import

### Step 1: Access Supabase SQL Editor
1. Go to your Supabase Dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **"New query"**

### Step 2: Run the Import Script
1. Open the file: `scripts/010_import_301_youth_organizations.sql`
2. Copy the entire SQL script
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** (or press Ctrl+Enter)

### Step 3: Verify the Import
The script includes verification queries at the end that will show:
- Count of organizations by region
- Total number of organizations (should be 301)

## Data Structure
Each organization includes:
- **ID**: Unique identifier (1-301)
- **Organization Name**: Full name of the youth organization
- **Acronym**: Short form/abbreviation
- **Date Established**: When the organization was founded
- **Intervention Area**: Focus areas and activities
- **Contact Person**: Name of the contact person
- **Email**: Organization email address
- **Contact Number**: Phone number (Gambian format)
- **Region**: Geographic region
- **Registered With**: Government bodies/agencies

## Intervention Areas Covered
Organizations focus on diverse areas including:
- Leadership Development & Skills Training
- Entrepreneurship & Business Development
- Agriculture & Food Security
- Sports & Recreation
- Environment & Climate Action
- Health & Wellness
- Education & Literacy
- ICT & Digital Skills
- Arts & Culture
- Human Rights & Advocacy
- Gender Equality & Women Empowerment
- Media & Communication
- Tourism & Hospitality
- And many more...

## Registration Bodies
Organizations are registered with various government bodies:
- Ministry of Youth and Sports
- National Youth Council
- Regional Youth Councils
- Area/City Councils
- Sector-specific Ministries
- Professional Bodies
- UN Agencies

## Contact Information
All organizations have:
- Gambian phone numbers (+220 format)
- Email addresses (.gm domain or common providers)
- Contact persons with Gambian names

## Troubleshooting

### If the import fails:
1. **Check for existing data**: The script doesn't use `ON CONFLICT`, so if IDs already exist, it will fail
2. **Clear existing data first** (if needed):
   \`\`\`sql
   DELETE FROM registered_youth_orgs;
   \`\`\`
3. **Run the script again**

### If you see fewer than 301 records:
1. Check the error messages in the SQL Editor
2. Look for any constraint violations
3. Verify the table schema matches the expected structure

### To check the current count:
\`\`\`sql
SELECT COUNT(*) FROM registered_youth_orgs;
SELECT region, COUNT(*) as count FROM registered_youth_orgs GROUP BY region;
\`\`\`

## Notes
- All dates are in YYYY-MM-DD format
- Phone numbers follow Gambian format (+220 XXX XXXX)
- Organizations span from 2010 to 2019 establishment dates
- Each region has organizations focused on local priorities
- National organizations serve the entire country

## Success Indicators
After successful import, you should see:
✓ 301 total organizations
✓ Organizations distributed across all 8 regions
✓ Diverse intervention areas represented
✓ Complete contact information for all organizations
✓ Proper registration with relevant government bodies
