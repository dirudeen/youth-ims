-- Import Indicator Data (NEDI, PIA, GSI, NYSS, NSC)
-- This is a large dataset with 1000+ records

-- ============================================
-- NEDI FINANCE DATA (2022-2024)
-- ============================================
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category) VALUES
-- 2022 Data
('nf1', 'NEDI', 'Youth-owned business with access to finance', 2022, 'GBA', 117, 5, 122, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf2', 'NEDI', 'Youth-owned business with access to finance', 2022, 'WCR', 89, 10, 99, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf3', 'NEDI', 'Youth-owned business with access to finance', 2022, 'NBR', 49, 2, 51, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf4', 'NEDI', 'Youth-owned business with access to finance', 2022, 'LRR', 52, 2, 54, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf5', 'NEDI', 'Youth-owned business with access to finance', 2022, 'CRR', 54, 1, 55, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf6', 'NEDI', 'Youth-owned business with access to finance', 2022, 'URR', 54, 3, 57, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
-- 2023 Data
('nf7', 'NEDI', 'Youth-owned business with access to finance', 2023, 'GBA', 159, 7, 166, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf8', 'NEDI', 'Youth-owned business with access to finance', 2023, 'WCR', 201, 9, 210, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf9', 'NEDI', 'Youth-owned business with access to finance', 2023, 'NBR', 121, 4, 125, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf10', 'NEDI', 'Youth-owned business with access to finance', 2023, 'LRR', 101, 4, 105, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf11', 'NEDI', 'Youth-owned business with access to finance', 2023, 'CRR', 96, 7, 103, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf12', 'NEDI', 'Youth-owned business with access to finance', 2023, 'URR', 166, 8, 174, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
-- 2024 Data
('nf13', 'NEDI', 'Youth-owned business with access to finance', 2024, 'GBA', 6, 2, 8, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf14', 'NEDI', 'Youth-owned business with access to finance', 2024, 'WCR', 4, 2, 6, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf15', 'NEDI', 'Youth-owned business with access to finance', 2024, 'NBR', 3, 1, 4, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf16', 'NEDI', 'Youth-owned business with access to finance', 2024, 'LRR', 2, 2, 4, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf17', 'NEDI', 'Youth-owned business with access to finance', 2024, 'CRR', 2, 1, 3, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('nf18', 'NEDI', 'Youth-owned business with access to finance', 2024, 'URR', 2, 2, 4, 'NEDI Annual Report & Migrant Returnee Training', 'finance')
ON CONFLICT (id) DO UPDATE SET
  organization = EXCLUDED.organization,
  indicator = EXCLUDED.indicator,
  year = EXCLUDED.year,
  region = EXCLUDED.region,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total,
  reference_source = EXCLUDED.reference_source,
  category = EXCLUDED.category;

-- ============================================
-- NEDI TRAINING DATA (2022-2024) - Partial sample
-- ============================================
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category) VALUES
('nt1', 'NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'GBA', 71, 54, 125, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('nt2', 'NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'WCR', 53, 62, 115, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('nt3', 'NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'NBR', 55, 40, 95, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('nt4', 'NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'LRR', 60, 42, 102, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('nt5', 'NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'CRR', 38, 22, 60, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('nt6', 'NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'URR', 140, 30, 170, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('nt7', 'NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'GBA', 105, 70, 175, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('nt8', 'NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'WCR', 172, 50, 222, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('nt13', 'NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'GBA', 506, 98, 604, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('nt14', 'NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'WCR', 492, 81, 573, 'NEDI Annual Report & Migrant Returnee Training', 'training')
ON CONFLICT (id) DO UPDATE SET
  organization = EXCLUDED.organization,
  indicator = EXCLUDED.indicator,
  year = EXCLUDED.year,
  region = EXCLUDED.region,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total,
  reference_source = EXCLUDED.reference_source,
  category = EXCLUDED.category;

-- Note: This is a partial import. The full indicator_data table contains 100+ records.
-- Run this script first, then use the data import page to import the complete dataset.
