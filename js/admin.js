console.log("test")
let userInfo = JSON.parse(sessionStorage.getItem("loggedinCustomer"));
let StringToSend = "Bearer " +userInfo.jwt;
/*
if(!sessionStorage.getItem("loggedinCustomer") || JSON.parse(sessionStorage.getItem("loggedinCustomer")).id != 196){
  location.replace("index.html")
}*/

let admin = JSON.parse(sessionStorage.getItem("loggedInCustomer"));


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

  let userInfo = JSON.parse(sessionStorage.getItem("loggedinCustomer"));
  let StringToSend = "Bearer " +userInfo.jwt;
  console.log(StringToSend)

  $.ajax(
    {
        url : 'http://hakimlivsgroup5.herokuapp.com/getusers',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Authorization': StringToSend,
          'Content-Type': 'application/json'          
        },
        type: "GET",
        crossDomain: true,
        crossOrigin: true,
        dataType: 'json',
        complete: function(data) {
          
      },
      success: function(data){
        console.log(data);  
        document.getElementById("admin-bottomheader").innerHTML = "Kundlista";
        document.getElementById("customer-info1").innerHTML = "Adress";
        document.getElementById("customer-info2").innerHTML = "Emailadress"
            
        
        let output = ``;
      
        data.forEach(data =>{
          
          output += `
          <tr>
          <td></td>
        <td>${data.id}</td>
        <td>${data.firstname+" "+data.lastname}</td>
        <td>${data.street}</td>
        <td><a href="mailto:${data.email}">${data.email}</a></td>
       
        </tr>
        `;
        
        })
        document.getElementById("DB-cursomers").innerHTML=output;
      }   
        
    });

});

$('#show-orders').click(function (e) {
  let userInfo = JSON.parse(sessionStorage.getItem("loggedinCustomer"));
  let StringToSend = "Bearer " +userInfo.jwt;

  $.ajax(
    {
        url : 'http://hakimlivsgroup5.herokuapp.com/allorders',
        headers: {
          'Authorization': StringToSend,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Mehtods':'GET, POST, DELETE'
        },
        type: "GET",
        crossDomain: true,
        dataType: 'json',
        complete: function(data) {
          
      },
      success: function(data){
        console.log(data)

        document.getElementById("admin-bottomheader").innerHTML = "Kundordrar";
        document.getElementById("customer-info1").innerHTML = "Datum";
        document.getElementById("customer-info2").innerHTML = "Orderstatus"
        document.getElementById("order-id").innerHTML = "Order ID"
            
        
        let output = ``;
      
        data.forEach(data =>{
      
          var date = new Date(data.timestamp);
            
            
            date=(date.getDate()+
                "/"+(date.getMonth()+1)+
                "/"+date.getFullYear()+
                " "+(date.getHours()<10?'0':'')+date.getHours()+
                ":"+(date.getMinutes()<10?'0':'')+date.getMinutes());
      
          
          output += `
          <tr>
            <td><a id="saveOrderID${data.id}" href="printOrder.html#${data.id}" data-order-id="${data.id}">${data.id}</a></td>
            <td>${data.user.id}</td>
            <td>${data.user.firstname} ${data.user.lastname}</td>
            <td>${date}</td>
            <td>${data.orderComplete?"skickad" : "väntar"}</td>
          </tr>
        `;
      
        })
        document.getElementById("DB-cursomers").innerHTML=output;
        data.forEach(data =>{
          document.getElementById("saveOrderID"+data.id).addEventListener("click", function(e){
            sessionStorage.setItem("order-id", e.target)
          })
        })        
      }   
        
    });

});


//$(document).ready(function() {
  $('#product-add').click(function () {


    $.ajax(
      {
          url : 'http://hakimlivsgroup5.herokuapp.com/allcategories',
          headers: {
            'Authorization': StringToSend,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Mehtods':'GET, POST, DELETE'
          },
          type: "GET",
          crossDomain: true,
          dataType: 'json',
          complete: function(data) {
            
        },
        success: function(data){

          let tempOutput = ``;        
          let uniqueCat = [];   
          
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
                                                                                        
                                          
                                            for (let cat in data) {
                                              uniqueCat.push(data[cat].categoryName);
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
                            
          document.getElementById("admin-addrevome-form").innerHTML=output;

          $("#prev-btn").click(function(){
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

    console.log(formData);
    
     $.ajax(
       {
           url : 'https://hakimlivsgroup5.herokuapp.com/addproduct',
           headers: {
            'Authorization': StringToSend,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Mehtods':'GET, POST, DELETE'
          },
           type: "GET",
           crossDomain: true,
           dataType: 'json',
           data : jsonData,
           async: true,
            success : function(response) {
              console.log(response);
             },
                     
       }); 
       e.preventDefault();
      
    });
            
        }   
          
      });
                         
        
    
                             
});
                          
  
  
  $('#product-remove').click(function () {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://hakimlivsgroup5.herokuapp.com/all");
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
                             <input id="edit-btn" type="button" value="Edit" /></p>
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
         url : 'https://hakimlivsgroup5.herokuapp.com/removeproduct',
         headers: {
          'Authorization': StringToSend,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Mehtods':'GET, POST, DELETE'
        },
         type: "GET",
         crossDomain: true,
         dataType: 'json',
         data : jsonData,
           success: function(data){
           console.log(data);
           
           },
       
     });
     e.preventDefault();
 });


 $("#edit-btn").click(function(){

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
    console.log(jsonData.product_id)
    
 });

 let uniqueProd = [];

 for (let prod in products) {
   if(products[prod].id == jsonData.product_id){
    uniqueProd.push(products[prod]);
   }
     
}
console.log(uniqueProd);
console.log(uniqueProd[0].title)



let tempOutput = ``;        
let uniqueCat = []; 


const xhr2 = new XMLHttpRequest();
                        xhr2.open("GET", "https://hakimlivsgroup5.herokuapp.com/allCategories");
                        xhr2.send();
                        xhr2.onreadystatechange = function () {
                          if (xhr2.readyState === 4 && xhr2.status === 200) {

                            var output =""
      
    output +=`
    <div class="card">
      <div class="card-header text-secondary">
        <label class="bg-white" style="color:black;">Admin skapa produkt formulär
        </label>
      </div>
        <form id="editform" type="post">
          <div class="card-body">
            <div class="row mb-2 text-muted">
              
                <form class="form-inline">
                  <div class="form-group">
                    <div class="elements">
                        <label for="category">Välj kategori</label>
                      <select class="custom-select custom-select-sm" name="category_id">
                      `
                            let categories = JSON.parse(xhr2.responseText);

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
                          <input id="title" required="required" type="text"  value="${uniqueProd[0].title}" name="title" placeholder="${uniqueProd[0].title}" />
                        </div>
                        <div class="elements">
                          <label for="description">Produktinfo</label>
                          <textarea class="form-control" rows="3" required="required" type="text" value=""
                          id="description" name="description" placeholder="${uniqueProd[0].description}">${uniqueProd[0].description}</textarea>
                        </div>	
                        <div class="elements">
                          <label for="price">Pris</label>
                          <input id="price" required="required" type="number"  value="${uniqueProd[0].price}" name="price" placeholder="${uniqueProd[0].price}" />
                        </div>
                        <div class="elements">
                          <label for="image">Sökväg till bild</label>
                          <input id="image" required="required" value="${uniqueProd[0].image}" name="image" type="text" size=80 placeholder="${uniqueProd[0].image}" />
                        </div>x
                        <div class="elements">
                          <label for="compprice">Jämförelsepris</label>
                          <input id="compprice" required="required" type="number"  value="${uniqueProd[0].compPrice}" name="compprice" placeholder="${uniqueProd[0].compPrice}"  />
                        </div>
                        <div class="elements">
                          <label for="perprice">Styckpris</label>
                          <input id="perprice" required="required" type="number"  value="${uniqueProd[0].perPrice}" name="perprice" placeholder="${uniqueProd[0].perPrice}" />
                        </div>
                        <div class="elements">
                          <label for="brand">Tillverkare</label>
                          <input id="brand" required="required" type="text"  value="${uniqueProd[0].brand}" name="brand" placeholder="${uniqueProd[0].brand}" />
                        </div>
                        <div class="elements">
                          <label for="amount">Mängd</label>
                          <input id="amount" required="required" type="text"  value="${uniqueProd[0].amount}" name="amount" placeholder="${uniqueProd[0].amount}" />
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

    $("#add-btn").click(function(e){
      
      var jsonData2 = {};
      
      var formData2 = $("#editform").serializeArray();
 
      console.log(formData2)
 
    $.each(formData2, function() {
         if (jsonData2[this.name]) {
           
            if (!jsonData2[this.name].push) {
             
                jsonData2[this.name] = [jsonData2[this.name]];
                
            }
            jsonData2[this.name].push(this.value || '');
            
        } else {
            jsonData2[this.name] = this.value || '';
            
        }       
    });
 
    console.log(jsonData2)
    
     $.ajax(
       {
           url : 'https://hakimlivsgroup5.herokuapp.com/editproduct',
           type: "POST",
           crossDomain: true,
           dataType: 'jsonp',
           data : jsonData2,
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
                          
    





      
  });

}
};

  })
    
