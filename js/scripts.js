/* $(document).ready(function() {             
    $('#loginModal').modal('show');
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    }); */

    
    let customer= [];
    customer = JSON.parse(localStorage.getItem("customer"));

    if (!customer) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://grupp5hakimlivs.herokuapp.com/getcustomers");
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          customer = JSON.parse(xhr.responseText);
          localStorage.setItem("customer", JSON.stringify(customer));
          
        }
      };
    
    }



function validateUser(){

  let account =  [];
  let output = ""
  let loggedInCustomer = []

  const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://grupp5hakimlivs.herokuapp.com/login");
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          account = JSON.parse(xhr.responseText);
          
          var email = document.getElementById("email1").value;
      var password = document.getElementById("password1").value;

      account.forEach(account => {
          customer.forEach(customer => {
            if(customer.email === email & account.password === password){
              sessionStorage.setItem("loggedInCustomer", JSON.stringify(customer));
              //document.getElementById('Log-in-button').hidden
            }
          })
        
      })
      
        }
      };
      loggedInCustomer = JSON.parse(sessionStorage.getItem('loggedInCustomer'))
      /* let lastname = ""
      
      for (var i=0; i <loggedInCustomer.length; i++){
        console.log(loggedInCustomer[i]);
    }
      

      output +=`
      <li id="customer-logged-in" class="nav-item">
      <h3 >${lastname}</h3>
              </li>
              `

       document.getElementById('customer-logged-in').innerHTML = output */
      

      /* $.ajax(
        {
            url : 'https://grupp5hakimlivs.herokuapp.com/login',
            type: "GET",
            crossDomain: true,
            dataType: 'jsonp',
            data : ,
              success: function(data){
              console.log(data);
              response=data
              },
  
            headers: {
              accept: "application/json",
              "Access-Control-Allow-Origin":"*"
              
          }
          
        }); */

      
      



  /* var correctEmail = "hakim";
  var correctPassword = "hakim";
  var email = document.getElementById("email1").value;
  var password = document.getElementById("password1").value;
  console.log("input email: " + email);
  console.log("input password: " + password);


  if(email == correctEmail && password == correctPassword){
      console.log("Användarnamn och lösenord stämde!");
      window.location.replace("admin.html");
  }
  else{
      console.log("Felaktig adress. Användaren finns ej!");
  } */
        
}



