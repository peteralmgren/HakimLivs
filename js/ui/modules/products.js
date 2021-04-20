import UI from "../ui.js";

export default class Products extends UI {
  constructor(appendTo) {
    super(appendTo);
    super.container.addEventListener("click", async (e) => {
      if (e.target.className == "minus"){
        this.decreaseItemsInCartWithOne(e);
        location.reload();
      } 
      if (e.target.className == "plus"){
        this.increaseItemsInCartWithOne(e);
        location.reload();
      
      }
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
    let allProductsArray = await super.loadData("GET", "https://grupp5hakimlivs.herokuapp.com/all");
    let cart = super.readStorage("cart");
    
    allProductsArray = JSON.parse(allProductsArray);
    let newProducts = JSON.parse(localStorage.getItem('newproduct'))

    if(newProducts){
    newProducts.forEach(element => {
      allProductsArray.push(element);
    })
  }
    
    let output = ``;
    let counter = 1;

    for (let index = 0; index < 14; index++) {
      let value = cart[allProductsArray[index].id];
      if(value == undefined){
        value = 0;
      }
      if (counter == 5) {
        counter = 1;
      }

      if (allProductsArray[index].category.categoryName == category) {
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
              <a class="btn btn-outline-secondary" data-bs-toggle="modal" href="#modal${index}" role="button">Info</a>
              <br>
              <br>
              <img class="minus" data-product-id="${allProductsArray[index].id}" src="./icons/minus.png" alt="minus" width="20px"> 
              <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${value}</button>
              <img class="plus" data-product-id="${allProductsArray[index].id}" src="./icons/plus.png" alt="plus" width="20px">
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
          <div class="col-3 text-end px-0">
          <div class="flex">
          <img class="minus" data-product-id="${allProductsArray[index].id}" src="./icons/minus.png" alt="minus" width="20px"> 
          <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${value}</button>
          <img class="plus" data-product-id="${allProductsArray[index].id}" src="./icons/plus.png" alt="plus" width="20px">
          </div>
        </div>
            
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
    let allProductsArray = await super.loadData("GET", "https://grupp5hakimlivs.herokuapp.com/all");
    allProductsArray = JSON.parse(allProductsArray);
    console.log(allProductsArray);
    let cart = super.readStorage("cart");
    
    let randomProductsArray = [];
    randomProductsArray = this.randomizer();

    let output = "";
    let counter = 1;

    for (let index = 0; index < 14; index++) {
      /*let value = cart[allProductsArray[index].id];
      if(value == undefined){
        value = 0;
      }*/
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
              <a class="btn btn-outline-secondary" data-bs-toggle="modal" href="#modal${index2}" role="button">Info</a>
              <br>
              <br>
              <img class="minus" data-product-id="${allProductsArray[index].id}" src="./icons/minus.png" alt="minus" width="20px"> 
              <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${0}</button>
              <img class="plus" data-product-id="${allProductsArray[index].id}" src="./icons/plus.png" alt="plus" width="20px">
      
              
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
          <div class="col-3 text-end px-0">
          <div class="flex">
          <img class="minus" data-product-id="${allProductsArray[index].id}" src="./icons/minus.png" alt="minus" width="20px"> 
          <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${0}</button>
          <img class="plus" data-product-id="${allProductsArray[index].id}" src="./icons/plus.png" alt="plus" width="20px">
          </div>
        </div>
            
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
    let allProductsArray = await super.loadData("GET", "https://grupp5hakimlivs.herokuapp.com/all");
    allProductsArray = JSON.parse(allProductsArray);
    let cart = super.readStorage("cart");

    let tempArray = [];
    let newProductArray = [];

    for(let i = 0; i<14; i++){
      tempArray.push(allProductsArray[i]);
      console.log(allProductsArray[i]);
    }

    if(value.length > 2){
      for(let i in tempArray){
        if(tempArray[i].title.toUpperCase() === value.toUpperCase() || tempArray[i].category.categoryName.toUpperCase() === value.toUpperCase()){
          newProductArray.push(tempArray[i]);
          console.log(tempArray[i]);     
        }
      }  

      let output = ``;
    let counter = 1;

    for (let index = 0; index < 14; index++) {
      let number = cart[tempArray[index].id];
      if(number == undefined){
        number = 0;
      }
      if (counter == 5) {
        counter = 1;
      }

      if (tempArray[index].title.toUpperCase() === value.toUpperCase() || tempArray[index].category.categoryName.toUpperCase() === value.toUpperCase()) {
        if (counter == 1) {
          output += `<div class="row">`;
        }

        output +=
          `<div class="col-lg-3 col-md-3 mb-3">
          <div class="card h-100 rounded">
            <div class="card-body text-center">
              <img class="card-img-top" src="${tempArray[index].image}">
              <p class="card-text">Pris ${(tempArray[index].price.toFixed(2)).replace(".", ",")} kr</p>
              <h6 class="card-title">${tempArray[index].title}</h6>
              <button class="buy-btn btn btn-primary" data-product-id="${tempArray[index].id}">Lägg till varukorg</button>
              <a class="btn btn-outline-secondary" data-bs-toggle="modal" href="#modal${index}" role="button">Info</a>
              <br>
              <br>
              <img class="minus" data-product-id="${tempArray[index].id}" src="./icons/minus.png" alt="minus" width="20px"> 
              <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${number}</button>
              <img class="plus" data-product-id="${tempArray[index].id}" src="./icons/plus.png" alt="plus" width="20px">
            </div>
          </div>
        </div>
        <div class="modal fade" id="modal${index}" aria-hidden="true" aria-labelledby="..." tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="card h-100 rounded">
            <div class="card-body text-center">
            <h6 class="card-title">${tempArray[index].title}</h6>
              <img class="card-img-top" src="${tempArray[index].image}">
              <h6>Pris: ${(tempArray[index].price.toFixed(2)).replace(".", ",")} kr</h6>
              <p class="card-text"><br>
              ${tempArray[index].description}"              
              </p>
                            
              <button class="buy-btn btn btn-primary" data-product-id="${tempArray[index].id}">Lägg till varukorg</button>
            </div>
          </div>
          <div class="modal-footer">
          <div class="col-3 text-end px-0">
          <div class="flex">
          <img class="minus" data-product-id="${tempArray[index].id}" src="./icons/minus.png" alt="minus" width="20px"> 
          <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${number}</button>
          <img class="plus" data-product-id="${tempArray[index].id}" src="./icons/plus.png" alt="plus" width="20px">
          </div>
        </div>
            
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


  /** This for loop assigns event listeners to all minus sign icons. The anonymous function will do three things:
  *  decrease the number of items in the basket with one, decrease the order row sum with the price of one unit and decrease the total sum with the price of one unit */
  decreaseItemsInCartWithOne(e) {
    const numberOfItemsNode = e.target.nextElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);

    /* This if statement makes sure that the minimum amount of items in the cart is 1. If the users wants to delete all items they has to click on the trashcan */
    if (oldNrOfItems === 1) { return; }

    numberOfItemsNode.textContent = oldNrOfItems - 1;

    super.removeFromCart(e.target.dataset.productId);
  }

  /** This function will do three things:
  *  increase the number of items in the basket with one, increase the order row sum with the price of one unit and increase the total sum with the price of one unit */
  increaseItemsInCartWithOne(e) {
    console.log("lägger till")
  
    const numberOfItemsNode = e.target.previousElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);
    if (oldNrOfItems === 20) { return; }


    numberOfItemsNode.textContent = oldNrOfItems + 1;

    
    super.addToCart(e.target.dataset.productId);
  }
}
