import UI from "../ui.js";
import Products from "./products.js";

export default class Sidebar extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.container.addEventListener("click", async (e) => {
          if(e.target.className == "list-group-item cat-selector") await new Products(".products").showAllProductsInCategory(e.target.dataset.categoryName);
        });
        this.showCategories();
    }

    async showCategories() {
      let uniqueCat = []; 
      let html = `
      <div class="card">
        <div class="card-body p-2 mr-3">
          <ul class="list-group list-group-horizontal">`;
      
      let categories = await super.loadData("GET", "./data/produkter.JSON");
      categories = JSON.parse(categories);
      for (let cat in categories) {
          uniqueCat.push(categories[cat].category);
      }

      uniqueCat = uniqueCat.filter((value, index, categoryArray) => categoryArray.indexOf(value) === index);

      for (let cat in uniqueCat) {
        html += `<li class="list-group-item cat-selector" id="categorylinks" data-category-name="${uniqueCat[cat]}">${uniqueCat[cat]}</li>`;
      }

      html +=`
      </ul>
        </div>`;
      
      super.container.innerHTML += html;
    }

}


