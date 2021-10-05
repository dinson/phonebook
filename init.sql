CREATE DATABASE IF NOT EXISTS db_phonebook;

CREATE TABLE IF NOT EXISTS db_phonebook.contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS db_phonebook.numbers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT NOT NULL,
    contact_number BIGINT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

