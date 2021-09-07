function validateUser() {
  

  // Check the input when logging in

  let email = document.getElementById("email1").value;
  let password = document.getElementById("password1").value;

  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `https://grupp5hakimlivs.herokuapp.com/authenticate?username=${email}&password=${password}`
    //`https://grupp5hakimlivs.herokuapp.com/login?email=${email}&password=${password}`
  );
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.status === 500){
        alert("Kontot hittades inte!");
      }
    if (xhr.readyState === 4 && xhr.status === 200) {
      if(!xhr.responseText){
        alert("Kontot hittades inte!")        
      }
      if(xhr.responseText){
        let data = JSON.parse(xhr.responseText);
      sessionStorage.setItem("loggedinCustomer", JSON.stringify(data));
     
      if (data.email === "hakim@hakim") {
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

let customer = [];
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
  else{
      console.log("Felaktig adress. Användaren finns ej!");
  } 
        




