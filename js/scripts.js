function validateUser() {
  

  // Check the input when logging in

  let email = document.getElementById("email1").value;
  let password = document.getElementById("password1").value;

  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `https://hakimlivsgroup5.herokuapp.com/authenticate`
    //`https://grupp5hakimlivs.herokuapp.com/login?email=${email}&password=${password}`
  );
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify({username: email, password: password}));
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

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

}

        




