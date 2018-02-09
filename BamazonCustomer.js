//intialize npm packages

var mysql = require('mysql');
var inquirer = require('inquirer');
var accounting = require('accounting');
var chalk = require('chalk');
var Bamazon = require('./BamazonTools');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root", 
  password: "root", 
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.error("error connecting");
  start();
  loadProducts();
});

var max, col = ['Item_ID', 'Product_Name', 'Price'];

//function to load the products table from database listed aboveand prints reuslts to console
function loadProducts(){
  connect.query("SELECT * FROM product_name",
    function(err, res) {
      if (err) throw err;

      //display table in terminal
      console.table(res);

      promptCustomerForItems(res);
    });
}

var start = function() {
  // selects all data from MySQL products table
  var query = Bamazon.createQuery(col);
  connection.query(query, function(err, res) {
    handleQuery(res);
  });
};

var handleQuery = function(res) {
  Bamazon.printData(res,col);
  max = res[res.length - 1]['Item_ID'];
  chooseItem(max);
};

var promptCustomerForItems = function(max) {
  inquirer.prompt([{
    name: "id",
    type: "input",
    message: "What is the item ID of the product you would like to purchase?",
    validate: function(value) {
      if (value>=0 && value<=max && value%1 === 0 && value.indexOf(' ')<0 && value.indexOf('.')<0) {
        return true;
      } else {
        return 'Please type a whole number between 1 and ' + max + ' without a period or extra spaces';
      }
    }
  } , {
    name: "quantity",
    type: "input",
    message: "How many would you like to buy?",
    validate: Bamazon.validateQuantity
  }]).then(function(answer) {
    checkQuantity(answer);
  });
};

var checkQuantity = function(answer) {
  var query = 'SELECT Stock_Quantity, Price, Department_Name FROM Products WHERE Item_ID = ?';
  var params = answer.id;
  connection.query(query, params, function(err, res) {
    if (res[0].Stock_Quantity < answer.quantity) {
      console.log(chalk.bold.red('Insufficient quantity.  Please select a quantity equal to or below ' + res[0].Stock_Quantity) + '.');
      chooseItem(max);
    } else {
      var total = answer.quantity * res[0].Price;
      var newQuantity = res[0].Stock_Quantity-answer.quantity;
      updateQuantity(answer.id,total,newQuantity);
      queryTotal(res[0].Department_Name,total);
    }
  });
};

function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // Let the user know the purchase was successful, re-run loadProducts
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
  //connect to query for accounting and chalk
  connection.query(query, params, function(err, res) {
    console.log(chalk.bold.blue('\nTotal cost: ') + chalk.bold.yellow(accounting.formatMoney(total)));
    console.log(chalk.bold.blue('Thank you come again!'));
  });
};

// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  return null;
   //connect to query for accounting and chalk
  connection.query(query, params, function(err, res) {
    console.log(chalk.bold.blue('\nTotal cost: ') + chalk.bold.yellow(accounting.formatMoney(total)));
    console.log(chalk.bold.blue('Thank you come again!'));
  });
}

// Check to see if the user wants to quit the program
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    // Log a message and exit the current node process
    console.log("Goodbye!");
    process.exit(0);
  }
}