CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
item_id VARCHAR(40) UNIQUE,
product_name VARCHAR(60) NOT NULL,
department_name VARCHAR(60) NOT NULL,
price FLOAT NOT NULL,
stock_quantity FLOAT NOT NULL);


INSERT INTO products 
(item_id,product_name, department_name, price,stock_quantity)
VALUES
('BTC', 'bitcoin', 'crypto', 8700.16, 0.448002);

INSERT INTO products 
(item_id,product_name, department_name, price,stock_quantity)
VALUES
('ETH', 'etheeum', 'crypto', 904.70, 3.1717);

INSERT INTO products 
(item_id,product_name, department_name, price,stock_quantity)
VALUES
('XRP', 'ripple', 'crypto', 0.85, 12180.9);

INSERT INTO products 
(item_id,product_name, department_name, price,stock_quantity)
VALUES
('ADA', 'cardano', 'crypto', 0.36, 2027);

INSERT INTO products 
(item_id,product_name, department_name, price,stock_quantity)
VALUES
('LTC', 'litecoin', 'crypto', 128.14, 0.448002);

INSERT INTO products 
(item_id,product_name, department_name, price,stock_quantity)
VALUES
('IOST', 'iostoken', 'crypto', 0.04, 22153);

INSERT INTO products 
(item_id,product_name, department_name, price,stock_quantity)
VALUES
('TRX', 'tron', 'crypto', 0.05, 17899);

INSERT INTO products 
(item_id,product_name, department_name, price,stock_quantity)
VALUES
('BCC', 'bitcoin cash', 'crypto', 4.85, 1174.67);

INSERT INTO products 
(item_id,product_name, department_name, price,stock_quantity)
VALUES
('XMR', 'monero', 'crypto', 11, 243);


INSERT INTO products 
(item_id,product_name, department_name, price,stock_quantity)
VALUES
('STRAT', 'stratis', 'crypto', 500, 9.28);