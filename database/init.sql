CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    repair_service_address TEXT NOT NULL
);

CREATE TABLE cameras (
    id SERIAL PRIMARY KEY,
    model VARCHAR(50) NOT NULL,
    has_flash BOOLEAN NOT NULL,
    brand_id INTEGER NOT NULL REFERENCES brands(id)
);

CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    iso INTEGER CHECK (iso IN (50, 100, 200, 400, 800, 1600)) NOT NULL,
    format VARCHAR(10) CHECK (format IN ('35mm', '110mm', '120mm')) NOT NULL,
    brand_id INTEGER NOT NULL REFERENCES brands(id)
);

CREATE TABLE items (
    reference VARCHAR(50) PRIMARY KEY,
    type VARCHAR(10) CHECK (type IN ('camera', 'film')) NOT NULL,
    state VARCHAR(20) CHECK (state IN ('available', 'rented', 'delayed', 'under_repair')) DEFAULT 'available',
    camera_id INTEGER REFERENCES cameras(id),
    film_id INTEGER REFERENCES films(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    banned_until DATE DEFAULT NULL,
    rented_camera_reference VARCHAR(50) UNIQUE REFERENCES items(reference) ON DELETE SET NULL,
    role VARCHAR(10) CHECK (role IN ('admin', 'user')) NOT NULL DEFAULT 'user'
);

CREATE TABLE rentals (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE CASCADE,
    item_reference VARCHAR(50) REFERENCES items(reference) ON DELETE CASCADE,
    rental_date DATE NOT NULL,
    return_date DATE NOT NULL,
    late_days INT DEFAULT 0
);

CREATE TABLE camera_film_compatibility (
    camera_id INTEGER REFERENCES cameras(id),
    film_id INTEGER REFERENCES films(id),
    PRIMARY KEY (camera_id, film_id)
);

INSERT INTO brands (name, repair_service_address)
VALUES 
    ('Canon', '123 Main St, City A'),
    ('Nikon', '456 Elm St, City B'),
    ('Fujifilm', '789 Oak St, City C'),
    ('Kodak', '321 Pine St, City D'),
    ('Ilford', '654 Maple St, City E');

INSERT INTO cameras (id, model, has_flash, brand_id)
VALUES 
    (1, 'AE-1', true, 1),  -- Canon
    (2, 'FM2', false, 2);  -- Nikon

INSERT INTO films (id, name, iso, format, brand_id)
VALUES 
    (1, 'Portra 400', 400, '35mm', 4),  -- Kodak
    (2, 'Velvia 50', 50, '120mm', 3),   -- Fujifilm
    (3, 'HP5 Plus', 400, '35mm', 5);    -- Ilford

INSERT INTO items (reference, type, state, camera_id, film_id)
VALUES 
    ('CAM001', 'camera', 'available', 1, NULL), -- Canon AE-1
    ('CAM002', 'camera', 'rented', 2, NULL),    -- Nikon FM2
    ('FLM001', 'film', 'available', NULL, 1),   -- Portra 400
    ('FLM002', 'film', 'delayed', NULL, 2),     -- Velvia 50
    ('FLM003', 'film', 'under_repair', NULL, 3);-- HP5 Plus

INSERT INTO camera_film_compatibility (camera_id, film_id)
VALUES 
    (1, 1),  -- Canon AE-1 compatible with Portra 400
    (1, 3),  -- Canon AE-1 compatible with HP5 Plus
    (2, 1),  -- Nikon FM2 compatible with Portra 400
    (2, 2),  -- Nikon FM2 compatible with Velvia 50
    (2, 3);  -- Nikon FM2 compatible with HP5 Plus

INSERT INTO users (name, email, password_hash , rented_camera_reference, role)
VALUES 
    ('Andrew', 'andrew@example.com', 'hashed_password_123' , NULL, 'admin'),
    ('Alice', 'alice@example.com', 'hashed_password_456' , NULL, 'user'),
    ('Bob', 'bob@example.com', 'hashed_password_678' , 'CAM001', 'user'),
    ('Charlie', 'charlie@example.com', 'hashed_password_901' , NULL, 'user');

INSERT INTO rentals (customer_id, item_reference, rental_date, return_date)
VALUES 
    (2, 'CAM001', CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE - INTERVAL '1 day');
