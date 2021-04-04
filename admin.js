
class Product {
    constructor(id, title, description, image, price) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.image = image;
      this.price = price;
      
    }
  } 

let customer= []
let customerIndex = 0;
customer = JSON.parse(localStorage.getItem("customer"));
addCustomerShippingInfo(14);


if (!customer) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data/kunder.JSON");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let customer = JSON.parse(xhr.responseText);
      localStorage.setItem("customer", JSON.stringify(customer));
      console.log(customer);
    }
  };
}

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
     
    document.body.innerHTML = printContents;
    
    var printButtonHide = document.getElementById('print-btn');
    printButtonHide.hidden = true;
    var shippingInfo = document.getElementById('shipping-info');
    shippingInfo.className = 'container';

    window.print();
                
    document.body.innerHTML = originalContents;
}

function addCustomerShippingInfo(customerId){

    shippingOutput = "";

    for (var i=0; i <customer.length; i++){
        if(customerId == customer[i].id){
            customerIndex = i;
        }
    }

    let firstname = customer[customerIndex].firstname;
    let lastname = customer[customerIndex].lastname;
    let address = customer[customerIndex].address;
    let zipcode = customer[customerIndex].zipcode;
    let county = customer[customerIndex].county;
    let email = customer[customerIndex].email;

    
    shippingOutput +=`<h1>Leveransinfo</h1>
    <hr />
    <div class="form">
      
    <div class="fields fields--2">
      <label class="field">
        <span  class="field__label" for="firstname">Förnamn</span>
        <!-- <input id="shipping-firstname" class="shipping-firstname" type="text" value="" /> -->
        <label id="shipping-firstname" class="field__input" for="firstname">${firstname}</label>
      </label>
      <label class="field">
        <span class="field__label" for="lastname">Efternamn</span>
        <label id="shipping-lastname" class="field__input" type="text"> ${lastname} </label>
      </label>
    </div>
    <label class="field">
      <span class="field__label" for="address">Adress</span>
      <label id="shipping-address" class="field__input" type="text"> ${address} </label>
    </label>
    
    <div class="fields fields--3">
      <label class="field">
        <span class="field__label" for="zipcode">Postnr</span>
        <label id="shipping-zipcode" class="field__input" type="number"> ${zipcode} </label>
      </label>
      <label class="field">
        <span class="field__label" for="city">Ort</span>
        <label id="shipping-county" class="field__input" type="text"> ${county} </label>
      </label>
      <label class="field">
        <span class="field__label" for="email">Epost</span>
        <label id="shipping-email" class="field__input" type="email"> ${email} </label>
         
        </input>
      </label>`

      document.getElementById("shipping-info").innerHTML = shippingOutput;
    
}







             