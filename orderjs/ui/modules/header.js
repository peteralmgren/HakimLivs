import UI from "../ui.js";

export default class Header extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.html = `                  
        <div class="shadow p-2 bg-white rounded">
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
              <a class="navbar-brand" href="index.html"><img src="images/logo.png" alt=""></a>
              <a href="admin.html" class="link-dark mr-2">Tillbaka till admin &#x2716;</a>
            </div>
          </nav>
        </div>
        `;
        super.container.innerHTML = this.html;
      }
    }

