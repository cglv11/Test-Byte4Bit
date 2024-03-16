-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phoneNumber VARCHAR(20),
    registrationDate DATE,
    averageRating DECIMAL,
    location VARCHAR(255)
);

-- Create the drivers table
CREATE TABLE IF NOT EXISTS drivers (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phoneNumber VARCHAR(20),
    licenseNumber VARCHAR(50),
    averageRating DECIMAL,
    availability BOOLEAN
);

-- Create the trips table
CREATE TABLE IF NOT EXISTS trips (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id),
    driverId INT REFERENCES drivers(id),
    origin VARCHAR(255),
    destination VARCHAR(255),
    distance DECIMAL,
    fare DECIMAL,
    startDateTime TIMESTAMP,
    endDateTime TIMESTAMP,
    status VARCHAR(50)
);

-- Create the admins table
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phoneNumber VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state BOOLEAN DEFAULT TRUE
);

-- Insert data into admins table
INSERT INTO admins (firstName, lastName, email, password, phoneNumber, state) VALUES 
('Admin', 'User', 'admin@example.com', 'admin_password', '3122320158', TRUE);

-- Insert data into users table
INSERT INTO users (firstName, lastName, email, password, phoneNumber, registrationDate, averageRating, location) VALUES 
('Pedro', 'Moreno', 'usuario1@example.com', 'hashed_password', '1234567890', '2022-03-15', 4.5, 'Ciudad X'),
('Pepito', 'Perez', 'usuario2@example.com', 'hashed_password', '1234567890', '2022-03-16', 4.2, 'Ciudad Y');

-- Insert data into drivers table
INSERT INTO drivers (firstName, lastName, email, password, phoneNumber, licenseNumber, averageRating, availability) VALUES 
('Juan', 'Gomez', 'conductor1@example.com', 'hashed_password', '0987654321', 'LIC123', 4.7, TRUE),
('Maria', 'Lopez', 'conductor2@example.com', 'hashed_password', '0987654321', 'LIC456', 4.8, FALSE);

-- Insert data into trips table
INSERT INTO trips (userId, driverId, origin, destination, distance, fare, startDateTime, endDateTime, status) VALUES 
(1, 1, 'Origen 1', 'Destino 1', 10.5, 150, '2022-03-15 08:00:00', '2022-03-15 08:30:00', 'COMPLETED'),
(2, 2, 'Origen 2', 'Destino 2', 5.3, 80, '2022-03-16 09:00:00', '2022-03-16 09:20:00', 'COMPLETED');
