import UI from "../ui.js";

export default class Checkout extends UI {
  constructor(appendTo) {
    super(appendTo);    
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
              <button class="btn btn-danger" id="clearCart">Rensa varukorg</button>
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
      if (e.target.className == "purchase-button btn btn-primary btn-lg t-1 hover-shadow") await this.sendOrder(e);
      if (e.target.className == "btn btn-danger") this.clearCart();
    });
    
    this.injectRowItemsInCart();
    this.printUser();
    this.sum = 0;         
    
  }

async injectRowItemsInCart() {
    let allProducts = await super.loadData("GET", "https://hakimlivsgroup5.herokuapp.com/all");
    allProducts = JSON.parse(allProducts);
    let cart = super.readStorage("cart");
    //let sum = 0;
    let row = ``;

    for (let i = 0; i < allProducts.length; i++) {
      if (cart[allProducts[i].id]) {
        this.sum += allProducts[i].price * cart[allProducts[i].id];
        row += `
        <div class="row bg-white mt-1 py-2 align-items-center border rounded" id="">
        <div class="col-lg-1 p-1">
          <img class="img-fluid" src="${allProducts[i].image}" alt="Produktbild">
        </div>
        <div class="col-lg-4">
          <div>
            <p class="brand m-0">AXA</p>
            <h6 class="fw-bold m-0 title">${allProducts[i].title}</h6>
          </div>
        </div>
        <div class="col-lg-3 text-end px-0">
          <div class="flex">
            <img class="minus" data-product-id="${allProducts[i].id}" src="./icons/minus.png" alt="minus" width="25px"> 
            <button class="border border-secondary bg-white px-2 rounded" id="amount-of-product">${cart[allProducts[i].id]}</button>
            <img class="plus" data-product-id="${allProducts[i].id}" src="./icons/plus.png" alt="plus" width="25px">
          </div>
        </div>

        <div class="col-lg-3 px-0">
          <div class="d-flex justify-content-end">
            <div class="price fw-bold px-0 mx-0">${(allProducts[i].price * cart[allProducts[i].id]).toFixed(2)}(${allProducts[i].price.toFixed(2)})</div>
            <div class="px-0 ms-1">kr</div>
          </div>
        </div>
        <div class="col-lg-1 m-auto text-end px-0" id="trash">
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
    <div class="col-3">
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
  async deleteRowInCart(e) {
    const totalSumElement = document.getElementById('total-sum');
    let totalSum = parseFloat(totalSumElement.textContent);
    const orderRowSum = parseFloat(e.target.parentNode.previousElementSibling.children[0].children[0].textContent);
    totalSum = (totalSum - orderRowSum).toFixed(2);
    totalSumElement.textContent = totalSum;
    e.target.parentNode.parentNode.remove();
    this.sum = totalSum;
    super.clearFromCart(e.target.dataset.productId);
    this.updatePrice();
    super.countProductsInCart();
    await super.countCost(e.target.dataset.productId, orderRowSum);
    
  }

  /** This for loop assigns event listeners to all minus sign icons. The anonymous function will do three things:
  *  decrease the number of items in the basket with one, decrease the order row sum with the price of one unit and decrease the total sum with the price of one unit */
  async decreaseItemsInCartWithOne(e) {
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

    orderRowSumElement.textContent = newOrderRowSum+"("+pricePerUnit.toFixed(2)+")";
    totalSum = (totalSum - pricePerUnit).toFixed(2);
    totalSumElement.textContent = totalSum;
    this.sum = totalSum;
    super.removeFromCart(e.target.dataset.productId);
    this.updatePrice();
    super.countProductsInCart();
    await super.countCost(e.target.dataset.productId, "-");
  }

  /** This function will do three things:
  *  increase the number of items in the basket with one, increase the order row sum with the price of one unit and increase the total sum with the price of one unit */
  async increaseItemsInCartWithOne(e) {
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

    orderRowSumElement.textContent = newOrderRowSum+"("+pricePerUnit.toFixed(2)+")";
    totalSum = (totalSum + pricePerUnit).toFixed(2);
    totalSumElement.textContent = totalSum;
    this.sum = totalSum;
    super.addToCart(e.target.dataset.productId);
    this.updatePrice();
    super.countProductsInCart();
    await super.countCost(e.target.dataset.productId, "+");
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

  async printUser(){
    let userInfo = JSON.parse(sessionStorage.getItem("loggedinCustomer"));
    let StringToSend = "Bearer " +userInfo.jwt;
    let StringToAuthorize = "jwt="+userInfo.jwt;
    


        $.ajax(
          {
              url : 'https://hakimlivsgroup5.herokuapp.com/getCurrentCustomer',
              type: "GET",
              crossDomain: true,
              dataType: 'json',
              data : StringToAuthorize,
              complete: function(data) {
            },
            success: function(data){
              document.getElementById('firstname').value = data.firstname;
              document.getElementById('lastname').value = data.lastname;
              document.getElementById('inputEmail').value = data.email;
              document.getElementById('inputAddress').value = data.street;
              document.getElementById('inputPhone').value = data.phone;              
          }, 
              headers: {
                accept: "application/json",
                "Access-Control-Allow-Origin":"*",
                "Authorization": StringToSend,
              }
              
          });        
    
    
  }
  // /* async */ sendOrder (e){
    
       
  //     var jsonData = {}

       

  //     var test = {'title':'jsontest','description':'json', 'price':4, 'image':'json', 'category_id':2}

      

  //   console.log(test2)

    

  //   let cart = JSON.parse(localStorage.getItem('cart'))
  //   console.log(cart)

  //   let customerInfo = "customer_id:12"

  //   let cartkeys = Object.keys(cart);
  //   let cartvalues = Object.values(cart);
  //   console.log(cartkeys);
  //   console.log(cartvalues);

  //   let cartarray = []
    
  //   var test2 = {'customer_id':12,'product_id':cartkeys, 'quantity':cartvalues}



  //   /* cartkeys.forEach(key => {
  //     cartvalues.forEach(values => {
  //       values=test2.cartvalues
  //     cartarray.push(test2)
  //     key=test2.cartkeys
  //     cartarray.push(test2)
  //     }})); */
    
  //   console.log(test2);

    
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
         
  //    }); */
     
    
 
 // }
//}


//BUGGIG: När man skickas tillbaka till index så fungerar inte sidan som den ska
async clearCart(){
    
  localStorage.clear("cart");
  alert("Du tömde varukorgen. Lämnar kassan...")
  location.replace("index.html");
  
}



async sendOrder(e){
    let userInfo = JSON.parse(sessionStorage.getItem("loggedinCustomer"));
    let StringToSend = "Bearer " +userInfo.jwt;
/*
  let cart = super.readStorage("cart");
  console.log(cart);

  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `https://grupp5hakimlivs.herokuapp.com/checkout}`
  );
  xhr.send(cart);
  xhr.onreadystatechange = function () {
    if (xhr.status === 500){
        alert("Kontot hittades inte!");
      }
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      sessionStorage.setItem("loggedinCustomer", JSON.stringify(data));
      console.log(data);
      window.location.replace("index.html");
      hideLogin()
    }
  };*/
  let OrderArray = await super.loadData("GET", "https://hakimlivsgroup5.herokuapp.com/allorders");
  OrderArray = JSON.parse(OrderArray);
  console.log(OrderArray)

  let OrderNumbers = [];

  for(let i=0;i<OrderArray.length;i++){
    OrderNumbers.push(OrderArray[i].id);
    console.log(typeof OrderArray[i].id)
  }
  let newNumber = Math.max(...OrderNumbers);
  if (!isFinite(newNumber)){
    newNumber = 0;
  }



  if(!localStorage.numberInCart || localStorage.numberInCart == 0){
    alert("Din varukorg är tom");
  }
  else{
    alert("Tack för din order!");

      let dataToSend = {'order_id': newNumber+1, 'jwt': userInfo.jwt};
      console.log(StringToSend)
      console.log(dataToSend)
          
        $.ajax(
        {
            url : 'https://hakimlivsgroup5.herokuapp.com/neworder',
            type: "POST",
            crossDomain: true,
            dataType: 'json',
            data : dataToSend,
            complete: function(data) {
              console.log(data.responseText);
          },
          success: function(data){
            console.log(data);
        },
            headers: {
              accept: "application/json",
              "Access-Control-Allow-Origin":"*",
              "Authorization": StringToSend,              
          }
            
        });        

      let cart = JSON.parse(localStorage.getItem("cart"));

        cart = Object.entries(cart);
     
      setTimeout(() => {
        for (let i = 0; i<cart.length; i++){
          let cartkeys = Object.keys(cart[i]);
          
          let cartvalues = Object.values(cart[i]);
    
          let data;
          let data2;
    
          for(let i = 0; i < cartkeys.length; i++){
          data = Number(cartvalues[0]);
          data2 = cartvalues[i];
          }
         
          
          let dataToSend2 = {'order_id': newNumber+1, 'product_id': data, 'quantity': data2};
          console.log(dataToSend2)
              
           
            $.ajax(
            {
                url : 'https://hakimlivsgroup5.herokuapp.com/addorder',
                type: "POST",
                crossDomain: true,
                dataType: 'json',
                data : dataToSend2,
                complete: function(data) {
                  console.log(data.responseText);
              },
              success: function(data){
                console.log(data);
            }, 
            headers: {
              accept: "application/json",
              "Access-Control-Allow-Origin":"*",
              "Authorization": StringToSend,              
          }
                
            });
            e.preventDefault();
    
          }
      }, 1500);
      
    setTimeout(()=>{
      localStorage.clear("cart");
    location.replace("index.html");
    }, 3000);
    
  }


}

}





