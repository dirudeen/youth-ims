-- Import All Data into Supabase Tables
-- This script populates all tables with the existing data from the application

-- ============================================
-- 1. YOUTH POPULATION DATA
-- ============================================
INSERT INTO youth_population (id, lga, total_population, youth_population, youth_share, male_youth, female_youth, urban_youth, rural_youth) VALUES
(1, 'Banjul', 26461, 10817, 40.9, 5123, 5694, 10817, 0),
(2, 'Kanifing', 379348, 156992, 41.4, 74123, 82869, 156992, 0),
(3, 'Brikama', 1151128, 459860, 39.9, 220731, 239129, 321902, 137958),
(4, 'Mansakonko', 90624, 31093, 34.3, 14925, 16168, 9328, 21765),
(5, 'Kerewan', 248475, 81598, 32.8, 39167, 42431, 16320, 65278),
(6, 'Kuntaur', 118104, 38429, 32.5, 18446, 19983, 7686, 30743),
(7, 'Janjanbureh', 147412, 50523, 34.3, 24251, 26272, 15157, 35366),
(8, 'Basse', 261160, 89034, 34.1, 42736, 46298, 22585, 66449)
ON CONFLICT (id) DO UPDATE SET
  lga = EXCLUDED.lga,
  total_population = EXCLUDED.total_population,
  youth_population = EXCLUDED.youth_population,
  youth_share = EXCLUDED.youth_share,
  male_youth = EXCLUDED.male_youth,
  female_youth = EXCLUDED.female_youth,
  urban_youth = EXCLUDED.urban_youth,
  rural_youth = EXCLUDED.rural_youth;

-- ============================================
-- 2. YOUTH WITH DISABILITIES DATA
-- ============================================
INSERT INTO youth_with_disabilities (id, age_group, total, male, female, urban, rural, seeing, hearing, physical, learning, selfcare, speech) VALUES
(1, '15-19', 1468, 735, 733, 734, 734, 450, 423, 398, 365, 360, 505),
(2, '20-24', 1260, 630, 630, 630, 630, 415, 404, 411, 325, 313, 432),
(3, '25-29', 1186, 593, 593, 593, 593, 345, 391, 383, 343, 273, 406),
(4, '30-34', 1084, 542, 542, 542, 542, 316, 316, 381, 320, 237, 330),
(5, '35', 275, 138, 137, 138, 137, 84, 91, 105, 82, 56, 75)
ON CONFLICT (id) DO UPDATE SET
  age_group = EXCLUDED.age_group,
  total = EXCLUDED.total,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  urban = EXCLUDED.urban,
  rural = EXCLUDED.rural,
  seeing = EXCLUDED.seeing,
  hearing = EXCLUDED.hearing,
  physical = EXCLUDED.physical,
  learning = EXCLUDED.learning,
  selfcare = EXCLUDED.selfcare,
  speech = EXCLUDED.speech;

-- ============================================
-- 3. YOUTH WITHOUT DISABILITIES DATA
-- ============================================
INSERT INTO youth_without_disabilities (id, age_group, total, male, female, urban, rural) VALUES
(1, '15-19', 284339, 142170, 142169, 170603, 113736),
(2, '20-24', 240971, 120486, 120485, 144583, 96388),
(3, '25-29', 191707, 95854, 95853, 115024, 76683),
(4, '30-34', 161448, 80724, 80724, 96869, 64579),
(5, '35', 34608, 17304, 17304, 20766, 13842)
ON CONFLICT (id) DO UPDATE SET
  age_group = EXCLUDED.age_group,
  total = EXCLUDED.total,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  urban = EXCLUDED.urban,
  rural = EXCLUDED.rural;

-- ============================================
-- 4. HUMAN TRAFFICKING DATA
-- ============================================
INSERT INTO human_trafficking (id, year, total, male, female, age_group, lga) VALUES
(1, '2022', 124, 45, 79, '15-19', 'Banjul'),
(2, '2022', 156, 67, 89, '20-24', 'Kanifing'),
(3, '2022', 98, 42, 56, '25-29', 'Brikama'),
(4, '2022', 76, 31, 45, '30-34', 'Mansakonko'),
(5, '2022', 45, 20, 25, '35', 'Kerewan')
ON CONFLICT (id) DO UPDATE SET
  year = EXCLUDED.year,
  total = EXCLUDED.total,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  age_group = EXCLUDED.age_group,
  lga = EXCLUDED.lga;

-- ============================================
-- 5. YOUTH MIGRATION DATA
-- ============================================
INSERT INTO youth_migration (id, year, total, male, female, origin, destination) VALUES
(1, '2022', 1250, 750, 500, 'Banjul', 'Urban Centers'),
(2, '2022', 2340, 1420, 920, 'Kanifing', 'International'),
(3, '2022', 3120, 1870, 1250, 'Brikama', 'Urban Centers'),
(4, '2022', 980, 590, 390, 'Mansakonko', 'International'),
(5, '2022', 1560, 940, 620, 'Kerewan', 'Urban Centers')
ON CONFLICT (id) DO UPDATE SET
  year = EXCLUDED.year,
  total = EXCLUDED.total,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  origin = EXCLUDED.origin,
  destination = EXCLUDED.destination;

-- ============================================
-- 6. NSC PARTICIPANTS DATA (Sample)
-- ============================================
INSERT INTO nsc_participants (id, name, age, gender, region, category, sport, level, status, achievements, date_registered, contact) VALUES
('NSC001', 'Amadou Jallow', 24, 'Male', 'Banjul', 'Professional', 'Football', 'Professional', 'Active', 'National League Champion 2023, Top Scorer 2022', '2023-01-15', 'amadou.jallow@email.com'),
('NSC002', 'Fatou Ceesay', 22, 'Female', 'KM', 'National Team', 'Athletics', 'Professional', 'Active', '100m National Record Holder, West African Games Gold Medal', '2023-02-20', 'fatou.ceesay@email.com'),
('NSC003', 'Ousman Darboe', 19, 'Male', 'WCR', 'Student Athlete', 'Basketball', 'Advanced', 'Active', 'University League MVP, Regional Championship Winner', '2023-03-10', 'ousman.darboe@email.com'),
('NSC004', 'Mariama Sanneh', 26, 'Female', 'CRR', 'Paralympic', 'Swimming', 'Professional', 'Active', 'Paralympic Qualifier, African Para Games Silver Medal', '2023-04-05', 'mariama.sanneh@email.com'),
('NSC005', 'Lamin Touray', 28, 'Male', 'NBR', 'Professional', 'Wrestling', 'Professional', 'Active', 'National Champion 2022, Commonwealth Games Participant', '2023-05-12', 'lamin.touray@email.com'),
('NSC006', 'Awa Baldeh', 20, 'Female', 'LRR', 'Amateur', 'Volleyball', 'Intermediate', 'Active', 'Regional Tournament Winner, Youth League Champion', '2023-06-18', 'awa.baldeh@email.com'),
('NSC007', 'Modou Jatta', 23, 'Male', 'URR', 'International-based', 'Football', 'Professional', 'Active', 'European League Player, National Team Captain', '2023-07-22', 'modou.jatta@email.com'),
('NSC008', 'Binta Jammeh', 21, 'Female', 'Banjul', 'Student Athlete', 'Tennis', 'Advanced', 'Active', 'University Champion, National Junior Champion', '2023-08-14', 'binta.jammeh@email.com'),
('NSC009', 'Ebrima Colley', 25, 'Male', 'KM', 'Professional', 'Boxing', 'Professional', 'Active', 'National Boxing Champion, Olympic Qualifier', '2023-09-08', 'ebrima.colley@email.com'),
('NSC010', 'Isatou Sarr', 27, 'Female', 'WCR', 'National Team', 'Handball', 'Professional', 'Active', 'National Team Vice Captain, African Championship Bronze', '2023-10-03', 'isatou.sarr@email.com')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  age = EXCLUDED.age,
  gender = EXCLUDED.gender,
  region = EXCLUDED.region,
  category = EXCLUDED.category,
  sport = EXCLUDED.sport,
  level = EXCLUDED.level,
  status = EXCLUDED.status,
  achievements = EXCLUDED.achievements,
  date_registered = EXCLUDED.date_registered,
  contact = EXCLUDED.contact;
