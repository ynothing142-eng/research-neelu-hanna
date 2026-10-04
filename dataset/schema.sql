-- =====================================================================
-- ResearchSphere Unified Academic Dataset Schema (MySQL Relational Dump)
-- Single source of truth across all 4 algorithmic phases
-- =====================================================================

CREATE DATABASE IF NOT EXISTS researchsphere;
USE researchsphere;

-- ---------------------------------------------------------------------
-- Table: researchers
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS researchers;
CREATE TABLE researchers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    institution VARCHAR(100) NOT NULL,
    publications INT NOT NULL DEFAULT 0,
    citations INT NOT NULL DEFAULT 0,
    year_joined INT NOT NULL DEFAULT 2020
);

INSERT INTO researchers (id, name, department, institution, publications, citations, year_joined) VALUES
(1, 'Hanna Neelu', 'Data Science', 'KJU', 8, 42, 2021),
(2, 'Arjun Kumar', 'Computer Science', 'KJU', 5, 27, 2023),
(3, 'Meera Sharma', 'Computer Science', 'KJU', 12, 61, 2019),
(4, 'Rahul Thomas', 'Data Science', 'KJU', 9, 35, 2020),
(5, 'Ishita Rao', 'Biotechnology', 'Bengaluru Institute', 3, 14, 2024),
(6, 'Vikram Das', 'Electronics', 'Bengaluru Institute', 7, 30, 2022),
(7, 'Nisha George', 'Computer Science', 'National Research Lab', 10, 52, 2018),
(8, 'Kabir Shah', 'Data Science', 'National Research Lab', 4, 18, 2023);

-- ---------------------------------------------------------------------
-- Table: posts (Academic Activity Feed)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    likes INT NOT NULL DEFAULT 0,
    author_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES researchers(id)
);

INSERT INTO posts (id, title, date, likes, author_id) VALUES
(1, 'Research Project Ideas', '2026-08-19', 12, 1),
(2, 'AI Workshop & Neural Networks', '2026-08-21', 28, 3),
(3, 'Data Science Discovery', '2026-08-24', 19, 4),
(4, 'Instrument Sharing Pilot', '2026-08-27', 35, 7),
(5, 'New Research Opportunity', '2026-09-02', 24, 2);

-- ---------------------------------------------------------------------
-- Table: requests (Laboratory Equipment Reservations)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS requests;
CREATE TABLE requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    instrument VARCHAR(100) NOT NULL,
    requester VARCHAR(100) NOT NULL,
    start_slot INT NOT NULL,
    end_slot INT NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending'
);

INSERT INTO requests (id, instrument, requester, start_slot, end_slot, status) VALUES
(1, 'GPU Workstation', 'Hanna Neelu', 1, 4, 'Approved'),
(2, 'GPU Workstation', 'Arjun Kumar', 3, 6, 'Pending'),
(3, '3D Printer', 'Ishita Rao', 2, 5, 'Pending'),
(4, '3D Printer', 'Kabir Shah', 6, 8, 'Approved'),
(5, 'Arduino Kit', 'Rahul Thomas', 4, 7, 'Rejected'),
(6, 'Spectrometer', 'Vikram Das', 5, 9, 'Pending');

-- ---------------------------------------------------------------------
-- Table: collaborations (Undirected Co-authorship Edges)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS collaborations;
CREATE TABLE collaborations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    researcher_1_id INT NOT NULL,
    researcher_2_id INT NOT NULL,
    FOREIGN KEY (researcher_1_id) REFERENCES researchers(id),
    FOREIGN KEY (researcher_2_id) REFERENCES researchers(id)
);

INSERT INTO collaborations (id, researcher_1_id, researcher_2_id) VALUES
(1, 1, 2), -- Hanna Neelu <-> Arjun Kumar
(2, 1, 4), -- Hanna Neelu <-> Rahul Thomas
(3, 2, 3), -- Arjun Kumar <-> Meera Sharma
(4, 3, 4), -- Meera Sharma <-> Rahul Thomas
(5, 4, 6), -- Rahul Thomas <-> Vikram Das
(6, 6, 7), -- Vikram Das <-> Nisha George
(7, 7, 8); -- Nisha George <-> Kabir Shah
