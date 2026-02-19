-- NYC Activities Data from The Gambia National Youth Council Report
-- Using individual INSERT statements for better compatibility

-- Clear existing NYC activities data
DELETE FROM nyc_activities;

-- 2022 Activities (15 activities, 19,917 total beneficiaries)
INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-001', 'Support awareness-raising and access to information for children and adolescents in and out of school and within the community through U-Report and other media including community radio to increase their informed participation in public life', 'Leadership Development', '7 Regions', 2022, 445, 0, 0, 'UNICEF', 'Support awareness-raising and access to information for children and adolescents', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-002', 'Regional dialogue on peace, tolerance and social cohesion', 'Leadership Development', '7 Regions', 2022, 315, 0, 0, 'KAS', 'Regional dialogue on peace, tolerance and social cohesion', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-003', 'Regional musical caravan on peaceful campaign and election', 'Arts & Culture', '7 Regions', 2022, 15000, 0, 0, 'UNDP', 'Regional musical caravan on peaceful campaign and election', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-004', 'Pilot Technology and Innovation that support youth inclusion in governance and mitigation of violence', 'Skills Development', 'Central', 2022, 75, 0, 0, 'UNDP', 'Pilot Technology and Innovation supporting youth inclusion', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-005', 'Inter-cultural dialogue with local communities', 'Arts & Culture', '7 Regions', 2022, 175, 0, 0, 'UNESCO', 'Inter-cultural dialogue with local communities', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-006', 'Inter-cultural festival', 'Arts & Culture', 'Central', 2022, 235, 0, 0, 'UNESCO', 'Inter-cultural festival', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-007', 'Popularization of the National Youth Policy of the Gambia', 'Leadership Development', '7 Regions', 2022, 250, 0, 0, 'UNESCO and KAS', 'Popularization of the National Youth Policy', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-008', 'Capacity Building Training for Young National Assembly Members', 'Leadership Development', 'Central', 2022, 25, 0, 0, 'UNDP', 'Capacity Building Training for Young NAMs', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-009', 'Community Dialogue on Post-Election Violence to Counter Hate Speech, Tribalism and Mitigate Violence', 'Leadership Development', '7 Regions', 2022, 350, 0, 0, 'UNDP', 'Community Dialogue on Post-Election Violence', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-010', 'Recruitment and Placement of Interns & Sharing Sessions', 'Skills Development', 'Central', 2022, 40, 0, 0, 'UNDP', 'Recruitment and Placement of Interns', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-011', 'Youthconnekt Gambia Summit', 'Leadership Development', 'Central', 2022, 400, 0, 0, 'UNDP', 'YouthConnekt Gambia Summit', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-012', 'CNAG Regional Dialogue with Local Authorities', 'Leadership Development', '7 Regions', 2022, 245, 0, 0, 'UNICEF', 'CNAG Regional Dialogue with Local Authorities', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-013', 'Training of CNAG members on Harmful Practices & Child Rights', 'Health & Wellness', '7 Regions', 2022, 117, 0, 0, 'UNICEF', 'Training of CNAG members on Harmful Practices', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-014', 'NYC Regional Reflection Session on Issues Affecting Children', 'Leadership Development', '7 Regions', 2022, 245, 0, 0, 'UNICEF', 'NYC Regional Reflection Session', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-015', 'National Youth conference and festival, (NaYConF) 2022', 'Leadership Development', 'Central', 2022, 2000, 0, 0, 'GAMBIA GOVERNMENT and The UN Systems', 'National Youth Conference and Festival 2022', 'Completed');

-- 2023 Activities (16 activities, 43,057 total beneficiaries)
INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-016', 'Dialogue on to enhance women participation in politics and other decision-making processes', 'Leadership Development', 'Regional', 2023, 315, 0, 315, 'UNICEF', 'Dialogue to enhance women participation in politics', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-017', 'Training on Safe Migration Processes for Community Youth Champions', 'Skills Development', 'Regional', 2023, 120, 0, 0, 'UNICEF', 'Training on Safe Migration Processes', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-018', 'Community dialogue on FGM/C', 'Health & Wellness', 'Regional', 2023, 350, 0, 0, 'UNICEF', 'Community dialogue on FGM/C', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-019', 'CNAG Regional Dialogue with Local Authorities', 'Leadership Development', 'Regional', 2023, 300, 0, 0, 'UNICEF', 'CNAG Regional Dialogue with Local Authorities', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-020', 'Training on harmful practices and child rights', 'Health & Wellness', 'Regional', 2023, 175, 0, 0, 'UNICEF', 'Training on harmful practices and child rights', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-021', 'NYC Regional Reflection Session on Issues Affecting Children', 'Leadership Development', 'Regional', 2023, 300, 0, 0, 'UNICEF', 'NYC Regional Reflection Session', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-022', 'Community dialogue on preventative measures on sexual exploitation of children in the context of tourism', 'Health & Wellness', 'National', 2023, 250, 0, 0, 'UNICEF', 'Community dialogue on preventative measures', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-023', 'Support Children National Assembly, use of Technology and Community Radio to raise Awareness on FGM', 'Skills Development', 'Regional', 2023, 10000, 0, 0, 'UNICEF', 'Support CNAG use of Technology and Radio', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-024', 'Online Meeting with CNAG and TWG (Zoom)', 'Leadership Development', 'National', 2023, 50, 0, 0, 'UNICEF', 'Online Meeting with CNAG and TWG', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-025', 'Support Children National Assembly (CNAG) Organize one national sitting', 'Leadership Development', 'National', 2023, 105, 0, 0, 'UNICEF', 'Support CNAG national sitting', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-026', 'Community engagements of CNAG members on the rights of girls with disabilities', 'Health & Wellness', 'Regional', 2023, 350, 0, 350, 'UNICEF', 'Community engagements on rights of girls with disabilities', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-027', 'Support young leaders (women and men) and youth networks to organize community dialogues', 'Leadership Development', 'Regional', 2023, 20000, 0, 0, 'UNICEF', 'Support young leaders organize community dialogues', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-028', 'Intergenerational dialogue on the mitigation of pre, and post-election violence', 'Leadership Development', 'Regional', 2023, 420, 0, 0, 'UNDP', 'Intergenerational dialogue on election violence', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-029', 'Media out-reach programs', 'Skills Development', 'Regional', 2023, 10000, 0, 0, 'UNDP', 'Media outreach programs', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-030', 'Empowering Youth Leadership training - Strengthening the National Youth council coordination and advisory services', 'Leadership Development', 'National', 2023, 22, 0, 0, 'GIZ-PME', 'Empowering Youth Leadership training', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-031', 'YouthConnekt Gambia summit 3.0', 'Leadership Development', 'National', 2023, 300, 0, 0, 'UN Agencies, RICAR, NEDI, GCCI, and Gambia government', 'YouthConnekt Gambia summit 3.0', 'Completed');

-- 2024 Activities (14 activities, 15,145 total beneficiaries)
INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-032', 'Advocacy Meeting on Harmful Practices and Gender-Based Violence (GBV) with Government Authorities and Religious Leaders', 'Health & Wellness', 'Regional', 2024, 350, 0, 0, 'UNICEF', 'Advocacy Meeting on Harmful Practices and GBV', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-033', 'National Stakeholders Forum on the Position Paper of the Children National Assembly of the Gambia', 'Leadership Development', 'National', 2024, 63, 0, 0, 'UNICEF', 'National Stakeholders Forum on CNAG Position Paper', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-034', 'Open school day to discuss FGM and other harmful practices and violence against children (bullying) in schools and communities', 'Health & Wellness', 'Regional', 2024, 7950, 0, 0, 'UNICEF', 'Open school day to discuss FGM and harmful practices', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-035', 'Amendment of CNAG constitution and orientation on the constitution & standing order/provide capacity building and training for new CNAG members on leadership, and child rights and protection issues', 'Leadership Development', 'National', 2024, 105, 0, 0, 'UNICEF', 'Amendment of CNAG constitution and capacity building', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-036', 'Election of new CNAG Members', 'Leadership Development', 'Regional', 2024, 902, 0, 0, 'UNICEF', 'Election of new CNAG Members', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-037', 'Orientation of the Newly Elected CNAG Members', 'Leadership Development', 'National', 2024, 105, 0, 0, 'UNICEF', 'Orientation of Newly Elected CNAG Members', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-038', 'Community and youth champions training on safe migration in the Lower River & North Bank Regions', 'Skills Development', 'Regional', 2024, 1400, 0, 0, 'UNICEF', 'Community and youth champions training on safe migration', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-039', 'Sensitization caravan on migration and children on the move', 'Health & Wellness', 'Regional', 2024, 200, 0, 0, 'UNICEF', 'Sensitization caravan on migration', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-040', 'Validation Workshop - The Gambia National Action Plan on Youth, Peace, and Security', 'Leadership Development', 'National', 2024, 250, 0, 0, 'UNDP, UNFPA, & GIZ', 'Validation Workshop on National Action Plan', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-041', 'Regional Dialogue on Migration', 'Leadership Development', 'Regional', 2024, 120, 0, 0, 'KAS', 'Regional Dialogue on Migration', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-042', 'Constituency Consultation on the Development of the National Action Plan on Youth Peace and Security', 'Leadership Development', 'Constituency', 2024, 300, 0, 0, 'UNFPA', 'Constituency Consultation on National Action Plan', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-043', 'Empowering Youth and Adolescents: Sensitization on Children on the Move and Their Role in Supporting Service Providers and CCPCs', 'Skills Development', 'Regional', 2024, 600, 0, 0, 'UNICEF', 'Empowering Youth and Adolescents on Children on the Move', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-044', 'Caravan and Night Film Show Report', 'Arts & Culture', 'Regional', 2024, 300, 0, 0, 'UNICEF', 'Caravan and Night Film Show', 'Completed');

INSERT INTO nyc_activities (id, activity_name, category, region, year, beneficiaries, male, female, funding_partner, description, status) 
VALUES ('NYC-ACT-045', 'National Youth conference and festival, (NaYConF) 2024', 'Leadership Development', 'National', 2024, 2500, 0, 0, 'GAMBIA GOVERNMENT and The UN Systems', 'National Youth Conference and Festival 2024', 'Completed');
