-- Populate Indicator Data Table with NEDI, PIA, GSI, and NYSS data
-- This script adds all missing indicator data from the NEDI - MoYS RF-NDP INDICATOR DATA SHEET

-- Clear existing data (optional - remove if you want to keep existing data)
-- DELETE FROM indicator_data;

-- ============================================
-- NEDI (National Enterprise Development Initiative)
-- ============================================

-- NEDI - Finance Access 2022
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-001', 'NEDI', 'Number of youth-owned business with access to finance', 2022, 'GBA', 117, 5, 122, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-002', 'NEDI', 'Number of youth-owned business with access to finance', 2022, 'WCR', 89, 10, 99, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-003', 'NEDI', 'Number of youth-owned business with access to finance', 2022, 'NBR', 49, 2, 51, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-004', 'NEDI', 'Number of youth-owned business with access to finance', 2022, 'LRR', 52, 2, 54, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-005', 'NEDI', 'Number of youth-owned business with access to finance', 2022, 'CRR', 54, 1, 55, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-006', 'NEDI', 'Number of youth-owned business with access to finance', 2022, 'URR', 54, 3, 57, 'NEDI Annual Report & Migrant Returnee Training', 'finance');

-- NEDI - Finance Access 2023
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-007', 'NEDI', 'Number of youth-owned business with access to finance', 2023, 'GBA', 159, 7, 166, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-008', 'NEDI', 'Number of youth-owned business with access to finance', 2023, 'WCR', 201, 9, 210, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-009', 'NEDI', 'Number of youth-owned business with access to finance', 2023, 'NBR', 121, 4, 125, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-010', 'NEDI', 'Number of youth-owned business with access to finance', 2023, 'LRR', 101, 4, 105, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-011', 'NEDI', 'Number of youth-owned business with access to finance', 2023, 'CRR', 96, 7, 103, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-012', 'NEDI', 'Number of youth-owned business with access to finance', 2023, 'URR', 166, 8, 174, 'NEDI Annual Report & Migrant Returnee Training', 'finance');

-- NEDI - Finance Access 2024
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-013', 'NEDI', 'Number of youth-owned business with access to finance', 2024, 'GBA', 6, 2, 8, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-014', 'NEDI', 'Number of youth-owned business with access to finance', 2024, 'WCR', 4, 2, 6, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-015', 'NEDI', 'Number of youth-owned business with access to finance', 2024, 'NBR', 3, 1, 4, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-016', 'NEDI', 'Number of youth-owned business with access to finance', 2024, 'LRR', 2, 2, 4, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-017', 'NEDI', 'Number of youth-owned business with access to finance', 2024, 'CRR', 2, 1, 3, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('IND-018', 'NEDI', 'Number of youth-owned business with access to finance', 2024, 'URR', 2, 2, 4, 'NEDI Annual Report & Migrant Returnee Training', 'finance');

-- NEDI - Training 2022
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-019', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'GBA', 71, 54, 125, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-020', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'WCR', 53, 62, 115, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-021', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'NBR', 55, 40, 95, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-022', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'LRR', 60, 42, 102, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-023', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'CRR', 38, 22, 60, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-024', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'URR', 140, 30, 170, 'NEDI Annual Report & Migrant Returnee Training', 'training');

-- NEDI - Training 2023
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-025', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'GBA', 105, 70, 175, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-026', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'WCR', 172, 50, 222, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-027', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'NBR', 95, 30, 125, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-028', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'LRR', 75, 40, 115, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-029', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'CRR', 72, 40, 112, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-030', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'URR', 135, 50, 185, 'NEDI Annual Report & Migrant Returnee Training', 'training');

-- NEDI - Training 2024
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-031', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'GBA', 506, 98, 604, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-032', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'WCR', 492, 81, 573, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-033', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'NBR', 130, 67, 197, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-034', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'LRR', 256, 98, 354, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-035', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'CRR', 154, 86, 240, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('IND-036', 'NEDI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'URR', 241, 87, 328, 'NEDI Annual Report & Migrant Returnee Training', 'training');

-- ============================================
-- PIA (President International Award)
-- ============================================

-- PIA - Training 2022 (Only KM region has data)
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-037', 'PIA', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'KM', 44, 78, 122, 'Students who graduated from our Skills Training Centre in Bakau', 'training');

-- PIA - Training 2023 (Only KM region has data)
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-038', 'PIA', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'KM', 49, 60, 109, 'Students who graduated from our Skills Training Centre in Bakau', 'training');

-- PIA - Training 2024 (Only KM region has data)
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-039', 'PIA', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'KM', 53, 77, 130, 'Students who graduated from our Skills Training Centre in Bakau', 'training');

-- ============================================
-- GSI (Gambia Songhai Initiative)
-- ============================================

-- GSI - Finance Access 2022
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-040', 'GSI', 'Number of youth-owned business with access to finance', 2022, 'BJL', 0, 0, 0, 'Youths that get access to finance with GSI', 'finance'),
('IND-041', 'GSI', 'Number of youth-owned business with access to finance', 2022, 'KM', 0, 1, 1, 'Youths that get access to finance with GSI', 'finance'),
('IND-042', 'GSI', 'Number of youth-owned business with access to finance', 2022, 'WCR', 0, 1, 1, 'Youths that get access to finance with GSI', 'finance'),
('IND-043', 'GSI', 'Number of youth-owned business with access to finance', 2022, 'NBR', 0, 0, 0, 'Youths that get access to finance with GSI', 'finance'),
('IND-044', 'GSI', 'Number of youth-owned business with access to finance', 2022, 'LRR', 0, 1, 1, 'Youths that get access to finance with GSI', 'finance'),
('IND-045', 'GSI', 'Number of youth-owned business with access to finance', 2022, 'CRR', 0, 1, 1, 'Youths that get access to finance with GSI', 'finance'),
('IND-046', 'GSI', 'Number of youth-owned business with access to finance', 2022, 'URR', 0, 0, 0, 'Youths that get access to finance with GSI', 'finance');

-- GSI - Finance Access 2023
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-047', 'GSI', 'Number of youth-owned business with access to finance', 2023, 'BJL', 0, 0, 0, 'Youths that get access to finance with GSI', 'finance'),
('IND-048', 'GSI', 'Number of youth-owned business with access to finance', 2023, 'KM', 0, 0, 0, 'Youths that get access to finance with GSI', 'finance'),
('IND-049', 'GSI', 'Number of youth-owned business with access to finance', 2023, 'WCR', 5, 2, 7, 'Youths that get access to finance with GSI', 'finance'),
('IND-050', 'GSI', 'Number of youth-owned business with access to finance', 2023, 'NBR', 10, 16, 26, 'Youths that get access to finance with GSI', 'finance'),
('IND-051', 'GSI', 'Number of youth-owned business with access to finance', 2023, 'LRR', 10, 5, 15, 'Youths that get access to finance with GSI', 'finance'),
('IND-052', 'GSI', 'Number of youth-owned business with access to finance', 2023, 'CRR', 0, 2, 2, 'Youths that get access to finance with GSI', 'finance'),
('IND-053', 'GSI', 'Number of youth-owned business with access to finance', 2023, 'URR', 0, 0, 0, 'Youths that get access to finance with GSI', 'finance');

-- GSI - Training 2022
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-054', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'BJL', 0, 0, 0, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-055', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'KM', 1, 4, 5, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-056', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'WCR', 6, 3, 9, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-057', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'NBR', 3, 6, 9, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-058', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'LRR', 2, 1, 3, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-059', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'CRR', 4, 4, 8, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-060', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'URR', 0, 1, 1, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training');

-- GSI - Training 2023
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-061', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'BJL', 0, 0, 0, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-062', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'KM', 1, 0, 1, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-063', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'WCR', 14, 14, 28, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-064', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'NBR', 23, 32, 55, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-065', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'LRR', 18, 16, 34, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-066', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'CRR', 3, 5, 8, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-067', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'URR', 4, 4, 8, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training');

-- GSI - Training 2024
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-068', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'BJL', 0, 0, 0, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-069', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'KM', 3, 3, 6, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-070', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'WCR', 12, 8, 20, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-071', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'NBR', 9, 23, 32, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-072', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'LRR', 7, 11, 18, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-073', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'CRR', 3, 6, 9, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('IND-074', 'GSI', 'Number of Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2024, 'URR', 0, 2, 2, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training');

-- ============================================
-- NYSS (National Youth Service Scheme)
-- ============================================

-- NYSS - Training 2022
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-075', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2022, 'BJL', 12, 28, 40, 'Annual report/quarterly Reports', 'training'),
('IND-076', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2022, 'KM', 32, 18, 50, 'Annual report/quarterly Reports', 'training'),
('IND-077', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2022, 'WCR', 25, 36, 61, 'Annual report/quarterly Reports', 'training'),
('IND-078', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2022, 'NBR', 20, 10, 30, 'Annual report/quarterly Reports', 'training'),
('IND-079', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2022, 'LRR', 30, 5, 35, 'Annual report/quarterly Reports', 'training'),
('IND-080', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2022, 'CRR', 15, 20, 35, 'Annual report/quarterly Reports', 'training'),
('IND-081', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2022, 'URR', 20, 15, 35, 'Annual report/quarterly Reports', 'training');

-- NYSS - Training 2023
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-082', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2023, 'BJL', 9, 10, 19, 'Annual report/quarterly Reports', 'training'),
('IND-083', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2023, 'KM', 12, 20, 32, 'Annual report/quarterly Reports', 'training'),
('IND-084', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2023, 'WCR', 6, 15, 21, 'Annual report/quarterly Reports', 'training'),
('IND-085', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2023, 'NBR', 3, 4, 7, 'Annual report/quarterly Reports', 'training'),
('IND-086', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2023, 'LRR', 5, 8, 13, 'Annual report/quarterly Reports', 'training'),
('IND-087', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2023, 'CRR', 2, 5, 7, 'Annual report/quarterly Reports', 'training'),
('IND-088', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2023, 'URR', 3, 4, 7, 'Annual report/quarterly Reports', 'training');

-- NYSS - Training 2024
INSERT INTO indicator_data (id, organization, indicator, year, region, male, female, total, reference_source, category)
VALUES 
('IND-089', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2024, 'BJL', 0, 0, 0, 'Annual report/quarterly Reports', 'training'),
('IND-090', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2024, 'KM', 0, 0, 0, 'Annual report/quarterly Reports', 'training'),
('IND-091', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2024, 'WCR', 0, 0, 0, 'Annual report/quarterly Reports', 'training'),
('IND-092', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2024, 'NBR', 0, 0, 0, 'Annual report/quarterly Reports', 'training'),
('IND-093', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2024, 'LRR', 0, 0, 0, 'Annual report/quarterly Reports', 'training'),
('IND-094', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2024, 'CRR', 0, 0, 0, 'Annual report/quarterly Reports', 'training'),
('IND-095', 'NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2024, 'URR', 0, 0, 0, 'Annual report/quarterly Reports', 'training');
