// let data = JSON.parse(localStorage.getItem("Prodcuts"));
// if (!data){
/*
fetch("frukt.JSON")
  .then((response) => response.text())
  .then((data) => console.log(data))
  .then((data) => JSON.parse(response))
  .then((data) => localStorage.setItem("Prodcuts", JSON.stringify(data)))
  .catch((error) => console.error(error));


*/
let data = JSON.parse(localStorage.getItem("products"));

if (!data) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "frukt.JSON");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      localStorage.setItem("products", JSON.stringify(data));
    }
  };
}
