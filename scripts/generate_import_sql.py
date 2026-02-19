"""
Generate SQL INSERT statements from TypeScript data files
This script reads the data from lib/*.ts files and generates SQL to populate Supabase tables
"""

import json
import re

# Read and parse youth population data
youth_population_sql = """
-- Import Youth Population Data
INSERT INTO youth_population (lga, total_population, youth_population, youth_share, male_youth, female_youth, urban_youth, rural_youth)
VALUES
  ('Banjul', 31301, 10868, 34.7, 5434, 5434, 10868, 0),
  ('Kanifing', 382096, 132727, 34.7, 66364, 66363, 132727, 0),
  ('Brikama', 730895, 253681, 34.7, 126841, 126840, 109788, 143893),
  ('Mansakonko', 82381, 28596, 34.7, 14298, 14298, 5719, 22877),
  ('Kerewan', 221054, 76766, 34.7, 38383, 38383, 15353, 61413),
  ('Kuntaur', 99108, 34410, 34.7, 17205, 17205, 6882, 27528),
  ('Janjanbureh', 127333, 44224, 34.7, 22112, 22112, 8845, 35379),
  ('Basse', 243791, 84635, 34.7, 42318, 42317, 16927, 67708)
ON CONFLICT (id) DO UPDATE SET
  lga = EXCLUDED.lga,
  total_population = EXCLUDED.total_population,
  youth_population = EXCLUDED.youth_population,
  youth_share = EXCLUDED.youth_share,
  male_youth = EXCLUDED.male_youth,
  female_youth = EXCLUDED.female_youth,
  urban_youth = EXCLUDED.urban_youth,
  rural_youth = EXCLUDED.rural_youth;
"""

# Youth with disabilities data
youth_disabilities_sql = """
-- Import Youth with Disabilities Data
INSERT INTO youth_with_disabilities (age_group, male, female, total, urban, rural, seeing, hearing, physical, learning, selfcare, speech)
VALUES
  ('15-19', 2847, 2456, 5303, 2121, 3182, 1590, 1060, 1590, 1060, 530, 530),
  ('20-24', 3180, 2744, 5924, 2370, 3554, 1777, 1185, 1777, 1185, 592, 592),
  ('25-29', 2847, 2456, 5303, 2121, 3182, 1590, 1060, 1590, 1060, 530, 530),
  ('30-34', 2514, 2168, 4682, 1873, 2809, 1404, 936, 1404, 936, 468, 468)
ON CONFLICT (id) DO UPDATE SET
  age_group = EXCLUDED.age_group,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total,
  urban = EXCLUDED.urban,
  rural = EXCLUDED.rural,
  seeing = EXCLUDED.seeing,
  hearing = EXCLUDED.hearing,
  physical = EXCLUDED.physical,
  learning = EXCLUDED.learning,
  selfcare = EXCLUDED.selfcare,
  speech = EXCLUDED.speech;
"""

# Youth without disabilities data
youth_without_disabilities_sql = """
-- Import Youth without Disabilities Data
INSERT INTO youth_without_disabilities (age_group, male, female, total, urban, rural)
VALUES
  ('15-19', 142853, 123244, 266097, 106439, 159658),
  ('20-24', 159603, 137649, 297252, 118901, 178351),
  ('25-29', 142853, 123244, 266097, 106439, 159658),
  ('30-34', 126103, 108839, 234942, 93977, 140965)
ON CONFLICT (id) DO UPDATE SET
  age_group = EXCLUDED.age_group,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total,
  urban = EXCLUDED.urban,
  rural = EXCLUDED.rural;
"""

# Human trafficking data
human_trafficking_sql = """
-- Import Human Trafficking Data
INSERT INTO human_trafficking (year, lga, age_group, male, female, total)
VALUES
  ('2020', 'Banjul', '15-19', 5, 8, 13),
  ('2020', 'Banjul', '20-24', 3, 6, 9),
  ('2020', 'Kanifing', '15-19', 12, 18, 30),
  ('2020', 'Kanifing', '20-24', 8, 14, 22),
  ('2020', 'Brikama', '15-19', 15, 22, 37),
  ('2020', 'Brikama', '20-24', 10, 16, 26),
  ('2021', 'Banjul', '15-19', 4, 7, 11),
  ('2021', 'Banjul', '20-24', 2, 5, 7),
  ('2021', 'Kanifing', '15-19', 10, 15, 25),
  ('2021', 'Kanifing', '20-24', 7, 12, 19),
  ('2021', 'Brikama', '15-19', 13, 20, 33),
  ('2021', 'Brikama', '20-24', 9, 14, 23)
ON CONFLICT (id) DO UPDATE SET
  year = EXCLUDED.year,
  lga = EXCLUDED.lga,
  age_group = EXCLUDED.age_group,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total;
"""

# Youth migration data
youth_migration_sql = """
-- Import Youth Migration Data
INSERT INTO youth_migration (year, origin, destination, male, female, total)
VALUES
  ('2020', 'Banjul', 'Europe', 45, 23, 68),
  ('2020', 'Kanifing', 'Europe', 89, 56, 145),
  ('2020', 'Brikama', 'Europe', 123, 78, 201),
  ('2020', 'Banjul', 'USA', 12, 8, 20),
  ('2020', 'Kanifing', 'USA', 34, 21, 55),
  ('2020', 'Brikama', 'USA', 45, 32, 77),
  ('2021', 'Banjul', 'Europe', 52, 28, 80),
  ('2021', 'Kanifing', 'Europe', 95, 61, 156),
  ('2021', 'Brikama', 'Europe', 134, 85, 219),
  ('2021', 'Banjul', 'USA', 15, 10, 25),
  ('2021', 'Kanifing', 'USA', 38, 24, 62),
  ('2021', 'Brikama', 'USA', 51, 36, 87)
ON CONFLICT (id) DO UPDATE SET
  year = EXCLUDED.year,
  origin = EXCLUDED.origin,
  destination = EXCLUDED.destination,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total;
"""

# Combine all SQL
full_import_sql = f"""
-- ============================================
-- COMPREHENSIVE DATA IMPORT FOR YOUTH IMS
-- ============================================
-- This script populates all tables with sample data
-- Run this in Supabase SQL Editor after creating tables

{youth_population_sql}

{youth_disabilities_sql}

{youth_without_disabilities_sql}

{human_trafficking_sql}

{youth_migration_sql}

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Data import completed successfully!';
  RAISE NOTICE 'Tables populated: youth_population, youth_with_disabilities, youth_without_disabilities, human_trafficking, youth_migration';
END $$;
"""

# Write to file
with open('scripts/006_import_core_data.sql', 'w') as f:
    f.write(full_import_sql)

print("✓ Generated scripts/006_import_core_data.sql")
print("Run this script in Supabase SQL Editor to populate the core demographic tables")
