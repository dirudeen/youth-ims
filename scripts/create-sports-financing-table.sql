-- Create sports financing table
CREATE TABLE IF NOT EXISTS sports_financing (
  id VARCHAR PRIMARY KEY,
  association_name VARCHAR NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  year INTEGER NOT NULL,
  period VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE sports_financing ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY sports_financing_select_authenticated ON sports_financing
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY sports_financing_insert_editors ON sports_financing
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'data_entry')
    )
  );

CREATE POLICY sports_financing_update_editors ON sports_financing
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'data_entry')
    )
  );

CREATE POLICY sports_financing_delete_editors ON sports_financing
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'data_entry')
    )
  );
