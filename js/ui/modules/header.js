import UI from "../ui.js";

let numberOfProducts = JSON.parse(localStorage.getItem("numberInCart"));
if (numberOfProducts == null)
    numberOfProducts = "";

export default class Header extends UI { 
    constructor(appendTo) {
        super(appendTo);
        this.html = ``
        this.html += `
        <header>
    <div class="shadow p-3 mb-5 bg-white rounded">
      <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light">
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
              <input
                class="searchform form-control search input-lg mr-3 p-2"
                id="inputlg"
                type="text"
                maxlength = "30"
                onkeyup="this.value=this.value.replace(/[^a-zA-Z0-9]/g, '')"
                placeholder="Sök"
              />
              <button
              id="search-button"
              type="button"
              class="btn btn-secondary text-nowrap hover-shadow">
              <i class="fa fa-search"></i>
              </button>
            </div>
              
            <ul class="navbar-nav mr-auto mr-4 mt-lg-0">`

            if(sessionStorage.getItem("loggedinCustomer")){
              let user = JSON.parse(sessionStorage.getItem("loggedinCustomer"));
            console.log(user.jwt)
              user = user.jwt;
              let decoded = (atob(user.split('.')[1]));
            if(decoded.includes("ROLE_ADMIN")){
              console.log("test");
              this.html += `<li class="nav-item mr-1 p-2"><a href="admin.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg></i>
              </a></li>`
            }
            }
            
            
            this.html +=`
              <li id="customer-logged-in" class="nav-item">
              ${!sessionStorage.getItem("loggedinCustomer") ? '<button type="button" id="Log-in-button" class="btn btn-secondary btn-lg btn-block text-nowrap t-1 btn-space hover-shadow" data-bs-toggle="modal" data-bs-target="#loginModal">Logga in</button>' : 'Välkommen ' + '<h6 class="logout" type="button">Logga ut</h6>'}
              </li>
              <li class="nav-item">
                  <button
                    type="button"
                    id="Modul-cart"
                    class="btn btn-secondary btn-lg btn-block text-nowrap t-1 hover-shadow"
                    data-bs-toggle="modal"
                    data-bs-target="#shopping-cart"
                  >
                    Varukorg: <span id="productCounter">${numberOfProducts}</span>
                </button>
              </li>
              <li class="nav-item">
                    <button
                      type="button"
                      id="Cart-button"
                      class="cart-button btn btn-secondary btn-lg btn-block text-nowrap t-1 hover-shadow"
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
                      <span id="Cart-button span">${!localStorage.getItem("cost") ? "0.00"  : parseFloat(localStorage.getItem("cost")).toFixed(2)}</span>         
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
      if (e.target.className == 'cart-button btn btn-secondary btn-lg btn-block text-nowrap t-1 hover-shadow'){
        if(localStorage.getItem("cart").length > 2){
          window.location.replace("cart.html");
        }
      }
    });

    super.container.addEventListener("keypress", async (e) => {
      if (e.target.className == "searchform form-control search input-lg mr-3 p-2"){
              var c = this.selectionStart,
            r = /[^a-z0-9]/gi,
            v = $(this).val();
        if(r.test(v)) {
          $(this).val(v.replace(r, ''));
          c--;
        }
        this.setSelectionRange(c, c);
      } 

    });
  }

  
   
}

