const trashCanNodes = document.querySelectorAll('.trashcan');
const plusSignNodes = document.querySelectorAll('.plus');
const minusSignNodes = document.querySelectorAll('.minus');
let totalSum = parseFloat(document.getElementById('total-sum').textContent);

for (let i = 0; i < plusSignNodes.length; i++) {
  plusSignNodes[i].addEventListener('click', (e) => {

    /* Ökar innehållet i varukorgen med 1 */
    const numberOfItemsNode = e.target.previousElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);
    numberOfItemsNode.textContent = oldNrOfItems + 1;

    /* Ökar orderradssumman med priset för en enhet */
    const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
    const oldOrderRowSum = parseInt(orderRowSumElement.textContent);
    const pricePerUnit = oldOrderRowSum / oldNrOfItems;
    const newOrderRowSum = oldOrderRowSum + pricePerUnit;

    /* Ökar totalsumman med priset för en enhet */
    orderRowSumElement.textContent = newOrderRowSum;
    totalSum = totalSum + pricePerUnit;
    document.getElementById('total-sum').textContent = totalSum;
  });

}

for (let i = 0; i < minusSignNodes.length; i++) {
  minusSignNodes[i].addEventListener('click', (e) => {

    /* Minskar innehållet i varukorgen med 1 */
    const numberOfItemsNode = e.target.nextElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);

    if (oldNrOfItems === 1) { return; }

    numberOfItemsNode.textContent = oldNrOfItems - 1;

    /* Minskar orderradssumman med priset för en enhet */
    const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
    const oldOrderRowSum = parseInt(orderRowSumElement.textContent);
    const pricePerUnit = oldOrderRowSum / oldNrOfItems;
    const newOrderRowSum = oldOrderRowSum - pricePerUnit;

    /* Minskar totalsumman med priset för en enhet */
    orderRowSumElement.textContent = newOrderRowSum;
    totalSum = totalSum - pricePerUnit;
    document.getElementById('total-sum').textContent = totalSum;

  });
}

for (let i = 0; i < trashCanNodes.length; i++) {
  trashCanNodes[i].addEventListener('click', (e) => {
    /* Korrigerar orderns totalsumma med att ta bort orderradssumman från totalsumman */
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