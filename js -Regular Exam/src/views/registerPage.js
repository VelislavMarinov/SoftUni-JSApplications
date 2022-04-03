import { register } from "../api/api.js";
import { html } from "../lib.js";

let registerTemplate = (onSubmit) => html`<section id="registerPage">
  <form @submit=${onSubmit} class="registerForm">
    <img src="./images/logo.png" alt="logo" />
    <h2>Register</h2>
    <div class="on-dark">
      <label for="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="steven@abv.bg"
        value=""
      />
    </div>

    <div class="on-dark">
      <label for="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <div class="on-dark">
      <label for="repeatPassword">Repeat Password:</label>
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <button class="btn" type="submit">Register</button>

    <p class="field">
      <span>If you have profile click <a href="#">here</a></span>
    </p>
  </form>
</section>`;

export async function registerPage(ctx) {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    let form = new FormData(e.target);
    let email = form.get("email");
    let password = form.get("password");
    let rePassword = form.get("repeatPassword");

    if (email != "" && password != "" && password == rePassword) {
      await register(email, password);
      ctx.updateNavBar();
      ctx.page.redirect("/homepage");
    } else {
      alert("invalid info");
    }
  }
}
