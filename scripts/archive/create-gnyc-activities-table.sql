-- Create GNYC Activities table
CREATE TABLE IF NOT EXISTS gnyc_activities (
  id TEXT PRIMARY KEY,
  activity_name TEXT NOT NULL,
  category TEXT NOT NULL,
  region TEXT NOT NULL,
  year INTEGER NOT NULL,
  beneficiaries INTEGER DEFAULT 0,
  male INTEGER DEFAULT 0,
  female INTEGER DEFAULT 0,
  funding_partner TEXT,
  description TEXT,
  status TEXT CHECK (status IN ('Completed', 'Ongoing', 'Planned'))
);

-- Enable RLS
ALTER TABLE gnyc_activities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "gnyc_activities_select_authenticated" ON gnyc_activities
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "gnyc_activities_insert_editors" ON gnyc_activities
  FOR INSERT TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'editor')
    )
  );

CREATE POLICY "gnyc_activities_update_editors" ON gnyc_activities
  FOR UPDATE TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'editor')
    )
  );

CREATE POLICY "gnyc_activities_delete_editors" ON gnyc_activities
  FOR DELETE TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'editor')
    )
  );
