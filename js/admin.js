

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

  document.getElementById("admin-bottomheader").innerHTML = "Kundlista";
  document.getElementById("customer-info1").innerHTML = "Adress";
  document.getElementById("customer-info2").innerHTML = "Emailadress"
      
  
  let output = ``;

  customer.forEach(customer =>{
    
    output += `
    <tr>
    <td></td>
  <td>${customer.id}</td>
  <td>${customer.firstname+" "+customer.lastname}</td>
  <td>${customer.street}</td>
  <td><a href="mailto:${customer.email}">${customer.email}</a></td>
 
  </tr>
  `;
  
  })
  document.getElementById("DB-cursomers").innerHTML=output;
}
}

});

$('#show-orders').click(function (e) {

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://grupp5hakimlivs.herokuapp.com/allOrders");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let orders = JSON.parse(xhr.responseText);

      console.log(orders)

  document.getElementById("admin-bottomheader").innerHTML = "Kundordrar";
  document.getElementById("customer-info1").innerHTML = "Datum";
  document.getElementById("customer-info2").innerHTML = "Orderstatus"
  document.getElementById("order-id").innerHTML = "Order ID"
      
  
  let output = ``;

  orders.forEach(orders =>{

    var date = new Date(orders.timestamp);
      
      
      date=(date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+(date.getHours()<10?'0':'')+date.getHours()+
          ":"+(date.getMinutes()<10?'0':'')+date.getMinutes());

    
    output += `
    <tr>
      <td><a id="saveOrderID${orders.id}" href="printOrder.html#${orders.id}" data-order-id="${orders.id}">${orders.id}</a></td>
      <td>${orders.customer.id}</td>
      <td>${orders.customer.firstname} ${orders.customer.lastname}</td>
      <td>${date}</td>
      <td>${orders.orderComplete?"skickad" : "väntar"}</td>
    </tr>
  `;

  })
  document.getElementById("DB-cursomers").innerHTML=output;
  orders.forEach(orders =>{
    document.getElementById("saveOrderID"+orders.id).addEventListener("click", function(e){
      sessionStorage.setItem("order-id", e.target)
    })
  })
 
  
  e.preventDefault()
}
}

});


//$(document).ready(function() {
  $('#product-add').click(function () {
    
    

                    let tempOutput = ``;        
                    let uniqueCat = [];            
                      const xhr = new XMLHttpRequest();
                        xhr.open("GET", "https://grupp5hakimlivs.herokuapp.com/allCategories");
                        xhr.send();
                        xhr.onreadystatechange = function () {
                          if (xhr.readyState === 4 && xhr.status === 200) {

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
              
                <form class="form-inline">
                  <div class="form-group">
                    <div class="elements">
                        <label for="category">Välj kategori</label>
                      <select class="custom-select custom-select-sm" name="category_id">
                      `
                            let categories = JSON.parse(xhr.responseText);

                            console.log(categories)

                            
                          
                            for (let cat in categories) {
                              uniqueCat.push(categories[cat].categoryName);
                            }
                      
                            uniqueCat = uniqueCat.filter((value, index, categoryArray) => categoryArray.indexOf(value) === index);
                                                    
                            for (let i = 0; i<uniqueCat.length; i++) {
                              tempOutput += `<option value="${i+1}">${uniqueCat[i]}</option>`;
                              
                            }
                            console.log(uniqueCat)
                            console.log(tempOutput)
                            output += tempOutput;         
                            output += `
                      </select>
                    </div>
                        <div class="elements">
                          <label for="title">Skriv i produktnamn</label>
                          <input id="title" required="required" type="text"  value="" name="title" />
                        </div>
                        <div class="elements">
                          <label for="description">Produktinfo</label>
                          <textarea class="form-control" rows="3" required="required" type="text" value=""
                          id="description" name="description" ></textarea>
                        </div>	
                        <div class="elements">
                          <label for="price">Pris</label>
                          <input id="price" required="required" type="number"  value="" name="price"  />
                        </div>
                        <div class="elements">
                          <label for="image">Sökväg till bild</label>
                          <input id="image" required="required" value="" name="image" type="text" size=80  />
                        </div>
                        <div class="elements">
                          <label for="compprice">Jämförelsepris</label>
                          <input id="compprice" required="required" type="number"  value="" name="compprice"  />
                        </div>
                        <div class="elements">
                          <label for="perprice">Styckpris</label>
                          <input id="perprice" required="required" type="number"  value="" name="perprice"  />
                        </div>
                        <div class="elements">
                          <label for="brand">Tillverkare</label>
                          <input id="brand" required="required" type="text"  value="" name="brand"  />
                        </div>
                        <div class="elements">
                          <label for="amount">Mängd</label>
                          <input id="amount" required="required" type="text"  value="" name="amount"  />
                        </div>
                        
                          <p><input id="add-btn" type="submit" value="Submit" /> 
                            <input type="reset" value="Reset" /></p>
                            <input id ="prev-btn" type="button" value="Preview"/>
                  </div>
                </form>
              
            </div>
          </div>
        </form>
      </div>`             
                            
    }
    document.getElementById("admin-addrevome-form").innerHTML=output;

    $("#prev-btn").click(function(e){
      let price = document.getElementById("price").value;
      let title = document.getElementById("title").value;
      let desc = document.getElementById("description").value;
      let imgsrc = document.getElementById("image").value;

      document.getElementById("preview-price").innerHTML = price;
      document.getElementById("preview-title").innerHTML = title;
      document.getElementById("preview-desc").innerHTML = desc;
      document.getElementById("preview-img").src = imgsrc;



    });

           
    $("#add-btn").click(function(e){
      
      var jsonData = {};
      
      var formData = $("#myform").serializeArray();
 
      console.log(formData)
 
    $.each(formData, function() {
         if (jsonData[this.name]) {
           
            if (!jsonData[this.name].push) {
             
                jsonData[this.name] = [jsonData[this.name]];
                
            }
            jsonData[this.name].push(this.value || '');
            
        } else {
            jsonData[this.name] = this.value || '';
            
        }       
    });
 
    console.log(jsonData)
    
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
             },
             
           headers: {
             accept: "application/json",
             "Access-Control-Allow-Origin":"*"
             
         }
         
       }); 
       e.preventDefault();
      
 
   
 });
                             
    }
                          
    

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
                      <select id="product-list" class="custom-select custom-select-sm" name="product_id">`

                        products.forEach(products =>{output +=`<option id="product-element" value="${products.id}">${products.title}</option>`})       
    output += `        
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
     e.preventDefault();
     
 });
}
};

  })
    


  
  

   




    
  
  






             