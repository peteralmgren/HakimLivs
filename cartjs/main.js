import Header from "./ui/modules/header.js";
import Footer from "./ui/modules/footer.js";
import Login from "./ui/modules/login.js";
import Checkout from "./ui/modules/checkout.js";



window.addEventListener("load", async (e) => {
    new Header("header");
    new Footer("footer");
    new Checkout(".checkout");
    new Login(".login");
     
});

window.addEventListener("click", async (e) => {
    //console.log("click test", e.target.id);
    if(e.target.id == "login-btn") validateUser();
});

function loginAction() {
    window.location()
}

function validateUser() {
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
    else console.log("Felaktig adress. Användaren finns ej!");
}