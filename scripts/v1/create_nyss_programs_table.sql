CREATE TABLE IF NOT EXISTS nyss_programs (
    id SERIAL PRIMARY KEY,
    program_name VARCHAR(255) NOT NULL,
    institution VARCHAR(255),
    year INT NOT NULL,
    region VARCHAR(255),
    sector VARCHAR(255),
    total_graduates INT,
    male_graduates INT,
    female_graduates INT,
    employment_rate DECIMAL(5, 2)
);
