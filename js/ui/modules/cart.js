import UI from "../ui.js";

export default class Cart extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.html=`
        <div class="modal fade" id="shopping-cart" tabindex="-1">
            <!-- Modal, varukorg START -->
            <div class="modal-dialog modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Varukorg</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body bg-light">
                  <div class="container-fluid">
                    <div class="row bg-white mt-1 py-2 align-items-center border rounded" id="">
                      <!-- Modal, orderrad START -->
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
                        <img class="trashcan pe-1" src="./icons/delete.png" alt="Soptunna" width="25px">
                      </div>
                    </div><!-- Modal, orderrad SLUT -->
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
                          <div class="fw-bold px-0 mx-0" id="total-sum">15</div>
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
                        <button type="button" class="btn btn-success"><a class="text-decoration-none text-white"
                            href="cart.html">Till kassan</a></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- Modal, varukorg SLUT --></div>
          `;
          super.container.innerHTML = this.html;
    }
  }