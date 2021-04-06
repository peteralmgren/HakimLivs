
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
     
     $.each(formData, function() {
          if (jsonData[this.name]) {
             if (!jsonData[this.name].push) {
                 jsonData[this.name] = [jsonData[this.name]];
             }
             jsonData[this.name].push(this.value || '');
         } else {
             jsonData[this.name] = this.value || '';
         }
         

            newProduct = {
            "id": formData[0].value,
            "title": formData[2].value,
            "description": formData[3].value,
            "image": formData[5].value,
            "price": formData[4].value,
            "category": formData[1].value 
            }
        
        
        
     });
     newProductArray.push(newProduct);
     localStorage.setItem("newproduct", JSON.stringify(newProductArray));
     

     
      $.ajax(
      {
          url : "action.php",
          type: "POST",
          data : jsonData,
          
      });
      e.preventDefault();	
  }); 
  });
  


  