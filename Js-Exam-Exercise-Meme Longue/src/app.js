import { isLoggedIn, logout } from "./api/api.js";
import * as api from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./utils.js";
import { catalogPage } from "./views/catalogPage.js";
import { createMemePage } from "./views/createMemePage.js";
import { editMemePage } from "./views/editMemePage.js";
import { homePage } from "./views/homePage.js";
import { loginPage } from "./views/loginPage.js";
import { detailsPage } from "./views/memeDetailsPage.js";

import { profilePage } from "./views/profilePage.js";
import { registerPage } from "./views/registerPage.js";
window.api = api;

updateNavBar();
let root = document.querySelector("main");

let logoutBtn = document.getElementById("btnLogout");

logoutBtn.addEventListener("click", onLogout);

page(decorateText);
page("/", homePage);
page("/home", homePage);
page("/edit/:id", editMemePage);
page("/details/:id", detailsPage);
page("/memes", catalogPage);
page("/login", loginPage);
page("/register", registerPage);
page("/create", createMemePage);
page("/edit", editMemePage);
page("/profile", profilePage);
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
  page.redirect("/");
}

async function updateNavBar() {
  let userData = getUserData();

  if (userData) {
    document.getElementById("guest").style.display = "none";
    document.getElementById("user").style.display = "block";
    document.getElementById(
      "addEmail"
    ).textContent = `Welcome, ${userData.email}`;
  } else {
    document.getElementById("guest").style.display = "block";
    document.getElementById("user").style.display = "none";
  }
}
