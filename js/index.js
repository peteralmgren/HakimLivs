/**
 * Fetch the data from the JSON file and pushes it to Local Storage
 * 
 */
let data = JSON.parse(localStorage.getItem("products"));

if (!data) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data/produkter.JSON");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      localStorage.setItem("products", JSON.stringify(data));
      console.log(data);
    }
  };
}

