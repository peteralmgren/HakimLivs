$(document).ready(function () {
  let response = "";

  $("#createuser").click(function (e) {
    var jsonData = {};
    var formData = $("#myform").serializeArray();
    $.each(formData, function () {
      if (jsonData[this.name]) {
        if (!jsonData[this.name].push) {
          jsonData[this.name] = [jsonData[this.name]];
        }
        jsonData[this.name].push(this.value || "");
      } else {
        jsonData[this.name] = this.value || "";
      }
      console.log(jsonData);
    });

    $.ajax({
      url: "https://hakimlivsgroup5.herokuapp.com/account",
      type: "POST",
      crossDomain: true,
      dataType: "text",
      data: jsonData,
      complete: function(data){
        console.log(data);
        alert(data);        
      },
      success: function (data) {
        console.log(data);
        response = data;
        console.log(response);
      },

      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    setTimeout(()=>{
    location.replace("index.html");
    }, 2000);

  
  });
});
