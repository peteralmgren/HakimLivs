import UI from "../ui.js";

export default class Order extends UI {
  constructor(appendTo) {
    super(appendTo);    
    
    this.showOrder()
    super.container.addEventListener("click", async (e) => {
      if (e.target.className == "print-btn btn btn-primary"){
        this.printDiv('order')
      }
    });
    
       
    
  }

async showOrder() {
  let OrdersArray = await super.loadData("GET", "https://grupp5hakimlivs.herokuapp.com/orderInfo");
  OrdersArray = JSON.parse(OrdersArray);

  console.log(OrdersArray)

  let selectedID = 10;
  let orderID = sessionStorage.getItem("order-id");
  let count = orderID.indexOf("#");
  let newString = orderID.slice(0, count+1);
  selectedID = orderID.slice(count+1)
  console.log(newString)
  console.log(selectedID)

  let Orders = [];
  let customer; 
  

  for(let i=0; i<OrdersArray.length; i++){
    if(OrdersArray[i].orders.id == selectedID){
      Orders.push(OrdersArray[i]);
      customer = OrdersArray[i];
    }
  }

  console.log(Orders)

  var date = new Date(customer.orders.timestamp);
      
      
      date=("Datum: "+date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " - "+(date.getHours()<10?'0':'')+date.getHours()+
          ":"+(date.getMinutes()<10?'0':'')+date.getMinutes());



  let output = ``;
  output += `<div class="container">
  <h1>Order</h1>
  <div>
  <h2 style="text-align: center; padding-top:5rem">Kundorder</h2>
</div>

<!-- Formulär för kundorder begin-->

<div class="second-row">
  
  <div id="order" class="col-md-12">
    
    <div class="border border-dark">
      
      
      <div class="card" >
        
        
        <div id="order-card" class="card-header">
          <label id="order-number" class="label label-info" >Ordernr: #${customer.orders.id}</label>
          <label id="order-date" class="label label-info" style="padding-left: 10rem; padding-right:10rem;">${date}</label>
          <label class="form-check-label" for="defaultCheck1" >Order plockad</label>
          
        </input>
          <div class="form-check"></div>
          
          </div>
           <div class="form" style="align-content: center;">
            </div>
          
            </div>
          
        </div>
      
                          
        <table class="table table-bordered table-sm border border-top-0">
          <thead class="bg-light text-black">
            <th>Kundnr</th>
            <th>ProduktId</th>
            <th>Produktnamn</th>
            <th>Antal</th>
          </thead>
          <tbody>
            
            <tbody id="order-products">`

            let summa = 0;
            for (let i = 0; i<Orders.length;i++){
              let tempPrice = Orders[i].product.price * Orders[i].quantity;
              summa += tempPrice;
              output += `
              <tr>
                <td id="kund-id">${Orders[i].orders.customer.id}</td>
                <td id="product-id">${Orders[i].product.id}</td>
                <td  id="product-name">${Orders[i].product.title}</td>
                <td id="product-amount">${Orders[i].quantity}</td>
              </tr>`

            }           
            
  

        
            
            output += `
            </tbody>
            <thead id="order-end" class="bg-light text-bold">
              <th id="org-amount">Summa varor: ${summa.toFixed(2).replace(".", ":")} kr</th>
              <th id="org-amount">Leverans: 50 kr</th>
              <td>
                <button id="print-btn" type="button" class="print-btn btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                  </svg>
                  Utskrift
                </button>
                
              </td>                           
            </thead>

          </table>
            
          <div id="shipping-info" class="container">

            <h1>Leveransinfo</h1>
          <div class="form">
              
            <div class="fields fields--2">
              <label class="form-control"style="color:black; border-color: black;">
                <span  class="field__label" for="firstname">Förnamn: </span>  
                <label id="shipping-firstname" class="field__input" for="firstname"
                  style="color:black; border-color: black;"></label>
              </label>
              <label class="form-control"style="color:black; border-color: black;" >
                <span class="field__label" for="lastname">Efternamn: </span>
                <label id="shipping-lastname" class="field__input" type="text"style="color:black;"></label>
              </label>
            </div>
            
            <label class="form-control"style="color:black; border-color: black;">
              <span class="field__label" for="address">Adress: </span>
              <label id="shipping-address" class="field__input" type="text"style="color:black;"></label>
            </label>
            
            <div class="fields fields--2">
              <label class="form-control"style="color:black; border-color: black;">
                <span class="field__label" for="zipcode">Postnr: </span>
                <label id="shipping-zipcode" class="field__input" type="number"style="color:black;"></label>
              </label>
              <label class="form-control"style="color:black; border-color: black;">
                <span class="field__label" for="city">Ort: </span>
                <label id="shipping-county" class="field__input" type="text"style="color:black;"></label>
              </label>
              <label class="form-control"style="color:black; border-color: black;">
                <span class="field__label" for="email">Epost: </span>
                <label id="shipping-email" class="field__input" type="email"style="color:black;"></label>
                 
                </input>
              </label>
            </div>  
            
            <div>
              <h4 class="display-6">Tack för att du handlat på</h4>
              <br>
              <a class="brand" href="index.html"
              ><img src="images/logo.png" alt=""
              /></a>
            </div>       
          </div>
      </div>  
    </div>   
  </div>
  </div>`

  output += ``

  super.container.innerHTML = output;

  document.getElementById('shipping-firstname').innerHTML= customer.orders.customer.firstname;
  document.getElementById('shipping-lastname').innerHTML = customer.orders.customer.lastname;
  document.getElementById('shipping-address').innerHTML = customer.orders.customer.street;
  document.getElementById('shipping-zipcode').innerHTML = customer.orders.customer.zipcode;
  document.getElementById('shipping-county').innerHTML = customer.orders.customer.city;
  document.getElementById('shipping-email').innerHTML = customer.orders.customer.email;
  

} 

printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;
   
  document.body.innerHTML = printContents;
  
  var printButtonHide = document.getElementById('print-btn');
  printButtonHide.hidden = true;
  var shippingInfo = document.getElementById('shipping-info');
  shippingInfo.className = 'container';

  window.print();
              
  document.body.innerHTML = originalContents;
}


  

}