CREATE DATABASE `ChatRoom`;

USE `ChatRoom`;

CREATE TABLE IF NOT EXISTS `User` (
  username VARCHAR(40) NOT NULL,
  password VARCHAR(20) NOT NULL,
  email VARCHAR(40) NOT NULL,
  PRIMARY KEY(username)
);

CREATE TABLE IF NOT EXISTS `Message` (
  username VARCHAR(40) NOT NULL,
  content VARCHAR(500) NOT NULL,
  sentTime BIGINT NOT NULL,
  randomId INT NOT NULL,
  PRIMARY KEY(username, sentTime, randomId),
  INDEX(sentTime, randomId)
);

