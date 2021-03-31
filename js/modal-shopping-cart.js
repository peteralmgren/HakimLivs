const trashCanNodes = document.querySelectorAll('.trashcan');
const plusSignNodes = document.querySelectorAll('.plus');
const minusSignNodes = document.querySelectorAll('.minus');
let totalSum = parseFloat(document.getElementById('total-sum').textContent);

/** This for loop assigns event listeners to all plus sign icons. The anonymous function will do three things:
 *  1. increase the number of items in the basket with one
 *  2. increase the order row sum with the price of one unit
 *  3. increase the total sum with the price of one unit */

for (let i = 0; i < plusSignNodes.length; i++) {
  plusSignNodes[i].addEventListener('click', (e) => {

    const numberOfItemsNode = e.target.previousElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);
    numberOfItemsNode.textContent = oldNrOfItems + 1;

    const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
    const oldOrderRowSum = parseInt(orderRowSumElement.textContent);
    const pricePerUnit = oldOrderRowSum / oldNrOfItems;
    const newOrderRowSum = oldOrderRowSum + pricePerUnit;

    orderRowSumElement.textContent = newOrderRowSum;
    totalSum = totalSum + pricePerUnit;
    document.getElementById('total-sum').textContent = totalSum;
  });

}

/** This for loop assigns event listeners to all minus sign icons. The anonymous function will do three things:
 *  1. decrease the number of items in the basket with one
 *  2. decrease the order row sum with the price of one unit
 *  3. decrease the total sum with the price of one unit */

for (let i = 0; i < minusSignNodes.length; i++) {
  minusSignNodes[i].addEventListener('click', (e) => {

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
    document.getElementById('total-sum').textContent = totalSum;

  });
}

/** This for loop assigns event listeners to all trashcan icons. The anonymous function will do two things:
 *  1. decrease the total sum with the order row sum
 *  2. delete the order row from det shopping cart */

for (let i = 0; i < trashCanNodes.length; i++) {
  trashCanNodes[i].addEventListener('click', (e) => {

    const orderRowSum = parseFloat(e.target.parentNode.previousElementSibling.children[0].children[0].textContent);
    console.log(orderRowSum);
    totalSum = totalSum - orderRowSum;
    document.getElementById('total-sum').textContent = totalSum;

    e.target.parentNode.parentNode.remove();
  });

}

function alertMessage(aHeadLine, aMessage) {
  const modal = ` <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">${aHeadLine}</h5>
                        </div>
                        <div class="modal-body">${aMessage}</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Stäng</button>
                        </div>
                    </div>
                  </div>`;
  messageHtml.append(modal);
  messageHtml.modal('show');
}