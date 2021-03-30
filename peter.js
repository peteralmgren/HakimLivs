let data = localStorage.getItem("products");


if (!data) {
    // if no data in localStorage then fetch your data
    data = JSON.parse("produkter.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("products", JSON.stringify(data));
        dataOutput(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    data = JSON.parse(localStorage.getItem("products"));
    dataOutput(data);
  }

  function dataOutput(data){
      // output data
  }