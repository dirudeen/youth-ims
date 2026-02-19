-- Create PIA student data table
CREATE TABLE IF NOT EXISTS pia_students (
  id VARCHAR PRIMARY KEY,
  department VARCHAR NOT NULL,
  year VARCHAR NOT NULL,
  male INTEGER DEFAULT 0,
  female INTEGER DEFAULT 0,
  enrolled INTEGER NOT NULL,
  graduated INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pia_students ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY pia_students_select_authenticated ON pia_students
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY pia_students_insert_editors ON pia_students
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'data_entry')
    )
  );

CREATE POLICY pia_students_update_editors ON pia_students
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'data_entry')
    )
  );

CREATE POLICY pia_students_delete_editors ON pia_students
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'data_entry')
    )
  );

-- Insert PIA student data
INSERT INTO pia_students (id, department, year, male, female, enrolled, graduated) VALUES
-- Tailoring & Fashion Design
('PIA-001', 'Tailoring & Fashion Design', '2023-2024', 1, 46, 47, 45),
('PIA-002', 'Tailoring & Fashion Design', '2024-2025', 1, 36, 37, 34),
('PIA-003', 'Tailoring & Fashion Design', '2025-2026', 1, 28, 29, 29),

-- Auto Mechanics
('PIA-004', 'Auto Mechanics', '2023-2024', 37, 0, 37, 24),
('PIA-005', 'Auto Mechanics', '2024-2025', 32, 1, 33, 30),
('PIA-006', 'Auto Mechanics', '2025-2026', 20, 0, 20, 0),

-- Metal Work
('PIA-007', 'Metal Work', '2023-2024', 4, 0, 4, 3),
('PIA-008', 'Metal Work', '2024-2025', 2, 0, 2, 0),
('PIA-009', 'Metal Work', '2025-2026', 3, 0, 3, 0),

-- Carpentry
('PIA-010', 'Carpentry', '2023-2024', 7, 0, 7, 5),
('PIA-011', 'Carpentry', '2024-2025', 4, 0, 4, 4),
('PIA-012', 'Carpentry', '2025-2026', 6, 0, 6, 0),

-- Plumbing
('PIA-013', 'Plumbing', '2023-2024', 14, 1, 15, 10),
('PIA-014', 'Plumbing', '2024-2025', 12, 0, 7, 7),
('PIA-015', 'Plumbing', '2025-2026', 13, 0, 13, 0),

-- Construction
('PIA-016', 'Construction', '2024-2025', 4, 0, 4, 4),
('PIA-017', 'Construction', '2025-2026', 7, 0, 7, 0),

-- Electrical
('PIA-018', 'Electrical', '2023-2024', 35, 1, 36, 30),
('PIA-019', 'Electrical', '2024-2025', 17, 1, 18, 18),
('PIA-020', 'Electrical', '2025-2026', 32, 3, 35, 0),

-- Hair Dressing
('PIA-021', 'Hair Dressing', '2023-2024', 0, 16, 16, 16),
('PIA-022', 'Hair Dressing', '2024-2025', 0, 23, 23, 14),
('PIA-023', 'Hair Dressing', '2025-2026', 0, 12, 12, 0),

-- Home Science
('PIA-024', 'Home Science', '2023-2024', 1, 26, 27, 24),
('PIA-025', 'Home Science', '2024-2025', 2, 39, 41, 32),
('PIA-026', 'Home Science', '2025-2026', 0, 36, 36, 0);
