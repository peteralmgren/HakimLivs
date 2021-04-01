import UI from "../ui.js";

export default class Sidebar extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.html = `
        
          <div class="card">
            <div class="card-body p-2 mr-3">
              <ul class="list-group" id="sidebar-categories">
              <li class="list-group-item"><a href="cart.html">Kassa</a></li>
              
                  
            </ul>
          </div>
    
        `;
        super.container.innerHTML = this.html;
    }
}
