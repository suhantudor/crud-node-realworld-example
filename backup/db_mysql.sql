﻿--
-- Script was generated by Devart dbForge Studio 2020 for MySQL, Version 9.0.791.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 8/11/2022 7:30:11 PM
-- Server version: 8.0.30
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE db_mysql;

--
-- Drop table `devices`
--
DROP TABLE IF EXISTS devices;

--
-- Drop table `users`
--
DROP TABLE IF EXISTS users;

--
-- Set default database
--
USE db_mysql;

--
-- Create table `users`
--
CREATE TABLE users (
  _id varchar(255) DEFAULT NULL,
  role varchar(255) DEFAULT NULL,
  createdAt varchar(255) DEFAULT NULL,
  updatedAt varchar(255) DEFAULT NULL,
  confirmedAt varchar(255) DEFAULT NULL,
  firstName varchar(255) DEFAULT NULL,
  lastName varchar(255) DEFAULT NULL,
  phoneNumber varchar(255) DEFAULT NULL,
  email varchar(50) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  gender varchar(255) DEFAULT NULL,
  age varchar(255) DEFAULT NULL,
  dateOfBirth varchar(255) DEFAULT NULL,
  nationality varchar(255) DEFAULT NULL,
  color varchar(255) DEFAULT NULL,
  maritalStatus varchar(255) DEFAULT NULL,
  avatar varchar(255) DEFAULT NULL,
  notification varchar(255) DEFAULT NULL,
  language varchar(255) DEFAULT NULL,
  theme varchar(255) DEFAULT NULL,
  isDeleted tinyint(1) DEFAULT NULL,
  isSuspended tinyint(1) DEFAULT NULL
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

--
-- Create table `devices`
--
CREATE TABLE devices (
  _id varchar(255) NOT NULL DEFAULT '',
  createdAt varchar(255) DEFAULT NULL,
  updatedAt varchar(255) DEFAULT NULL,
  userId varchar(255) DEFAULT NULL,
  buildId varchar(255) DEFAULT NULL,
  buildNumber varchar(255) DEFAULT NULL,
  brand varchar(255) DEFAULT NULL,
  deviceId varchar(255) DEFAULT NULL,
  device varchar(255) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  ipAddress varchar(255) DEFAULT NULL,
  manufacturer varchar(255) DEFAULT NULL,
  platform varchar(255) DEFAULT NULL,
  model varchar(255) DEFAULT NULL,
  serial varchar(255) DEFAULT NULL,
  uniqueId varchar(255) DEFAULT NULL,
  isLogged tinyint(1) DEFAULT NULL,
  PRIMARY KEY (_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

--
-- Create index `UK_devices_deviceId` on table `devices`
--
ALTER TABLE devices
ADD UNIQUE INDEX UK_devices_deviceId (deviceId);

-- 
-- Dumping data for table users
--
INSERT INTO users VALUES
('user_dYg-xotNzDOHx2yqDVNSu', NULL, '1660235396033', NULL, NULL, 'Joe', 'Shmoe', '987211212', 'oeshmoe@gmail.com', 'qwerty', 'Male', '24', '18 Jan 1989', 'Unknown', 'White', 'Married', 'avatar_id', 'notification_id', 'English', 'Black', 0, 0);

-- 
-- Dumping data for table devices
--
INSERT INTO devices VALUES
('device_MO3TWHTfFygF_UnoDefn6', '1660234858610', NULL, 'user_id123456789', '13D15', '89', 'Samsung', 'goldfish', 'walleye', 'Joe Shmoe''s Samsung', '92.168.32.44', 'Samsung', 'Android', 'X10', '0398TF65SD531029', 'dd96dec43fb81c97', 1);

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;