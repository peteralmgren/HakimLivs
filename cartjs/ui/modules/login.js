import UI from "../ui.js";

export default class Login extends UI {
    constructor(appendTo) {
        super(appendTo);
        this.html = `
        <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-bottom-0">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!--<div class="modal-body2">-->
            <div class="form-title text-center">
              <h4>Logga in</h4>
            </div>
            <div class="d-flex flex-column text-center">
              <form>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="email1"
                    placeholder="Ange email..."
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="password1"
                    placeholder="Ange lösenord..."
                  />
                </div>
              
                <button
                  type="button"
                  onclick="validateUser()"
                  class="btn btn-info btn-block btn-round"
                >
                  Logga in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer d-flex justify-content-center">
        <div class="signup-section">
          Not a member yet? <a href="#a" class="text-info"> Sign Up</a>.
        </div>
      </div>
    </div>`
        super.container.innerHTML = this.html;
    }
}
