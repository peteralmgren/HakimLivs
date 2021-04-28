

//let products = [];
//let customer= [];
let customerIndex = 0;



  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://grupp5hakimlivs.herokuapp.com/getcustomers");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let customer = JSON.parse(xhr.responseText);
      
    }
  };


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

/* function initMap() {
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
} */
$('#customer-list').click(function (e) {

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://grupp5hakimlivs.herokuapp.com/getcustomers");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let customer = JSON.parse(xhr.responseText);
      
  
  let output = ``;

  customer.forEach(customer =>{
    
    output += `
    <tr>
    <td></td>
  <td>${customer.id}</td>
  <td>${customer.firstname+" "+customer.lastname}</td>
  <td>${customer.street}</td>
  <td>${customer.email}</td>
  </tr>
  `;
  
  })
  document.getElementById("DB-cursomers").innerHTML=output;
}
}

});

//$(document).ready(function() {
  $('#product-add').click(function () {

    
    var output =""
      
    output +=`
    <div class="card">
      <div class="card-header text-secondary">
        <label class="bg-white" style="color:black;">Admin skapa produkt formulär
        </label>
      </div>
        <form id="myform" type="post">
          <div class="card-body">
            <div class="row mb-2 text-muted">
              <div class="col-md-6 text-left">
                <form class="form-inline">
                  <div class="form-group">
                    <div class="elements">
                        <label for="category">Välj kategori</label>
                      <select class="custom-select custom-select-sm" name="category_id">
                        <option value="1">Frukt</option>
                        <option value="2">Mejeri</option>
                      </select>
                    </div>
                        <div class="elements">
                          <label for="title">Skriv i produktnamn</label>
                          <input id="title" required="required" type="text"  value="" name="title"  size="30"  />
                        </div>
                        <div class="elements">
                          <label for="description">Skriv produktinfo</label>
                          <textarea class="form-control" rows="3" required="required" type="text" value=""
                          id="description" name="description"  size="40" ></textarea>
                        </div>	
                        <div class="elements">
                          <label for="price">Skriv i pris</label>
                          <input id="price" required="required" type="number"  value="" name="price"  size="10"  />
                        </div>
                        <div class="elements">
                          <label for="image">Skriv i sökväg till bild</label>
                          <input id="image" required="required" value="" name="image" type="text"  size="40"  />
                        </div>
                          <p><input id="add-btn" type="submit" value="Submit" /> 
                            <input type="reset" value="Reset" /></p>
                  </div>
                </form>
              </div> 
            </div>
          </div>
        </form>
      </div>`
    
    document.getElementById("admin-addrevome-form").innerHTML=output;

    $("#add-btn").click(function(e){
      
     var jsonData = {};
     
     var formData = $("#myform").serializeArray();

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

    $.ajax(
    {
        url : 'https://grupp5hakimlivs.herokuapp.com/addproduct',
        type: "POST",
        crossDomain: true,
        dataType: 'jsonp',
        data : jsonData,
        async: true,
         success : function(response) {
           console.log(response);
            if (response.status == 'FAIL') {
            for ( var val in errMessages) {
            var $errorLabel = $.find('#' + val
                + 'ErrorLabel');
                $errorLabel.html(errMessages[val]);
                }
             }
          },
          
        headers: {
          accept: "application/json",
          "Access-Control-Allow-Origin":"*"
          
      }
      
    }); 
    
});

  })
  
  
  $('#product-remove').click(function () {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://grupp5hakimlivs.herokuapp.com/all");
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let products = JSON.parse(xhr.responseText);
        
  
    var output =""
      
    output +=`
    <div class="card">
      <div class="card-header text-secondary">
        <label class="bg-white" style="color:black;">Admin ta bort produkt formulär
        </label>
      </div>
        <form id="myform" type="post">
          <div class="card-body">
            <div class="row mb-2 text-muted">
              <div class="col-md-6 text-left">
                <form class="form-inline">
                  <div class="form-group">
                        <label for="category">Välj Produkt att ta bort</label>
                      <select id="product-list" class="custom-select custom-select-sm" name="product_id">                       
                      </select>
                          <p><input id="remove-btn" type="submit" value="Submit" /> 
                            <input type="reset" value="Reset" /></p>
                  </div>
                </form>
              </div> 
            </div>
          </div>
        </form>
      </div>`
    
    document.getElementById("admin-addrevome-form").innerHTML=output;

    $('#product-list').click(function (e) {

      var output =""  
      
      products.forEach(element =>{output +=`<option id="product-element" value="${element.id}">${element.title}</option>`})
    
      document.getElementById("product-list").innerHTML=output; 
    })

    $("#remove-btn").click(function(e){
      
      var jsonData = {};
      var formData = $("#myform").serializeArray();
     
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
    
     $.ajax(
     {
         url : 'https://grupp5hakimlivs.herokuapp.com/removeproduct',
         type: "POST",
         crossDomain: true,
         dataType: 'jsonp',
         data : jsonData,
           success: function(data){
           console.log(data);
           
           },
 
         headers: {
           accept: "application/json",
           "Access-Control-Allow-Origin":"*"
           
       }
       
     });
     
 });
}
};

  })

  
  

   




    
  
  






             