function validateUser() {
  

  // Check the input when logging in

  let email = document.getElementById("email1").value;
  email.toLowerCase();
  let password = document.getElementById("password1").value;

  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `https://grupp5hakimlivs.herokuapp.com/authenticate`
    //`https://grupp5hakimlivs.herokuapp.com/login?email=${email}&password=${password}`
  );
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify({username: email, password: password}));
  xhr.onreadystatechange = function () {
    if (xhr.status === 500){
        alert("Kontot hittades inte!");
      }
    if (xhr.status === 403){
      alert("Felaktig inloggning!")
    }
    if (xhr.readyState === 4 && xhr.status === 200) {
      if(!xhr.responseText){
        alert("Kontot hittades inte!")        
      }
      if(xhr.responseText){
      
      let data = JSON.parse(xhr.responseText);
      sessionStorage.setItem("loggedinCustomer", JSON.stringify(data));      if (data.email === "hakim@hakim") {
        window.location.replace("admin.html");
      }else{
      window.location.replace("index.html");
      hideLogin()
      }
      }
      
    }
  };

  function hideLogin(){
    let btn = document.getElementById("Log-in-button");
    btn.hidden ^= true;
  }

}

        




