CREATE TABLE IF NOT EXISTS registered_youth_orgs (
    id SERIAL PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL,
    acronym VARCHAR(255),
    date_established VARCHAR(255),
    intervention_area TEXT,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    contact_no VARCHAR(255),
    region VARCHAR(255)
);
