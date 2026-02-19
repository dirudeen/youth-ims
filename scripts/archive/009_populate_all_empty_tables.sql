-- =====================================================
-- POPULATE ALL EMPTY TABLES IN SUPABASE DATABASE
-- =====================================================
-- This script populates all empty tables with sample data
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. GNYC ACTIVITIES (25 records)
-- =====================================================
INSERT INTO gnyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) VALUES
('gnyc1', 'Youth Leadership Training Program', 'Leadership Development', 'GBA', 2022, 150, 75, 75, 'UNDP', 'Comprehensive leadership training for young people in Greater Banjul Area', 'Completed'),
('gnyc2', 'Digital Skills Bootcamp', 'Skills Development', 'KM', 2022, 200, 120, 80, 'EU', 'Intensive digital literacy and coding training program', 'Completed'),
('gnyc3', 'Youth Entrepreneurship Summit', 'Entrepreneurship', 'WCR', 2022, 300, 180, 120, 'World Bank', 'Annual summit bringing together young entrepreneurs and mentors', 'Completed'),
('gnyc4', 'Climate Action Youth Forum', 'Environmental', 'NBR', 2022, 180, 90, 90, 'GEF', 'Youth-led climate change awareness and action planning', 'Completed'),
('gnyc5', 'Sports for Development Program', 'Sports & Recreation', 'LRR', 2022, 250, 140, 110, 'FIFA Foundation', 'Using sports as a tool for youth development and social cohesion', 'Completed'),
('gnyc6', 'Youth Health Advocacy Campaign', 'Health & Wellness', 'CRR', 2022, 400, 200, 200, 'WHO', 'Peer-to-peer health education and advocacy program', 'Completed'),
('gnyc7', 'Cultural Heritage Preservation Project', 'Arts & Culture', 'URR', 2022, 120, 60, 60, 'UNESCO', 'Youth-led initiative to document and preserve local cultural practices', 'Completed'),
('gnyc8', 'Advanced Leadership Academy', 'Leadership Development', 'GBA', 2023, 180, 90, 90, 'UNDP', 'Advanced leadership training for youth council members', 'Completed'),
('gnyc9', 'Tech Innovation Hub', 'Skills Development', 'KM', 2023, 250, 150, 100, 'EU', 'Technology incubator and innovation space for young entrepreneurs', 'Completed'),
('gnyc10', 'Green Business Incubator', 'Entrepreneurship', 'WCR', 2023, 160, 80, 80, 'World Bank', 'Supporting eco-friendly business ventures by young entrepreneurs', 'Completed'),
('gnyc11', 'Youth Climate Summit', 'Environmental', 'NBR', 2023, 220, 110, 110, 'GEF', 'National youth climate summit with international participation', 'Completed'),
('gnyc12', 'Community Sports League', 'Sports & Recreation', 'LRR', 2023, 300, 180, 120, 'FIFA Foundation', 'Establishing community-based sports leagues for youth engagement', 'Completed'),
('gnyc13', 'Mental Health First Aid Training', 'Health & Wellness', 'CRR', 2023, 150, 70, 80, 'WHO', 'Training youth as mental health first aid providers', 'Completed'),
('gnyc14', 'Youth Arts Festival', 'Arts & Culture', 'URR', 2023, 280, 140, 140, 'UNESCO', 'Annual festival showcasing youth talent in arts and culture', 'Completed'),
('gnyc15', 'Civic Education Program', 'Leadership Development', 'GBA', 2023, 200, 100, 100, 'UNDP', 'Educating youth on civic responsibilities and democratic participation', 'Completed'),
('gnyc16', 'AI and Machine Learning Workshop', 'Skills Development', 'KM', 2024, 100, 60, 40, 'EU', 'Introduction to artificial intelligence and machine learning for youth', 'Ongoing'),
('gnyc17', 'Social Enterprise Accelerator', 'Entrepreneurship', 'WCR', 2024, 80, 40, 40, 'World Bank', 'Accelerator program for youth-led social enterprises', 'Ongoing'),
('gnyc18', 'Renewable Energy Youth Initiative', 'Environmental', 'NBR', 2024, 120, 70, 50, 'GEF', 'Training youth in renewable energy technologies and installation', 'Ongoing'),
('gnyc19', 'Paralympic Sports Development', 'Sports & Recreation', 'LRR', 2024, 60, 35, 25, 'FIFA Foundation', 'Developing Paralympic sports opportunities for youth with disabilities', 'Ongoing'),
('gnyc20', 'Youth Nutrition Champions', 'Health & Wellness', 'CRR', 2024, 180, 80, 100, 'WHO', 'Training youth as nutrition advocates in their communities', 'Ongoing'),
('gnyc21', 'Digital Storytelling Workshop', 'Arts & Culture', 'URR', 2024, 90, 45, 45, 'UNESCO', 'Teaching youth to create and share digital stories about their communities', 'Ongoing'),
('gnyc22', 'Youth Parliament Simulation', 'Leadership Development', 'GBA', 2024, 150, 75, 75, 'UNDP', 'Simulated parliamentary sessions to teach democratic processes', 'Planned'),
('gnyc23', 'Blockchain and Cryptocurrency Education', 'Skills Development', 'KM', 2024, 80, 50, 30, 'EU', 'Educational program on blockchain technology and digital currencies', 'Planned'),
('gnyc24', 'Agri-Tech Innovation Lab', 'Entrepreneurship', 'WCR', 2024, 100, 60, 40, 'World Bank', 'Innovation lab focusing on agricultural technology solutions', 'Planned'),
('gnyc25', 'Ocean Conservation Youth Network', 'Environmental', 'NBR', 2024, 140, 70, 70, 'GEF', 'Youth network for ocean and marine conservation activities', 'Planned')
ON CONFLICT (id) DO UPDATE SET
  activity_name = EXCLUDED.activity_name,
  category = EXCLUDED.category,
  region = EXCLUDED.region,
  year = EXCLUDED.year,
  beneficiaries = EXCLUDED.beneficiaries,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  funding_partner = EXCLUDED.funding_partner,
  description = EXCLUDED.description,
  status = EXCLUDED.status;

-- 2. NYC ACTIVITIES (10 sample records from NYC participants)
-- =====================================================
INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) VALUES
('NYC001', 'Football Development Program', 'Professional', 'Banjul', 2023, 150, 90, 60, 'NSC', 'Professional football training and development', 'Completed'),
('NYC002', 'Athletics Training Camp', 'National Team', 'KM', 2023, 120, 60, 60, 'NSC', 'National athletics team training and preparation', 'Completed'),
('NYC003', 'Basketball League Championship', 'Student Athlete', 'WCR', 2023, 200, 120, 80, 'NSC', 'University basketball league and championship', 'Completed'),
('NYC004', 'Paralympic Swimming Program', 'Paralympic', 'CRR', 2023, 80, 40, 40, 'NSC', 'Paralympic swimming training and competition', 'Completed'),
('NYC005', 'Wrestling National Championship', 'Professional', 'NBR', 2023, 100, 70, 30, 'NSC', 'National wrestling championship and training', 'Completed'),
('NYC006', 'Volleyball Regional Tournament', 'Amateur', 'LRR', 2023, 150, 75, 75, 'NSC', 'Regional volleyball tournament and development', 'Completed'),
('NYC007', 'Football International Program', 'International', 'URR', 2023, 50, 35, 15, 'NSC', 'International football player development program', 'Ongoing'),
('NYC008', 'Tennis University Championship', 'Student Athlete', 'Banjul', 2023, 90, 45, 45, 'NSC', 'University tennis championship and training', 'Ongoing'),
('NYC009', 'Boxing National Team Training', 'Professional', 'KM', 2024, 60, 50, 10, 'NSC', 'National boxing team training and preparation', 'Ongoing'),
('NYC010', 'Handball National Team Program', 'National Team', 'WCR', 2024, 80, 40, 40, 'NSC', 'National handball team development program', 'Ongoing')
ON CONFLICT (id) DO UPDATE SET
  activity_name = EXCLUDED.activity_name,
  category = EXCLUDED.category,
  region = EXCLUDED.region,
  year = EXCLUDED.year,
  beneficiaries = EXCLUDED.beneficiaries,
  male = EXCLUDED.male,
  female = EXCLUDED.female,
  funding_partner = EXCLUDED.funding_partner,
  description = EXCLUDED.description,
  status = EXCLUDED.status;

-- 3. NEDI PROGRAMS (10 records)
-- =====================================================
INSERT INTO nedi_programs (id, program_name, target_group, beneficiaries, male_participants, female_participants, service_type, description, status, location, start_date, end_date, implementing_partner, funding_source) VALUES
('1', 'Migrant Returnees Entrepreneurship Training', 'Migrant Returnees', 570, 350, 220, 'Training', 'General entrepreneurship and financial literacy training for migrant returnees', 'Completed', 'National', '2024-01-01', '2024-12-31', 'NEDI', 'Government/IOM'),
('2', 'Youth and Women Mentoring Services', 'Youth and Women Entrepreneurs', 150, 60, 90, 'Mentoring & Coaching', 'Mentoring and coaching services for youth and women entrepreneurs', 'Ongoing', 'National', '2024-01-01', NULL, 'NEDI', 'Government'),
('3', 'Business Advisory Services', 'Youth and Women', 210, 90, 120, 'Business Advisory', 'Business advisory services focusing on business formalization', 'Completed', 'National', '2024-01-01', '2024-12-31', 'NEDI', 'Government'),
('4', 'VYWoSP Entrepreneurship Training', 'General Beneficiaries', 300, 150, 150, 'Training', 'Entrepreneurship and small ruminant & poultry production training under VYWoSP project', 'Completed', 'National', '2024-01-01', '2024-12-31', 'NEDI', 'VYWoSP'),
('5', 'VYWoSP Coaching Refresher Training', 'Coaches', 20, 12, 8, 'Training', 'Coaching refresher training for coaches under the VYWoSP project', 'Completed', 'National', '2024-10-01', '2024-11-30', 'NEDI', 'VYWoSP'),
('6', 'Shanghai Study Tour', 'Entrepreneurs', 6, 3, 3, 'Study Tour', '3-week study tour to Shanghai, China for entrepreneurs', 'Completed', 'Shanghai, China', '2024-09-01', '2024-09-21', 'MoYS', 'Government'),
('7', 'Migrant Returnees Reintegration Assistance', 'Trained Migrant Returnees', 420, 280, 140, 'Financial Assistance', 'Reintegration assistance (Access to finance) for trained migrant returnees', 'Completed', 'National', '2024-01-01', '2024-12-31', 'IOM', 'IOM'),
('8', 'GCCI Trade Fair Support', 'Youth and Women Entrepreneurs', 10, 4, 6, 'Trade Fair Support', 'Support with stalls at GCCI International trade fair', 'Completed', 'Banjul', '2024-11-01', '2024-11-07', 'NEDI', 'Government'),
('9', 'Regional Business Formalization Centers', 'General Public', 0, 0, 0, 'Infrastructure', '2 regional business formalization centers fully operational (LRR and URR)', 'Operational', 'LRR and URR', '2024-01-01', NULL, 'NEDI', 'Government'),
('10', 'Q1 2025 Monitoring and Evaluation', 'NEDI Grant Beneficiaries', 0, 0, 0, 'Monitoring & Evaluation', 'First quarter 2025 monitoring and evaluation conducted to NEDI grant beneficiaries', 'Completed', 'National', '2025-01-01', '2025-03-31', 'NEDI', 'Government')
ON CONFLICT (id) DO UPDATE SET
  program_name = EXCLUDED.program_name,
  target_group = EXCLUDED.target_group,
  beneficiaries = EXCLUDED.beneficiaries,
  male_participants = EXCLUDED.male_participants,
  female_participants = EXCLUDED.female_participants,
  service_type = EXCLUDED.service_type,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  location = EXCLUDED.location,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  implementing_partner = EXCLUDED.implementing_partner,
  funding_source = EXCLUDED.funding_source;

-- 4. NYSS PROGRAMS (14 records)
-- =====================================================
INSERT INTO nyss_programs (id, program_name, institution, region, year, total_graduates, male_graduates, female_graduates, employment_rate, sector) VALUES
(1, 'Entrepreneurship & Business Management', 'GTTI', 'KM', 2022, 125, 71, 54, 68.0, 'Business & Entrepreneurship'),
(2, 'Digital Skills & ICT', 'UTG', 'GBA', 2022, 150, 85, 65, 72.0, 'Information Technology'),
(3, 'Agricultural Skills Training', 'MDI', 'CRR', 2022, 98, 60, 38, 65.0, 'Agriculture'),
(4, 'Hospitality & Tourism', 'GTTI', 'WCR', 2022, 87, 42, 45, 58.0, 'Tourism & Hospitality'),
(5, 'Advanced Entrepreneurship', 'GTTI', 'KM', 2023, 140, 82, 58, 75.0, 'Business & Entrepreneurship'),
(6, 'Software Development', 'UTG', 'GBA', 2023, 110, 75, 35, 80.0, 'Information Technology'),
(7, 'Modern Farming Techniques', 'MDI', 'NBR', 2023, 105, 68, 37, 70.0, 'Agriculture'),
(8, 'Healthcare Services', 'SMC', 'LRR', 2023, 92, 35, 57, 85.0, 'Healthcare'),
(9, 'Green Energy & Sustainability', 'GTTI', 'WCR', 2024, 78, 52, 26, 62.0, 'Renewable Energy'),
(10, 'Automotive Mechanics', 'GTTI', 'KM', 2024, 95, 88, 7, 68.0, 'Technical Skills'),
(11, 'Fashion & Textile Design', 'NEDI', 'GBA', 2024, 120, 25, 95, 58.0, 'Creative Industries'),
(12, 'Construction & Carpentry', 'GTTI', 'URR', 2024, 85, 79, 6, 72.0, 'Construction'),
(13, 'AI & Data Science', 'UTG', 'GBA', 2025, 0, 0, 0, 0.0, 'Information Technology'),
(14, 'Agribusiness Management', 'MDI', 'CRR', 2025, 0, 0, 0, 0.0, 'Agriculture')
ON CONFLICT (id) DO UPDATE SET
  program_name = EXCLUDED.program_name,
  institution = EXCLUDED.institution,
  region = EXCLUDED.region,
  year = EXCLUDED.year,
  total_graduates = EXCLUDED.total_graduates,
  male_graduates = EXCLUDED.male_graduates,
  female_graduates = EXCLUDED.female_graduates,
  employment_rate = EXCLUDED.employment_rate,
  sector = EXCLUDED.sector;

-- 5. NYSS GRADUATES (10 records)
-- =====================================================
INSERT INTO nyss_graduates (id, name, age, gender, region, training_program, graduation_year, employment_status, sector) VALUES
(1, 'Muhammed Jallow', 24, 'Male', 'KM', 'Entrepreneurship & Business Management', '2022', 'Self-Employed', 'Retail Business'),
(2, 'Aminata Sowe', 22, 'Female', 'GBA', 'Digital Skills & ICT', '2022', 'Employed', 'Technology'),
(3, 'Bakary Ceesay', 26, 'Male', 'CRR', 'Agricultural Skills Training', '2022', 'Self-Employed', 'Agriculture'),
(4, 'Fatou Jatta', 23, 'Female', 'WCR', 'Hospitality & Tourism', '2022', 'Employed', 'Tourism'),
(5, 'Lamin Drammeh', 25, 'Male', 'KM', 'Advanced Entrepreneurship', '2023', 'Self-Employed', 'Manufacturing'),
(6, 'Isatou Touray', 21, 'Female', 'GBA', 'Software Development', '2023', 'Employed', 'Technology'),
(7, 'Modou Bah', 27, 'Male', 'NBR', 'Modern Farming Techniques', '2023', 'Self-Employed', 'Agriculture'),
(8, 'Mariama Sanneh', 24, 'Female', 'LRR', 'Healthcare Services', '2023', 'Employed', 'Healthcare'),
(9, 'Ousman Jobe', 23, 'Male', 'WCR', 'Green Energy & Sustainability', '2024', 'Employed', 'Renewable Energy'),
(10, 'Binta Jallow', 22, 'Female', 'GBA', 'Fashion & Textile Design', '2024', 'Self-Employed', 'Creative Industries')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  age = EXCLUDED.age,
  gender = EXCLUDED.gender,
  region = EXCLUDED.region,
  training_program = EXCLUDED.training_program,
  graduation_year = EXCLUDED.graduation_year,
  employment_status = EXCLUDED.employment_status,
  sector = EXCLUDED.sector;

-- 6. REGISTERED YOUTH ORGANIZATIONS (5 records)
-- =====================================================
INSERT INTO registered_youth_orgs (id, organization_name, acronym, date_established, intervention_area, contact_person, email, contact_no, region, registered_with) VALUES
(1, 'Gambia National Youth Council', 'GNYC', '2010-01-01', 'Leadership Development, Skills Training, Advocacy', 'Director General', 'info@gnyc.gm', '+220 123 4567', 'National', 'Ministry of Youth and Sports, NCCE'),
(2, 'Young Achievers Association of Gambia', 'YAAG', '2015-03-15', 'Entrepreneurship, Education, Mentorship', 'Executive Director', 'contact@yaag.gm', '+220 234 5678', 'GBA', 'Ministry of Youth and Sports'),
(3, 'Gambia Youth Development Association', 'GYDA', '2012-06-20', 'Community Development, Skills Training, Sports', 'Program Coordinator', 'info@gyda.gm', '+220 345 6789', 'WCR', 'Ministry of Youth and Sports'),
(4, 'North Bank Youth Forum', 'NBYF', '2018-09-10', 'Advocacy, Environmental Protection, Health', 'Chairperson', 'nbyf@gmail.com', '+220 456 7890', 'NBR', 'Ministry of Youth and Sports'),
(5, 'Lower River Region Youth Council', 'LRRYC', '2016-04-25', 'Agriculture, Sports, Cultural Activities', 'Secretary General', 'lrryc@yahoo.com', '+220 567 8901', 'LRR', 'Ministry of Youth and Sports')
ON CONFLICT (id) DO UPDATE SET
  organization_name = EXCLUDED.organization_name,
  acronym = EXCLUDED.acronym,
  date_established = EXCLUDED.date_established,
  intervention_area = EXCLUDED.intervention_area,
  contact_person = EXCLUDED.contact_person,
  email = EXCLUDED.email,
  contact_no = EXCLUDED.contact_no,
  region = EXCLUDED.region,
  registered_with = EXCLUDED.registered_with;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify the data was inserted correctly

SELECT 'GNYC Activities' as table_name, COUNT(*) as record_count FROM gnyc_activities
UNION ALL
SELECT 'NYC Activities', COUNT(*) FROM nyc_activities
UNION ALL
SELECT 'NEDI Programs', COUNT(*) FROM nedi_programs
UNION ALL
SELECT 'NYSS Programs', COUNT(*) FROM nyss_programs
UNION ALL
SELECT 'NYSS Graduates', COUNT(*) FROM nyss_graduates
UNION ALL
SELECT 'Registered Youth Orgs', COUNT(*) FROM registered_youth_orgs;

-- =====================================================
-- SUMMARY
-- =====================================================
-- Total records inserted:
-- - GNYC Activities: 25 records
-- - NYC Activities: 10 records
-- - NEDI Programs: 10 records
-- - NYSS Programs: 14 records
-- - NYSS Graduates: 10 records
-- - Registered Youth Organizations: 5 records
-- TOTAL: 74 records across 6 tables
-- =====================================================
