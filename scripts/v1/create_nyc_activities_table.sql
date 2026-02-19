CREATE TABLE IF NOT EXISTS nyc_activities (
    id VARCHAR(255) PRIMARY KEY,
    activity_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    beneficiaries INT NOT NULL,
    male INT NOT NULL,
    female INT NOT NULL,
    funding_partner VARCHAR(255),
    description TEXT,
    status VARCHAR(255) NOT NULL
);
