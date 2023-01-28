CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username varchar(250) NOT NULL,
    password varchar(250) NOT NULL,
    email varchar(250) NOT NULL,
    role varchar(250) NOT NULL
)

CREATE TABLE IF NOT EXISTS cars(
    id SERIAL PRIMARY KEY,
    constructor varchar(250) NOT NULL,
    model varchar(250) NOT NULL,
    pricePerDay int NOT NULL,
)

CREATE TABLE IF NOT EXISTS reservations(
    id SERIAL PRIMARY KEY,
    customerId int NOT NULL,
    carId int NOT NULL,
    startDate date NOT NULL,
    endDate date NOT NULL,
)