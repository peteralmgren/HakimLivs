import UI from "../ui.js";
import Cart from "./cart.js";

export default class Products extends UI {
  constructor(appendTo) {
    super(appendTo);
    this.cart = new Cart(".cart");
    super.container.addEventListener("click", async (e) => {
      if (e.target.className == "minus"){
        this.decreaseItemsInCartWithOne(e);
        this.showProducts(localStorage.getItem("choice"));
      } 
      if (e.target.className == "plus"){
        console.log(e.target);
        this.increaseItemsInCartWithOne(e);
        this.showProducts(localStorage.getItem("choice"));
      
      }
      if(e.target.classList.contains("btn") && e.target.dataset.productId) {
        this.increaseItemsInCartWithOne(e);
        this.showProducts(localStorage.getItem("choice"));
      };
      
      await this.cart.injectRowItemsInCart();      


    });

    if(!localStorage.getItem("cart")){
      this.addToCart(0);
    }
    if(!localStorage.getItem("choice")){
      localStorage.setItem("choice", "all");
    }
    if(!localStorage.getItem("cost")){
      localStorage.setItem("cost", 0);
    }

    super.countProductsInCart();

  }

  // jag kan göra en array med kategorier. En for-loop skapar upp nya event-
  // listeners och lägger



  /*
  Fetches products from API
  Goes through array of product to find the ones where either title or category matches value and pushes the correct ones into new array
  New array is used to paint products to html page
  */
  async showProducts(data) {
    
    let ProductsArray = await super.loadData("GET", "https://grupp5hakimlivs.herokuapp.com/all");
    ProductsArray = JSON.parse(ProductsArray);
    
    let cart = super.readStorage("cart");

    let allProductsArray = [];

    console.log(ProductsArray);
  
    for(let i = 0; i < ProductsArray.length; i++ ){
      console.log(ProductsArray[i].category.categoryName)
        if(ProductsArray[i].category.categoryName.toUpperCase().includes(data.toUpperCase()) || ProductsArray[i].title.toUpperCase().includes(data.toUpperCase()) || data == "all" || data == ""){
          allProductsArray.push(ProductsArray[i]);
      }
    } 

    console.log(allProductsArray);
    
    let randomProductsArray = [];
    randomProductsArray = this.randomizer();

    let output = "";
    let counter = 1;

    for (let index = 0; index < allProductsArray.length; index++) {
      let value = cart[allProductsArray[index].id];
      if(value == undefined){
        value = 0;
      }
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
              <a class="btn btn-outline-light" data-bs-toggle="modal" href="#modal${index2}" role="button"><img class="card-img-top" src="${allProductsArray[index2].image}" data-product-id="${allProductsArray[index].id}"></a>
              <p class="pris-card card-text">${(allProductsArray[index2].price.toFixed(2)).replace(".", ":")}:-</p>
              <h6 class="card-title">${allProductsArray[index2].title}</h6>`

              if (value == 0){
                output += `<button class="buy-btn btn btn-primary" data-product-id="${allProductsArray[index2].id}">Lägg till varukorg</button>
                `
              }
              else{
                output += `<img class="minus" data-product-id="${allProductsArray[index2].id}" src="./icons/minus.png" alt="minus" width="30px"> 
                <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${value}</button>
                <img class="plus" data-product-id="${allProductsArray[index2].id}" src="./icons/plus.png" alt="plus" width="30px">`
              }
              
              output += `</div>
              </div>
            </div>
            <div class="modal fade" id="modal${index2}" aria-hidden="true" aria-labelledby="..." tabindex="-1">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="card h-100 rounded">
                    <div class="card-body text-center">
                      <h6 class="card-title">${allProductsArray[index2].title}</h6>
                        <img class="card-img-top" src="${allProductsArray[index2].image}">
                      <h6 class="pris-card">${(allProductsArray[index2].price.toFixed(2)).replace(".", ":")}:-</h6>
                        <p class="card-text"><br>
                          ${allProductsArray[index2].description}" 
                          <br>
                          <hr>
                          Styckpris: ${allProductsArray[index2].perPrice}.00 kr/st
                          <br>
                          Jämförpris: ${allProductsArray[index2].compPrice}.00 kr/kg             
                        </p>
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
  async decreaseItemsInCartWithOne(e) {
    const numberOfItemsNode = e.target.nextElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);

    /* This if statement makes sure that the minimum amount of items in the cart is 1. If the users wants to delete all items they has to click on the trashcan */
    if (oldNrOfItems === 1) { return; }

    numberOfItemsNode.textContent = oldNrOfItems - 1;

    super.removeFromCart(e.target.dataset.productId);
    await super.countCost(e.target.dataset.productId, "-");
  }

  /** This function will do three things:
  *  increase the number of items in the basket with one, increase the order row sum with the price of one unit and increase the total sum with the price of one unit */
  async increaseItemsInCartWithOne(e) {
    console.log("lägger till")
  
    const numberOfItemsNode = e.target.previousElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);
    if (oldNrOfItems === 20) { return; }


    numberOfItemsNode.textContent = oldNrOfItems + 1;

    
    super.addToCart(e.target.dataset.productId);
    await super.countCost(e.target.dataset.productId, "+");
  }
}
