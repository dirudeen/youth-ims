CREATE TABLE IF NOT EXISTS human_trafficking (
    id SERIAL PRIMARY KEY,
    year VARCHAR(4) NOT NULL,
    total INT NOT NULL,
    male INT NOT NULL,
    female INT NOT NULL,
    age_group VARCHAR(255) NOT NULL,
    lga VARCHAR(255) NOT NULL
);
