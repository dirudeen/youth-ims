-- Create NEDI Programs table
CREATE TABLE IF NOT EXISTS nedi_programs (
  id TEXT PRIMARY KEY,
  program_name TEXT NOT NULL,
  target_group TEXT NOT NULL,
  beneficiaries INTEGER DEFAULT 0,
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  location TEXT NOT NULL,
  male_participants INTEGER,
  female_participants INTEGER,
  start_date TEXT NOT NULL,
  end_date TEXT,
  implementing_partner TEXT,
  funding_source TEXT
);

-- Enable RLS
ALTER TABLE nedi_programs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "nedi_programs_select_authenticated" ON nedi_programs
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "nedi_programs_insert_editors" ON nedi_programs
  FOR INSERT TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'editor')
    )
  );

CREATE POLICY "nedi_programs_update_editors" ON nedi_programs
  FOR UPDATE TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'editor')
    )
  );

CREATE POLICY "nedi_programs_delete_editors" ON nedi_programs
  FOR DELETE TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'editor')
    )
  );
