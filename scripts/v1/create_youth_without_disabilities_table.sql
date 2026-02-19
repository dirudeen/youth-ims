CREATE TABLE IF NOT EXISTS youth_without_disabilities (
    id SERIAL PRIMARY KEY,
    age_group VARCHAR(255) NOT NULL,
    total INT NOT NULL,
    male INT NOT NULL,
    female INT NOT NULL,
    urban INT NOT NULL,
    rural INT NOT NULL
);
