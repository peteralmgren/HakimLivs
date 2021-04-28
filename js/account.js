
$(document).ready(function() {
    $("#createuser").click(function(e){
       var jsonData = {};
       var formData = $("#myform").serializeArray();

       let firstname = document.getElementById("firstname").value;
let lastname = document.getElementById("lastname").value;
let email = document.getElementById("inputEmail").value
let password = document.getElementById("inputPassword").value;
let street = document.getElementById("inputStreet").value;
let zipcode = document.getElementById("inputZip").value;
let city = document.getElementById("inputCity").value;
let phone = document.getElementById("inputPhone").value;

       $.each(formData, function() {
          if (jsonData[this.name]) {
            
             if (!jsonData[this.name].push) {
              
                 jsonData[this.name] = [jsonData[this.name]];
                 
             }
             jsonData[this.name].push(this.value || '');
             
         } else {
             jsonData[this.name] = this.value || '';
             
         }
        console.log(jsonData)
        
     });


     /*
      $.ajax(
      {
          url : 'https://grupp5hakimlivs.herokuapp.com/account',
          type: "POST",
          crossDomain: true,
          dataType: 'jsonp',
          data : jsonData,
            success: function(data){
            console.log(data);
            response=data
            },

          headers: {
            accept: "application/json",
            "Access-Control-Allow-Origin":"*"
            
        }
        
      }); 
      
      e.preventDefault();   
      */

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
      
      
  }); 

    
  
 
  }); 
