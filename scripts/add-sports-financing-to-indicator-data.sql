-- Add Sports Financing data to indicator_data table
-- This will populate the Sports Financing metrics in the MoYS RF-NDP Indicator Data page

DELETE FROM indicator_data WHERE category = 'sport_financing';

-- Sports Financing Support (January to October 2025)
-- Note: Using region as 'National' since these are national associations/federations
INSERT INTO indicator_data (id, organization, indicator, year, region, category, male, female, total, reference_source)
VALUES 
('SPORT-2025-001', 'NSC', 'Gambia Basketball Association funding support', 2025, 'National', 'sport_financing', 0, 0, 1800000, 'NSC Sports Financing Report 2025'),
('SPORT-2025-002', 'NSC', 'Gambia Volleyball Association funding support', 2025, 'National', 'sport_financing', 0, 0, 3175000, 'NSC Sports Financing Report 2025'),
('SPORT-2025-003', 'NSC', 'Gambia Football Federation funding support', 2025, 'National', 'sport_financing', 0, 0, 21364120, 'NSC Sports Financing Report 2025'),
('SPORT-2025-004', 'NSC', 'Gambia Athletic Association funding support', 2025, 'National', 'sport_financing', 0, 0, 1802740, 'NSC Sports Financing Report 2025'),
('SPORT-2025-005', 'NSC', 'Gambia Wrestling Association funding support', 2025, 'National', 'sport_financing', 0, 0, 2517000, 'NSC Sports Financing Report 2025'),
('SPORT-2025-006', 'NSC', 'Gambia Boxing Association funding support', 2025, 'National', 'sport_financing', 0, 0, 2680000, 'NSC Sports Financing Report 2025'),
('SPORT-2025-007', 'NSC', 'Gambia Deaf Association funding support', 2025, 'National', 'sport_financing', 0, 0, 1050000, 'NSC Sports Financing Report 2025'),
('SPORT-2025-008', 'NSC', 'Berewuleng funding support', 2025, 'National', 'sport_financing', 0, 0, 300000, 'NSC Sports Financing Report 2025'),
('SPORT-2025-009', 'NSC', 'Real De Banjul funding support', 2025, 'National', 'sport_financing', 0, 0, 500000, 'NSC Sports Financing Report 2025'),
('SPORT-2025-010', 'NSC', 'Gambia Chess Federation funding support', 2025, 'National', 'sport_financing', 0, 0, 241000, 'NSC Sports Financing Report 2025'),
('SPORT-2025-011', 'NSC', 'Gambia Sports Journalist Assoc funding support', 2025, 'National', 'sport_financing', 0, 0, 200000, 'NSC Sports Financing Report 2025'),
('SPORT-2025-012', 'NSC', 'Fullness Sports funding support', 2025, 'National', 'sport_financing', 0, 0, 100000, 'NSC Sports Financing Report 2025');
