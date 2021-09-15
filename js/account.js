$(document).ready(function () {
  let response = "";
  $("#myform").submit(function (e) {
    alert("Väntar på servern...");
    // e.preventDefault();
  });

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
<<<<<<< HEAD
      url: "https://grupp5hakimlivs.herokuapp.com/account",
      type: "POST",
=======
      url: "https://hakimlivsgroup5.herokuapp.com/account",
      type: "GET",
>>>>>>> 61a0345b3083a0827ef09c971a4859338001d0dd
      crossDomain: true,
      dataType: "text/plain",
      data: jsonData,
      complete: function(data){
        alert(data.responseText);
        console.log(data.responseText)
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

  
  });
});
