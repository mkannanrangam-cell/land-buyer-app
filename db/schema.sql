-- Schema for the Land Buyer Application
-- Matches the columns used by the server code (controllers/models) and the
-- DB_NAME configured in land-buyer-app/.env (landbuyer_db).

CREATE DATABASE IF NOT EXISTS landbuyer_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE landbuyer_db;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY username (username),
    UNIQUE KEY phone (phone)
) ENGINE=InnoDB;

-- Note: password reset works by matching the supplied username + phone against
-- this table; on a match the server issues a short-lived reset token and updates
-- password_hash. No SMS/OTP and no extra table needed.

CREATE TABLE IF NOT EXISTS buyers (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    sqft DECIMAL(12, 2) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    area VARCHAR(150) DEFAULT NULL,
    pincode VARCHAR(20) DEFAULT NULL,
    cost DECIMAL(14, 2) DEFAULT NULL,
    created_by INT DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY created_by (created_by),
    CONSTRAINT buyers_ibfk_1 FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB;
