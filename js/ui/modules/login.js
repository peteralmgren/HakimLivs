import UI from "../ui.js";

export default class Login extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.html = `
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
            </div>
            <div class="modal-body">
            <!--<div class="modal-body2">-->
            <div class="form-title text-center">
                <h4>Logga in</h4>
            </div>
            <div class="d-flex flex-column text-center">
                <form name="myForm" action="" method="post" onsubmit="validateUser()">
                <div class="form-group">
                    <input type="email" class="form-control" id="email1" placeholder="Ange email...">
                </div>
                <div class="form-group">
                    <br>
                    <input type="password" class="form-control" id="password1" placeholder="Ange lösenord...">
                </div>
                <br>
                <button type="button" id="login-btn" class="btn btn-info btn-block btn-round">Logga in</button>
                </form>
            </div>
            </div>
        </div>
        </div>
        </div>
        `;
        super.container.innerHTML = this.html;
    }
}
