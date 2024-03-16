INSERT INTO users (firstName, lastName, email, password, phoneNumber, registrationDate, averageRating, location) VALUES 
('Pedro', 'Moreno', 'usuario1@example.com', 'hashed_password', '1234567890', '2022-03-15', 4.5, 'Ciudad X'),
('Pepito', 'Perez', 'usuario2@example.com', 'hashed_password', '1234567890', '2022-03-16', 4.2, 'Ciudad Y'),

INSERT INTO drivers (firstName, lastName, email, password, phoneNumber, licenseNumber, averageRating, availability) VALUES 
('Juan', 'Gomez', 'conductor1@example.com', 'hashed_password', '0987654321', 'LIC123', 4.7, TRUE),
('Maria', 'Lopez', 'conductor2@example.com', 'hashed_password', '0987654321', 'LIC456', 4.8, FALSE),

INSERT INTO trips (userId, driverId, origin, destination, distance, fare, startDateTime, endDateTime, status) VALUES 
(1, 1, 'Origen 1', 'Destino 1', 10.5, 150, '2022-03-15 08:00:00', '2022-03-15 08:30:00', 'COMPLETED'),
(2, 2, 'Origen 2', 'Destino 2', 5.3, 80, '2022-03-16 09:00:00', '2022-03-16 09:20:00', 'COMPLETED'),
