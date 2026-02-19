CREATE TABLE IF NOT EXISTS indicator_data (
    id VARCHAR(255) PRIMARY KEY,
    organization VARCHAR(255) NOT NULL,
    indicator TEXT NOT NULL,
    year INT NOT NULL,
    region VARCHAR(255) NOT NULL,
    male INT NOT NULL,
    female INT NOT NULL,
    total INT NOT NULL,
    reference_source VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL
);
