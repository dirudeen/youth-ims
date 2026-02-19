-- Update registered youth organizations summary data
-- Based on The Gambia National Youth Council Report

-- Note: This script adds summary/placeholder records for the regional distribution
-- You may want to add actual organization details separately

-- Clear existing summary data if needed
-- DELETE FROM registered_youth_orgs WHERE id >= 1000;

-- Add placeholder records to represent the regional distribution
-- Banjul: 11 organizations
INSERT INTO registered_youth_orgs (id, organization_name, acronym, date_established, intervention_area, contact_person, email, contact_no, region, registered_with) VALUES
(1001, 'Banjul Youth Organizations (Summary)', 'BYO', '2024', 'Various youth development areas', 'Contact NYC', 'info@nyc.gm', '+220-000-0000', 'BJL', 'National Youth Council - 11 organizations registered');

-- Kanifing Municipality: 17 organizations  
INSERT INTO registered_youth_orgs (id, organization_name, acronym, date_established, intervention_area, contact_person, email, contact_no, region, registered_with) VALUES
(1002, 'Kanifing Municipality Youth Organizations (Summary)', 'KMYO', '2024', 'Various youth development areas', 'Contact NYC', 'info@nyc.gm', '+220-000-0000', 'KMC', 'National Youth Council - 17 organizations registered');

-- West Coast Region: 45 organizations
INSERT INTO registered_youth_orgs (id, organization_name, acronym, date_established, intervention_area, contact_person, email, contact_no, region, registered_with) VALUES
(1003, 'West Coast Region Youth Organizations (Summary)', 'WCRYO', '2024', 'Various youth development areas', 'Contact NYC', 'info@nyc.gm', '+220-000-0000', 'WCR', 'National Youth Council - 45 organizations registered');

-- Lower River Region: 20 organizations
INSERT INTO registered_youth_orgs (id, organization_name, acronym, date_established, intervention_area, contact_person, email, contact_no, region, registered_with) VALUES
(1004, 'Lower River Region Youth Organizations (Summary)', 'LRRYO', '2024', 'Various youth development areas', 'Contact NYC', 'info@nyc.gm', '+220-000-0000', 'LRR', 'National Youth Council - 20 organizations registered');

-- North Bank Region: 76 organizations
INSERT INTO registered_youth_orgs (id, organization_name, acronym, date_established, intervention_area, contact_person, email, contact_no, region, registered_with) VALUES
(1005, 'North Bank Region Youth Organizations (Summary)', 'NBRYO', '2024', 'Various youth development areas', 'Contact NYC', 'info@nyc.gm', '+220-000-0000', 'NBR', 'National Youth Council - 76 organizations registered');

-- Central River Region: 39 organizations
INSERT INTO registered_youth_orgs (id, organization_name, acronym, date_established, intervention_area, contact_person, email, contact_no, region, registered_with) VALUES
(1006, 'Central River Region Youth Organizations (Summary)', 'CRRYO', '2024', 'Various youth development areas', 'Contact NYC', 'info@nyc.gm', '+220-000-0000', 'CRR', 'National Youth Council - 39 organizations registered');

-- Upper River Region: 51 organizations
INSERT INTO registered_youth_orgs (id, organization_name, acronym, date_established, intervention_area, contact_person, email, contact_no, region, registered_with) VALUES
(1007, 'Upper River Region Youth Organizations (Summary)', 'URRYO', '2024', 'Various youth development areas', 'Contact NYC', 'info@nyc.gm', '+220-000-0000', 'URR', 'National Youth Council - 51 organizations registered');

-- National Organizations: 41 organizations
INSERT INTO registered_youth_orgs (id, organization_name, acronym, date_established, intervention_area, contact_person, email, contact_no, region, registered_with) VALUES
(1008, 'National Youth Organizations (Summary)', 'NYO', '2024', 'Various youth development areas', 'Contact NYC', 'info@nyc.gm', '+220-000-0000', 'National', 'National Youth Council - 41 national organizations registered');
