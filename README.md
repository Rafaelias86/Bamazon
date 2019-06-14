# Bamazon App
-----

- **For:** Coding Bootcamp
- **Developer:** Rafael Uzcategui
- **Built With** Node.js, MySQL
- **Demo** See a full demo 

### Description & Requirements
-----
Bamazon is an application that implements a simple command line based storefront using the npm inquirer package and the MySQL database backend together. With functionality for customers to buy products, managers to view products and add inventory.

-	bamazonCustomer.js
-   bamazonManager.js

### Functionality
--- 
1. bamazonCustomer.js
By running 

node bamazonCustomer.js 

This will show up a table with all the products available to buy with their Id, description, department, price, and inventory.Then the user choose one to purchase. Once they have entered in the product and quantity, the app will complete the purchase if there is enough inventory. After the purcharse the Inventory is automatically updated.

![Screenshot](/images/bamazonCustomer1.png)

Id Validation

![Screenshot](/images/bamazonCustomer2.png)

2. bamazonManager.js
By running 

node bamazonManager.js 

Managers application has four options, to view products for sale, view products with low inventory, add stock to a product, and add new products to be sold.

## Technologies used:

* Node.js
* MySQL
* NPM packages

