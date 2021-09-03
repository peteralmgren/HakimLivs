import Header from "./ui/modules/header.js";
import Footer from "./ui/modules/footer.js";
import Login from "./ui/modules/login.js";
import Carousel from "./ui/modules/carousel.js";
import Sidebar from "./ui/modules/sidebar.js";

window.addEventListener("load", async (e) => {
    new Header("header");
    new Footer("footer");
    new Carousel(".carousel");
    new Login(".login");
    new Sidebar(".sidebar");
});


window.addEventListener("click", async (e) => {
    //console.log("click test", e.target.id);
    if(e.target.id == "login-btn") validateUser();
});

