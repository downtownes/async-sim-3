CREATE TABLE users
(id SERIAL PRIMARY KEY,
username VARCHAR(40),
auth_id TEXT,
firstName VARCHAR(40),
lastName VARCHAR(40),
hairColor VARCHAR(20),
eyeColor VARCHAR(20),
gender VARCHAR(20),
hobby VARCHAR(40),
birthDay INTEGER,
birthMonth VARCHAR(20),
birthYear INTEGER,
profilePic TEXT
)