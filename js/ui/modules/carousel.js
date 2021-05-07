import UI from "../ui.js";

export default class Carousel extends UI {

    constructor(appendTo) {
        super(appendTo);

        
        this.showCarousel();
        
    }

    async showCarousel(){
      let random1;
      let random2;
      let random3;
      let random4;
      let random5;
    

    let ProductsArray = await super.loadData("GET", "https://grupp5hakimlivs.herokuapp.com/all");
    ProductsArray = JSON.parse(ProductsArray);

    for(let i = 0; i < 15; i++){
       if(i==0) random1 = ProductsArray[i];
       if(i==3) random2 = ProductsArray[i];
       if(i==6) random3 = ProductsArray[i];
       if(i==9) random4 = ProductsArray[i];
       if(i==12) random5 = ProductsArray[i];

    }
        this.html=`
      <!--carousel-->

    
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div class="carousel-indicators alert alert-dark">
            <button type="button"  data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"  aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"  aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"  aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4"  aria-label="Slide 5"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active text-center">
              ${random1.title.bold()} -
              ${random1.price.toFixed(2).replace(".", ",")} kr
              <a class="btn btn-outline-light" data-bs-toggle="modal" href="#modal${random1.id}" role="button"><img src="${random1.image}" class="d-block" alt="Slide 1"></a>
              <div class="carousel-caption d-none d-md-block text-dark">
              </div>
            </div>
            <div class="modal fade" id="modal${random1.id}" aria-hidden="true" aria-labelledby="..." tabindex="-1">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="card h-100 rounded">
                    <div class="card-body text-center">
                      <h4 class="card-title">${random1.title}</h4>
                      <p>${random1.brand} | ${random1.amount}</p>
                        <img class="card-img-top" src="${random1.image}">
                      <h6 class="pris-card">${(random1.price.toFixed(2)).replace(".", ",")}:-</h6>
                        <p class="card-text"><br>
                          ${random1.description}" 
                          <br>
                          <hr>
                          Styckpris: ${random1.perPrice}0 kr/st
                          <br>
                          Jämförpris: ${random1.compPrice}0 kr/kg             
                        </p>
                    </div>
                  </div>
              </div>
            </div>
            </div>
            <div class="carousel-item text-center">
              ${random2.title.bold()} -
              ${random2.price.toFixed(2).replace(".", ",")} kr
              <a class="btn btn-outline-light" data-bs-toggle="modal" href="#modal${random2.id}" role="button"><img src="${random2.image}" class="d-block" alt="Slide 2"></a>
              <div class="carousel-caption d-none d-md-block text-dark">
              </div>
            </div>
            <div class="modal fade" id="modal${random2.id}" aria-hidden="true" aria-labelledby="..." tabindex="-1">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="card h-100 rounded">
                    <div class="card-body text-center">
                      <h4 class="card-title">${random2.title}</h4>
                      <p>${random2.brand} | ${random2.amount}</p>
                        <img class="card-img-top" src="${random2.image}">
                      <h6 class="pris-card">${(random2.price.toFixed(2)).replace(".", ",")}:-</h6>
                        <p class="card-text"><br>
                          ${random2.description}" 
                          <br>
                          <hr>
                          Styckpris: ${random2.perPrice}0 kr/st
                          <br>
                          Jämförpris: ${random2.compPrice}0 kr/kg             
                        </p>
                    </div>
                  </div>
            </div>
          </div>
          </div>

            <div class="carousel-item text-center">
              ${random3.title.bold()} - 
              ${random3.price.toFixed(2).replace(".", ",")} kr
              <a class="btn btn-outline-light" data-bs-toggle="modal" href="#modal${random3.id}" role="button"><img src="${random3.image}" class="d-block" alt="Slide 3"></a>
              <div class="carousel-caption d-none d-md-block text-dark">
              </div>
              </div>
              <div class="modal fade" id="modal${random3.id}" aria-hidden="true" aria-labelledby="..." tabindex="-1">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="card h-100 rounded">
                    <div class="card-body text-center">
                      <h4 class="card-title">${random3.title}</h4>
                      <p>${random3.brand} | ${random3.amount}</p>
                        <img class="card-img-top" src="${random3.image}">
                      <h6 class="pris-card">${(random3.price.toFixed(2))}:-</h6>
                        <p class="card-text"><br>
                          ${random3.description}" 
                          <br>
                          <hr>
                          Styckpris: ${random3.perPrice}0 kr/st
                          <br>
                          Jämförpris: ${random3.compPrice}0 kr/kg             
                        </p>
                    </div>
                  </div>
            </div>
          </div>
          </div>
              <div class="carousel-item text-center">
              ${random4.title.bold()} -
              ${random4.price.toFixed(2).replace(".", ",")} kr
              <a class="btn btn-outline-light" data-bs-toggle="modal" href="#modal${random4.id}" role="button"><img src="${random4.image}" class="d-block" alt="Slide 4"></a>
              <div class="carousel-caption d-none d-md-block text-dark">
              </div>
              </div>
              <div class="modal fade" id="modal${random4.id}" aria-hidden="true" aria-labelledby="..." tabindex="-1">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="card h-100 rounded">
                    <div class="card-body text-center">
                      <h4 class="card-title">${random4.title}</h4>
                      <p>${random4.brand} | ${random4.amount}</p>
                        <img class="card-img-top" src="${random4.image}">
                      <h6 class="pris-card">${(random4.price.toFixed(2))}:-</h6>
                        <p class="card-text"><br>
                          ${random4.description}" 
                          <br>
                          <hr>
                          Styckpris: ${random4.perPrice}0 kr/st
                          <br>
                          Jämförpris: ${random4.compPrice}0 kr/kg             
                        </p>
                    </div>
                  </div>
            </div>
          </div>
          </div>
              <div class="carousel-item text-center">
              ${random5.title.bold()} -
              ${random5.price.toFixed(2).replace(".", ",")} kr
              <a class="btn btn-outline-light" data-bs-toggle="modal" href="#modal${random5.id}" role="button"><img src="${random5.image}" class="d-block" alt="Slide 5"></a>
              <div class="carousel-caption d-none d-md-block text-dark">
              </div>
              <div class="modal fade" id="modal${random5.id}" aria-hidden="true" aria-labelledby="..." tabindex="-1">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="card h-100 rounded">
                    <div class="card-body text-center">
                      <h4 class="card-title">${random5.title}</h4>
                      <p>${random5.brand} | ${random5.amount}</p>
                        <img class="card-img-top" src="${random5.image}">
                      <h6 class="pris-card">${(random5.price.toFixed(2))}:-</h6>
                        <p class="card-text"><br>
                          ${random5.description}" 
                          <br>
                          <hr>
                          Styckpris: ${random5.perPrice}0 kr/st
                          <br>
                          Jämförpris: ${random5.compPrice}0 kr/kg             
                        </p>
                    </div>
                  </div>
            </div>
          </div>
          </div>
              
              </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
          </button>

      `;
      super.container.innerHTML = this.html;

    }
    
}
