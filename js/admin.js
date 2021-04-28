

let testData = {"1":1,"5":4}
let customer= [];
let customerIndex = 0;
customer = JSON.parse(localStorage.getItem("customer"));


  /* const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/response/postbody");
  
  xhr.send("{\"firstName\" : \"John\", \"lastName\" : \"Smith\"}"); */
  /* xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } })); */





if (!customer) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://grupp5hakimlivs.herokuapp.com/getcustomers");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      customer = JSON.parse(xhr.responseText);
      localStorage.setItem("customer", JSON.stringify(customer));
    }
  };

}else{
  
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

    
    for (var i=0; i <customer.length; i++){
        if(customerId == customer[i].id){
            customerIndex = i;
        }
    }
    document.getElementById('shipping-firstname').innerHTML= customer[customerIndex].firstname;
    document.getElementById('shipping-lastname').innerHTML = customer[customerIndex].lastname;
    document.getElementById('shipping-address').innerHTML = customer[customerIndex].street;
    document.getElementById('shipping-zipcode').innerHTML = customer[customerIndex].zipcode;
    document.getElementById('shipping-county').innerHTML = customer[customerIndex].city;
    document.getElementById('shipping-email').innerHTML = customer[customerIndex].email;
    
    
}
var inputNumber=0;
keypressAmount=1;
function isNumber(evt) {

  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  
  if (charCode > 31 &&(charCode < 46 || charCode >57)) {
      return false;
  
  }
  return true;
  
}

function exampelInput(event){
  console.log(event);

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
$('#customer-list').click(function (e) {

  let output = ``;

  customer.forEach(customer =>{
    id = customer.id;
    firstname = customer.firstname;
    lastname = customer.lastname;
    email= customer.email;
    
    output += `
    <tr>
    <td></td>
  <td>${id}</td>
  <td>${firstname+" "+lastname}</td>
  <td>${customer.street}</td>
  <td>5%</td>
  <td>8432 SEK</td>
  <td>Feb2021-April2021</td>
  <td>${email}</td>
  </tr>
  `;
  
  })
  document.getElementById("DB-cursomers").innerHTML=output;
    

});










             