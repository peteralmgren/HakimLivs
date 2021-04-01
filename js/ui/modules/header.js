import UI from "../ui.js";

export default class Header extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.html=`
        <div class="shadow p-3 mb-5 bg-white rounded">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <a class="navbar-brand" href="index.html"><img src="images/logo.png" alt=""></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <form class="form-group">
                    <input class="form-control input-lg" id="inputlg" type="text" placeholder="Sök">
                </form>
                <div id="button-shadow">
                    <button type="button" class="btn btn-primary btn-lg hover-shadow" data-bs-toggle="modal" data-bs-target="#loginModal">Logga in</button>
                </div>
                <div id="button-shadow">
                    <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#shopping-cart">Varukorg</button>
                </div>
                <div id="button-shadow">
                    <a href="cart.html"><button type="button" class="btn btn-primary btn-lg">Till kassan:
                    <span>0kr</span></button></a>
                </div>
            </div>
        </nav>
        </div>
        `;
        super.container.innerHTML = this.html;
    }
}