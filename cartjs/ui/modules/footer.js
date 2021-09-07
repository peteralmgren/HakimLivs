import UI from "../ui.js";

export default class Footer extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.html=`
        <!-- Footer -->
        <div id="footer" class="card" style="width: 100%; height: 200px;">    
        <div class="container">
                <!-- <footer id="footer" class="bg-dark text-center text-white"> -->
                  <!-- Grid container -->
                  
                  <!-- </div> -->
                  <div class="card-body mh-50">
                    <!-- Section: Links -->
                    <section class="">
                      <!--Grid row-->
                      <div class="row">
                        <!--Grid column-->
                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                          <h5 class="text-uppercase">Hitta hit</h5>
                          <div class="map">
                            <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2040.08524602615!2d18.229802415806603!3d59.248016124582044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f7edbc0553321%3A0x8e387ad4dddd3cbf!2zU2lrdsOkZ2VuIDUsIDEzNSA0MSBUeXJlc8O2!5e0!3m2!1ssv!2sse!4v1615047531478!5m2!1ssv!2sse"
                            width="125"
                            height="125"
                            style="border: 0"
                            allowfullscreen=""
                            loading="lazy">
                          </iframe>
                  
                          </div>
              
                          <ul class="list-unstyled mb-0">
                            <li>
                              <a href="#!" class="text-white">Link 1</a>
                            </li>
                          </ul>
                        </div>
                        <!--Grid column-->
              
                        <!--Grid column-->
                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                          <h6 class="text">Öppettider</h6>
                          <h6 class="text">Vardagar 10-19</h6>
                          <h6 class="text">Helger 10-18</h6>
        
                        </div>
                        <!--Grid column-->
              
                        <!--Grid column-->
                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                          <h5 class="text-uppercase">Om oss</h5>
        
                          <info>
                             <a>Vi är ett familjeägt</a><br> 
                            livsmedelsföretag. Vi drivs<br>
                            av att ha bra produkter till<br>
                            bra priser.
                            </info>
                        </div>
                        <!--Grid column-->
              
                        <!--Grid column-->
                        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                          <h5 class="text-uppercase">Kontakt</h5><br>
                          <address>
                            Epost <a href="mailto:hakim@hakimlivs.se">Hakim</a><br> 
                            Hakimlivsgatan 10<br>
                            896 31 Husum<br>
                            Telefon: 0709999999
                            </address>
                          
                        </div>
                        
                        <!--Grid column-->
                      </div>
                      <!--Grid row-->
                    </section>
                    
        
                    </section>
                    <!-- Section: Links -->
                  </div>
                  <!-- Grid container -->
              
                
                <!-- </footer> -->
              </div>
              <!-- Copyright -->
                  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
                    © 2021 Copyright: Hakim Dev Team!
              
                  </div>
                  <!-- Copyright --> 
            </div>
          
        </footer>
        <!-- Footer -->
        `;
        super.container.innerHTML = this.html;
    }
}