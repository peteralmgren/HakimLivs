import UI from "../ui.js";

export default class Checkout extends UI {
  constructor(appendTo) {
    super(appendTo);
    // this.getAllProducts();
    this.html = `
    <div class="container">
    <div class="row mr-2 p-3">
      <div class="card" id="Cart-body">
      <div class="card-body">
        <h3>Kundinformation</h3>
        <div class="row">
                    <div class="form-group col-md-6">
                        <label for="firstname">Förnamn</label>
                        <input type="text" id="firstname" class="form-control" placeholder="Förnamn" readonly/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="lastname">Efternamn</label>
                        <input type="text" id="lastname" class="form-control" placeholder="Efternamn" readonly/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail4">Email</label>
                    <input type="email" class="form-control" id="inputEmail" placeholder="exempel@adress.se" readonly/>
                </div>
                <div class="form-group">
                    <label for="inputAddress5">Adress</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="Adress" readonly/>
                </div>
                <div class="form-group">
                    <label for="inputPhone">Phone</label>
                    <input type="text" class="form-control" id="inputPhone" placeholder="Phone" readonly/>
                </div>
          </div>
          </div>
        </div>
      <div class="row mr-2 p-2">
        <div class="col-lg-9">
          <div class="card" id="Cart-body">
            <div class="card-body">
              <h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-basket-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z"
                  />
                </svg>
                DINA VAROR
              </h3>
              <hr />
              <div class="container-fluid"></div>
              <hr />
              <button
                type="button"
                id="Purchase"
                class="purchase-button btn btn-primary btn-lg t-1 hover-shadow"
              >
                Bekräfta beställning
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card">
            <div class="card-body p-2 mr-3">
              <p class="summa-varor" id="Summa-varor">
                Summa varor <span>0 kr</span>
              </p>
              <hr />
              <p class="text-start" id="Leverans">Leverans <span>50,00 kr</span></p>
              <hr />
              <p class="totalsumma" id="Total-summa">
                Totalsumma <span>0 kr</span>
              </p>
              <hr />
              <p class="moms" id="Moms">Varav moms <span>0 kr</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>     
    `;
    
    super.container.innerHTML = this.html;
    super.container.addEventListener("click", async (e) => {
      if (e.target.className == "trashcan pe-1") this.deleteRowInCart(e);
      if (e.target.className == "minus") this.decreaseItemsInCartWithOne(e);
      if (e.target.className == "plus") this.increaseItemsInCartWithOne(e);
      if (e.target.className == "purchase-button btn btn-primary btn-lg t-1 hover-shadow") this.sendOrder(e);
    });
    
    this.injectRowItemsInCart();
    this.printUser();
    this.sum = 0;         
    
  }

async injectRowItemsInCart() {
    let allProducts = await super.loadData("GET", "https://grupp5hakimlivs.herokuapp.com/all");
    allProducts = JSON.parse(allProducts);
    let cart = super.readStorage("cart");
    //let sum = 0;
    let row = ``;

    for (let i = 0; i < allProducts.length; i++) {
      if (cart[allProducts[i].id]) {
        this.sum += allProducts[i].price * cart[allProducts[i].id];
        row += `
        <div class="row bg-white mt-1 py-2 align-items-center border rounded" id="">
        <div class="col-1 p-1">
          <img class="img-fluid" src="${allProducts[i].image}" alt="Produktbild">
        </div>
        <div class="col-3">
          <div>
            <p class="brand m-0">AXA</p>
            <h5 class="fw-bold m-0 title">${allProducts[i].title}</h5>
          </div>
        </div>
        <div class="col-2 px-0">
          <div class="d-flex justify-content-end">
            <div class="single-price fw-bold px-0 mx-0">${(allProducts[i].price).toFixed(2)}</div>
            <div class="px-0 ms-1">kr</div>
          </div>
        </div>
        <div class="col-3 text-end px-0">
          <div class="flex">
            <img class="minus" data-product-id="${allProducts[i].id}" src="./icons/minus.png" alt="minus" width="20px"> 
            <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${cart[allProducts[i].id]}</button>
            <img class="plus" data-product-id="${allProducts[i].id}" src="./icons/plus.png" alt="plus" width="20px">
          </div>
        </div>

        <div class="col-2 px-0">
          <div class="d-flex justify-content-end">
            <div class="price fw-bold px-0 mx-0">${(allProducts[i].price * cart[allProducts[i].id]).toFixed(2)}</div>
            <div class="px-0 ms-1">kr</div>
          </div>
        </div>
        <div class="col-1 m-auto text-end px-0" id="trash">
          <img class="trashcan pe-1" data-product-id="${allProducts[i].id}" src="./icons/delete.png" alt="Soptunna" width="25px">
        </div>
      </div>
      `;
      }
    }

    row += `
    <div class="row bg-white mb-1 p-1 align-items-center border rounded">
    <!-- Modal, totalsumma START -->
    <div class="col-1 p-1"></div>
    <div class="col-4"></div>
    <div class="col-3 text-end">
      <div>
        <span class="fw-bold px-0 mx-0">Summa:</span>
      </div>
    </div>
    <div class="col-3 m-auto text-center">
      <div class="d-flex justify-content-end">
        <div class="fw-bold px-0 mx-0" id="total-sum">${this.sum.toFixed(2)}</div>
        <div class="px-0 ms-1">kr</div>
      </div>
      <div class="col-1 m-auto text-end px-0" id="trash">
      </div>
    </div>
    `;

    this.updatePrice();
    document.getElementsByClassName("container-fluid")[0].innerHTML = row;
    
} 

  

  /** This function will do two things:
   *  decrease the total sum with the order row sum and delete the order row from det shopping cart */
  deleteRowInCart(e) {
    const totalSumElement = document.getElementById('total-sum');
    let totalSum = parseFloat(totalSumElement.textContent);
    const orderRowSum = parseFloat(e.target.parentNode.previousElementSibling.children[0].children[0].textContent);
    totalSum = (totalSum - orderRowSum).toFixed(2);
    totalSumElement.textContent = totalSum;
    e.target.parentNode.parentNode.remove();
    this.sum = totalSum;
    super.clearFromCart(e.target.dataset.productId);
    this.updatePrice();
    this.countProductsInCart();
    
  }

  /** This for loop assigns event listeners to all minus sign icons. The anonymous function will do three things:
  *  decrease the number of items in the basket with one, decrease the order row sum with the price of one unit and decrease the total sum with the price of one unit */
  decreaseItemsInCartWithOne(e) {
    const totalSumElement = document.getElementById('total-sum');
    let totalSum = parseFloat(totalSumElement.textContent);
    const numberOfItemsNode = e.target.nextElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);

    /* This if statement makes sure that the minimum amount of items in the cart is 1. If the users wants to delete all items they has to click on the trashcan */
    if (oldNrOfItems === 1) { return; }

    numberOfItemsNode.textContent = oldNrOfItems - 1;

    const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
    const oldOrderRowSum = parseFloat(orderRowSumElement.textContent);
    const pricePerUnit = oldOrderRowSum / oldNrOfItems;
    const newOrderRowSum = (oldOrderRowSum - pricePerUnit).toFixed(2);

    orderRowSumElement.textContent = newOrderRowSum;
    totalSum = (totalSum - pricePerUnit).toFixed(2);
    totalSumElement.textContent = totalSum;
    this.sum = totalSum;
    super.removeFromCart(e.target.dataset.productId);
    this.updatePrice();
    this.countProductsInCart();
  }

  /** This function will do three things:
  *  increase the number of items in the basket with one, increase the order row sum with the price of one unit and increase the total sum with the price of one unit */
  increaseItemsInCartWithOne(e) {
    const totalSumElement = document.getElementById('total-sum');
    let totalSum = parseFloat(totalSumElement.textContent);

    const numberOfItemsNode = e.target.previousElementSibling;
    const oldNrOfItems = parseInt(numberOfItemsNode.textContent);
    if (oldNrOfItems === 20) { return; }
    numberOfItemsNode.textContent = oldNrOfItems + 1;

    const orderRowSumElement = e.target.parentNode.parentNode.nextElementSibling.children[0].children[0];
    const oldOrderRowSum = parseFloat(orderRowSumElement.textContent);
    const pricePerUnit = oldOrderRowSum / oldNrOfItems;
    const newOrderRowSum = (oldOrderRowSum + pricePerUnit).toFixed(2);

    orderRowSumElement.textContent = newOrderRowSum;
    totalSum = (totalSum + pricePerUnit).toFixed(2);
    totalSumElement.textContent = totalSum;
    this.sum = totalSum;
    super.addToCart(e.target.dataset.productId);
    this.updatePrice();
    this.countProductsInCart();
  }

  updatePrice(){
    console.log(this.sum);
    let moms = (this.sum * 0.12).toFixed(2); 
    moms = moms.replace(".", ",");
    let totalsum = (this.sum*1+50).toFixed(2);
    totalsum = totalsum.replace(".", ",");
    let summavaror = +this.sum;
    

  
    document.querySelector('.moms span').textContent = moms+ " kr";
    document.querySelector('.summa-varor span').textContent = summavaror.toFixed(2)  + " kr";
    document.querySelector('.totalsumma span').textContent = totalsum +" kr";
    
  }

  printUser(){
    let userInfo = JSON.parse(localStorage.getItem("customer"));

    console.log(userInfo);

    
    for (let i in userInfo){
      if(userInfo[i].id == 12){
        document.getElementById('firstname').value = userInfo[i].firstname;
        document.getElementById('lastname').value = userInfo[i].lastname;
        document.getElementById('inputEmail').value = userInfo[i].email;
        document.getElementById('inputAddress').value = userInfo[i].street;
        document.getElementById('inputPhone').value = userInfo[i].phone;
      }
    }
  
    
    
    
  }
  // /* async */ sendOrder (e){
    
       
  //     var jsonData = {}

       

  //     var test = {'title':'jsontest','description':'json', 'price':4, 'image':'json', 'category_id':2}

      

      

     
  //     /* $.each(formData, function() {
  //        if (jsonData[this.name]) {
           
  //           if (!jsonData[this.name].push) {
             
  //               jsonData[this.name] = [jsonData[this.name]];
                
  //           }
  //           jsonData[this.name].push(this.value || '');
            
  //       } else {
  //           jsonData[this.name] = this.value || '';
            
  //       }
  //      console.log(jsonData)
  //   }); */ 

  //   console.log(test2)

  //   let cartarray = {}

  //   let cart = JSON.parse(localStorage.getItem('cart'))
  //   console.log(cart)

  //   let cartkeys = Object.keys(cart);
  //   let cartentries = Object.values(cart);
  //   console.log(cartkeys);
  //   console.log(cartentries);

  //   var test2 = {'customer_id':12,'product_id':cartkeys[0], 'quantity':cartentries[0]}
  //   console.log(test2);

    

  
  //   console.log("här är vi "+cartarray);
    
  //   /* cart.map((currentValue) => {'' } ) */


    
  //    /* $.ajax(
  //    {
  //        url : 'https://grupp5hakimlivs.herokuapp.com/order',
  //        type: "POST",
  //        crossDomain: true,
  //        dataType: 'jsonp',
  //        data : test2,
  //        complete: function(data) {
  //          console.log(data.responseText);
  //      },
  //      success: function(data){
  //        console.log(data);
  //    },
  //         headers: {
  //          accept: "application/json",
  //          "Access-Control-Allow-Origin":"*"
           
  //      }
         
  //    });
     
  //    e.preventDefault();  */  



     
 
  //    /* console.log(e); */
    
    

  //   /* const getData = () => {
  //     axios.get('https://grupp5hakimlivs.herokuapp.com/all').then(response =>{
  //       console.log(response);
  //     });
  //   };
  //   getData() */ 


  //   /* console.log(e.target);

  //   let cartTosend = [] */
  //   /* let jsonData = [{"id":1,"quantity":3},{"id":4 , "quantity":5}]
  //   let cartTosend = []

  //   let customer = {}
  //   let cart =[]
  //   let customerId=0;
  //   customer = JSON.parse(localStorage.getItem("customer"))
  //   cart = JSON.parse(localStorage.getItem("cart"))
  //   cartTosend = localStorage.getItem("cart")

  //   for (let index = 0; index < cart.length; index++) {
  //     const element = cart[index];
  //     console.log(cart[0]);
      
  //   } */
  //   /* let allProductsincart = await super.loadData("GET", "./data/produkter.JSON");
  //   allProductsincart = JSON.parse(allProductsincart);
  //   let cart = super.readStorage("cart");

  //   for (let i = 0; i < cart.length; i++) {
  //     cartTosend.push("id"+":"+cart[allProductsincart[i].id])
  //     cartTosend.push("quantity"+":"+cart[1])
  //   }
  //   console.log(cartTosend); */
  //   /* var formData = $(cart).serializeArray(); */
       
 
  //    /* $.each(formData, function() {
  //         if (jsonData[this.id]) {
            
  //            if (!jsonData[this.id].push) {
              
  //                jsonData[this.id] = [jsonData[this.id]];
  //                //jsonData[categoryData] = [jsonData[categoryData]];
  //            }
  //            jsonData[this.id].push(this.id || '');
  //            //jsonData[categoryData].push(categoryData || '');
  //        } else {
  //            jsonData[this.id] = this.id || '';
  //            //jsonData[categoryData.value] = categoryValue || '';
  //        }
  //       console.log(jsonData)
  //    }); */


  //   /* customer.forEach(element => {
  //     if(element.firstname === "Maja"){
  //       customerToSend.push(element.id)
  //       customerId=element.id
  //     }
  //   }) */
  //   /* cart.forEach(element => {
  //     if(element.firstname === "Maja"){
  //       customerId=element.id
  //     }
  //   }) */
  //   //console.log("customerid "+customerId);
  //   /* customerToSend = JSON.stringify(customerToSend) */
  //   /* console.log(cart);
  //   console.log(cartTosend); */
  //   //console.log("CustomerToSend " + customerToSend);

  //   /* $.ajax(
  //     {
  //         url : 'https://grupp5hakimlivs.herokuapp.com/addproduct',
  //         type: "POST",
  //         crossDomain: true,
  //         dataType: 'jsonp',
  //         data : jsonData,
  //         complete: function(data) {
  //           console.log(data.responseText);
  //       },
  //       success: function(data){
  //         console.log(data);
  //     },
  //         headers: {
  //           accept: "application/json",
  //           "Access-Control-Allow-Origin":"*"
            
  //       }
          
  //     });
  //     e.preventDefault(); 

    
  // }
  // */


sendOrder(e){
  alert("Tack för din order!");
  localStorage.clear();
  location.replace("index.html");
}

}





