import UI from "../ui.js";
import Cart from "./cart.js";

export default class Products extends UI {
  constructor(appendTo) {
    super(appendTo);
    super.container.addEventListener("click", async (e) => {
      if(e.target.classList.contains("btn") && e.target.dataset.productId) {
        super.addToCart(e.target.dataset.productId);
        window.location.reload(); 
      };

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
      allProductsArray.push(element);
    })
  }
    
    let output = ``;
    let counter = 1;

    for (let index = 0; index < allProductsArray.length; index++) {
      if (counter == 5) {
        counter = 1;
      }

      if (allProductsArray[index].category == category) {
        if (counter == 1) {
          output += `<div class="row">`;
        }

        output +=
          `<div class="col-lg-3 col-md-3 mb-3">
          <div class="card h-100 rounded">
            <div class="card-body text-center">
              <img class="card-img-top" src="${allProductsArray[index].image}">
              <p class="card-text">Pris ${(allProductsArray[index].price.toFixed(2)).replace(".", ",")} kr</p>
              <h6 class="card-title">${allProductsArray[index].title}</h6>
              <button class="buy-btn btn btn-primary" data-product-id="${allProductsArray[index].id}">Lägg till varukorg</button>
              <a class="btn btn-primary" data-bs-toggle="modal" href="#modal${index}" role="button">Info</a>
            </div>
          </div>
        </div>
        <div class="modal fade" id="modal${index}" aria-hidden="true" aria-labelledby="..." tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="card h-100 rounded">
            <div class="card-body text-center">
            <h6 class="card-title">${allProductsArray[index].title}</h6>
              <img class="card-img-top" src="${allProductsArray[index].image}">
              <h6>Pris: ${(allProductsArray[index].price.toFixed(2)).replace(".", ",")} kr</h6>
              <p class="card-text"><br>
              ${allProductsArray[index].description}"              
              </p>
                            
              <button class="buy-btn btn btn-primary" data-product-id="${allProductsArray[index].id}">Lägg till varukorg</button>
            </div>
          </div>
          <div class="modal-footer">
            
          </div>
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
              <p class="card-text">Pris ${(allProductsArray[index2].price.toFixed(2)).replace(".", ",")} kr</p>
              <h6 class="card-title">${allProductsArray[index2].title}</h6>
              <button class="buy-btn btn btn-primary" data-product-id="${allProductsArray[index2].id}">Lägg till varukorg</button>
              <a class="btn btn-primary" data-bs-toggle="modal" href="#modal${index2}" role="button">Info</a>
            </div>
          </div>
        </div>
        <div class="modal fade" id="modal${index2}" aria-hidden="true" aria-labelledby="..." tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="card h-100 rounded">
            <div class="card-body text-center">
            <h6 class="card-title">${allProductsArray[index2].title}</h6>
              <img class="card-img-top" src="${allProductsArray[index2].image}">
              <h6>Pris: ${(allProductsArray[index2].price.toFixed(2)).replace(".", ",")} kr</h6>
              <p class="card-text"><br>
              ${allProductsArray[index2].description}"              
              </p>
                            
              <button class="buy-btn btn btn-primary" data-product-id="${allProductsArray[index2].id}">Lägg till varukorg</button>
            </div>
          </div>
          <div class="modal-footer">
            
          </div>
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

  async showAllProductsInSearch(value){
    let allProductsArray = await super.loadData("GET", "./data/produkter.JSON");
    allProductsArray = JSON.parse(allProductsArray);

    let newProductArray = [];

    if(value.length > 2){
      for(let i in allProductsArray){
        if(allProductsArray[i].title.toUpperCase() === value.toUpperCase() || allProductsArray[i].category.toUpperCase() === value.toUpperCase()){
          newProductArray.push(allProductsArray[i]);
          console.log(allProductsArray[i]);     
        }
      }  

      let output = ``;
    let counter = 1;

    for (let index = 0; index < newProductArray.length; index++) {
      if (counter == 5) {
        counter = 1;
      }

      if (newProductArray[index].title.toUpperCase() === value.toUpperCase() || newProductArray[index].category.toUpperCase() === value.toUpperCase()) {
        if (counter == 1) {
          output += `<div class="row">`;
        }

        output +=
          `<div class="col-lg-3 col-md-3 mb-3">
          <div class="card h-100 rounded">
            <div class="card-body text-center">
              <img class="card-img-top" src="${newProductArray[index].image}">
              <p class="card-text">Pris ${(newProductArray[index].price.toFixed(2)).replace(".", ",")} kr</p>
              <h6 class="card-title">${newProductArray[index].title}</h6>
              <button class="buy-btn btn btn-primary" data-product-id="${newProductArray[index].id}">Lägg till varukorg</button>
              <a class="btn btn-primary" data-bs-toggle="modal" href="#modal${index}" role="button">Info</a>
            </div>
          </div>
        </div>
        <div class="modal fade" id="modal${index}" aria-hidden="true" aria-labelledby="..." tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="card h-100 rounded">
            <div class="card-body text-center">
            <h6 class="card-title">${newProductArray[index].title}</h6>
              <img class="card-img-top" src="${newProductArray[index].image}">
              <h6>Pris: ${(newProductArray[index].price.toFixed(2)).replace(".", ",")} kr</h6>
              <p class="card-text"><br>
              ${newProductArray[index].description}"              
              </p>
                            
              <button class="buy-btn btn btn-primary" data-product-id="${newProductArray[index].id}">Lägg till varukorg</button>
            </div>
          </div>
          <div class="modal-footer">
            
          </div>
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
    else{
      this.showProducts();
    }

    
    

  }

  randomizer() {
    let randomProducts = [];
    let r = 0;
    //random number 1-15 into an array
    while (randomProducts.length < 15) {
      if (randomProducts.indexOf(r) === -1) randomProducts.push(r);
      r++;
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
