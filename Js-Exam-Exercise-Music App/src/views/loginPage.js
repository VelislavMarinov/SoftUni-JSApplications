import { login } from "../api/api.js";
import { html } from "../lib.js";

let loginTemplate = (onSubmit) => html`<section id="loginPage">
  <form @submit=${onSubmit}>
    <fieldset>
      <legend>Login</legend>

      <label for="email" class="vhide">Email</label>
      <input
        id="email"
        class="email"
        name="email"
        type="text"
        placeholder="Email"
      />

      <label for="password" class="vhide">Password</label>
      <input
        id="password"
        class="password"
        name="password"
        type="password"
        placeholder="Password"
      />

      <button type="submit" class="login">Login</button>

      <p class="field">
        <span>If you don't have profile click <a href="#">here</a></span>
      </p>
    </fieldset>
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
