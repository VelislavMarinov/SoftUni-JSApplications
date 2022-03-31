import { deleteAlbum, getAlbumDetails } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

let detailsPageTemplate = (
  album,
  checkIfUserIsCreator,
  onDelete
) => html`<section id="detailsPage">
  <div class="wrapper">
    <div class="albumCover">
      <img src="${album.imgUrl}" />
    </div>
    <div class="albumInfo">
      <div class="albumText">
        <h1>Name: ${album.name}</h1>
        <h3>Artist: ${album.artist}</h3>
        <h4>Genre: ${album.genre}</h4>
        <h4>Price: ${album.price}</h4>
        <h4>Date: ${album.releaseDate}</h4>
        <p>${album.description}</p>
      </div>

      ${checkIfUserIsCreator
        ? html`<div class="actionBtn">
            <a href="/edit/${album._id}" class="edit">Edit</a>
            <a @click=${onDelete} class="remove">Delete</a>
          </div>`
        : html``}
    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  let pathname = ctx.pathname;
  let id = pathname.split("/")[2];
  let userData = getUserData();

  let album = await getAlbumDetails(id);

  let checkIfUserIsCreator = false;

  let bool = userData && userData.id == album._ownerId ? true : false;
  checkIfUserIsCreator = bool;

  ctx.render(detailsPageTemplate(album, checkIfUserIsCreator, onDelete));

  async function onDelete(e) {
    e.preventDefault;
    if (userData) {
      const choice = confirm(
        "Are you sure you want to delete this album forever ?"
      );

      if (choice) {
        await deleteAlbum(id);
        ctx.page.redirect("/catalog");
      }
    }
  }
}
