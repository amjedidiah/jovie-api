DROP TABLE IF EXISTS login;

CREATE TABLE login (
	ID serial PRIMARY KEY,
	hash VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	joined DATE NOT NULL DEFAULT CURRENT_DATE,
    last_login DATE DEFAULT CURRENT_DATE 
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	ID serial PRIMARY KEY,
	name VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	phone_number VARCHAR ( 255 ),
	gender VARCHAR ( 255 ),
	birthday DATE,
	following int NOT NULL,
	followers int NOT NULL,
	joined DATE NOT NULL DEFAULT CURRENT_DATE,
    last_login DATE DEFAULT CURRENT_DATE 
);

SELECT * FROM users

