CREATE DATABASE challenge3;

CREATE TABLE refreshTokens (
    id INT AUTO_INCREMENT NOT NULL, 
    refreshToken VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    PRIMARY KEY (username)
);