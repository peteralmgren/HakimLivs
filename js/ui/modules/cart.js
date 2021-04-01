import UI from "../ui.js";


export default class Cart extends UI {

  constructor(appendTo) {
    super(appendTo);
    this.html = `
        <div class="modal fade" id="shopping-cart" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Varukorg</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body bg-light">
                  <div class="container-fluid">
                    <div class="row bg-white mt-1 py-2 align-items-center border rounded" id="">       
                      <div class="col-1 p-1">
                        <img class="img-fluid" src="./images/fruit/apples-490474_640.jpg" alt="Produktbild">
                      </div>
                      <div class="col-4">
                        <div>
                          <p class="brand m-0">AXA</p>
                          <h5 class="fw-bold m-0 title">Havregryn</h5>
                        </div>
                      </div>
                      <div class="col-3 text-end px-0">
                        <div class="flex">
                          <img class="minus" src="./icons/minus.png" alt="minus" width="20px"> <button
                            class="border border-secondary bg-white px-2 rounded" id="amount-of-product">1</button> <img
                            class="plus" src="./icons/plus.png" alt="plus" width="20px">
                        </div>
                      </div>
                      <div class="col-3 px-0">
                        <div class="d-flex justify-content-end">
                          <div class="price fw-bold px-0 mx-0">15</div>
                          <div class="px-0 ms-1">kr</div>
                        </div>
                      </div>
                      <div class="col-1 m-auto text-end px-0" id="trash">
                        <img class="trashcan" src="./icons/delete.png" alt="Soptunna" width="25px">
                      </div>
                    </div>                                                                                                 
                    <div class="row bg-white mb-1 p-1 align-items-center border rounded">
                      <div class="col-1 p-1"></div>
                      <div class="col-4"></div>
                      <div class="col-3 text-end">
                        <div>
                          <span class="fw-bold px-0 mx-0">Summa:</span>
                        </div>
                      </div>
                      <div class="col-3 m-auto text-center">
                        <div class="d-flex justify-content-end">
                          <div class="fw-bold px-0 mx-0" id="total-sum">15</div>
                          <div class="px-0 ms-1">kr</div>
                        </div>
                        <div class="col-1 m-auto text-end px-0" id="trash">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-3 px-0">
                    <div class="d-flex justify-content-end">
                      <div class="price fw-bold px-0 mx-0">15</div>
                      <div class="px-0 ms-1">kr</div>
                    </div>
                  </div>
                  <div class="col-1 m-auto text-end px-0" id="trash">
                          <img class="trashcan" src="./icons/delete.png" alt="Soptunna" width="25px">
                      </div>
                  </div>
                  <div class="row bg-white mb-1 p-1 align-items-center border rounded">
                  <div class="col-1 p-1"></div>
                  <div class="col-4"></div>
                  <div class="col-3 text-end">
                    <div>
                      <span class="fw-bold px-0 mx-0">Summa:</span>
                    </div>
                  </div>
                  <div class="col-3 m-auto text-center">
                    <div class="d-flex justify-content-end">
                      <div class="fw-bold px-0 mx-0" id="total-sum">15</div>
                      <div class="px-0 ms-1">kr</div>
                    </div>
                  <div class="col-1 m-auto text-end px-0" id="trash"></div>
                </div>
              </div>
            </div>
          </div>
          </div>`;
    super.container.innerHTML = this.html;
    window.addEventListener("click", async (e) => {
      if (e.target.className == "trashcan") deleteRowInCart(e);
      if (e.target.className == "minus") decreaseItemsInCartWithOne(e);
      if (e.target.className == "plus") increaseItemsInCartWithOne(e);
      
    });
  }


}

/** This function will do two things:
 *  decrease the total sum with the order row sum and delete the order row from det shopping cart */
function deleteRowInCart(e) {
  const totalSumElement = document.getElementById('total-sum');
  let totalSum = parseFloat(totalSumElement.textContent);
  const orderRowSum = parseFloat(e.target.parentNode.previousElementSibling.children[0].children[0].textContent);
  totalSum = totalSum - orderRowSum;
  totalSumElement.textContent = totalSum;

  e.target.parentNode.parentNode.remove();
}

/** This for loop assigns event listeners to all minus sign icons. The anonymous function will do three things:
*  decrease the number of items in the basket with one, decrease the order row sum with the price of one unit and decrease the total sum with the price of one unit */
function decreaseItemsInCartWithOne(e) {
  const totalSumElement = document.getElementById('total-sum');
  let totalSum = parseFloat(totalSumElement.textContent);
  const numberOfItemsNode = e.target.nextElementSibling;
  const oldNrOfItems = parseInt(numberOfItemsNode.textContent);

  if (oldNrOfItems === 1) { return; }

  numberOfItemsNode.textContent = oldNrOfItems - 1;

  const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
  const oldOrderRowSum = parseInt(orderRowSumElement.textContent);
  const pricePerUnit = oldOrderRowSum / oldNrOfItems;
  const newOrderRowSum = oldOrderRowSum - pricePerUnit;

  orderRowSumElement.textContent = newOrderRowSum;
  totalSum = totalSum - pricePerUnit;
  totalSumElement.textContent = totalSum;
}

/** This function will do three things:
*  increase the number of items in the basket with one, increase the order row sum with the price of one unit and increase the total sum with the price of one unit */
function increaseItemsInCartWithOne(e) {
  const totalSumElement = document.getElementById('total-sum');
  let totalSum = parseFloat(totalSumElement.textContent);

  const numberOfItemsNode = e.target.previousElementSibling;
  const oldNrOfItems = parseInt(numberOfItemsNode.textContent);
  numberOfItemsNode.textContent = oldNrOfItems + 1;

  const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
  const oldOrderRowSum = parseInt(orderRowSumElement.textContent);
  const pricePerUnit = oldOrderRowSum / oldNrOfItems;
  const newOrderRowSum = oldOrderRowSum + pricePerUnit;

  orderRowSumElement.textContent = newOrderRowSum;
  totalSum = totalSum + pricePerUnit;
  totalSumElement.textContent = totalSum;
}
