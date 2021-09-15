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
      url: "https://grupp5hakimlivs.herokuapp.com/account",
      type: "GET",
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
