import UI from "../ui.js";
import Products from "./products.js";

export default class Sidebar extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.products = new Products(".products");
        this.products.showProducts("all");
        this.container.addEventListener("click", async (e) => {
          if(e.target.className == "list-group-item cat-selector px-3") await this.products.showProducts(e.target.dataset.categoryName);
          if(e.target.className == "show-all list-group-item cat-selector px-3") await this.products.showProducts("all");
        });
        
        let input = document.getElementById("inputlg");
        input.addEventListener("keyup", async (e) =>{
          if(input.value != null) await this.products.showProducts(input.value);
        })
        let searchbutton = document.getElementById("search-button");
          searchbutton.addEventListener("click", async(e) =>{
        if(input.value != null) await this.products.showProducts(input.value);
        });

        this.showCategories();
    }

    async showCategories() { 
      let uniqueCat = []; 
      let tempArray = [];
      let html = `
      <div class="container-fluid">
          <div class="row flex-nowrap">
          <ul class="list-group list-group-horizontal">
          <div class="col-4">
            <li class="show-all list-group-item cat-selector px-3" id="categorylinks" data-category-name="Visa alla">Alla</li>
          </div>
          
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
        html += `<div class="col-4">
        <li class="list-group-item cat-selector px-3" id="categorylinks" data-category-name="${uniqueCat[cat]}">${uniqueCat[cat]}</li>
        </div>`;
      }

      html +=`
      </ul>
      </div>
        </div>`;
      
      super.container.innerHTML += html;
    }

}


