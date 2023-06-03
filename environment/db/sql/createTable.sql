CREATE DATABASE IF NOT EXISTS neko;
USE neko;

CREATE TABLE IF NOT EXISTS groups (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `date` datetime,
    PRIMARY KEY (`id`)
);

INSERT INTO groups (name, description, date) VALUES ('第一回', '初めての開催です', NOW());