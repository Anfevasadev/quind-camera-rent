CREATE TABLE repair_services (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    iso INT CHECK (iso IN (50, 100, 200, 400, 800, 1600)),
    format VARCHAR(10) CHECK (format IN ('35mm', '110mm', '120mm'))
);

CREATE TABLE cameras (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    has_flash BOOLEAN NOT NULL
);

CREATE TABLE items (
    reference VARCHAR(50) PRIMARY KEY,
    type VARCHAR(10) CHECK (type IN ('camera', 'film')) NOT NULL,
    state VARCHAR(20) CHECK (state IN ('available', 'rented', 'delayed', 'under_repair')) DEFAULT 'available',
    camera_id INT REFERENCES cameras(id) ON DELETE CASCADE,
    film_id INT REFERENCES films(id) ON DELETE CASCADE
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    banned_until DATE DEFAULT NULL,
    rented_camera_reference VARCHAR(50) UNIQUE REFERENCES items(reference) ON DELETE SET NULL
);

CREATE TABLE rentals (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
    item_reference VARCHAR(50) REFERENCES items(reference) ON DELETE CASCADE,
    rental_date DATE NOT NULL,
    return_date DATE NOT NULL,
    late_days INT DEFAULT 0
);

INSERT INTO repair_services (brand, address)
VALUES 
    ('Canon', '123 Main St, City A'),
    ('Nikon', '456 Elm St, City B'),
    ('Fujifilm', '789 Oak St, City C');

INSERT INTO films (brand, name, iso, format)
VALUES 
    ('Kodak', 'Portra 400', 400, '35mm'),
    ('Fujifilm', 'Velvia 50', 50, '120mm'),
    ('Ilford', 'HP5 Plus', 400, '35mm');

INSERT INTO cameras (brand, model, has_flash)
VALUES 
    ('Canon', 'AE-1', TRUE),
    ('Nikon', 'FM2', FALSE),
    ('Fujifilm', 'X-T2', TRUE);

INSERT INTO items (reference, type, state, camera_id)
VALUES 
    ('CAM001', 'camera', 'available', 1),
    ('CAM002', 'camera', 'available', 2),
    ('CAM003', 'camera', 'under_repair', 3);

INSERT INTO items (reference, type, state, film_id)
VALUES 
    ('FILM001', 'film', 'available', 1),
    ('FILM002', 'film', 'available', 2),
    ('FILM003', 'film', 'available', 3);

INSERT INTO customers (name, email, rented_camera_reference)
VALUES 
    ('Alice', 'alice@example.com', NULL),
    ('Bob', 'bob@example.com', 'CAM001'),
    ('Charlie', 'charlie@example.com', NULL);

INSERT INTO rentals (customer_id, item_reference, rental_date, return_date)
VALUES 
    (2, 'CAM001', CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE - INTERVAL '1 day');
