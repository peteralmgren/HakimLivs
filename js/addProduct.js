 $(document).ready(function() {
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
        
     });
     
      $.ajax(
      {
          url : 'https://grupp5hakimlivs.herokuapp.com/addproduct',
          type: "POST",
          crossDomain: true,
          dataType: 'jsonp',
          data : jsonData,
          headers: {
            accept: "application/json",
            "Access-Control-Allow-Origin":"*"
            
        }
          
      });
      e.preventDefault();   
  }); 
  }); 

