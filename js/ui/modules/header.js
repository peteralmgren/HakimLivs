import UI from "../ui.js";

let numberOfProducts = JSON.parse(localStorage.getItem("numberInCart"));
if (numberOfProducts == null)
    numberOfProducts = "";

export default class Header extends UI { 
    constructor(appendTo) {
        super(appendTo);
        this.html = `
        <header>
    <div class="shadow p-3 mb-5 bg-white rounded">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <a class="navbar-brand" href="index.html"
            ><img src="images/logo.png" alt=""
          /></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="input-group">
            <div class="form-outline">
              <input
                class="searchform form-control search input-lg mr-5 p2"
                id="inputlg"
                type="text"
                placeholder="Sök"
              />
              </div>
              <button
              id="search-button"
              type="button"
              class="btn btn-secondary text-nowrap t-1 btn-space hover-shadow">
              <i class="fa fa-search"></i>
              </button>
            </div>
            <ul class="navbar-nav mr-auto mr-4 mt-lg-0">
              <li id="customer-logged-in" class="nav-item">
              ${!sessionStorage.getItem("loggedinCustomer") ? '<button type="button" id="Log-in-button" class="btn btn-secondary btn-lg btn-block text-nowrap t-1 btn-space hover-shadow" data-bs-toggle="modal" data-bs-target="#loginModal">Logga in</button>' : 'Välkommen ' + '<h6 class="logout" type="button">Logga ut</h6>'}
              </li>
              <li class="nav-item">
                  <button
                    type="button"
                    id="Modul-cart"
                    class="btn btn-secondary btn-lg btn-block text-nowrap t-1 btn-space hover-shadow"
                    data-bs-toggle="modal"
                    data-bs-target="#shopping-cart"
                  >
                    Varukorg: <span id="productCounter">${numberOfProducts}</span>
                </button>
              </li>
              <li class="nav-item">
              ${sessionStorage.getItem("loggedinCustomer") ? '<a href="Cart.html">':'<a href="#">'}
                    <button
                      type="button"
                      id="Cart-button"
                      class="cart-button btn btn-secondary btn-lg btn-block text-nowrap t-1 btn-space hover-shadow"
                      ${!sessionStorage.getItem("loggedinCustomer") ? 'data-bs-toggle="modal" data-bs-target="#loginModal"':''}

                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-cart"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                        />
                      </svg>
                      Till kassan: 
                      <span id="Cart-button span">${parseFloat(localStorage.getItem("cost")).toFixed(2)}</span>         
                      kr           
                    </button>
                  </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
  `;
    super.container.innerHTML = this.html;

    super.container.addEventListener("click", async (e) => {
      if (e.target.className == "logout"){
        sessionStorage.clear();
        localStorage.clear("cart");
       window.location.reload()
      } 

    });
  }

  

   
}

