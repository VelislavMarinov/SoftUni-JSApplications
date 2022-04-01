import { page, render } from "./lib.js";
import * as api from "./api/api.js";
import { html } from "./lib.js";
import { homePage } from "./views/homePage.js";
import { loginPage } from "./views/loginPage.js";
import { registerPage } from "./views/registerPage.js";
import { createGamePage } from "./views/createGamePage.js";
import { allGamesPage } from "./views/AllGamesPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { editPage } from "./views/editPage.js";

window.api = api;
let root = document.getElementById("main-content");

updateNavBar();

page(decorateText);
page("/", homePage);
page("/homepage", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/create/game", createGamePage);
page("/AllGames", allGamesPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);

page.start();
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

async function updateNavBar() {
  let navigation = (onLogout) => html` <!-- Navigation -->
    <h1><a class="home" href="/homepage">GamesPlay</a></h1>
    <nav>
      <a href="/AllGames">All games</a>
      ${api.isLoggedIn()
        ? html`<div id="user">
            <a href="/create/game">Create Game</a>
            <a @click=${onLogout} href="/homepage">Logout</a>
          </div>`
        : html` <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
    </nav>`;

  let navbar = document.getElementById("navBar");
  render(navigation(onLogout), navbar);
}
