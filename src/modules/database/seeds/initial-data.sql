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
    'Admin1',
    'Apellido1',
    'admin1@example.com',
    '$2b$10$Dars2O5AR6zJTjoHLp8TJuzipG1O2PvNkNDlVelG6AnrVpmsGvEpu',
    '3000000000'
  );

-- Insert data into users table
INSERT INTO users (
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
  ('Otro Usuario1', 'Apellido1', 'nombre1@example.com', '$2b$10$uv0jgM9AbKnhfyfLxOJ1j.hsJOlJS8swTxvCGOyBayEpadGG8M7gG', '3000000000', TIMESTAMP '2024-03-16 09:37:37.711008', 4.9, NULL, 'active'),
  ('User2', 'Apellido2', 'nombre2@example.com', '$2b$10$.VNwGXPFe0rVPcgvvtgnwOi093j2GjEgHd.LCouH7HD6TQ209b9Xi', '3000000000', TIMESTAMP '2024-03-16 09:37:45.351266', 5.0, NULL, 'active'),
  ('User3', 'Apellido3', 'nombre3@example.com', '$2b$10$zEZKIQ8s5m8ZhF0/RL8hBurhCcMu3bftjhd6lvAE5Dls5rwHYdwwK', '3000000000', TIMESTAMP '2024-03-16 09:37:54.312011', 5.0, NULL, 'active'),
  ('User4', 'Apellido4', 'nombre4@example.com', '$2b$10$PPhqtB4BLfrL6egc9SwV6up8J7mIkfRZo82g.aVTEvoDLJFchtdCO', '3000000000', TIMESTAMP '2024-03-16 09:38:18.070783', 5.0, NULL, 'active'),
  ('User5', 'Apellido5', 'nombre5@example.com', '$2b$10$E8a7IwdrebPgz6624ESVIOhUF5OPYhKaj3J3BjojfX.ZcTEL1IbWW', '3000000000', TIMESTAMP '2024-03-16 09:38:27.213511', 5.0, NULL, 'active'),
  ('User6', 'Apellido6', 'nombre6@example.com', '$2b$10$S9s/APpekM3m3qvm1bFiF.qltvmYA1mveFfoI4ZOXQ4uJvIpm/xFC', '3000000000', TIMESTAMP '2024-03-16 09:38:37.587492', 4.8, NULL, 'active'),
  ('User7', 'Apellido7', 'nombre7@example.com', '$2b$10$vDF8oKYZLyAyv7BV.ciSHe42me8pCFrpR23JP7jT2n0Ma0wpr9hqC', '3000000000', TIMESTAMP '2024-03-16 09:38:48.283599', 4.9, NULL, 'active'),
  ('User8', 'Apellido8', 'nombre8@example.com', '$2b$10$wQUqB0i9HHBLlnMXVFqwkuZFShr4abdajoPiAGNKwCgsclQD.yETq', '3000000000', TIMESTAMP '2024-03-16 09:38:58.468061', 4.7, NULL, 'active'),
  ('User9', 'Apellido9', 'nombre9@example.com', '$2b$10$0MyxxdkFS8onRQcH.5tubuESGdJpuGRJnHdr5UlOcBQgLTQBRU1tO', '3000000000', TIMESTAMP '2024-03-16 09:39:07.625056', 5.0, NULL, 'active'),
  ('User10', 'Apellido10', 'nombre10@example.com', '$2b$10$mG11BU9mU9RglYFou/9JweK46KGjhAmbJcVqCOI67ZNPuvtFJPP6i', '3000000000', TIMESTAMP '2024-03-16 09:39:18.549872', 4.9, NULL, 'active');

-- Insert data into drivers table
INSERT INTO drivers (
    "firstName",
    "lastName",
    email,
    "phoneNumber",
    password,
    "licenseNumber",
    "averageRating",
    availability
)
VALUES
  ('Driver1', 'Apellido1', 'driver1@example.com', '3000000000', '$2b$10$6mGxIL2XN/OgVOo478lbCez/rUWH.qtGxPjYhPWheK/GEZHG6Voay', '189876447-21', 4.9, TRUE),
  ('Driver2', 'Apellido3', 'driver2@example.com', '3000000000', '$2b$10$NZMCjwGlNkGA4uipFCMZeOWZhFYGpxtNEZ/Os4gCH7tPON8VwVgk.', '289876447-21', 4.7, TRUE),
  ('Driver3', 'Apellido3', 'driver3@example.com', '3000000000', '$2b$10$gohUBzMr.hvYpIIPbxXDKuflj5RYUJcaJaP1bRO0Uk7kEtnQG.D.6', '389876447-21', 5.0, TRUE),
  ('Driver5', 'Apellido5', 'driver5@example.com', '3000000000', '$2b$10$8FMK9UHzCZlKLfU6MRLQl.Nv3eGYuOCWBf4g02RSoEQGsFElzs1HW', '589876447-21', 4.8, TRUE),
  ('Driver6', 'Apellido6', 'driver6@example.com', '3000000000', '$2b$10$KrMBufWUABBjAdvwhgJCAOhM7/N/rcEOkCKuHvxKFS7.qQ9bz4eSy', '689876447-21', 5.0, TRUE),
  ('Driver7', 'Apellido7', 'driver7@example.com', '3000000000', '$2b$10$c3FK8J2dopmM6iGPh1p95uUbE99KlhUajUAb6Ye5JmIfrtBsHNZAi', '789876447-21', 4.6, TRUE),
  ('Driver8', 'Apellido8', 'driver8@example.com', '3000000000', '$2b$10$Z/wn7LtZ9mg9YzH3r5sZxub7SrwjNUuxftCltLiHwbn3IGOwPeEfW', '889876447-21', 5.0, TRUE),
  ('Driver9', 'Apellido9', 'driver9@example.com', '3000000000', '$2b$10$iQ06aQtoIDoWmc1vr2pgnOOec9Z7sQs5STyyNS51ayWnJzUZfFQYm', '989876447-21', 4.6, FALSE),
  ('Driver10', 'Apellido19', 'driver10@example.com', '3000000000', '$2b$10$1eWxqxpaIDX2U4KgiZhjMO6oesTSTKaRNy2j3TBwx6IoCF8em7I/a', '1089876447-21', 4.9, FALSE),
  ('Driver4', 'Apellido4', 'driver4@example.com', '3000000000', '$2b$10$VBFLZWpiwELpixdOyfJQV.eLlGdQy62c9IXO04dmdShZSAo1YvYbG', '1489876447-21', 4.8, FALSE);


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
  (1, 6, 'Calle 1234, Ciudad C', 'Avenida 6789, Ciudad D', 13.83, 51.8, TIMESTAMP '2024-03-16 11:01:52.523815', NULL, 60, 'PENDING'),
  (2, 4, 'Calle 5506, Ciudad A', 'Avenida 1488, Ciudad B', 12.71, 119.62, TIMESTAMP '2024-03-16 11:02:04.664942', NULL, 46, 'PENDING'),
  (10, 3, 'Calle 1234, Ciudad C', 'Avenida 1488, Ciudad B', 16.77, 251.87, TIMESTAMP '2024-03-16 11:02:14.066535', NULL, 27, 'PENDING'),
  (6, 8, 'Calle 1520, Ciudad A', 'Avenida 1488, Ciudad B', 17.96, 63.54, TIMESTAMP '2024-03-16 11:06:37.219288', NULL, 56, 'COMPLETED'),
  (7, 1, 'Calle 1234, Ciudad C', 'Avenida 1488, Ciudad B', 8.73, 97.55, TIMESTAMP '2024-03-16 11:06:52.845893', NULL, 43, 'PENDING'),
  (7, 1, 'Calle 1234, Ciudad C', 'Avenida 1488, Ciudad B', 8.73, 97.55, TIMESTAMP '2024-03-16 11:08:22.107611', NULL, 43, 'PENDING'),
  (5, 3, 'Calle 1520, Ciudad A', 'Avenida 5012, Ciudad B', 11.65, 265.34, TIMESTAMP '2024-03-16 11:08:31.151379', NULL, 50, 'PENDING'),
  (1, 9, 'Calle 5506, Ciudad A', 'Avenida 5012, Ciudad B', 11.1, 170.34, TIMESTAMP '2024-03-16 11:08:39.395443', NULL, 40, 'PENDING'),
  (7, 3, 'Calle 5506, Ciudad A', 'Avenida 1488, Ciudad B', 18.9, 246.28, TIMESTAMP '2024-03-16 11:08:55.242621', NULL, 33, 'COMPLETED'),
  (8, 9, 'Calle 5506, Ciudad A', 'Avenida 5012, Ciudad B', 8.27, 64.62, TIMESTAMP '2024-03-16 11:09:14.307773', NULL, 49, 'COMPLETED'),
  (1, 6, 'Calle 5506, Ciudad A', 'Avenida 6789, Ciudad D', 12.54, 263.18, TIMESTAMP '2024-03-16 11:10:34.149239', NULL, 25, 'COMPLETED'),
  (3, 2, 'Calle 5506, Ciudad A', 'Avenida 6789, Ciudad D', 15.13, 108.8, TIMESTAMP '2024-03-16 11:10:43.59943', NULL, 22, 'PENDING'),
  (10, 4, 'Calle 1234, Ciudad C', 'Avenida 5012, Ciudad B', 6.23, 214.34, TIMESTAMP '2024-03-16 11:10:51.981104', NULL, 51, 'CANCELLED'),
  (4, 5, 'Calle 1234, Ciudad C', 'Avenida 6789, Ciudad D', 8.58, 148.95, TIMESTAMP '2024-03-16 11:11:00.012567', NULL, 57, 'COMPLETED'),
  (6, 8, 'Calle 5506, Ciudad A', 'Avenida 5012, Ciudad B', 14.32, 190.75, TIMESTAMP '2024-03-16 11:11:20.757037', NULL, 21, 'COMPLETED'),
  (9, 4, 'Calle 1520, Ciudad A', 'Avenida 5012, Ciudad B', 18.21, 269.82, TIMESTAMP '2024-03-16 11:11:29.796735', NULL, 38, 'COMPLETED'),
  (9, 8, 'Calle 1234, Ciudad C', 'Avenida 1488, Ciudad B', 19.76, 251.77, TIMESTAMP '2024-03-16 11:11:45.605005', NULL, 48, 'CANCELLED'),
  (5, 9, 'Calle 1234, Ciudad C', 'Avenida 5012, Ciudad B', 8.97, 272.43, TIMESTAMP '2024-03-16 11:11:53.426296', NULL, 50, 'PENDING'),
  (10, 5, 'Calle 5506, Ciudad A', 'Avenida 6789, Ciudad D', 8.05, 208.56, TIMESTAMP '2024-03-16 11:12:00.457087', NULL, 31, 'COMPLETED'),
  (1, 5, 'Calle 5506, Ciudad A', 'Avenida 6789, Ciudad D', 17.44, 61.02, TIMESTAMP '2024-03-16 11:12:09.62302', NULL, 36, 'COMPLETED'),
  (3, 5, 'Calle 1234, Ciudad C', 'Avenida 1488, Ciudad B', 15.59, 190.23, TIMESTAMP '2024-03-16 11:12:17.308286', NULL, 22, 'CANCELLED'),
  (1, 1, 'Calle 1001, Ciudad A', 'Avenida 2001, Ciudad B', 10.5, 151.5, TIMESTAMP '2024-03-16 11:18:56.427918', NULL, 21, 'COMPLETED'),
  (2, 2, 'Calle 1002, Ciudad A', 'Avenida 2002, Ciudad B', 11, 153, TIMESTAMP '2024-03-16 11:19:05.761517', NULL, 22, 'COMPLETED'),
  (6, 6, 'Calle 1016, Ciudad A', 'Avenida 2016, Ciudad B', 18, 174, TIMESTAMP '2024-03-16 11:19:16.210234', NULL, 36, 'COMPLETED'),
  (5, 6, 'Calle 1017, Ciudad A', 'Avenida 2017, Ciudad B', 19, 175, TIMESTAMP '2024-03-16 11:19:41.760417', NULL, 37, 'COMPLETED'),
  (4, 8, 'Calle 1018, Ciudad A', 'Avenida 2018, Ciudad B', 20, 176, TIMESTAMP '2024-03-16 11:19:56.654172', NULL, 38, 'COMPLETED'),
  (3, 9, 'Calle 1019, Ciudad A', 'Avenida 2019, Ciudad B', 21, 177, TIMESTAMP '2024-03-16 11:20:04.626784', NULL, 39, 'COMPLETED'),
  (2, 4, 'Calle 1020, Ciudad A', 'Avenida 2020, Ciudad B', 22, 178, TIMESTAMP '2024-03-16 11:20:22.157622', NULL, 40, 'COMPLETED'),
  (7, 5, 'Calle 1021, Ciudad A', 'Avenida 2021, Ciudad B', 19, 176, TIMESTAMP '2024-03-16 11:22:31.265238', NULL, 38, 'COMPLETED'),
  (8, 8, 'Calle 1022, Ciudad A', 'Avenida 2022, Ciudad B', 20, 178, TIMESTAMP '2024-03-16 11:22:42.508303', NULL, 40, 'COMPLETED'),
  (9, 9, 'Calle 1028, Ciudad A', 'Avenida 2028, Ciudad B', 28, 190, TIMESTAMP '2024-03-16 11:22:53.441305', NULL, 56, 'COMPLETED'),
  (10, 4, 'Calle 1029, Ciudad A', 'Avenida 2029, Ciudad B', 29, 192, TIMESTAMP '2024-03-16 11:23:12.078602', NULL, 58, 'COMPLETED'),
  (1, 1, 'Calle 1030, Ciudad A', 'Avenida 2030, Ciudad B', 30, 195, TIMESTAMP '2024-03-16 11:23:24.90827', NULL, 60, 'PENDING'),
  (3, 2, 'Calle 3031, Ciudad A', 'Avenida 4031, Ciudad B', 31, 310, TIMESTAMP '2024-03-16 11:24:58.347167', NULL, 62, 'PENDING'),
  (5, 4, 'Calle 3032, Ciudad A', 'Avenida 4032, Ciudad B', 32, 320, TIMESTAMP '2024-03-16 11:25:06.505897', NULL, 64, 'PENDING'),
  (2, 6, 'Calle 3033, Ciudad A', 'Avenida 4033, Ciudad B', 33, 330, TIMESTAMP '2024-03-16 11:25:15.571748', NULL, 66, 'PENDING'),
  (1, 8, 'Calle 3034, Ciudad A', 'Avenida 4034, Ciudad B', 34, 340, TIMESTAMP '2024-03-16 11:25:26.34491', NULL, 68, 'COMPLETED'),
  (4, 3, 'Calle 3035, Ciudad A', 'Avenida 4035, Ciudad B', 35, 350, TIMESTAMP '2024-03-16 11:25:36.449973', NULL, 70, 'COMPLETED'),
  (6, 5, 'Calle 3036, Ciudad A', 'Avenida 4036, Ciudad B', 36, 360, TIMESTAMP '2024-03-16 11:25:47.424576', NULL, 72, 'COMPLETED'),
  (8, 5, 'Calle 3037, Ciudad A', 'Avenida 4037, Ciudad B', 37, 370, TIMESTAMP '2024-03-16 11:26:03.22603', NULL, 74, 'COMPLETED'),
  (10, 9, 'Calle 3038, Ciudad A', 'Avenida 4038, Ciudad B', 38, 380, TIMESTAMP '2024-03-16 11:26:12.42042', NULL, 76, 'COMPLETED'),
  (9, 4, 'Calle 3039, Ciudad A', 'Avenida 4039, Ciudad B', 39, 390, TIMESTAMP '2024-03-16 11:26:33.834361', NULL, 78, 'COMPLETED'),
  (7, 1, 'Calle 3040, Ciudad A', 'Avenida 4040, Ciudad B', 40, 400, TIMESTAMP '2024-03-16 11:26:43.412978', NULL, 80, 'COMPLETED'),
  (6, 2, 'Calle 4041, Ciudad C', 'Avenida 5041, Ciudad D', 41, 410, TIMESTAMP '2024-03-16 11:28:05.738652', NULL, 82, 'COMPLETED'),
  (5, 4, 'Calle 4042, Ciudad C', 'Avenida 5042, Ciudad D', 42, 420, TIMESTAMP '2024-03-16 11:28:15.140157', NULL, 84, 'COMPLETED'),
  (3, 6, 'Calle 4043, Ciudad C', 'Avenida 5043, Ciudad D', 43, 430, TIMESTAMP '2024-03-16 11:28:23.604955', NULL, 86, 'COMPLETED'),
  (2, 8, 'Calle 4044, Ciudad C', 'Avenida 5044, Ciudad D', 44, 440, TIMESTAMP '2024-03-16 11:28:32.92775', NULL, 88, 'COMPLETED'),
  (1, 6, 'Calle 4045, Ciudad C', 'Avenida 5045, Ciudad D', 45, 450, TIMESTAMP '2024-03-16 11:28:50.544534', NULL, 90, 'COMPLETED'),
  (4, 1, 'Calle 4046, Ciudad C', 'Avenida 5046, Ciudad D', 46, 460, TIMESTAMP '2024-03-16 11:30:47.157994', NULL, 92, 'COMPLETED'),
  (7, 3, 'Calle 4047, Ciudad C', 'Avenida 5047, Ciudad D', 47, 470, TIMESTAMP '2024-03-16 11:30:55.430645', NULL, 94, 'COMPLETED'),
  (8, 5, 'Calle 4048, Ciudad C', 'Avenida 5048, Ciudad D', 48, 480, TIMESTAMP '2024-03-16 11:31:03.698361', NULL, 96, 'COMPLETED'),
  (9, 6, 'Calle 4049, Ciudad C', 'Avenida 5049, Ciudad D', 49, 490, TIMESTAMP '2024-03-16 11:31:26.073258', NULL, 98, 'COMPLETED'),
  (10, 9, 'Calle 4050, Ciudad C', 'Avenida 5050, Ciudad D', 50, 500, TIMESTAMP '2024-03-16 11:31:38.406361', NULL, 100, 'COMPLETED');
