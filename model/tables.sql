CREATE DATABASE `ChatRoom`;

USE `ChatRoom`;

CREATE TABLE IF NOT EXISTS `User` (
  username VARCHAR(40) NOT NULL,
  password VARCHAR(20) NOT NULL,
  email VARCHAR(40) NOT NULL,
  PRIMARY KEY (username)
)
