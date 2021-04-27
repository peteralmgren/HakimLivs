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

            <button
              type="button"
              id="Log-in-button"
              class="btn btn-secondary btn-lg text-nowrap t-1 mr-5 hover-shadow"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Logga in
            </button>

            <a href="index.html" class="link-dark mr-2"
              >Fortsätt handla &#x2716;</a
            >
          </div>
        </nav>
      </div>
    </header>
        `;
        super.container.innerHTML = this.html;
    }
}

