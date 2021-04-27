/* $(document).ready(function() {             
    $('#loginModal').modal('show');
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    }); */
    

function validateUser(){
  var correctEmail = "hakim";
  var correctPassword = "hakim";
  var email = document.getElementById("email1").value;
  var password = document.getElementById("password1").value;
  
  const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://grupp5hakimlivs.herokuapp.com/login?email=${email}&password=${password}`);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        sessionStorage.setItem("loggedinCustomer", JSON.stringify(data));
        console.log(data);
      }
    };

    let loggedinCustomer = JSON.parse(sessionStorage.getItem("loggedinCustomer"));
    console.log(loggedinCustomer);


  /* console.log("input email: " + email);
  console.log("input password: " + password); */


  /* if(email == correctEmail && password == correctPassword){
      console.log("Användarnamn och lösenord stämde!");
      window.location.replace("admin.html");
  }
  else{
      console.log("Felaktig adress. Användaren finns ej!");
  }*/
        
} 
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