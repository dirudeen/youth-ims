CREATE TABLE IF NOT EXISTS nsc_participants (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    sport VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    achievements TEXT,
    date_registered VARCHAR(255) NOT NULL,
    contact VARCHAR(255)
);
