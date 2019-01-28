var ui = {};

ui.navigation = `
    <!-- ------------- YOUR CODE: Navigation UI ------------- -->
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
  <a class="navbar-brand" href="#" onClick="defaultModule()">
    BadBank
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#" onClick="loadCreateAccount()">Create Account <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#" onClick="loadLogin()">Login</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#" onClick="loadDeposit()">Deposit</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#" onClick="loadWithdraw()">Withdraw</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#" onClick="loadTransactions()">Transactions</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#" onClick="loadBalance()">Balance</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#" onClick="loadAllData()">All Data</a>
      </li>
    </ul>
  </div>
</nav>

`;

ui.createAccount = `
    <!-- ------------- YOUR CODE: Create Account UI ------------- -->
    <div class="card  mb-3" style="max-width: 18rem; background-color: #e3f2fd;">
      <div class="card-header">Create Account</div>
      <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" placeholder="Enter name" required>
          </div>        
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
            <small id="emailHelp" class="form-text text-muted text-white">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" required>
          </div>
          <button type="submit" class="btn btn-primary" onClick="create()">Create Account</button>
          <div class="alert alert-danger" role="alert" style="margin-top: 1rem" id="status" hidden="true"/>
      </div>
    </div>
`;

ui.login = `
    <!-- ------------- YOUR CODE: Login UI ------------- -->
    <div class="card  mb-3" style="max-width: 18rem; background-color: #e3f2fd;">
    <div class="card-header">Login</div>
    <div class="card-body">       
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
          <small id="emailHelp" class="form-text text-muted text-white">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password" required>
        </div>
        <button type="submit" class="btn btn-primary" onClick="login()">Login</button>
        <div class="alert alert-danger" role="alert" style="margin-top: 1rem" id="status" hidden="true"/>
    </div>
  </div>
`;

ui.deposit = `
    <!-- ------------- YOUR CODE: Deposit UI ------------- -->
    <div class="card  mb-3" style="max-width: 18rem; background-color: #e3f2fd;">
    <div class="card-header">Deposit Amount</div>
    <div class="card-body">       
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
          <small id="emailHelp" class="form-text text-muted text-white">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="number" class="form-control" id="amount" placeholder="Amount" required>
        </div>
        <button type="submit" class="btn btn-primary" onClick="deposit()">Deposit Amount</button>
        <div class="alert alert-danger" role="alert" style="margin-top: 1rem" id="status" hidden="true"/>
    </div>
  </div>    
`;

ui.withdraw = `
    <!-- ------------- YOUR CODE: Withdraw UI ------------- -->
    <div class="card  mb-3" style="max-width: 18rem; background-color: #e3f2fd;">
    <div class="card-header">Withdraw Amount</div>
    <div class="card-body">       
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
          <small id="emailHelp" class="form-text text-muted text-white">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="number" class="form-control" id="amount" placeholder="Amount" required>
        </div>
        <button type="submit" class="btn btn-primary" onClick="withdraw()">Withdraw Amount</button>
        <div class="alert alert-danger" role="alert" style="margin-top: 1rem" id="status" hidden="true"/>
    </div>
  </div>    
`;

ui.transactions = `
    <!-- ------------- YOUR CODE: Transactions UI ------------- -->
    <div class="card  mb-3" style="max-width: 18rem; background-color: #e3f2fd;">
    <div class="card-header">View Transactions</div>
    <div class="card-body">       
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
          <small id="emailHelp" class="form-text text-muted text-white">We'll never share your email with anyone else.</small>
        </div>
        <button type="submit" class="btn btn-primary" onClick="transactions()">Show Transactions</button>
        <!--div class="alert alert-danger" role="alert" style="margin-top: 1rem" id="status" hidden="true"/-->
    </div>
  </div>
  <div class="table-responsive-sm" style="margin-top: 1rem" id="transactionsTable"/>     
`;

ui.balance = `
    <!-- ------------- YOUR CODE: Balance UI ------------- -->
    <div class="card  mb-3" style="max-width: 18rem; background-color: #e3f2fd;">
    <div class="card-header">Balance Amount</div>
    <div class="card-body">       
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
          <small id="emailHelp" class="form-text text-muted text-white">We'll never share your email with anyone else.</small>
        </div>
        <button type="submit" class="btn btn-primary" onClick="balance()">Show Balance</button>
        <div class="alert alert-danger" role="alert" style="margin-top: 1rem" id="status" hidden="true"/>
    </div>
  </div>    
`;

ui.default = `
    <!-- ------------- YOUR CODE: Default UI ------------- -->
    <div class="card mb-3" style="max-width: 18rem; background-color: #e3f2fd;">
      <div class="card-header">BadBank Landing Module</div>
      <div class="card-body">
        <h5 class="card-title">Welcome to the Bank</h5>
        <p class="card-text">You can move around using navigation bar.</p>
        <!--img src="/bank.png" width="30" height="30" alt=""-->
        <img src="/bank.png" width ="246" alt="">
      </div>
    </div>
`;

ui.allData = `
    <!-- ------------- YOUR CODE: All Data UI ------------- -->
    <div class="card  mb-3" style="max-width: 18rem; background-color: #e3f2fd;">
    <div class="card-header">All Data</div>
    <div class="card-body">
        <h5 class="card-title">Show All Data</h5>
        <p class="card-text">You can see all data by clicking following button.</p>
        <button type="submit" class="btn btn-primary" onClick="allData()">Show All Data</button>
    </div>
  </div>
  <div class="table-responsive-sm" style="margin-top: 1rem" id="allDataTable"/>     
`;

var target     = document.getElementById('target');
var navigation = document.getElementById('navigation');
navigation.innerHTML += ui.navigation;



var loadCreateAccount = function(){
    target.innerHTML = ui.createAccount;
};

var loadLogin = function(){
    target.innerHTML = ui.login;
};

var loadDeposit = function(){
    target.innerHTML = ui.deposit;
};

var loadWithdraw = function(){
    target.innerHTML = ui.withdraw;
};

var loadTransactions = function(){
    target.innerHTML = ui.transactions;
};

var loadBalance = function(){
    target.innerHTML = ui.balance;
};

var defaultModule = function(){
    target.innerHTML = ui.default;
};

var loadAllData = function(){
    target.innerHTML = ui.allData;
};

defaultModule();
