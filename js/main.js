import Header from "./ui/modules/header.js";
import Footer from "./ui/modules/footer.js";
//import Modal from "./ui/modules/modal.js";
//import Carousel from "./ui/modules/carousel.js";


window.addEventListener("load", async (e) => {
    new Header("header");
    new Footer("footer");
    //new Modal(".modal");
    //new Carousel(".carousel");
});