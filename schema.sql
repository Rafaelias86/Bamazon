DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INTEGER(50) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(60) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price DECIMAL(10,4) NOT NULL,
stock_quantity INTEGER,
PRIMARY KEY(item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("DiskStation DS418 ", "Electronics", 359.99 , 15), ("Element14 Raspberry Pi 3 B+ Motherboard", "Electronics", 37.75, 20), ("Coding with JavaScript For Dummies", "Books", 18.74, 10),
("Monitor Desk Mount Stand with C-clamp Two 2 Screens up to 27", "Electronics", 31.99, 12),("4K Triple Display Docking Station (D3100)", "Electronics", 124.93, 5),
("Algorithms to Live By", "Books", 10.17, 4), ("Breville the Barista Express Espresso Machine, BES870XL", "Appliences", 574.49, 3),
("Reebok Club C 85 Mens White Leather", "Clothing & shoes", 59.77, 10), ("AWS Certified Developer - Associate - Prep Course", "Courses", 1.99, 100),("Raffaelo Dog Toy, Plush Squeaking Dog Toys", "Pets Supplies", 12.49, 6);