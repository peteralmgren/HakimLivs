/*  $(document).ready(function() {
    $("#add-btn").click(function(e){
        console.log("nu är vi i addproduct");
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

     let response = "";
     
      $.ajax(
      {
          url : 'https://grupp5hakimlivs.herokuapp.com/addproduct',
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


      
  }); 
  
  }); 

  $(document).ready(function() {
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

     let response = "";
     
      $.ajax(
      {
          url : 'https://grupp5hakimlivs.herokuapp.com/removeproduct',
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


      
  }); 
  
  }); 
 */