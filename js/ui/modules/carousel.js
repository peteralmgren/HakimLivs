import UI from "../ui.js";

let products = [];
let productIndex = 0;
products = JSON.parse(localStorage.getItem("products"));



if (!products) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://grupp5hakimlivs.herokuapp.com/all");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      products = JSON.parse(xhr.responseText);
      localStorage.setItem("products", JSON.stringify(products));
      
    }
  };

}


export default class Carousel extends UI {

    constructor(appendTo) {
        super(appendTo);

        (function($) {
          $.rand = function(arg) {
              if ($.isArray(arg)) {
                  return arg[$.rand(arg.length)];
              } else if (typeof arg == "number") {
                  return Math.floor(Math.random() * arg);
              } else {
                  return 44;  // chosen by fair dice roll
              }
          };
        })(jQuery);
        
        console.log($.rand(products));
        let random1= $.rand(products)
        let random2= $.rand(products)
        let random3= $.rand(products)
        let random4= $.rand(products)
        let random5= $.rand(products)
        //console.log($.rand());

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
              <div class="carousel-item active">
                <img src="${random1.image}" class="d-block" alt="Slide 1">
                <div class="carousel-caption d-none d-md-block text-dark">
                </div>
              </div>
              <div class="carousel-item  ">
                      <img src="${random2.image}">
                <div class="carousel-caption d-none d-md-block text-dark">
                </div>
              </div>

              <div class="carousel-item ">
                <img src="${random3.image}">
                <div class="carousel-caption d-none d-md-block text-dark">
                </div>
                </div>
                <div class="carousel-item ">
                <img src="${random4.image}" class="d-block" alt="Slide 4">
                <div class="carousel-caption d-none d-md-block text-dark">
                </div>
                </div>
                <div class="carousel-item ">
                <img src="${random5.image}" class="d-block" alt="Slide 5">
                <div class="carousel-caption d-none d-md-block text-dark">
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
