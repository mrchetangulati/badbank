
function create() {
    // -------------------------------------
    //  YOUR CODE
    //  Create user account on server
    // -------------------------------------
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var url = "/account/create/"+name+"/"+email+"/"+password;

    superagent.get(url).end(function(err, res)
    {
        var statusElement = document.getElementById("status");
        statusElement.hidden=false;
        if(err)
        {
            console.log(err);
            statusElement.innerHTML=err;
        }
        else
        {
            console.log(res.text);
            statusElement.innerHTML=res.text;
        }
    });

}

function login() {
    // -------------------------------------
    //  YOUR CODE
    //  Confirm credentials on server
    // -------------------------------------
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var url = "/account/login/"+email+"/"+password;

    superagent.get(url).end(function(err, res)
    {
        var statusElement = document.getElementById("status");
        statusElement.hidden=false;
        if(err)
        {
            console.log(err);
            statusElement.innerHTML=err;
        }
        else
        {
            var message = "";
            if(res.body == null)
            {
                message = "Login failed. Please check your username and password."
            }
            else
            {
                message = "You are now successfully logged in."    
            }
            console.log(message);
            statusElement.innerHTML=message;
        }
    });
}

function deposit() {
    // -------------------------------------
    //  YOUR CODE
    //  Deposit funds user funds on server
    // -------------------------------------
    var email = document.getElementById("email").value;
    var amount = document.getElementById("amount").value;
    var url = "/account/deposit/"+email+"/"+amount;

    superagent.get(url).end(function(err, res)
    {
        var statusElement = document.getElementById("status");
        statusElement.hidden=false;
        if(err)
        {
            console.log(err);
            statusElement.innerHTML=err;
        }
        else
        {
            console.log(res.text);
            statusElement.innerHTML=res.text;
        }
    });    
}

function withdraw() {
    // -------------------------------------
    //  YOUR CODE
    //  Withdraw funds user funds on server
    // -------------------------------------
    var email = document.getElementById("email").value;
    var amount = document.getElementById("amount").value;
    var url = "/account/withdraw/"+email+"/"+amount;

    superagent.get(url).end(function(err, res)
    {
        var statusElement = document.getElementById("status");
        statusElement.hidden=false;
        if(err)
        {
            console.log(err);
            statusElement.innerHTML=err;
        }
        else
        {
            console.log(res.text);
            statusElement.innerHTML=res.text;
        }
    });    
}

function transactions() {
    // -------------------------------------
    //  YOUR CODE
    //  Get all user transactions
    // -------------------------------------
    var email = document.getElementById("email").value;
    var url = "/account/transactions/"+email;

    superagent.get(url).end(function(err, res)
    {
        var transactionTable = document.getElementById("transactionsTable");
        transactionTable.innerHTML="";
        if(err)
        {
            console.log(err);
        }
        else if(res.body)
        {
            message = JSON.stringify(res.body);
            transactionTable.innerHTML = prepareTransactionTable(res.body);
        }
        else
        {
            message = "No transactoins available.";
        }
        console.log(message);
    });       
}

function balance() {
    // -------------------------------------
    //  YOUR CODE
    //  Get user balance
    // -------------------------------------
    var email = document.getElementById("email").value;
    var url = "/account/get/"+email;

    superagent.get(url).end(function(err, res)
    {
        var statusElement = document.getElementById("status");
        statusElement.hidden=false;
        if(err)
        {
            console.log(err);
            statusElement.innerHTML=err;
        }
        else
        {
            var message = "";
            if(res.body == null)
            {
                message = "User account does not exists."
            }
            else
            {
                message = "Your current balance is $" + res.body.balance ;   
            }
            console.log(message);
            statusElement.innerHTML=message;
        }
    });    
}

function allData() {
    // -------------------------------------
    //  YOUR CODE
    //  Get all data
    // -------------------------------------
    var status  = document.getElementById('status');
    var url = '/account/all';

    superagent.get(url).end(function(err, res)
    {
        var allDataTable = document.getElementById("allDataTable");
        allDataTable.innerHTML="";
        if(err)
        {
            console.log(err);
        }
        else if(res.body)
        {
            message = JSON.stringify(res.body);
            allDataTable.innerHTML = prepareAllDataTable(res.body);
        }
        else
        {
            message = "No Data available.";
        }
        console.log(message);
    });  
}

function prepareTransactionTable(transactions)
{
      var tableHeader = '<table class="table table-bordered table-sm table-hover table-striped"><thead><tr><th>Message</th><th>Balance</th><th>Date</th></tr></thead>';
      var tableBody = "<tbody>";
      transactions.forEach(transaction => {
          tableBody += createTransactionRow(transaction);
      });
      tableBody+='</tbody></table>';
      return tableHeader + tableBody;
}

function createTransactionRow(transaction)
{
    return '<tr>'+
           '<td>'+transaction.message+'</td>'+
           '<td>'+transaction.balance+'</td>'+
           '<td>'+transaction.date+'</td>';
}

function prepareAllDataTable(accounts)
{
    var tableHeader = '<table class="table table-bordered table-sm table-hover table-striped"><thead><tr><th>Name</th><th>Email</th><th>Balance</th></tr></thead>';
    var tableBody = "<tbody>";
    accounts.forEach(account => {
        tableBody += createAccountRow(account);
    });
    tableBody+='</tbody></table>';
    return tableHeader + tableBody; 
}

function createAccountRow(account)
{
    return '<tr>'+
           '<td>'+account.name+'</td>'+
           '<td>'+account.email+'</td>'+
           '<td>'+account.balance+'</td>';
}