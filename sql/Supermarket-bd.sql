CREATE DATABASE Supermercado;

USE Supermercado;

-- 3. Crear la tabla 
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    image_url VARCHAR(255)
);

-- 4. Meter datos de prueba
INSERT INTO products (code, name, description, price, category, image_url)
VALUES 
('FR_MANZ01', 'Manzana Golden', 'Pieza de manzana fresca.', 0.45, 'fruta', '/imgProductos/manzana-golden.png');

-- Limpiamos lo anterior para no duplicar
TRUNCATE TABLE products;

INSERT INTO products (code, name, description, price, category, image_url) VALUES 
('FR_MANZ01', 'Manzana Golden', 'Pieza de manzana fresca.', 0.45, 'fruta', '/imgProductos/manzana-golden.png'),
('FR_PLT07', 'Plátano de Canarias', 'Pieza de plátano.', 0.35, 'fruta', '/imgProductos/platano-canarias.jpg'),
('FR_NARAN02', 'Naranja de Mesa', 'Pieza de naranja.', 0.25, 'fruta', '/imgProductos/naranja-mesa.png'),
('FR_AGUA08', 'Aguacate Hass', 'Pieza madura.', 1.20, 'fruta', '/imgProductos/aguacates-hass.jpg'),
('FR_LIMON09', 'Limón', 'Pieza de limón.', 0.10, 'fruta', '/imgProductos/limon.jpg'),
('FR_MELO10', 'Melocotón', 'Pieza de melocotón.', 0.60, 'fruta', '/imgProductos/melocoton.jpg'),
('VE_PIM04', 'Pimiento Rojo', 'Pieza de pimiento.', 1.50, 'verdura', '/imgProductos/pimiento-rojo.jpg'),
('VE_PEP11', 'Pepino', 'Pieza de pepino.', 0.75, 'verdura', '/imgProductos/pepino.jpg'),
('VE_CALAB12', 'Calabacín', 'Pieza de calabacín.', 0.85, 'verdura', '/imgProductos/calabacin.jpg'),
('VE_BEREN13', 'Berenjena', 'Pieza de berenjena.', 0.90, 'verdura', '/imgProductos/berenjena.jpg'),
('VE_CEBO14', 'Cebolla Blanca', 'Pieza de cebolla.', 0.20, 'verdura', '/imgProductos/cebolla-blanca.jpg'),
('VE_LECH15', 'Lechuga Iceberg', 'Unidad de lechuga.', 1.10, 'verdura', '/imgProductos/lechuga-iceberg.jpg'),
('VE_ALCA16', 'Alcachofa', 'Pieza de alcachofa.', 0.70, 'verdura', '/imgProductos/alcachofa.jpg'),
('EN_MIX05', 'Ensalada Mixta', 'Tarrina de ensalada.', 2.99, 'ensalada', '/imgProductos/ensalada-mixta.jpg'),
('EN_CESAR06', 'Ensalada César', 'Ensalada preparada.', 3.50, 'ensalada', '/imgProductos/ensalada-cesar.jpg');

SELECT * FROM products WHERE name LIKE '%tomate%';
SELECT * FROM products WHERE name LIKE '%manzana%';