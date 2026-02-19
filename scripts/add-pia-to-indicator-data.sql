-- Add PIA student training data to indicator_data table
-- This will populate the indicator data for PIA showing in the organization dropdown

DELETE FROM indicator_data WHERE organization = 'PIA';

-- PIA Training Data from Skills Training Centre
-- 2023-2024 Academic Year
INSERT INTO indicator_data (id, organization, indicator, year, region, category, male, female, total, reference_source)
VALUES 
('PIA-2024-001', 'PIA', 'Tailoring & Fashion Design graduates', 2024, 'KM', 'training', 1, 45, 46, 'PIA Skills Training Centre Annual Report'),
('PIA-2024-002', 'PIA', 'Auto Mechanics graduates', 2024, 'KM', 'training', 24, 0, 24, 'PIA Skills Training Centre Annual Report'),
('PIA-2024-003', 'PIA', 'Metal Work graduates', 2024, 'KM', 'training', 3, 0, 3, 'PIA Skills Training Centre Annual Report'),
('PIA-2024-004', 'PIA', 'Carpentry graduates', 2024, 'KM', 'training', 5, 0, 5, 'PIA Skills Training Centre Annual Report'),
('PIA-2024-005', 'PIA', 'Plumbing graduates', 2024, 'KM', 'training', 10, 0, 10, 'PIA Skills Training Centre Annual Report'),
('PIA-2024-006', 'PIA', 'Electrical Installation graduates', 2024, 'KM', 'training', 30, 0, 30, 'PIA Skills Training Centre Annual Report'),
('PIA-2024-007', 'PIA', 'Hair Dressing graduates', 2024, 'KM', 'training', 0, 16, 16, 'PIA Skills Training Centre Annual Report'),
('PIA-2024-008', 'PIA', 'Home Science graduates', 2024, 'KM', 'training', 1, 23, 24, 'PIA Skills Training Centre Annual Report');

-- 2024-2025 Academic Year
INSERT INTO indicator_data (id, organization, indicator, year, region, category, male, female, total, reference_source)
VALUES 
('PIA-2025-001', 'PIA', 'Tailoring & Fashion Design graduates', 2025, 'KM', 'training', 1, 33, 34, 'PIA Skills Training Centre Annual Report'),
('PIA-2025-002', 'PIA', 'Auto Mechanics graduates', 2025, 'KM', 'training', 30, 1, 31, 'PIA Skills Training Centre Annual Report'),
('PIA-2025-003', 'PIA', 'Carpentry graduates', 2025, 'KM', 'training', 4, 0, 4, 'PIA Skills Training Centre Annual Report'),
('PIA-2025-004', 'PIA', 'Plumbing graduates', 2025, 'KM', 'training', 7, 0, 7, 'PIA Skills Training Centre Annual Report'),
('PIA-2025-005', 'PIA', 'Construction graduates', 2025, 'KM', 'training', 4, 0, 4, 'PIA Skills Training Centre Annual Report'),
('PIA-2025-006', 'PIA', 'Electrical Installation graduates', 2025, 'KM', 'training', 18, 0, 18, 'PIA Skills Training Centre Annual Report'),
('PIA-2025-007', 'PIA', 'Hair Dressing graduates', 2025, 'KM', 'training', 0, 14, 14, 'PIA Skills Training Centre Annual Report'),
('PIA-2025-008', 'PIA', 'Home Science graduates', 2025, 'KM', 'training', 2, 30, 32, 'PIA Skills Training Centre Annual Report');
