CREATE TABLE IF NOT EXISTS nyss_graduates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    training_program VARCHAR(255) NOT NULL,
    graduation_year VARCHAR(4) NOT NULL,
    employment_status VARCHAR(255) NOT NULL,
    sector VARCHAR(255) NOT NULL
);
