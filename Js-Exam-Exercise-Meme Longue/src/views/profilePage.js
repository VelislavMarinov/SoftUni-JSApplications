import { getUserMemes } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

let profilePageTemplate = (userData, memes) => html`<section
  id="user-profile-page"
  class="user-profile"
>
  <article class="user-info">
    <img
      id="user-avatar-url"
      alt="user-profile"
      src="${userData.gender == "male"
        ? "/images/male.png"
        : "/images/female.png"}"
    />
    <div class="user-content">
      <p>Username: ${userData.username}</p>
      <p>Email: ${userData.email}</p>
      <p>My memes count: ${memes.length}</p>
    </div>
  </article>
  <h1 id="user-listings-title">User Memes</h1>
  <div class="user-meme-listings">
    <!-- Display : All created memes by this user (If any) -->
    ${memes.length != 0
      ? memes.map(userMeme)
      : html`<p class="no-memes">No memes in database.</p>`}

    <!-- Display : If user doesn't have own memes  -->
  </div>
</section>`;

let userMeme = (data) => html`<div class="user-meme">
  <p class="user-meme-title">${data.title}</p>
  <img class="userProfileImage" alt="meme-img" src="${data.imageUrl}" />
  <a class="button" href="/details/${data._id}">Details</a>
</div>`;

export async function profilePage(ctx) {
  let myMemes = await getUserMemes();

  let userData = getUserData();
  ctx.render(profilePageTemplate(userData, myMemes));
}
