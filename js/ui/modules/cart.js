import UI from "../ui.js";

export default class Cart extends UI {
  constructor(appendTo) {
    super(appendTo);
    this.html = `
        <div class="modal fade" id="shopping-cart" tabindex="-1">
            <!-- Modal, varukorg START -->
            <div class="modal-dialog modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Varukorg</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="window.location.reload()"></button>
                </div>
                <div class="modal-body bg-light">
                  <div class="container-fluid">

                  <!-- Modal, orderrad START -->

                    <div class="row bg-white mt-1 py-2 align-items-center border rounded" id="">
                      <div class="col-1 p-1">
                      </div>
                      <div class="col-4">
                        <div>
                        
                        </div>
                      </div>
                      <div class="col-3 text-end px-0">
                        <div class="flex">
                          <img class="minus" src="./icons/minus.png" alt="minus" width="20px"> <button
                            class="border border-secondary bg-white px-2 rounded" id="amount-of-product"></button> <img
                            class="plus" src="./icons/plus.png" alt="plus" width="20px">
                        </div>
                      </div>
                      <div class="col-3 px-0">
                        <div class="d-flex justify-content-end">
                          <div class="price fw-bold px-0 mx-0"></div>
                          <div class="const-price px-0 ms-1">kr</div>
                        </div>
                      </div>
                      <div class="col-1 m-auto text-end px-0" id="trash">
                        <img class="trashcan pe-1" src="./icons/delete.png" alt="Soptunna" width="25px">
                      </div>
                    </div>
                    
                    <!-- Modal, orderra]d SLUT -->

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
                          <div class="fw-bold px-0 mx-0" id="total-sum"></div>
                          <div class="px-0 ms-1">kr</div>
                        </div>
                        <div class="col-1 m-auto text-end px-0" id="trash">
                        </div>
                      </div>
                    </div><!-- Modal, totalsumma SLUT -->
                  </div>
                  <div class="modal-footer">
                    <div class="container-fluid">
                      <div class="row">
                        <button type="button" class="to-cart btn btn-success">
                        Till kassan
                        </button>
                      </div>
                      <div class="row">
                      <button type="button" class="btn btn-danger">T??m varukorg</button>
                      </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- Modal, varukorg SLUT --></div>
          `;
    super.container.innerHTML = this.html;
    super.container.addEventListener("click", async (e) => {
      if (e.target.className == "trashcan pe-1") this.deleteRowInCart(e);
      if (e.target.className == "minus") this.decreaseItemsInCartWithOne(e);
      if (e.target.className == "plus") this.increaseItemsInCartWithOne(e);
      if (e.target.className == "btn btn-danger") this.clearCart();
      if (e.target.className == "to-cart btn btn-success") {
        if(localStorage.getItem("cart").length > 2 && sessionStorage.getItem("loggedinCustomer")){
          location.replace("cart.html");
        }
        else
        alert("L??gg till varor i varukorgen eller logga in!")
      }
    });
    
    this.injectRowItemsInCart();
    this.sum = 0;
  }

async injectRowItemsInCart() {
  let cost = localStorage.getItem("cost");
  cost = parseFloat(cost).toFixed(2);
    let allProducts = await super.loadData("GET", "https://grupp5hakimlivs.herokuapp.com/all");
    allProducts = JSON.parse(allProducts);
    let cart = super.readStorage("cart");
    //let sum = 0;
    let row = ``;

    for (let i = 0; i < allProducts.length; i++) {
      if (cart[allProducts[i].id]) {
        this.sum += allProducts[i].price * cart[allProducts[i].id];
        row += `
        <div class="row bg-white mt-1 py-2 align-items-center border rounded" id="">
        <div class="col-lg-1 p-1">
          <img class="img-fluid" src="${allProducts[i].image}" alt="Produktbild">
        </div>
        <div class="col-lg-4">
          <div>
            <p class="brand m-0">AXA</p>
            <h6 class="title fw-bold m-0 title">${allProducts[i].title}(${allProducts[i].price}kr)</h6>
          </div>
        </div>
        <div class="col-lg-3 text-end px-0">
          <div class="flex">
            <img class="minus" data-product-id="${allProducts[i].id}" src="./icons/minus.png" alt="minus" width="25px"> 
            <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${cart[allProducts[i].id]}</button>
            <img class="plus" data-product-id="${allProducts[i].id}" src="./icons/plus.png" alt="plus" width="25px">
          </div>
        </div>
        <div class="col-lg-3 px-0">
          <div class="d-flex justify-content-end">
            <div class="price fw-bold px-0 mx-0">${(allProducts[i].price * cart[allProducts[i].id]).toFixed(2)}</div>
            <div class="px-0 ms-1">kr</div>
          </div>
        </div>
        <div class="col-lg-1 m-auto text-end px-0" id="trash">
          <img class="trashcan pe-1" data-product-id="${allProducts[i].id}" src="./icons/delete.png" alt="Soptunna" width="25px">
        </div>
      </div>
      `;
      }
    }

    document.getElementsByClassName("container-fluid")[0].innerHTML = row;
} 

  

  /** This function will do two things:
   *  decrease the total sum with the order row sum and delete the order row from det shopping cart */
  async deleteRowInCart(e) {
    const orderRowSum = parseFloat(e.target.parentNode.previousElementSibling.children[0].children[0].textContent);
    console.log(orderRowSum);
    e.target.parentNode.parentNode.remove();
    super.clearFromCart(e.target.dataset.productId);
    await super.countCost(e.target.dataset.productId, orderRowSum);
    
  }

  /** This for loop assigns event listeners to all minus sign icons. The anonymous function will do three things:
  *  decrease the number of items in the basket with one, decrease the order row sum with the price of one unit and decrease the total sum with the price of one unit */
  async decreaseItemsInCartWithOne(e) {
    const numberOfItemsNode = e.target.nextElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);

    /* This if statement makes sure that the minimum amount of items in the cart is 1. If the users wants to delete all items they has to click on the trashcan */
    if (oldNrOfItems === 1) { return; }

    numberOfItemsNode.textContent = oldNrOfItems - 1;

    const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
    const oldOrderRowSum = parseFloat(orderRowSumElement.textContent);
    const pricePerUnit = oldOrderRowSum / oldNrOfItems;
    const newOrderRowSum = (oldOrderRowSum - pricePerUnit).toFixed(2);

    orderRowSumElement.textContent = newOrderRowSum;
    super.removeFromCart(e.target.dataset.productId);
    await super.countCost(e.target.dataset.productId, "-");
  }

  /** This function will do three things:
  *  increase the number of items in the basket with one, increase the order row sum with the price of one unit and increase the total sum with the price of one unit */
  async increaseItemsInCartWithOne(e) {
    const numberOfItemsNode = e.target.previousElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);
    if (oldNrOfItems === 20) { return; }


    numberOfItemsNode.textContent = oldNrOfItems + 1;

    const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
    const oldOrderRowSum = parseFloat(orderRowSumElement.textContent);
    const pricePerUnit = oldOrderRowSum / oldNrOfItems;
    const newOrderRowSum = (oldOrderRowSum + pricePerUnit).toFixed(2);

    orderRowSumElement.textContent = newOrderRowSum;
    super.addToCart(e.target.dataset.productId);
    await super.countCost(e.target.dataset.productId, "+");
    }

    clearCart(){
      localStorage.clear("cart");
      window.location.reload();
    }

}





