$(document).ready(function() {
    $("#Purchase").click(function(e){
       
       var jsonData = {}

        

       var test = {'title':'jsontest','description':'json', 'price':4, 'image':'json', 'category_id':2}

       var test2 = {'customer_id':12}

      
       /* $.each(formData, function() {
          if (jsonData[this.name]) {
            
             if (!jsonData[this.name].push) {
              
                 jsonData[this.name] = [jsonData[this.name]];
                 
             }
             jsonData[this.name].push(this.value || '');
             
         } else {
             jsonData[this.name] = this.value || '';
             
         }
        console.log(jsonData)
     }); */ 
 
     console.log(test2)
     
      $.ajax(
      {
          url : 'https://hakimlivsgroup5.herokuapp.com/addorder',
          type: "POST",
          crossDomain: true,
          dataType: 'jsonp',
          data : test2,
          /* complete: function(data) {
            console.log(data.responseText);
        },
        success: function(data){
          console.log(data);
      }, */
          headers: {
            accept: "application/json",
            "Access-Control-Allow-Origin":"*"
            
        }
          
      });
      e.preventDefault();
  }); 
  }); 