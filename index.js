// setup server
// YOUR CODE
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
app.listen(3000, function(){
  console.log("Listening on port :3000");
});

// setup directory used to serve static files
// YOUR CODE
app.use(express.static('public'));
// setup data store
// YOUR CODE
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('accounts.json');
var db      = low(adapter);
//db.defaults({ accounts: []}).write();
// required data store structure
// YOUR CODE

db.defaults({
    accounts:[
        {name        : '',
         email       : '',
         balance     : 0,
         password    : '',
         transactions: []}
    ]
}).write();

function createTransactionMetaData(message, balance)
{
    var txnMetaData = {
        "message":message,
        "balance": balance == null ? 0 : balance,
        "date": new Date()
    }
    return txnMetaData;
}

function findAccountByEmailId(emaiId)
{
    return db.get('accounts').find({email:emaiId}).value();
}

// function findAccountByEmailIdAndUpdate(emaiId)
// {
//     return db.get('accounts').find({email:emaiId}).assign().write();
// }

app.get('/account/create/:name/:email/:password', function (req, res) {

    // YOUR CODE
    // Create account route
    // return success or failure string
    var existingAccount = findAccountByEmailId(req.params.email);

    if(existingAccount == null)
    {
        var account = {
            "name"        : req.params.name,
            "email"       : req.params.email,
            "balance"     : 0,
            "password"    : req.params.password,
            "transactions": [createTransactionMetaData("New account created", 0)]
         };

         db.get('accounts').push(account).write();
         console.log("New account created with attributes - " + JSON.stringify(account));
         
         res.send("Successfully created account with id " + account.email);
    }
    else
    {
        console.log("Account already exists : " + JSON.stringify(existingAccount));
        res.send("Account with id "+ req.params.email + " already exists.");
    }
    //res.redirect("/account/all");
});

app.get('/account/login/:email/:password', function (req, res) {

    // YOUR CODE
    // Login user - confirm credentials
    // If success, return account object
    // If fail, return null
    var existingAccount = findAccountByEmailId(req.params.email);
    if(existingAccount != null && existingAccount.password === req.params.password)
    {
        existingAccount.transactions.push(createTransactionMetaData("Login", existingAccount.balance));
        db.write();
        console.log("User " + existingAccount.email + " has logged in successfully");
        res.send(existingAccount);
    }
    else
    {
        console.log("Login attempt failed for " + req.params.email + " !");
        res.send(null);
    }
});

app.get('/account/get/:email', function (req, res) {

    // YOUR CODE
    // Return account based on email
    var existingAccount = findAccountByEmailId(req.params.email);
    if(existingAccount!=null)
    {
        existingAccount.transactions.push(createTransactionMetaData("Account details retrieved", existingAccount.balance));
        db.write();
    }
    res.send(existingAccount);
});

app.get('/account/deposit/:email/:amount', function (req, res) {

    // YOUR CODE
    // Deposit amount for email
    // return success or failure string
    var existingAccount = findAccountByEmailId(req.params.email);
    var amountValue = db._.toNumber(req.params.amount);
    var message = "";
    if(existingAccount == null)
    {
        message = "Failed to deposit $" + req.params.amount +". Account " + req.params.email + " does not exists";
    }
    else if(db._.isNaN(amountValue))
    {
        message = "Cannot deposit NaN Amount to the account " + req.params.emai;
    }
    else if(amountValue <=0)
    {
        message = "Deposit amout should be greater than 0.";
    }
    else
    {
        existingAccount.balance += amountValue;
        existingAccount.transactions.push(createTransactionMetaData( amountValue + " Deposited", existingAccount.balance));
        db.write();
        message = "Successfully deposited $" + amountValue + " to the account. Current balance is $" + existingAccount.balance;
    }
    console.log(message);
    res.send(message);
});

app.get('/account/withdraw/:email/:amount', function (req, res) {

    // YOUR CODE
    // Withdraw amount for email
    // return success or failure string
    var existingAccount = findAccountByEmailId(req.params.email);
    var amountValue = db._.toNumber(req.params.amount);
    var message = "";
    if(existingAccount == null)
    {
        message = "Failed to withdraw $" + req.params.amount +". Account " + req.params.email + " does not exists";
    }
    else if(db._.isNaN(amountValue))
    {
        message = "Cannot withdraw NaN Amount from the account " + req.params.emai;
    }
    else if(amountValue <=0)
    {
        message = "Withdraw amout should be greater than 0.";
    }
    else if(existingAccount.balance < amountValue)
    {
        message = "Insufficient funds. You cannot withdraw more than availbale current balance of $ "+ existingAccount.balance;
        existingAccount.transactions.push(createTransactionMetaData( amountValue + " Attempted overdraft withdraw", existingAccount.balance));
        db.write();
    }
    else
    {
        existingAccount.balance -= amountValue;
        existingAccount.transactions.push(createTransactionMetaData( amountValue + " Withdrawn", existingAccount.balance));
        db.write();
        message = "Successfully withdrawn $" + amountValue + " from the account. Current balance is $" + existingAccount.balance;
    }
    console.log(message);
    res.send(message);    
});

app.get('/account/transactions/:email', function (req, res) {

    // YOUR CODE
    // Return all transactions for account
    var existingAccount = findAccountByEmailId(req.params.email);
    if(existingAccount)
    {
        res.send(existingAccount.transactions);
    }
    else
    {
        res.send(null);
    }
});

app.get('/account/all', function (req, res) {

    // YOUR CODE
    // Return data for all accounts
    res.send(db.get('accounts').value());
});
