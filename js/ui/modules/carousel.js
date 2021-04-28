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
              <img src="${random1.image}" class="d-block" alt="Slide 1">
              <div class="carousel-caption d-none d-md-block text-dark">
              </div>
              ${random1.title.bold()} -
              ${random1.price} kr
            </div>
            <div class="carousel-item text-center">
                    <img src="${random2.image}" class="d-block" alt="Slide 2">
              <div class="carousel-caption d-none d-md-block text-dark">
              </div>
              ${random2.title.bold()} -
              ${random2.price} kr
            </div>

            <div class="carousel-item text-center">
              <img src="${random3.image}" class="d-block" alt="Slide 3">
              <div class="carousel-caption d-none d-md-block text-dark">
              </div>
              ${random3.title.bold()} - 
              ${random3.price} kr
              </div>
              <div class="carousel-item text-center">
              <img src="${random4.image}" class="d-block" alt="Slide 4">
              <div class="carousel-caption d-none d-md-block text-dark">
              </div>
              ${random4.title.bold()} -
              ${random4.price} kr
              </div>
              <div class="carousel-item text-center">
              <img src="${random5.image}" class="d-block" alt="Slide 5">
              <div class="carousel-caption d-none d-md-block text-dark">
              </div>
              ${random5.title.bold()} -
              ${random5.price} kr
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
