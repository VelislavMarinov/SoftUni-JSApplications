import { page, render } from "./lib.js";
import * as api from "./api/api.js";
import { html } from "./lib.js";
import { loginPage } from "./views/loginPage.js";
import { registerPage } from "./views/registerPage.js";
import { homePage } from "./views/homePage.js";

import { allPetsPage } from "./views/dashboardPage.js";
import { createPetPage } from "./views/createPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { editPage } from "./views/editPage.js";

let dontationCount = 0;
window.api = api;
let root = document.getElementById("content");

updateNavBar();
page(decorateText);
page("/", homePage);
page("/homepage", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/dashboard", allPetsPage);
page("/create", createPetPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);
page.start();

export function addDonation() {
  dontationCount += 100;
}

export function getDonations() {
  return dontationCount;
}

async function onLogout(e) {
  e.preventDefault();
  api.logout();
  updateNavBar();
  page.redirect("/homepage");
}

async function decorateText(ctx, next) {
  ctx.render = (element) => render(element, root);
  ctx.updateNavBar = updateNavBar;
  next();
}

let navigation = (onLogout) => html`<nav>
  <section class="logo">
    <img src="./images/logo.png" alt="logo" />
  </section>
  <ul>
    <!--Users and Guest-->
    <li><a href="/homepage">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    <!--Only Guest-->
    ${api.isLoggedIn()
      ? html`<li><a href="/create">Create Postcard</a></li>
          <li><a @click=${onLogout} href="#">Logout</a></li>`
      : html`<li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>`}
  </ul>
</nav>`;

async function updateNavBar() {
  let navigation = (onLogout) => html`<nav>
    <section class="logo">
      <img src="./images/logo.png" alt="logo" />
    </section>
    <ul>
      <!--Users and Guest-->
      <li><a href="/homepage">Home</a></li>
      <li><a href="/dashboard">Dashboard</a></li>
      <!--Only Guest-->
      ${api.isLoggedIn()
        ? html`<li><a href="/create">Create Postcard</a></li>
            <li><a @click=${onLogout} href="#">Logout</a></li>`
        : html`<li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>`}
    </ul>
  </nav>`;

  let navbar = document.getElementById("navBar");
  render(navigation(onLogout), navbar);
}
