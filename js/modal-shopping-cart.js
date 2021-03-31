let totalSum = parseFloat($('#total-sum').text()); 


const plusSign = document.getElementsByClassName(plus);



$(document).ready(function () {
  $(document).on('click', '.plus', function () {

    const oldNrOfItems = parseInt($(this).prev().text());
    $(this).prev().text(oldNrOfItems + 1);
    
    const priceHtml = $(this).parent().parent().next().children('span.price');
    const oldPrice = parseInt(priceHtml.text());
    const newPrice = oldPrice + (oldPrice / oldNrOfItems);
    priceHtml.text(newPrice);

    totalSum = totalSum + (oldPrice / oldNrOfItems);
    $('#total-sum').text(totalSum);

    // const id = parseInt($(this).parent().parent().parent().attr('id'));
    // adjustAmountOfProductsInCartInLS(id, 'plus');

  });
});

$(document).ready(function () {
  $(document).on('click', '.minus', function () {
    
    const oldNrOfItems = parseInt($(this).next().text());

    if (oldNrOfItems === 1) {
      // alertMessage('Oj! Nu blev det lite fel...', 'Klicka på soptunnan om du vill ta bort produkten helt från beställningen.');
      return;
    }

    $(this).next().text(oldNrOfItems - 1);

    const priceHtml = $(this).parent().parent().next().children('span.price');
    const oldPrice = parseInt(priceHtml.text());
    const pricePerUnit = oldPrice / oldNrOfItems;
    const newPrice = oldPrice - pricePerUnit;
    totalSum = totalSum - pricePerUnit;
    priceHtml.text(newPrice);
    $('#total-sum').text(totalSum);

    // const id = parseInt($(this).parent().parent().parent().attr('id'));
    // adjustAmountOfProductsInCartInLS(id, 'minus');

  });
});

$(document).ready(function () {
  $(document).on('click', '.trashcan', function () {
    // korrigera orderns totalsumma med att ta bort orderradssumman från totalsumman
    const orderRowSum = parseFloat($(this).parent().prev().text());
    totalSum = totalSum - orderRowSum;
    $('#total-sum').text(totalSum);

    // const id = parseInt($(this).parent().parent().attr('id'));
    // cart.delete(id);
    // localStorage.setItem('cart', JSON.stringify(Array.from(cart)));

    $(this).parent().parent().remove();
  });
});

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