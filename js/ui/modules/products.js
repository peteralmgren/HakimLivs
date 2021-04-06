import UI from "../ui.js";

export default class Products extends UI {
  constructor(appendTo) {
    super(appendTo);
    super.container.addEventListener("click", async (e) => {
      if(e.target.classList.contains("btn") && e.target.dataset.productId) super.addToCart(e.target.dataset.productId);
    });

    //this.showAllProductsInCategory("mejeri");
  }

  // jag kan göra en array med kategorier. En for-loop skapar upp nya event-
  // listeners och lägger

  showCategory(index) {
    this.showAllProductsInCategory(index);
  }

  async showAllProductsInCategory(category) {
    let allProductsArray = await super.loadData("GET", "./data/produkter.JSON");
    
    allProductsArray = JSON.parse(allProductsArray);
    let newProducts = JSON.parse(localStorage.getItem('newproduct'))

    if(newProducts){
    newProducts.forEach(element => {
      console.log(element);
      allProductsArray.push(element);
    })
  }
    
    let output = ``;
    let counter = 1;

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
          <a class="btn btn-primary" data-product-id="${allProductsArray[index].id}">Lägg till varukorg</a>
          </div>
          </div>
          </div>`;

        if (counter == 4) {
          output += "</div>";
        }
        counter += 1;
      }
    }
    super.container.innerHTML = output;
  }

  async showProducts() {
    let allProductsArray = await super.loadData("GET", "./data/produkter.JSON");
    allProductsArray = JSON.parse(allProductsArray);
    
    console.log(allProductsArray);
    let randomProductsArray = [];
    randomProductsArray = this.randomizer();

    let output = "";
    let counter = 1;

    for (let index = 0; index < allProductsArray.length; index++) {
      if (counter == 5) {
        counter = 1;
      }

      let index2 = 0;
      index2 = randomProductsArray[index];

      if (counter == 1) {
        output += `<div class="row">`;
      }

      output +=
        `<div class="col-lg-3 col-md-3 mb-3">
          <div class="card h-100 rounded">
            <div class="card-body text-center">
              <img class="card-img-top" src="${allProductsArray[index2].image}">
              <p class="card-text">Pris ${allProductsArray[index2].price} kr</p>
              <h6 class="card-title">${allProductsArray[index2].title}</h6>
              <button class="buy-btn btn btn-primary" data-product-id="${allProductsArray[index2].id}">Lägg till varukorg</button>
            </div>
          </div>
        </div>`;

      if (counter == 4) {
        output += "</div>";
      }
      counter += 1;
    }

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

    // /* This function will get all products from the "server" and then return them in a map with the productID as the key */
  // static getSpecificProduct(id) {
  //   console.log(allProducts);
  //   allProducts.forEach((product) => {
  //     if (product.id === id) return product;
  //   });
  // }

  getBuyButtons() {
    const buyBtns = [...document.querySelectorAll('.buy-btn')];
    console.log(buyBtns);
  }



}
