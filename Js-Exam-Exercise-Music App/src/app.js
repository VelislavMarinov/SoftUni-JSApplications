import { page, render } from "./lib.js";
import * as api from "./api/api.js";
import { homePage } from "./views/homePage.js";
import { loginPage } from "./views/loginPage.js";

import { html } from "./lib.js";
import { registerPage } from "./views/registerPage.js";
import { catalogPage } from "./views/catalogPage.js";
import { createPage } from "./views/createPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { editPage } from "./views/editPage.js";
import { searchPage } from "./views/searchPage.js";

window.api = api;

updateNavBar();
let root = document.querySelector("#main-content");

page(decorateText);
page("/", homePage);
page("/homepage", homePage);
page("/loginpage", loginPage);
page("/register", registerPage);
page("/catalog", catalogPage);
page("/createalbum", createPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);
page("/search", searchPage);

page.start();

async function decorateText(ctx, next) {
  ctx.render = (element) => render(element, root);
  ctx.updateNavBar = updateNavBar;
  next();
}

async function onLogout(e) {
  e.preventDefault();
  api.logout();
  updateNavBar();
  page.redirect("/homepage");
}

async function updateNavBar() {
  let navigation = (onLogout) => html`<nav>
    <img src="./images/headphones.png" />
    <a href="/homepage">Home</a>
    <ul>
      <li><a href="/catalog">Catalog</a></li>
      <li><a href="/search">Search</a></li>

      ${api.isLoggedIn()
        ? html`<li><a href="/createalbum">Create Album</a></li>
            <li id="logoutBtn">
              <a @click="${onLogout}" href="/homepage">Logout</a>
            </li>`
        : html` <li><a href="/loginpage">Login</a></li>
            <li><a href="/register">Register</a></li>`}
    </ul>
  </nav>`;

  let navbar = document.getElementById("navbar");
  render(navigation(onLogout), navbar);
}
