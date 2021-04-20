import UI from "../ui.js";

export default class Carousel extends UI {
    constructor(appendTo) {
        super(appendTo);
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
                <img src="images/fruit/banana-2449019_640.jpg" class="d-block" alt="Slide 1">
                <div class="carousel-caption d-none d-md-block text-dark">
                 
                </div>
              </div>
              <div class="carousel-item  ">
                      <img src="/images/mejeri/ost.jpg" class="d-block" alt="Slide 2">
                <div class="carousel-caption d-none d-md-block text-dark">
                 
                </div>
              </div>

              <div class="carousel-item ">
                <img src="/images/mejeri/smör.jpg" class="d-block" alt="Slide 3">
                <div class="carousel-caption d-none d-md-block text-dark">
                   
                </div>
                </div>
                <div class="carousel-item ">
                <img src="/images/mejeri/gräddfil.jpg" class="d-block" alt="Slide 4">
                <div class="carousel-caption d-none d-md-block text-dark">
                    
                </div>
                </div>
                <div class="carousel-item ">
                <img src="/images/fruit/apples-490474_640.jpg" class="d-block" alt="Slide 5">
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