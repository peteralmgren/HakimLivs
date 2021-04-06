
/* class Product {
    constructor(id, title, description, image, price) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.image = image;
      this.price = price;
      
    }
  }  */

let customer= [];
let customerIndex = 0;
customer = JSON.parse(localStorage.getItem("customer"));
addCustomerShippingInfo(15);


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
    document.getElementById('shipping-firstname').innerHTML= customer[customerIndex].firstname;
    document.getElementById('shipping-lastname').innerHTML = customer[customerIndex].lastname;
    document.getElementById('shipping-address').innerHTML = customer[customerIndex].address;
    document.getElementById('shipping-zipcode').innerHTML = customer[customerIndex].zipcode;
    document.getElementById('shipping-county').innerHTML = customer[customerIndex].county;
    document.getElementById('shipping-email').innerHTML = customer[customerIndex].email;
    
    /* shippingOutput +=`<h1>Leveransinfo</h1>
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
      </label>` */

      /* document.getElementById("shipping-info").innerHTML = shippingOutput; */
    
}
var inputNumber=0;
keypressAmount=1;
function isNumber(evt) {

  /* inputNumber +=evt.key */

  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  
  if (charCode > 31 &&(charCode < 46 || charCode >57)) {
      return false;
  /* }else if (charCode ==46){
    keypressAmount++
    if(keypressAmount >1){
      return false;} */
  }
  return true;
  
}

function exampelInput(event){
  console.log(event);
  
  /* document.getElementById('cat-example').innerHTML += event.key; */

}
function output(str) {
  $('#output').text(str);
}

$.fn.getCursorPosition = function() {
  var el = $(this).get(0);
  var pos = 0;
  var posEnd = 0;
  if('selectionStart' in el) {
      pos = el.selectionStart;
      posEnd = el.selectionEnd;
  } else if('selection' in document) {
      el.focus();
      var Sel = document.selection.createRange();
      var SelLength = document.selection.createRange().text.length;
      Sel.moveStart('character', -el.value.length);
      pos = Sel.text.length - SelLength;
      posEnd = Sel.text.length;
  }
  return [pos, posEnd];
};

$('#cat-example').keydown(function (e) {
  var position = $(this).getCursorPosition();
  var deleted = '';
  var val = $(this).val();
  if (e.which == 8) {
      if (position[0] == position[1]) {
          if (position[0] == 0)
              deleted = '';
          else
              deleted = val.substr(position[0] - 1, 1);
      }
      else {
          deleted = val.substring(position[0], position[1]);
      }
  }
  else if (e.which == 46) {
      var val = $(this).val();
      if (position[0] == position[1]) {
          
          if (position[0] === val.length)
              deleted = '';
          else
              deleted = val.substr(position[0], 1);
      }
      else {
          deleted = val.substring(position[0], position[1]);
      }
  }
  output(/* document.getElementById('cat-example').innerHTML */);
});
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}








             