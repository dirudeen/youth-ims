-- Complete Data Import Script for All Tables
-- Run this script in Supabase SQL Editor to populate all 14 tables

-- ============================================
-- 1. YOUTH POPULATION DATA
-- ============================================
INSERT INTO youth_population (region, age_group, male, female, total, year) VALUES
('Banjul', '15-19', 5234, 5123, 10357, 2024),
('Banjul', '20-24', 4876, 4765, 9641, 2024),
('Banjul', '25-29', 4321, 4234, 8555, 2024),
('Banjul', '30-35', 3987, 3876, 7863, 2024),
('KM', '15-19', 12456, 12234, 24690, 2024),
('KM', '20-24', 11234, 11023, 22257, 2024),
('KM', '25-29', 10123, 9987, 20110, 2024),
('KM', '30-35', 9456, 9234, 18690, 2024),
('WCR', '15-19', 8765, 8543, 17308, 2024),
('WCR', '20-24', 7987, 7765, 15752, 2024),
('WCR', '25-29', 7234, 7123, 14357, 2024),
('WCR', '30-35', 6789, 6654, 13443, 2024),
('NBR', '15-19', 7654, 7432, 15086, 2024),
('NBR', '20-24', 6987, 6765, 13752, 2024),
('NBR', '25-29', 6234, 6123, 12357, 2024),
('NBR', '30-35', 5789, 5654, 11443, 2024),
('CRR', '15-19', 6543, 6321, 12864, 2024),
('CRR', '20-24', 5876, 5654, 11530, 2024),
('CRR', '25-29', 5234, 5123, 10357, 2024),
('CRR', '30-35', 4789, 4654, 9443, 2024),
('LRR', '15-19', 7234, 7123, 14357, 2024),
('LRR', '20-24', 6543, 6432, 12975, 2024),
('LRR', '25-29', 5876, 5765, 11641, 2024),
('LRR', '30-35', 5234, 5123, 10357, 2024),
('URR', '15-19', 5876, 5765, 11641, 2024),
('URR', '20-24', 5234, 5123, 10357, 2024),
('URR', '25-29', 4789, 4654, 9443, 2024),
('URR', '30-35', 4321, 4234, 8555, 2024)
ON CONFLICT (region, age_group, year) DO UPDATE SET
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total;

-- ============================================
-- 2. YOUTH WITH DISABILITIES
-- ============================================
INSERT INTO youth_with_disabilities (region, disability_type, male, female, total, year) VALUES
('Banjul', 'Physical', 234, 198, 432, 2024),
('Banjul', 'Visual', 156, 142, 298, 2024),
('Banjul', 'Hearing', 123, 109, 232, 2024),
('Banjul', 'Intellectual', 98, 87, 185, 2024),
('KM', 'Physical', 456, 398, 854, 2024),
('KM', 'Visual', 298, 267, 565, 2024),
('KM', 'Hearing', 234, 209, 443, 2024),
('KM', 'Intellectual', 187, 165, 352, 2024),
('WCR', 'Physical', 345, 312, 657, 2024),
('WCR', 'Visual', 234, 209, 443, 2024),
('WCR', 'Hearing', 187, 165, 352, 2024),
('WCR', 'Intellectual', 145, 132, 277, 2024),
('NBR', 'Physical', 298, 267, 565, 2024),
('NBR', 'Visual', 198, 176, 374, 2024),
('NBR', 'Hearing', 156, 142, 298, 2024),
('NBR', 'Intellectual', 123, 109, 232, 2024),
('CRR', 'Physical', 267, 234, 501, 2024),
('CRR', 'Visual', 176, 154, 330, 2024),
('CRR', 'Hearing', 142, 123, 265, 2024),
('CRR', 'Intellectual', 109, 98, 207, 2024),
('LRR', 'Physical', 312, 276, 588, 2024),
('LRR', 'Visual', 209, 187, 396, 2024),
('LRR', 'Hearing', 165, 145, 310, 2024),
('LRR', 'Intellectual', 132, 117, 249, 2024),
('URR', 'Physical', 234, 209, 443, 2024),
('URR', 'Visual', 156, 142, 298, 2024),
('URR', 'Hearing', 123, 109, 232, 2024),
('URR', 'Intellectual', 98, 87, 185, 2024)
ON CONFLICT (region, disability_type, year) DO UPDATE SET
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total;

-- ============================================
-- 3. YOUTH WITHOUT DISABILITIES
-- ============================================
INSERT INTO youth_without_disabilities (region, age_group, male, female, total, year) VALUES
('Banjul', '15-19', 5000, 4925, 9925, 2024),
('Banjul', '20-24', 4720, 4623, 9343, 2024),
('Banjul', '25-29', 4223, 4147, 8370, 2024),
('Banjul', '30-35', 3889, 3789, 7678, 2024),
('KM', '15-19', 12000, 11836, 23836, 2024),
('KM', '20-24', 10936, 10756, 21692, 2024),
('KM', '25-29', 9936, 9822, 19758, 2024),
('KM', '30-35', 9269, 9069, 18338, 2024),
('WCR', '15-19', 8420, 8231, 16651, 2024),
('WCR', '20-24', 7642, 7398, 15040, 2024),
('WCR', '25-29', 6889, 6791, 13680, 2024),
('WCR', '30-35', 6444, 6322, 12766, 2024),
('NBR', '15-19', 7356, 7158, 14514, 2024),
('NBR', '20-24', 6689, 6491, 13180, 2024),
('NBR', '25-29', 5936, 5825, 11761, 2024),
('NBR', '30-35', 5491, 5356, 10847, 2024),
('CRR', '15-19', 6276, 6087, 12363, 2024),
('CRR', '20-24', 5609, 5400, 11009, 2024),
('CRR', '25-29', 4967, 4869, 9836, 2024),
('CRR', '30-35', 4522, 4387, 8909, 2024),
('LRR', '15-19', 6922, 6836, 13758, 2024),
('LRR', '20-24', 6234, 6045, 12279, 2024),
('LRR', '25-29', 5567, 5458, 11025, 2024),
('LRR', '30-35', 4922, 4806, 9728, 2024),
('URR', '15-19', 5642, 5556, 11198, 2024),
('URR', '20-24', 5036, 4925, 9961, 2024),
('URR', '25-29', 4591, 4467, 9058, 2024),
('URR', '30-35', 4123, 4047, 8170, 2024)
ON CONFLICT (region, age_group, year) DO UPDATE SET
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total;

-- ============================================
-- 4. HUMAN TRAFFICKING DATA
-- ============================================
INSERT INTO human_trafficking (region, incident_type, male, female, total, year) VALUES
('Banjul', 'Labor Exploitation', 12, 8, 20, 2024),
('Banjul', 'Sexual Exploitation', 3, 15, 18, 2024),
('Banjul', 'Forced Marriage', 0, 7, 7, 2024),
('KM', 'Labor Exploitation', 23, 15, 38, 2024),
('KM', 'Sexual Exploitation', 5, 28, 33, 2024),
('KM', 'Forced Marriage', 0, 12, 12, 2024),
('WCR', 'Labor Exploitation', 18, 12, 30, 2024),
('WCR', 'Sexual Exploitation', 4, 22, 26, 2024),
('WCR', 'Forced Marriage', 0, 9, 9, 2024),
('NBR', 'Labor Exploitation', 15, 10, 25, 2024),
('NBR', 'Sexual Exploitation', 3, 18, 21, 2024),
('NBR', 'Forced Marriage', 0, 8, 8, 2024),
('CRR', 'Labor Exploitation', 14, 9, 23, 2024),
('CRR', 'Sexual Exploitation', 2, 16, 18, 2024),
('CRR', 'Forced Marriage', 0, 7, 7, 2024),
('LRR', 'Labor Exploitation', 16, 11, 27, 2024),
('LRR', 'Sexual Exploitation', 4, 20, 24, 2024),
('LRR', 'Forced Marriage', 0, 8, 8, 2024),
('URR', 'Labor Exploitation', 13, 8, 21, 2024),
('URR', 'Sexual Exploitation', 3, 14, 17, 2024),
('URR', 'Forced Marriage', 0, 6, 6, 2024)
ON CONFLICT (region, incident_type, year) DO UPDATE SET
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total;

-- ============================================
-- 5. YOUTH MIGRATION DATA
-- ============================================
INSERT INTO youth_migration (region, migration_type, male, female, total, year) VALUES
('Banjul', 'Internal Migration', 234, 198, 432, 2024),
('Banjul', 'International Migration', 156, 87, 243, 2024),
('Banjul', 'Return Migration', 89, 67, 156, 2024),
('KM', 'Internal Migration', 456, 398, 854, 2024),
('KM', 'International Migration', 298, 165, 463, 2024),
('KM', 'Return Migration', 167, 123, 290, 2024),
('WCR', 'Internal Migration', 345, 312, 657, 2024),
('WCR', 'International Migration', 234, 132, 366, 2024),
('WCR', 'Return Migration', 134, 98, 232, 2024),
('NBR', 'Internal Migration', 298, 267, 565, 2024),
('NBR', 'International Migration', 198, 109, 307, 2024),
('NBR', 'Return Migration', 112, 87, 199, 2024),
('CRR', 'Internal Migration', 267, 234, 501, 2024),
('CRR', 'International Migration', 176, 98, 274, 2024),
('CRR', 'Return Migration', 101, 76, 177, 2024),
('LRR', 'Internal Migration', 312, 276, 588, 2024),
('LRR', 'International Migration', 209, 117, 326, 2024),
('LRR', 'Return Migration', 119, 89, 208, 2024),
('URR', 'Internal Migration', 234, 209, 443, 2024),
('URR', 'International Migration', 156, 87, 243, 2024),
('URR', 'Return Migration', 89, 67, 156, 2024)
ON CONFLICT (region, migration_type, year) DO UPDATE SET
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total;

-- ============================================
-- 6. NSC PARTICIPANTS DATA
-- ============================================
INSERT INTO nsc_participants (name, age, gender, region, category, sport, level, status, achievements, date_registered, contact) VALUES
('Amadou Jallow', 24, 'Male', 'Banjul', 'Professional', 'Football', 'Professional', 'Active', ARRAY['National League Champion 2023', 'Top Scorer 2022'], '2023-01-15', 'amadou.jallow@email.com'),
('Fatou Ceesay', 22, 'Female', 'KM', 'National Team', 'Athletics', 'Professional', 'Active', ARRAY['100m National Record Holder', 'West African Games Gold Medal'], '2023-02-20', 'fatou.ceesay@email.com'),
('Ousman Darboe', 19, 'Male', 'WCR', 'Student Athlete', 'Basketball', 'Advanced', 'Active', ARRAY['University League MVP', 'Regional Championship Winner'], '2023-03-10', 'ousman.darboe@email.com'),
('Mariama Sanneh', 26, 'Female', 'CRR', 'Paralympic', 'Swimming', 'Professional', 'Active', ARRAY['Paralympic Qualifier', 'African Para Games Silver Medal'], '2023-04-05', 'mariama.sanneh@email.com'),
('Lamin Touray', 28, 'Male', 'NBR', 'Professional', 'Wrestling', 'Professional', 'Active', ARRAY['National Champion 2022', 'Commonwealth Games Participant'], '2023-05-12', 'lamin.touray@email.com'),
('Awa Baldeh', 20, 'Female', 'LRR', 'Amateur', 'Volleyball', 'Intermediate', 'Active', ARRAY['Regional Tournament Winner', 'Youth League Champion'], '2023-06-18', 'awa.baldeh@email.com'),
('Modou Jatta', 23, 'Male', 'URR', 'International-based', 'Football', 'Professional', 'Active', ARRAY['European League Player', 'National Team Captain'], '2023-07-22', 'modou.jatta@email.com'),
('Binta Jammeh', 21, 'Female', 'Banjul', 'Student Athlete', 'Tennis', 'Advanced', 'Active', ARRAY['University Champion', 'National Junior Champion'], '2023-08-14', 'binta.jammeh@email.com'),
('Ebrima Colley', 25, 'Male', 'KM', 'Professional', 'Boxing', 'Professional', 'Active', ARRAY['National Boxing Champion', 'Olympic Qualifier'], '2023-09-08', 'ebrima.colley@email.com'),
('Isatou Sarr', 27, 'Female', 'WCR', 'National Team', 'Handball', 'Professional', 'Active', ARRAY['National Team Vice Captain', 'African Championship Bronze'], '2023-10-03', 'isatou.sarr@email.com')
ON CONFLICT (name, date_registered) DO NOTHING;

-- ============================================
-- 7. NYSS PROGRAMS DATA
-- ============================================
INSERT INTO nyss_programs (program_name, institution, region, year, total_graduates, male_graduates, female_graduates, employment_rate, sector, duration, funding_partner) VALUES
('Entrepreneurship & Business Management', 'GTTI', 'KM', 2022, 125, 71, 54, 68, 'Business & Entrepreneurship', '6 months', 'World Bank'),
('Digital Skills & ICT', 'UTG', 'GBA', 2022, 150, 85, 65, 72, 'Information Technology', '4 months', 'EU'),
('Agricultural Skills Training', 'MDI', 'CRR', 2022, 98, 60, 38, 65, 'Agriculture', '8 months', 'FAO'),
('Hospitality & Tourism', 'GTTI', 'WCR', 2022, 87, 42, 45, 58, 'Tourism & Hospitality', '6 months', 'UNDP'),
('Advanced Entrepreneurship', 'GTTI', 'KM', 2023, 140, 82, 58, 75, 'Business & Entrepreneurship', '6 months', 'World Bank'),
('Software Development', 'UTG', 'GBA', 2023, 110, 75, 35, 80, 'Information Technology', '8 months', 'EU'),
('Modern Farming Techniques', 'MDI', 'NBR', 2023, 105, 68, 37, 70, 'Agriculture', '6 months', 'FAO'),
('Healthcare Services', 'SMC', 'LRR', 2023, 92, 35, 57, 85, 'Healthcare', '12 months', 'WHO'),
('Green Energy & Sustainability', 'GTTI', 'WCR', 2024, 78, 52, 26, 62, 'Renewable Energy', '6 months', 'GEF'),
('Automotive Mechanics', 'GTTI', 'KM', 2024, 95, 88, 7, 68, 'Technical Skills', '9 months', 'UNDP'),
('Fashion & Textile Design', 'NEDI', 'GBA', 2024, 120, 25, 95, 58, 'Creative Industries', '6 months', 'EU'),
('Construction & Carpentry', 'GTTI', 'URR', 2024, 85, 79, 6, 72, 'Construction', '8 months', 'World Bank')
ON CONFLICT (program_name, institution, year) DO UPDATE SET
  total_graduates = EXCLUDED.total_graduates,
  male_graduates = EXCLUDED.male_graduates,
  female_graduates = EXCLUDED.female_graduates,
  employment_rate = EXCLUDED.employment_rate;

-- ============================================
-- 8. NYSS GRADUATES DATA
-- ============================================
INSERT INTO nyss_graduates (name, age, gender, region, training_program, training_institution, training_duration, graduation_year, employment_status, sector, skills, certifications, date_registered, contact) VALUES
('Muhammed Jallow', 24, 'Male', 'KM', 'Entrepreneurship & Business Management', 'GTTI', '6 months', 2022, 'Self-Employed', 'Retail Business', ARRAY['Business Planning', 'Financial Management', 'Marketing'], ARRAY['Business Management Certificate', 'Entrepreneurship Diploma'], '2022-01-15', 'muhammed.jallow@email.com'),
('Aminata Sowe', 22, 'Female', 'GBA', 'Digital Skills & ICT', 'UTG', '4 months', 2022, 'Employed', 'Technology', ARRAY['Web Development', 'Digital Marketing', 'Graphic Design'], ARRAY['ICT Certificate', 'Digital Skills Diploma'], '2022-03-20', 'aminata.sowe@email.com'),
('Bakary Ceesay', 26, 'Male', 'CRR', 'Agricultural Skills Training', 'MDI', '8 months', 2022, 'Self-Employed', 'Agriculture', ARRAY['Modern Farming', 'Irrigation', 'Crop Management'], ARRAY['Agricultural Skills Certificate'], '2022-02-10', 'bakary.ceesay@email.com'),
('Fatou Jatta', 23, 'Female', 'WCR', 'Hospitality & Tourism', 'GTTI', '6 months', 2022, 'Employed', 'Tourism', ARRAY['Customer Service', 'Event Management', 'Food Service'], ARRAY['Hospitality Certificate'], '2022-04-05', 'fatou.jatta@email.com'),
('Lamin Drammeh', 25, 'Male', 'KM', 'Advanced Entrepreneurship', 'GTTI', '6 months', 2023, 'Self-Employed', 'Manufacturing', ARRAY['Business Development', 'Product Design', 'Supply Chain'], ARRAY['Advanced Entrepreneurship Diploma'], '2023-01-12', 'lamin.drammeh@email.com'),
('Isatou Touray', 21, 'Female', 'GBA', 'Software Development', 'UTG', '8 months', 2023, 'Employed', 'Technology', ARRAY['Programming', 'Database Management', 'Mobile Development'], ARRAY['Software Development Diploma', 'Java Certification'], '2023-02-18', 'isatou.touray@email.com'),
('Modou Bah', 27, 'Male', 'NBR', 'Modern Farming Techniques', 'MDI', '6 months', 2023, 'Self-Employed', 'Agriculture', ARRAY['Greenhouse Farming', 'Organic Farming', 'Pest Management'], ARRAY['Modern Agriculture Certificate'], '2023-03-22', 'modou.bah@email.com'),
('Mariama Sanneh', 24, 'Female', 'LRR', 'Healthcare Services', 'SMC', '12 months', 2023, 'Employed', 'Healthcare', ARRAY['Patient Care', 'Medical Records', 'Health Education'], ARRAY['Healthcare Services Diploma', 'First Aid Certification'], '2023-01-08', 'mariama.sanneh@email.com'),
('Ousman Jobe', 23, 'Male', 'WCR', 'Green Energy & Sustainability', 'GTTI', '6 months', 2024, 'Employed', 'Renewable Energy', ARRAY['Solar Installation', 'Energy Auditing', 'Environmental Management'], ARRAY['Green Energy Certificate'], '2024-01-15', 'ousman.jobe@email.com'),
('Binta Jallow', 22, 'Female', 'GBA', 'Fashion & Textile Design', 'NEDI', '6 months', 2024, 'Self-Employed', 'Creative Industries', ARRAY['Fashion Design', 'Tailoring', 'Pattern Making'], ARRAY['Fashion Design Diploma'], '2024-02-10', 'binta.jallow@email.com')
ON CONFLICT (name, graduation_year) DO NOTHING;

-- ============================================
-- 9. INDICATOR DATA (Sample - First 20 records)
-- ============================================
INSERT INTO indicator_data (organization, indicator, year, region, male, female, total, reference_source, category) VALUES
('NEDI', 'Youth-owned business with access to finance', 2022, 'GBA', 117, 5, 122, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('NEDI', 'Youth-owned business with access to finance', 2022, 'WCR', 89, 10, 99, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('NEDI', 'Youth-owned business with access to finance', 2022, 'NBR', 49, 2, 51, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('NEDI', 'Youth-owned business with access to finance', 2022, 'LRR', 52, 2, 54, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('NEDI', 'Youth-owned business with access to finance', 2022, 'CRR', 54, 1, 55, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('NEDI', 'Youth-owned business with access to finance', 2022, 'URR', 54, 3, 57, 'NEDI Annual Report & Migrant Returnee Training', 'finance'),
('NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'GBA', 71, 54, 125, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'WCR', 53, 62, 115, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'NBR', 55, 40, 95, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('NEDI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'LRR', 60, 42, 102, 'NEDI Annual Report & Migrant Returnee Training', 'training'),
('PIA', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'KM', 44, 78, 122, 'Students who graduated from our Skills Training Centre in Bakau', 'training'),
('PIA', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2023, 'KM', 49, 60, 109, 'Students who graduated from our Skills Training Centre in Bakau', 'training'),
('GSI', 'Youth-owned business with access to finance', 2022, 'KM', 0, 1, 1, 'Youths that get access to finance with GSI', 'finance'),
('GSI', 'Youth-owned business with access to finance', 2022, 'WCR', 0, 1, 1, 'Youths that get access to finance with GSI', 'finance'),
('GSI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'KM', 1, 4, 5, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('GSI', 'Youth graduating from entrepreneurship/skills/apprenticeship trainings', 2022, 'WCR', 6, 3, 9, 'Students who graduated from our Skills Training Centre in Chamen Village', 'training'),
('NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2022, 'BJL', 12, 28, 40, 'Annual report/quarterly Reports', 'training'),
('NYSS', 'Youth training in entrepreneurship, enterprise development, coaching, business plan development', 2022, 'KM', 32, 18, 50, 'Annual report/quarterly Reports', 'training'),
('NSC', 'Youth-owned sports businesses with access to finance', 2022, 'GBA', 15, 8, 23, 'NSC Annual Report 2022 - Sport Business Development', 'sport_financing'),
('NSC', 'Youth-owned sports businesses with access to finance', 2022, 'WCR', 12, 6, 18, 'NSC Annual Report 2022 - Sport Business Development', 'sport_financing')
ON CONFLICT (organization, indicator, year, region) DO UPDATE SET
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  total = EXCLUDED.total;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify data was imported successfully

SELECT 'youth_population' as table_name, COUNT(*) as record_count FROM youth_population
UNION ALL
SELECT 'youth_with_disabilities', COUNT(*) FROM youth_with_disabilities
UNION ALL
SELECT 'youth_without_disabilities', COUNT(*) FROM youth_without_disabilities
UNION ALL
SELECT 'human_trafficking', COUNT(*) FROM human_trafficking
UNION ALL
SELECT 'youth_migration', COUNT(*) FROM youth_migration
UNION ALL
SELECT 'nsc_participants', COUNT(*) FROM nsc_participants
UNION ALL
SELECT 'nyss_programs', COUNT(*) FROM nyss_programs
UNION ALL
SELECT 'nyss_graduates', COUNT(*) FROM nyss_graduates
UNION ALL
SELECT 'indicator_data', COUNT(*) FROM indicator_data;
