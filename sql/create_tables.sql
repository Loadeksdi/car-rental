CREATE TYPE roleType AS ENUM ('customer', 'agent');
-- CREATE TYPE statusType AS ENUM('pending', 'confirmed');

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username varchar(250) NOT NULL,
    password varchar(250) NOT NULL,
    email varchar(250) NOT NULL UNIQUE,
    role roleType NOT NULL
);

CREATE TABLE IF NOT EXISTS cars(
    id SERIAL PRIMARY KEY,
    constructorName varchar(250) NOT NULL,
    model varchar(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS offers (
  id SERIAL PRIMARY KEY,
  carid INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  dailyPrice DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (carid) REFERENCES cars(id)
);

CREATE TABLE IF NOT EXISTS bookings(
    id SERIAL PRIMARY KEY,
    userId int NOT NULL,
    offerId int NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (offerId) REFERENCES offers(id)
);