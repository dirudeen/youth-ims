-- NYC Activities Data from The Gambia National Youth Council Report
-- Populating activities for 2022, 2023, and 2024

-- Clear existing data (optional - remove if you want to keep existing data)
-- DELETE FROM nyc_activities;

-- 2022 Activities (15 activities, 19,917 total beneficiaries)
INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) VALUES
('NYC-2022-001', 'Support awareness-raising and access to information for children and adolescents through U-Report', 'Leadership Development', 'National', 2022, 445, 0, 0, 'UNICEF', 'Awareness-raising and access to information for children and adolescents in and out of school and within the community through U-Report and other media including community radio to increase their informed participation in public life', 'Completed'),
('NYC-2022-002', 'Regional dialogue on peace, tolerance and social cohesion', 'Leadership Development', 'National', 2022, 315, 0, 0, 'KAS', 'Regional dialogue sessions focused on promoting peace, tolerance and social cohesion among youth', 'Completed'),
('NYC-2022-003', 'Regional musical caravan on peaceful campaign and election', 'Arts & Culture', 'National', 2022, 15000, 0, 0, 'UNDP', 'Musical caravan across regions promoting peaceful campaigns and elections', 'Completed'),
('NYC-2022-004', 'Pilot Technology and Innovation supporting youth inclusion in governance', 'Skills Development', 'Central', 2022, 75, 0, 0, 'UNDP', 'Pilot Technology and Innovation that support youth inclusion in governance and mitigation of violence', 'Completed'),
('NYC-2022-005', 'Inter-cultural dialogue with local communities', 'Arts & Culture', 'National', 2022, 175, 0, 0, 'UNESCO', 'Inter-cultural dialogue sessions with local communities across regions', 'Completed'),
('NYC-2022-006', 'Inter-cultural festival', 'Arts & Culture', 'Central', 2022, 235, 0, 0, 'UNESCO', 'Inter-cultural festival celebrating diversity and youth culture', 'Completed'),
('NYC-2022-007', 'Popularization of the National Youth Policy of the Gambia', 'Leadership Development', 'National', 2022, 250, 0, 0, 'UNESCO', 'Popularization and dissemination of the National Youth Policy across all regions', 'Completed'),
('NYC-2022-008', 'Capacity Building Training for Young National Assembly Members', 'Leadership Development', 'Central', 2022, 25, 0, 0, 'UNDP', 'Capacity building training program for young National Assembly Members', 'Completed'),
('NYC-2022-009', 'Community Dialogue on Post-Election Violence', 'Leadership Development', 'National', 2022, 350, 0, 0, 'UNDP', 'Community Dialogue on Post-Election Violence to Counter Hate Speech, Tribalism and Mitigate Violence', 'Completed'),
('NYC-2022-010', 'Recruitment and Placement of Interns & Sharing Sessions', 'Skills Development', 'Central', 2022, 40, 0, 0, 'UNDP', 'Recruitment and placement of interns with sharing sessions for knowledge transfer', 'Completed'),
('NYC-2022-011', 'YouthConnekt Gambia Summit', 'Leadership Development', 'Central', 2022, 400, 0, 0, 'UNDP', 'YouthConnekt Gambia Summit bringing together youth leaders and stakeholders', 'Completed'),
('NYC-2022-012', 'CNAG Regional Dialogue with Local Authorities', 'Leadership Development', 'National', 2022, 245, 0, 0, 'UNICEF', 'Children National Assembly of Gambia Regional Dialogue with Local Authorities', 'Completed'),
('NYC-2022-013', 'Training of CNAG members on Harmful Practices & Child Rights', 'Health & Wellness', 'National', 2022, 117, 0, 0, 'UNICEF', 'Training of CNAG members on Harmful Practices and Child Rights', 'Completed'),
('NYC-2022-014', 'NYC Regional Reflection Session on Issues Affecting Children', 'Leadership Development', 'National', 2022, 245, 0, 0, 'UNICEF', 'NYC Regional Reflection Session on Issues Affecting Children', 'Completed'),
('NYC-2022-015', 'National Youth Conference and Festival (NaYConF) 2022', 'Leadership Development', 'Central', 2022, 2000, 0, 0, 'Government', 'National Youth Conference and Festival 2022 with participation from UN Systems', 'Completed'),

-- 2023 Activities (16 activities, 43,057 total beneficiaries)
('NYC-2023-001', 'Dialogue to enhance women participation in politics', 'Leadership Development', 'National', 2023, 315, 0, 315, 'UNICEF', 'Dialogue sessions to enhance women participation in politics and other decision-making processes', 'Completed'),
('NYC-2023-002', 'Training on Safe Migration Processes for Community Youth Champions', 'Skills Development', 'National', 2023, 120, 0, 0, 'UNICEF', 'Training on Safe Migration Processes for Community Youth Champions', 'Completed'),
('NYC-2023-003', 'Community dialogue on FGM/C', 'Health & Wellness', 'National', 2023, 350, 0, 0, 'UNICEF', 'Community dialogue sessions on Female Genital Mutilation/Cutting', 'Completed'),
('NYC-2023-004', 'CNAG Regional Dialogue with Local Authorities', 'Leadership Development', 'National', 2023, 300, 0, 0, 'UNICEF', 'Children National Assembly of Gambia Regional Dialogue with Local Authorities', 'Completed'),
('NYC-2023-005', 'Training on harmful practices and child rights', 'Health & Wellness', 'National', 2023, 175, 0, 0, 'UNICEF', 'Training sessions on harmful practices and child rights', 'Completed'),
('NYC-2023-006', 'NYC Regional Reflection Session on Issues Affecting Children', 'Leadership Development', 'National', 2023, 300, 0, 0, 'UNICEF', 'NYC Regional Reflection Session on Issues Affecting Children', 'Completed'),
('NYC-2023-007', 'Community dialogue on preventative measures on sexual exploitation', 'Health & Wellness', 'National', 2023, 250, 0, 0, 'UNICEF', 'Community dialogue on preventative measures on sexual exploitation of children in the context of tourism', 'Completed'),
('NYC-2023-008', 'Support Children National Assembly use of Technology and Community Radio', 'Skills Development', 'National', 2023, 10000, 0, 0, 'UNICEF', 'Support Children National Assembly, use of Technology and Community Radio to raise Awareness on FGM', 'Completed'),
('NYC-2023-009', 'Online Meeting with CNAG and TWG', 'Leadership Development', 'National', 2023, 50, 0, 0, 'UNICEF', 'Online Meeting with CNAG and Technical Working Group via Zoom', 'Completed'),
('NYC-2023-010', 'Support Children National Assembly Organize national sitting', 'Leadership Development', 'National', 2023, 105, 0, 0, 'UNICEF', 'Support Children National Assembly (CNAG) to organize one national sitting', 'Completed'),
('NYC-2023-011', 'Community engagements on rights of girls with disabilities', 'Health & Wellness', 'National', 2023, 350, 0, 350, 'UNICEF', 'Community engagements of CNAG members on the rights of girls with disabilities', 'Completed'),
('NYC-2023-012', 'Support young leaders organize community dialogues', 'Leadership Development', 'National', 2023, 20000, 0, 0, 'UNICEF', 'Support young leaders (women and men) and youth networks to organize community dialogues', 'Completed'),
('NYC-2023-013', 'Intergenerational dialogue on mitigation of election violence', 'Leadership Development', 'National', 2023, 420, 0, 0, 'UNDP', 'Intergenerational dialogue on the mitigation of pre and post-election violence', 'Completed'),
('NYC-2023-014', 'Media outreach programs', 'Skills Development', 'National', 2023, 10000, 0, 0, 'UNDP', 'Media outreach programs to reach youth across the country', 'Completed'),
('NYC-2023-015', 'Empowering Youth Leadership training', 'Leadership Development', 'National', 2023, 22, 0, 0, 'GIZ-PME', 'Empowering Youth Leadership training - Strengthening the National Youth Council coordination and advisory services', 'Completed'),
('NYC-2023-016', 'YouthConnekt Gambia Summit 3.0', 'Leadership Development', 'National', 2023, 300, 0, 0, 'Multi-Partner', 'YouthConnekt Gambia summit 3.0 with UN Agencies, RICAR, NEDI, GCCI, and Gambia government', 'Completed'),

-- 2024 Activities (14 activities, 15,145 total beneficiaries)
('NYC-2024-001', 'Advocacy Meeting on Harmful Practices and GBV', 'Health & Wellness', 'National', 2024, 350, 0, 0, 'UNICEF', 'Advocacy Meeting on Harmful Practices and Gender-Based Violence with Government Authorities and Religious Leaders', 'Completed'),
('NYC-2024-002', 'National Stakeholders Forum on CNAG Position Paper', 'Leadership Development', 'National', 2024, 63, 0, 0, 'UNICEF', 'National Stakeholders Forum on the Position Paper of the Children National Assembly of the Gambia', 'Completed'),
('NYC-2024-003', 'Open school day to discuss FGM and harmful practices', 'Health & Wellness', 'National', 2024, 7950, 0, 0, 'UNICEF', 'Open school day to discuss FGM and other harmful practices and violence against children (bullying) in schools and communities', 'Completed'),
('NYC-2024-004', 'Amendment of CNAG constitution and capacity building', 'Leadership Development', 'National', 2024, 105, 0, 0, 'UNICEF', 'Amendment of CNAG constitution and orientation on the constitution & standing order/provide capacity building and training for new CNAG members on leadership, and child rights and protection issues', 'Completed'),
('NYC-2024-005', 'Election of new CNAG Members', 'Leadership Development', 'National', 2024, 902, 0, 0, 'UNICEF', 'Election of new Children National Assembly of Gambia Members', 'Completed'),
('NYC-2024-006', 'Orientation of Newly Elected CNAG Members', 'Leadership Development', 'National', 2024, 105, 0, 0, 'UNICEF', 'Orientation of the Newly Elected CNAG Members', 'Completed'),
('NYC-2024-007', 'Community and youth champions training on safe migration', 'Skills Development', 'LRR', 2024, 1400, 0, 0, 'UNICEF', 'Community and youth champions training on safe migration in the Lower River & North Bank Regions', 'Completed'),
('NYC-2024-008', 'Sensitization caravan on migration and children on the move', 'Health & Wellness', 'National', 2024, 200, 0, 0, 'UNICEF', 'Sensitization caravan on migration and children on the move', 'Completed'),
('NYC-2024-009', 'Validation Workshop - National Action Plan on Youth Peace and Security', 'Leadership Development', 'National', 2024, 250, 0, 0, 'Multi-Partner', 'Validation Workshop for The Gambia National Action Plan on Youth, Peace, and Security (UNDP, UNFPA, & GIZ)', 'Completed'),
('NYC-2024-010', 'Regional Dialogue on Migration', 'Leadership Development', 'National', 2024, 120, 0, 0, 'KAS', 'Regional Dialogue sessions on Migration', 'Completed'),
('NYC-2024-011', 'Constituency Consultation on National Action Plan', 'Leadership Development', 'National', 2024, 300, 0, 0, 'UNFPA', 'Constituency Consultation on the Development of the National Action Plan on Youth Peace and Security', 'Completed'),
('NYC-2024-012', 'Empowering Youth and Adolescents on Children on the Move', 'Skills Development', 'National', 2024, 600, 0, 0, 'UNICEF', 'Empowering Youth and Adolescents: Sensitization on Children on the Move and Their Role in Supporting Service Providers and CCPCs', 'Completed'),
('NYC-2024-013', 'Caravan and Night Film Show', 'Arts & Culture', 'National', 2024, 300, 0, 0, 'UNICEF', 'Caravan and Night Film Show to engage youth', 'Completed'),
('NYC-2024-014', 'National Youth Conference and Festival (NaYConF) 2024', 'Leadership Development', 'National', 2024, 2500, 0, 0, 'Government', 'National Youth Conference and Festival 2024 with UN Systems', 'Completed');
