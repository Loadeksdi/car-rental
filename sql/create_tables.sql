CREATE TYPE roleType AS ENUM ('customer', 'agent');
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

-- CREATE TABLE IF NOT EXISTS reservations(
--     id SERIAL PRIMARY KEY,
--     userId int NOT NULL,
--     offerId int NOT NULL,
--     start_date DATE NOT NULL,
--     end_date DATE NOT NULL,
--     FOREIGN KEY (offerId) REFERENCES rental_offers(id),
--     FOREIGN KEY (userId) REFERENCES users(id)
-- );

CREATE TABLE offers (
  id SERIAL PRIMARY KEY,
  carid INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  dailyprice DECIMAL(10,2) NOT NULL
);