import UI from "../ui.js";

export default class Header extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.html = `
        <header>
      <div class="shadow p-2 bg-white rounded">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container">
            <a class="navbar-brand" href="index.html"
              ><img src="images/logo.png" alt=""
            /></a>
            ${!sessionStorage.getItem("loggedinCustomer") ? '<button type="button" id="Log-in-button" class="btn btn-secondary btn-lg btn-block text-nowrap t-1 btn-space hover-shadow" data-bs-toggle="modal" data-bs-target="#loginModal">Logga in</button>' : '<h6 class="logout" type="button">Logga ut</h6>'}


            <a href="index.html" class="link-dark mr-2"
              >Fortsätt handla &#x2716;</a
            >
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
       window.location.replace("index.html");
       
      } 

    });
    }

}

