-- Create registered youth organizations table
CREATE TABLE IF NOT EXISTS registered_youth_orgs (
    id VARCHAR(50) PRIMARY KEY,
    organization_name TEXT NOT NULL,
    acronym TEXT,
    date_established TEXT,
    intervention_area TEXT,
    contact_person TEXT,
    email TEXT,
    contact_no TEXT,
    region TEXT NOT NULL,
    registered_with TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries by region
CREATE INDEX IF NOT EXISTS idx_registered_youth_orgs_region ON registered_youth_orgs(region);
CREATE INDEX IF NOT EXISTS idx_registered_youth_orgs_registered_with ON registered_youth_orgs(registered_with);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_registered_youth_orgs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER registered_youth_orgs_updated_at
    BEFORE UPDATE ON registered_youth_orgs
    FOR EACH ROW
    EXECUTE FUNCTION update_registered_youth_orgs_updated_at();
