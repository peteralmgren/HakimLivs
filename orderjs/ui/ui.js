export default class UI {
    constructor(appendTo) {
        if(this.constructor === UI) throw new Error("This class is meant to be abstract!");
        //this._container = document.getElementsByTagName(appendTo)[0];
        //console.log(this.container);

        if(appendTo.match("/\./g")) this._container = document.querySelectorAll(appendTo);
        else this._container = document.querySelectorAll(appendTo)[0];
        if(!this._container) throw new Error ("Target container was not found!");

    }

    get container() {
        return this._container;
    }

    set container(value) {
        this._container = value;
    }

    get test() {
        return this._test;
    }

    set test(value) {
        this._test = value;
    }

    async loadData(reqType, url) {
        return await new Promise((resolve, reject) => {
          if (url == null) return reject("URL was NULL!");
          let request = new XMLHttpRequest();
          request.open(reqType, url, true);
          request.setRequestHeader("Content-Type", "text/plain");
          request.onload = function() {
            if (request.status < 200 || request.status > 299) reject("Error: Status " + request.status + " on resource " + url);
            else resolve(request.responseText);
          }
          request.send();
        });
    }

    readStorage(slot) {
        return JSON.parse(localStorage.getItem(slot));
    }

    writeStorage(slot, data) {
        localStorage.setItem(slot, JSON.stringify(data));
    }

    // Shows the number of products in the cart.
    countProductsInCart(){
        let numberOfProducts = 0;
        let theCart = JSON.parse(localStorage.getItem("cart"));
        let item = Object.values(theCart);
        console.log(item);
        for (let index = 0; index < item.length; index++) {
           numberOfProducts += item[index];
        }
        localStorage.setItem("numberInCart", JSON.stringify(numberOfProducts));
    }

    async countCost(data, operator){
        let allProductsArray = await this.loadData("GET", "https://grupp5hakimlivs.herokuapp.com/all");
        allProductsArray = JSON.parse(allProductsArray);

        let currentCost = parseFloat(localStorage.getItem("cost"));


        console.log(operator);
        console.log(data);

        for (let index = 0; index < allProductsArray.length; index++){
            if(allProductsArray[index].id == data){
                if(operator == "+"){
                    currentCost += allProductsArray[index].price;
                    localStorage.setItem("cost", currentCost);
                }
                if(operator == "-"){
                    currentCost -= allProductsArray[index].price;
                    localStorage.setItem("cost", currentCost);
                }           
            }
        }

        if(typeof(operator) == "number"){
            currentCost -= operator;
            localStorage.setItem("cost", currentCost);
        }
    }

    addToCart(data) {
        console.log("tillagd");
        let slot = "cart";
        let loaded = this.readStorage(slot);
        if(loaded == null) loaded = {};
        else if (loaded && !loaded[data]) loaded[data] = 1;
        else if (loaded && loaded[data]) loaded[data] += 1;
        this.writeStorage(slot, loaded);
        this.countProductsInCart();
    }

    removeFromCart(data) {
        let slot = "cart";
        let loaded = this.readStorage(slot);
        if(loaded == null) loaded = {};
        else if(loaded && loaded[data] == 1) delete loaded[data];
        else if (loaded && loaded[data]) loaded[data] -= 1;
        this.writeStorage(slot, loaded);
        this.countProductsInCart();
    }

    clearFromCart(data) {
        console.log("hello there", data);
        let slot = "cart";
        let loaded = this.readStorage(slot);
        if(loaded && loaded[data]) delete loaded[data];
        this.writeStorage(slot, loaded);
        this.countProductsInCart();
    }

}