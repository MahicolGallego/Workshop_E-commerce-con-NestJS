CREATE DATABASE IF NOT EXISTS ecommerce_nestjs;

USE ecommerce_nestjs;

INSERT INTO entities(name) values("order"), ("product"), ("user");

INSERT INTO roles(name) values("admin"), ("client");

INSERT INTO roles_permissions(role_id, entity_id, can_create, can_update, can_delete, can_get, can_getone)
VAlUES(1, 1, false, true, true, true, true),
(1, 2, true, true, true, true, true),
(1, 3, true, true, true, true, true),
(2, 1, true, false, true, true, true),
(2, 2, false, false, false, true, true),
(2, 3, true, true, false, false, true);

INSERT INTO users (email, password, role_id) VALUES
('admin1@example.com', 'password123', 1),  -- Admin
('client1@example.com', 'password123', 2), -- Client
('client2@example.com', 'password123', 2), -- Client
('client3@example.com', 'password123', 2), -- Client
('admin2@example.com', 'password123', 1),  -- Admin
('client4@example.com', 'password123', 2), -- Client
('client5@example.com', 'password123', 2), -- Client
('client6@example.com', 'password123', 2), -- Client
('admin3@example.com', 'password123', 1),  -- Admin
('client7@example.com', 'password123', 2); -- Client

-- inserts products
INSERT INTO products (name, price, description) VALUES
('Product A', 10.99, 'Description for Product A'),
('Product B', 20.99, 'Description for Product B'),
('Product C', 15.49, 'Description for Product C'),
('Product D', 8.99, 'Description for Product D'),
('Product E', 25.00, 'Description for Product E'),
('Product F', 5.49, 'Description for Product F'),
('Product G', 30.00, 'Description for Product G'),
('Product H', 12.99, 'Description for Product H'),
('Product I', 22.50, 'Description for Product I'),
('Product J', 18.75, 'Description for Product J');

INSERT INTO orders (user_id, totalPrice) VALUES
(2, 35.48),  -- Orden para client1@example.com
(3, 47.98),  -- Orden para client2@example.com
(4, 24.98),  -- Orden para client3@example.com
(5, 41.98),  -- Orden para client4@example.com
(6, 55.99),  -- Orden para client5@example.com
(7, 43.48),  -- Orden para client6@example.com
(8, 30.98);  -- Orden para client7@example.com

-- Productos para la orden de client1@example.com (user_id 2)
INSERT INTO order_products (order_id, product_id) VALUES
(1, 1),  -- Product A (10.99)
(1, 2);  -- Product B (20.99)

-- Productos para la orden de client2@example.com (user_id 3)
INSERT INTO order_products (order_id, product_id) VALUES
(2, 2),  -- Product B (20.99)
(2, 3),  -- Product C (15.49)
(2, 4);  -- Product D (8.99)

-- Productos para la orden de client3@example.com (user_id 4)
INSERT INTO order_products (order_id, product_id) VALUES
(3, 5);  -- Product E (25.00)

-- Productos para las órdenes de client4@example.com (user_id 5)
INSERT INTO order_products (order_id, product_id) VALUES
(4, 6),  -- Product F (5.49)
(4, 7),  -- Product G (30.00)
(4, 8);  -- Product H (12.99)

-- Productos para la orden de client5@example.com (user_id 6)
INSERT INTO order_products (order_id, product_id) VALUES
(5, 1),  -- Product A (10.99)
(5, 3),  -- Product C (15.49)
(5, 9);  -- Product I (22.50)

-- Productos para las órdenes de client6@example.com (user_id 7)
INSERT INTO order_products (order_id, product_id) VALUES
(6, 4),  -- Product D (8.99)
(6, 5),  -- Product E (25.00)
(6, 6);  -- Product F (5.49)

INSERT INTO order_products (order_id, product_id) VALUES
(7, 2),  -- Product B (20.99)
(7, 4);  -- Product D (8.99)