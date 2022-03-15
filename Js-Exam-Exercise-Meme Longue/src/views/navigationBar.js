import { html } from "../lib.js";

let navbarTemplate = (isLoged) => html`<nav>
  <a href="/memes">All Memes</a>
  <!-- Logged users -->
  ${isLoged()
    ? html`<div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
          <span>Welcome, {email}</span>
          <a href="/profile">My Profile</a>
          <a id="btnLogout" href="/">Logout</a>
        </div>
      </div>`
    : html`<div class="guest">
  <div class="profile">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>
  <a class="active" href="/home">Home Page</a>
</div>
</nav>`}

  <!-- Guest users -->
</nav> `;

export async function navbarPage(isLoged, render, navbar) {
  render(navbarTemplate(isLoged), navbar);
}
