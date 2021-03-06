CREATE DATABASE IF NOT EXISTS accounts;

CREATE TABLE IF NOT EXISTS `accounts`.`users` ( `id` INT(5) NOT NULL AUTO_INCREMENT ,  `username` VARCHAR(255) NOT NULL ,  `name` VARCHAR(512) NOT NULL ,  `email` VARCHAR(255) NOT NULL ,  `profile` LONGBLOB NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `accounts`.`sessions` ( `id` INT(5) NOT NULL AUTO_INCREMENT , `user_id` INT(5) NOT NULL , `session_id` VARCHAR(512) NOT NULL , `expiration` TIMESTAMP NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `accounts`.`follows` ( `followerid` INT(5) NOT NULL , `followingid` INT(5) NOT NULL, PRIMARY KEY (`followerid`, followingid)) ENGINE = InnoDB;
