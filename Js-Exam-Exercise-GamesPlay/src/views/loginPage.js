import { login } from "../api/api.js";
import { html } from "../lib.js";

let loginTemplate = (onSubmit) => html`<section id="login-page" class="auth">
  <form @submit=${onSubmit} id="login">
    <div class="container">
      <div class="brand-logo"></div>
      <h1>Login</h1>
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Sokka@gmail.com"
      />

      <label for="login-pass">Password:</label>
      <input type="password" id="login-password" name="password" />
      <input type="submit" class="btn submit" value="Login" />
      <p class="field">
        <span
          >If you don't have profile click <a href="/register">here</a></span
        >
      </p>
    </div>
  </form>
</section>`;

export async function loginPage(ctx) {
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    let form = new FormData(e.target);
    let email = form.get("email");
    let password = form.get("password");

    if ((email != "", password != "")) {
      await login(email, password);
      ctx.updateNavBar();
      ctx.page.redirect("/homepage");
    } else {
      alert("invalid info");
    }
  }
}
