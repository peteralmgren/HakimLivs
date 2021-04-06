
$(document).ready(function() {
    $("#add-btn").click(function(e){
       var jsonData = {};
       
       
     var formData = $("#myform").serializeArray();
     let newProduct = "";
     let newProductArray = [];
     
         if(JSON.parse(localStorage.getItem("newproduct"))){
            newProductArray = JSON.parse(localStorage.getItem("newproduct"));
          }else{
            newProductArray= [];
            
          }
        /* console.log(formData);
        console.log(jsonData); */
     
     $.each(formData, function() {
          if (jsonData[this.name]) {
             if (!jsonData[this.name].push) {
                 jsonData[this.name] = [jsonData[this.name]];
             }
             jsonData[this.name].push(this.value || '');
         } else {
             jsonData[this.name] = this.value || '';
         }
         console.log(formData[0].value);

         

         /* newProductArray= JSON.parse(localStorage.getItem("newProducts")) */
         console.log(newProductArray);

            newProduct = {
            "id": formData[0].value,
            "title": formData[2].value,
            "description": formData[3].value,
            "image": formData[5].value,
            "price": formData[4].value,
            "category": formData[1].value 
            }
        console.log(newProduct);
        
        
        
        
        
        /* newProduct.array.forEach(element => {
            console.log("ny produkt: " + element);
        }); */
             
         
         

         /* const fs = require("fs");
         let usersjson = fs.readFileSync("data/produkter.json","utf-8");

         let products = JSON.parse(usersjson);

         product.push(newProduct);

         usersjson = JSON.stringify(products);

         fs.writeFileSync("produkter.json",usersjson,"utf-8"); */


     });
     newProductArray.push(newProduct);
     localStorage.setItem("newproduct", JSON.stringify(newProductArray));
     /* jsonData.forEach(element => {
         console.log("Element: " + element);
     }) */
     

     /* for (let i = 0; i < jsonData.length; i++) {
        let element = jsonData[i];
        console.log("element i jsonarray: "+element);
        
    } */

     
      $.ajax(
      {
          url : "action.php",
          type: "POST",
          data : jsonData,
          
      });
      e.preventDefault();	
  }); 
  });
  


  function export2txt() {
      console.log("i export 2 file");
    const originalData = {
      members: [{
          name: "cliff",
          age: "34"
        },
        {
          name: "ted",
          age: "42"
        },
        {
          name: "bob",
          age: "12"
        }
      ]
    };
    
    let oldProdukter = JSON.parse(localStorage.getItem("products"));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(originalData, null, 2)], {
      type: "text/plain"
    }));
    
    a.setAttribute("nyfil", "data");
    document.body.appendChild(a);

    /* a.save("./data"); */
    a.click();
    document.body.removeChild(a);
  }