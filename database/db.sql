-- table pastes
CREATE TABLE pastes (
    id VARCHAR(10) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- table global visits
CREATE TABLE visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    count INT DEFAULT 0
);