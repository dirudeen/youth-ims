CREATE TABLE IF NOT EXISTS youth_migration (
    id SERIAL PRIMARY KEY,
    year VARCHAR(4) NOT NULL,
    total INT NOT NULL,
    male INT NOT NULL,
    female INT NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL
);
