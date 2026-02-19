-- Add Row Level Security policies to all existing tables
-- This ensures data is protected based on user roles

-- Helper function to check if user is admin or data_entry_clerk
CREATE OR REPLACE FUNCTION public.can_edit_data()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() 
    AND role IN ('admin', 'data_entry_clerk')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is authenticated
CREATE OR REPLACE FUNCTION public.is_authenticated()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- NYC Activities Table
ALTER TABLE nyc_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nyc_activities_select_authenticated"
  ON nyc_activities FOR SELECT
  USING (is_authenticated());

CREATE POLICY "nyc_activities_insert_editors"
  ON nyc_activities FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "nyc_activities_update_editors"
  ON nyc_activities FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "nyc_activities_delete_editors"
  ON nyc_activities FOR DELETE
  USING (can_edit_data());

-- NSC Participants Table
ALTER TABLE nsc_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nsc_participants_select_authenticated"
  ON nsc_participants FOR SELECT
  USING (is_authenticated());

CREATE POLICY "nsc_participants_insert_editors"
  ON nsc_participants FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "nsc_participants_update_editors"
  ON nsc_participants FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "nsc_participants_delete_editors"
  ON nsc_participants FOR DELETE
  USING (can_edit_data());

-- NYSS Programs Table
ALTER TABLE nyss_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nyss_programs_select_authenticated"
  ON nyss_programs FOR SELECT
  USING (is_authenticated());

CREATE POLICY "nyss_programs_insert_editors"
  ON nyss_programs FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "nyss_programs_update_editors"
  ON nyss_programs FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "nyss_programs_delete_editors"
  ON nyss_programs FOR DELETE
  USING (can_edit_data());

-- NYSS Graduates Table
ALTER TABLE nyss_graduates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nyss_graduates_select_authenticated"
  ON nyss_graduates FOR SELECT
  USING (is_authenticated());

CREATE POLICY "nyss_graduates_insert_editors"
  ON nyss_graduates FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "nyss_graduates_update_editors"
  ON nyss_graduates FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "nyss_graduates_delete_editors"
  ON nyss_graduates FOR DELETE
  USING (can_edit_data());

-- Registered Youth Orgs Table
ALTER TABLE registered_youth_orgs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "registered_youth_orgs_select_authenticated"
  ON registered_youth_orgs FOR SELECT
  USING (is_authenticated());

CREATE POLICY "registered_youth_orgs_insert_editors"
  ON registered_youth_orgs FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "registered_youth_orgs_update_editors"
  ON registered_youth_orgs FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "registered_youth_orgs_delete_editors"
  ON registered_youth_orgs FOR DELETE
  USING (can_edit_data());

-- Indicator Data Table
ALTER TABLE indicator_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "indicator_data_select_authenticated"
  ON indicator_data FOR SELECT
  USING (is_authenticated());

CREATE POLICY "indicator_data_insert_editors"
  ON indicator_data FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "indicator_data_update_editors"
  ON indicator_data FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "indicator_data_delete_editors"
  ON indicator_data FOR DELETE
  USING (can_edit_data());

-- Human Trafficking Table
ALTER TABLE human_trafficking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "human_trafficking_select_authenticated"
  ON human_trafficking FOR SELECT
  USING (is_authenticated());

CREATE POLICY "human_trafficking_insert_editors"
  ON human_trafficking FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "human_trafficking_update_editors"
  ON human_trafficking FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "human_trafficking_delete_editors"
  ON human_trafficking FOR DELETE
  USING (can_edit_data());

-- Youth Migration Table
ALTER TABLE youth_migration ENABLE ROW LEVEL SECURITY;

CREATE POLICY "youth_migration_select_authenticated"
  ON youth_migration FOR SELECT
  USING (is_authenticated());

CREATE POLICY "youth_migration_insert_editors"
  ON youth_migration FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "youth_migration_update_editors"
  ON youth_migration FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "youth_migration_delete_editors"
  ON youth_migration FOR DELETE
  USING (can_edit_data());

-- Youth Population Table
ALTER TABLE youth_population ENABLE ROW LEVEL SECURITY;

CREATE POLICY "youth_population_select_authenticated"
  ON youth_population FOR SELECT
  USING (is_authenticated());

CREATE POLICY "youth_population_insert_editors"
  ON youth_population FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "youth_population_update_editors"
  ON youth_population FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "youth_population_delete_editors"
  ON youth_population FOR DELETE
  USING (can_edit_data());

-- Youth with Disabilities Table
ALTER TABLE youth_with_disabilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "youth_with_disabilities_select_authenticated"
  ON youth_with_disabilities FOR SELECT
  USING (is_authenticated());

CREATE POLICY "youth_with_disabilities_insert_editors"
  ON youth_with_disabilities FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "youth_with_disabilities_update_editors"
  ON youth_with_disabilities FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "youth_with_disabilities_delete_editors"
  ON youth_with_disabilities FOR DELETE
  USING (can_edit_data());

-- Youth without Disabilities Table
ALTER TABLE youth_without_disabilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "youth_without_disabilities_select_authenticated"
  ON youth_without_disabilities FOR SELECT
  USING (is_authenticated());

CREATE POLICY "youth_without_disabilities_insert_editors"
  ON youth_without_disabilities FOR INSERT
  WITH CHECK (can_edit_data());

CREATE POLICY "youth_without_disabilities_update_editors"
  ON youth_without_disabilities FOR UPDATE
  USING (can_edit_data());

CREATE POLICY "youth_without_disabilities_delete_editors"
  ON youth_without_disabilities FOR DELETE
  USING (can_edit_data());
