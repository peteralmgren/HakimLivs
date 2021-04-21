import UI from "../ui.js";

export default class Footer extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.html=`
        <!-- Footer -->
        <footer class="bg-dark text-center text-white sticky-bottom">
          <!-- Grid container -->
          <div class="container p-4">
            <!-- Section: Links -->
            <section class="">
              <!--Grid row-->
              <div class="row">
                <!--Grid column-->
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase">Hitta hit</h5>
      
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-white">Link 1</a>
                    </li>
                  </ul>
                </div>
                <!--Grid column-->
      
                <!--Grid column-->
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase">Öppettider</h5>
      
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-white">Link 1</a>
                    </li>
      
                  </ul>
                </div>
                <!--Grid column-->
      
                <!--Grid column-->
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase">Om oss</h5>
      
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-white">Link 1</a>
                    </li>
      
                  </ul>
                </div>
                <!--Grid column-->
      
                <!--Grid column-->
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase">Kontakt</h5>
      
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="#!" class="text-white">Link 1</a>
                    </li>
      
                  </ul>
                </div>
                <!--Grid column-->
              </div>
              <!--Grid row-->
            </section>
            <!-- Section: Links -->
          </div>
          <!-- Grid container -->
      
          <!-- Copyright -->
          <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
            © 2021 Copyright: Hakim Dev Team!
      
          </div>
          <!-- Copyright -->
        </footer>
        <!-- Footer -->
        `;
        super.container.innerHTML = this.html;
    }
}