import UI from "../ui.js";
import Products from "./products.js";

export default class Sidebar extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.container.addEventListener("click", async (e) => {
          if(e.target.className == "list-group-item cat-selector") await new Products(".products").showAllProductsInCategory(e.target.dataset.categoryName);
          if(e.target.className == "show-all list-group-item cat-selector") await new Products(".products").showProducts();
        });
        this.showCategories();
    }

    async showCategories() {
      let uniqueCat = []; 
      let tempArray = [];
      let html = `
      <div class="card">
        <div class="card-body p-2 mr-3">
          <ul class="list-group list-group-horizontal">
          <li class="show-all list-group-item cat-selector" id="categorylinks" data-category-name="Visa alla">Visa alla</li>
          `;
      
      let categories = await super.loadData("GET", "https://grupp5hakimlivs.herokuapp.com/all");
      categories = JSON.parse(categories);
      for(let i = 0; i<14; i++){
        tempArray.push(categories[i]);
      }
      
      
      for (let cat in tempArray) {
        console.log(tempArray[cat].category.categoryName);
        uniqueCat.push(tempArray[cat].category.categoryName);
        
          
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


