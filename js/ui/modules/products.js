import UI from "../ui.js";

export default class Products extends UI {
  constructor(appendTo) {
    super(appendTo);
    //this.showAllProductsInCategory("mejeri");
    this.showProducts();
  }

  // jag kan göra en array med kategorier. En for-loop skapar upp nya event-
  // listeners och lägger
  //document.getElementById("fruit").addEventListener("click", showCategory1);
  //document.getElementById("mejeri").addEventListener("click", showCategory2);
  /* document.getElementById("").addEventListener("click", showCategory3);
document.getElementById("").addEventListener("click", showCategory4);
document.getElementById("").addEventListener("click", showCategory5);
document.getElementById("").addEventListener("click", showCategory6);
document.getElementById("").addEventListener("click", showCategory7);
document.getElementById("").addEventListener("click", showCategory8);
document.getElementById("").addEventListener("click", showCategory9);
document.getElementById("").addEventListener("click", showCategory10);
document.getElementById("").addEventListener("click", showCategory11);
document.getElementById("").addEventListener("click", showCategory12);
document.getElementById("").addEventListener("click", showCategory13);
document.getElementById("").addEventListener("click", showCategory14);
document.getElementById("").addEventListener("click", showCategory15);
document.getElementById("").addEventListener("click", showCategory16); */

  showCategory1() {
    this.showAllProductsInCategory("fruit");
  }

  showCategory2() {
    this.showAllProductsInCategory("mejeri");
  }

  async showAllProductsInCategory(category) {
    let allProductsArray = await super.loadData("GET", "./data/produkter.JSON");
    allProductsArray = JSON.parse(allProductsArray);
    let output = ``;
    let counter = 1;
    output += `<div class="container">`;

    for (let index = 0; index < allProductsArray.length; index++) {
      if (counter == 5) {
        counter = 1;
        console.log(counter);
      }

      if (allProductsArray[index].category == category) {
        if (counter == 1) {
          output += `<div class="row">`;
        }

        output +=
          `<div class="col-lg-3 col-md-3 mb-3">
          <div class="card">
          <div class="card-body text-center">
          <img class="card-img-top" src="${allProductsArray[index].image}">
          <p class="card-text">Pris ${allProductsArray[index].price} kr</p>
          <h6 class="card-title">${allProductsArray[index].title}</h6>
          <a class="btn btn-primary" id="product${allProductsArray[index].id}">Köp</a>
          </div>
          </div>
          </div>`;

        if (counter == 4) {
          output += "</div>";
        }
        counter += 1;
      }
    }
    output += "</div>";
    super.container.innerHTML = output;
  }

  async showProducts() {
    let allProductsArray = await super.loadData("GET", "./data/produkter.JSON");
    allProductsArray = JSON.parse(allProductsArray);
    let randomProductsArray = [];
    randomProductsArray = this.randomizer();

    let output = "";
    let counter = 1;

    output += `<div class="container">`;

    for (let index = 0; index < 15; index++) {
      if (counter == 5) {
        counter = 1;
        console.log(counter);
      }

      let index2 = 0;
      index2 = randomProductsArray[index];

      if (counter == 1) {
        output += `<div class="row">`;
      }

      output +=`
        <div class="col-lg-3 col-md-3 mb-3">
        <div class="card">
        <div class="card-body text-center">
        <img class="card-img-top" src="${allProductsArray[index2].image}">
        <p class="card-text">Pris ${allProductsArray[index2].price} kr</p>
        <h6 class="card-title">${allProductsArray[index2].title}</h6>
        <a class="btn btn-primary" id="product${allProductsArray[index2].id}">Köp</a>
        </div>
        </div>
        </div>
        `;

      if (counter == 4) {
        output += "</div>";
      }
      counter += 1;
    }

    output += "</div>";
    super.container.innerHTML = output;
  }

  randomizer() {
    let randomProducts = [];

    //random number 1-15 into an array
    while (randomProducts.length < 15) {
      let r = Math.floor(Math.random() * 15);
      if (randomProducts.indexOf(r) === -1) randomProducts.push(r);
    }

    return randomProducts;
  }
}
