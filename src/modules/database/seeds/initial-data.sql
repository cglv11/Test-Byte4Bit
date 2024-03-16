-- Create the users table
CREATE TABLE
  IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    "phoneNumber" VARCHAR(20),
    "registrationDate" TIMESTAMP,
    "averageRating" DECIMAL(2, 1) DEFAULT 0.0,
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state BOOLEAN DEFAULT TRUE
  );

-- Create the drivers table
CREATE TABLE
  IF NOT EXISTS drivers (
    id SERIAL PRIMARY KEY,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    "phoneNumber" VARCHAR(20),
    "licenseNumber" VARCHAR(50) UNIQUE,
    "averageRating" DECIMAL(2, 1) DEFAULT 0.0,
    availability BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state BOOLEAN DEFAULT TRUE
  );

-- Create the admins table
CREATE TABLE
  IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    "phoneNumber" VARCHAR(20),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state BOOLEAN DEFAULT TRUE
  );

-- Create the trips table
CREATE TABLE
  IF NOT EXISTS trips (
    id SERIAL PRIMARY KEY,
    "userId" INT,
    "driverId" INT,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    distance DECIMAL NOT NULL,
    fare DECIMAL NOT NULL,
    "startDateTime" TIMESTAMP NOT NULL,
    "endDateTime" TIMESTAMP,
    duration INT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    state BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY ("userId") REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY ("driverId") REFERENCES drivers (id) ON DELETE SET NULL
  );

-- Insert data into admins table
INSERT INTO
  admins (
    "firstName",
    "lastName",
    email,
    password,
    "phoneNumber"
  )
VALUES
  (
    'Admin',
    'User',
    'admin@example.com',
    'admin_password',
    '3122320158'
  );

-- Insert data into users table
INSERT INTO
  users (
    "firstName",
    "lastName",
    email,
    password,
    "phoneNumber",
    "registrationDate",
    "averageRating",
    location,
    status
  )
VALUES
  (
    'Pedro',
    'Moreno',
    'usuario1@example.com',
    'hashed_password',
    '1234567890',
    TIMESTAMP '2022-03-15',
    4.5,
    'Ciudad X',
    'ACTIVE'
  ),
  (
    'Pepito',
    'Perez',
    'usuario2@example.com',
    'hashed_password',
    '1234567890',
    TIMESTAMP '2022-03-16',
    4.2,
    'Ciudad Y',
    'ACTIVE'
  );

-- Insert data into drivers table
INSERT INTO
  drivers (
    "firstName",
    "lastName",
    email,
    password,
    "phoneNumber",
    "licenseNumber",
    "averageRating",
    availability
  )
VALUES
  (
    'Juan',
    'Gomez',
    'conductor1@example.com',
    'hashed_password',
    '0987654321',
    'LIC123',
    4.7,
    TRUE
  ),
  (
    'Maria',
    'Lopez',
    'conductor2@example.com',
    'hashed_password',
    '0987654321',
    'LIC456',
    4.8,
    FALSE
  );

-- Insert data into trips table
INSERT INTO
  trips (
    "userId",
    "driverId",
    origin,
    destination,
    distance,
    fare,
    "startDateTime",
    "endDateTime",
    duration,
    status
  )
VALUES
  (
    1,
    1,
    'Origen 1',
    'Destino 1',
    10.5,
    150,
    TIMESTAMP '2022-03-15 08:00:00',
    TIMESTAMP '2022-03-15 08:30:00',
    30,
    'COMPLETED'
  ),
  (
    2,
    2,
    'Origen 2',
    'Destino 2',
    5.3,
    80,
    TIMESTAMP '2022-03-16 09:00:00',
    TIMESTAMP '2022-03-16 09:20:00',
    20,
    'COMPLETED'
  );