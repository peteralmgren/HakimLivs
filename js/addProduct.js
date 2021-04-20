 $(document).ready(function() {
    $("#add-btn").click(function(e){
       var jsonData = {};
       /* let categoryValue=0; */
       

       var formData = $("#myform").serializeArray();
       /* var categoryData = document.getElementById("#category"); */
       //jsonData[0]=categoryData.name+":"+categoryValue;
       /* categoryData.value=categoryValue;
       console.log(categoryData.value+" "+ category.id); */
       /* console.log(categoryData.name); */
 
      
     $.each(formData, function() {
          if (jsonData[this.name]) {
            
             if (!jsonData[this.name].push) {
              
                 jsonData[this.name] = [jsonData[this.name]];
                 //jsonData[categoryData] = [jsonData[categoryData]];
             }
             jsonData[this.name].push(this.value || '');
             //jsonData[categoryData].push(categoryData || '');
         } else {
             jsonData[this.name] = this.value || '';
             //jsonData[categoryData.value] = categoryValue || '';
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
          complete: function(data) {
            console.log(data.responseText);
        },
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
  }); 

  /* $(".dropdown-menu li a").click(function(e){

    let categoryValue= 0;
    
    $(".btn:first-child").html($(this).text()+' <span class="caret"></span>');
  
    if(e.delegateTarget.innerHTML==="Frukt"){
      categoryValue=1;      
    }else{
      categoryValue=2;
      
    }
    
  }); */
