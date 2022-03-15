import { deleteMeme, getMemeDetails } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

let memeDetailsTemplate = (
  meme,
  checkIfUserIsCreator,
  onDelete
) => html`<section id="meme-details">
  <h1>Meme Title: ${meme.title}</h1>
  <div class="meme-details">
    <div class="meme-img">
      <img alt="meme-alt" src="${meme.imageUrl}" />
    </div>
    <div class="meme-description">
      <h2>Meme Description</h2>
      <p>${meme.description}</p>

      <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
      ${checkIfUserIsCreator
        ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click="${onDelete}" class="button danger">Delete</button>`
        : null}
    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  let pathname = ctx.pathname;
  let id = pathname.split("/")[2];
  let userData = getUserData();

  let meme = await getMemeDetails(id);

  let checkIfUserIsCreator = false;

  let bool = userData && userData.id == meme._ownerId ? true : false;
  checkIfUserIsCreator = bool;

  ctx.render(memeDetailsTemplate(meme, checkIfUserIsCreator, onDelete));

  async function onDelete() {
    if (userData) {
      const choice = confirm(
        "Are you sure you want to delete this meme forever ?"
      );

      if (choice) {
        await deleteMeme(id);
        ctx.page.redirect("/memes");
      }
    }
  }
}
