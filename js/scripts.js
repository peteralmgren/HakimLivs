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
  console.log("input email: " + email);
  console.log("input password: " + password);


  if(email == correctEmail && password == correctPassword){
      console.log("Användarnamn och lösenord stämde!");
      window.location.replace("admin.html");
  }
  else{
      console.log("Felaktig adress. Användaren finns ej!");
  }
        
}