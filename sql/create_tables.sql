CREATE TYPE role AS ENUM ('customer', 'agent');
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username varchar(250) NOT NULL,
    password varchar(250) NOT NULL,
    email varchar(250) NOT NULL UNIQUE,
    userrole role NOT NULL
);

CREATE TABLE IF NOT EXISTS cars(
    id SERIAL PRIMARY KEY,
    constructorName varchar(250) NOT NULL,
    model varchar(250) NOT NULL,
    pricePerDay int NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations(
    id SERIAL PRIMARY KEY,
    customerId int NOT NULL,
    carId int NOT NULL,
    startDate date NOT NULL,
    endDate date NOT NULL,
    FOREIGN KEY (customerId) REFERENCES users(id),
    FOREIGN KEY (carId) REFERENCES cars(id)
);