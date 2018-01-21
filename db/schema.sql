create database project2_dev;
use project2_dev;

create table users (
uid INT AUTO_INCREMENT NOT NULL,
username VARCHAR(32) NOT NULL,
pass VARCHAR(128) not null,
points INT DEFAULT 0,
role VARCHAR(32) DEFAULT 'User',
PRIMARY KEY (UID)
);

create table pages (
pid INT AUTO_INCREMENT NOT NULL,
createdBy INT NOT NULL,
createdAt DATETIME not null,
name VARCHAR(256) NOT NULL,
description TEXT,
side_1 VARCHAR(128) DEFAULT 'Yes',
side_2 VARCHAR(128) DEFAULT 'No',
PRIMARY KEY (pid)
);

create table comments (
pid INT NOT NULL,
uid INT NOT NULL,
createdAt DATETIME not null,
text TEXT NOT NULL,
side INT DEFAULT 1,
points INT DEFAULT 0,
reportFLg BOOLEAN Default false,
parentID INT default null,
PRIMARY KEY (pid, uid, createdAt),
FOREIGN KEY (pid) references pages(pid) on delete CASCADE,
FOREIGN KEY (uid) references users(uid) on delete CASCADE
);