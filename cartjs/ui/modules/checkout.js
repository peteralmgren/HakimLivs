import UI from "../ui.js";

export default class Checkout extends UI {
  constructor(appendTo) {
    super(appendTo);
    // this.getAllProducts();
    this.html = `
    <div class="container">
      <div class="row mr-3 p-2">
        <div class="col-9">
          <div class="card" id="Cart-body">
            <div class="card-body">
              <h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-basket-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z"
                  />
                </svg>
                DINA VAROR
              </h3>
              <hr />
              <div class="container-fluid"></div>
              <hr />
              <button
                type="button"
                id="Purchase"
                class="btn btn-primary btn-lg t-1 hover-shadow"
              >
                Bekräfta beställning
              </button>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card">
            <div class="card-body p-2 mr-3">
              <p class="summa-varor" id="Summa-varor">
                Summa varor <span>0 kr</span>
              </p>
              <hr />
              <p class="text-start" id="Leverans">Leverans <span>50 kr</span></p>
              <hr />
              <p class="totalsumma" id="Total-summa">
                Totalsumma <span>0 kr</span>
              </p>
              <hr />
              <p class="text-start" id="Moms">Varav moms <span>0 kr</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>     
    `;
    
    super.container.innerHTML = this.html;
    super.container.addEventListener("click", async (e) => {
      if (e.target.className == "trashcan pe-1") this.deleteRowInCart(e);
      if (e.target.className == "minus") this.decreaseItemsInCartWithOne(e);
      if (e.target.className == "plus") this.increaseItemsInCartWithOne(e);
      this.checkOutBtnText.innerText = this.sum;
    });
    
    this.injectRowItemsInCart();
    this.sum = 0;
    
  }

async injectRowItemsInCart() {
    let allProducts = await super.loadData("GET", "./data/produkter.JSON");
    allProducts = JSON.parse(allProducts);
    let cart = super.readStorage("cart");
    //let sum = 0;
    let row = ``;

    for (let i = 0; i < allProducts.length; i++) {
      if (cart[allProducts[i].id]) {
        this.sum += allProducts[i].price * cart[allProducts[i].id];
        row += `
        <div class="row bg-white mt-1 py-2 align-items-center border rounded" id="">
        <div class="col-1 p-1">
          <img class="img-fluid" src="${allProducts[i].image}" alt="Produktbild">
        </div>
        <div class="col-4">
          <div>
            <p class="brand m-0">AXA</p>
            <h5 class="fw-bold m-0 title">${allProducts[i].title}</h5>
          </div>
        </div>
        <div class="col-3 text-end px-0">
          <div class="flex">
            <img class="minus" data-product-id="${allProducts[i].id}" src="./icons/minus.png" alt="minus" width="20px"> 
            <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${cart[allProducts[i].id]}</button>
            <img class="plus" data-product-id="${allProducts[i].id}" src="./icons/plus.png" alt="plus" width="20px">
          </div>
        </div>
        <div class="col-3 px-0">
          <div class="d-flex justify-content-end">
            <div class="price fw-bold px-0 mx-0">${(allProducts[i].price * cart[allProducts[i].id]).toFixed(2)}</div>
            <div class="px-0 ms-1">kr</div>
          </div>
        </div>
        <div class="col-1 m-auto text-end px-0" id="trash">
          <img class="trashcan pe-1" data-product-id="${allProducts[i].id}" src="./icons/delete.png" alt="Soptunna" width="25px">
        </div>
      </div>
      `;
      }
    }

    row += `
    <div class="row bg-white mb-1 p-1 align-items-center border rounded">
    <!-- Modal, totalsumma START -->
    <div class="col-1 p-1"></div>
    <div class="col-4"></div>
    <div class="col-3 text-end">
      <div>
        <span class="fw-bold px-0 mx-0">Summa:</span>
      </div>
    </div>
    <div class="col-3 m-auto text-center">
      <div class="d-flex justify-content-end">
        <div class="fw-bold px-0 mx-0" id="total-sum">${this.sum}</div>
        <div class="px-0 ms-1">kr</div>
      </div>
      <div class="col-1 m-auto text-end px-0" id="trash">
      </div>
    </div>
    `;

    this.updatePrice();
    document.getElementsByClassName("container-fluid")[0].innerHTML = row;
    this.checkOutBtnText.innerText = this.sum.toFixed(2);
    
} 

  

  /** This function will do two things:
   *  decrease the total sum with the order row sum and delete the order row from det shopping cart */
  deleteRowInCart(e) {
    const totalSumElement = document.getElementById('total-sum');
    let totalSum = parseFloat(totalSumElement.textContent);
    const orderRowSum = parseFloat(e.target.parentNode.previousElementSibling.children[0].children[0].textContent);
    totalSum = (totalSum - orderRowSum).toFixed(2);
    totalSumElement.textContent = totalSum;
    e.target.parentNode.parentNode.remove();
    this.sum = totalSum;
    super.clearFromCart(e.target.dataset.productId);
    this.updatePrice();
   
    
  }

  /** This for loop assigns event listeners to all minus sign icons. The anonymous function will do three things:
  *  decrease the number of items in the basket with one, decrease the order row sum with the price of one unit and decrease the total sum with the price of one unit */
  decreaseItemsInCartWithOne(e) {
    const totalSumElement = document.getElementById('total-sum');
    let totalSum = parseFloat(totalSumElement.textContent);
    const numberOfItemsNode = e.target.nextElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);

    /* This if statement makes sure that the minimum amount of items in the cart is 1. If the users wants to delete all items they has to click on the trashcan */
    if (oldNrOfItems === 1) { return; }

    numberOfItemsNode.textContent = oldNrOfItems - 1;

    const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
    const oldOrderRowSum = parseInt(orderRowSumElement.textContent);
    const pricePerUnit = oldOrderRowSum / oldNrOfItems;
    const newOrderRowSum = (oldOrderRowSum - pricePerUnit).toFixed(2);

    orderRowSumElement.textContent = newOrderRowSum;
    totalSum = (totalSum - pricePerUnit).toFixed(2);
    totalSumElement.textContent = totalSum;
    this.sum = totalSum;
    super.removeFromCart(e.target.dataset.productId);
    this.updatePrice();
  }

  /** This function will do three things:
  *  increase the number of items in the basket with one, increase the order row sum with the price of one unit and increase the total sum with the price of one unit */
  increaseItemsInCartWithOne(e) {
    const totalSumElement = document.getElementById('total-sum');
    let totalSum = parseFloat(totalSumElement.textContent);

    const numberOfItemsNode = e.target.previousElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);
    numberOfItemsNode.textContent = oldNrOfItems + 1;

    const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
    const oldOrderRowSum = parseInt(orderRowSumElement.textContent);
    const pricePerUnit = oldOrderRowSum / oldNrOfItems;
    const newOrderRowSum = (oldOrderRowSum + pricePerUnit).toFixed(2);

    orderRowSumElement.textContent = newOrderRowSum;
    totalSum = (totalSum + pricePerUnit).toFixed(2);
    totalSumElement.textContent = totalSum;
    this.sum = totalSum;
    super.addToCart(e.target.dataset.productId);
    this.updatePrice();
  }

  updatePrice(){
    document.querySelector('.summa-varor span').textContent = this.sum + " kr";
    document.querySelector('.totalsumma span').textContent = this.sum*1 + 50 +" kr"
  }

}




