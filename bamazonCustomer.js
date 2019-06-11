var mysql = require("mysql");
var Table = require("cli-table");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "17130179",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showProducts();
});

var showProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		console.log('Check out our selection...\n');
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Department", "Price", "Inventory"],
			colWidths: [10,50,25,10,12]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
		purchasePrompt();
	});
}

function purchasePrompt(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter Item ID you would like to purhcase.",
		filter:Number
	},
	{
		name:"QTY",
		type:"input",
		message:"How many items do you wish to purchase?",
		filter:Number
	},

 ]).then(function(answers){
	
	//connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

	connection.query("SELECT * FROM products WHERE item_id=?", answers.ID, function(err, res) {
		for (var i = 0; i < res.length; i++) {

			if (answers.QTY > res[i].stock_quantity) {

				console.log("===================================================");
				console.log("Sorry! Not enough in stock. Please try again later.");
				console.log("===================================================");
				showProducts();

			} else {
				//list item information for user for confirm prompt
				console.log("===================================");
				console.log("Awesome! We can fulfull your order.");
				console.log("===================================");
				console.log("You've selected:");
				console.log("----------------");
				console.log("Item: " + res[i].product_name);
				console.log("Quantity: " + answers.QTY);
				console.log("----------------");
				console.log("Total: " + res[i].price * answers.QTY + "  $ ");
				console.log("===================================");

				var newStock = (res[i].stock_quantity - answers.QTY);
				var purchaseId = (answers.ID);
				//console.log(newStock);
				confirmPrompt(newStock, purchaseId);
			}
		}
	});
});
}

function confirmPrompt(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you would like to purchase this item and quantity?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});

            console.log("=================================");
            console.log("Transaction completed. Thank you.");
            console.log("=================================");
            reprompt();
        } else {
            console.log("=================================");
            console.log("No worries. Maybe next time!");
            console.log("=================================");
            reprompt();
        }
    });
}
//asks if they would like to purchase another item
function reprompt(){
	
	inquirer.prompt([{
	  type: "confirm",
	  name: "reply",
	  message: "Would you like to purchase another item?",
	  default: true
	
	}]).then(function(ans){
	  
		if(ans.reply){
		showProducts();
	  
	} else{
		console.log("Thank you come back soon!");
	  }
	});
  }
  	
  
