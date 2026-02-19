CREATE TABLE IF NOT EXISTS youth_population (
    id SERIAL PRIMARY KEY,
    lga VARCHAR(255) NOT NULL,
    total_population INT NOT NULL,
    youth_population INT NOT NULL,
    youth_share DECIMAL(5, 2) NOT NULL,
    male_youth INT NOT NULL,
    female_youth INT NOT NULL,
    urban_youth INT NOT NULL,
    rural_youth INT NOT NULL
);
