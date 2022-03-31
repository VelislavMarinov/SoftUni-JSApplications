import { isLoggedIn } from "../api/api.js";
import { getAllCatalogs } from "../api/data.js";
import { html } from "../lib.js";

let catalogTemplate = (card) => html`<div class="card-box">
  <img src="${card.imgUrl}" />
  <div>
    <div class="text-center">
      <p class="name">Name: ${card.name}</p>
      <p class="artist">Artist: ${card.artist}</p>
      <p class="genre">Genre: ${card.genre}</p>
      <p class="price">Price: $${card.price}</p>
      <p class="date">Release Date: ${card.releaseDate}</p>
    </div>
    <div class="btn-group">
      ${isLoggedIn()
        ? html`<a href="/details/${card._id}" id="details">Details</a>`
        : html``}
    </div>
  </div>
</div>`;

let catalogsTemplate = (cards) => html`<section id="catalogPage">
  <h1>All Albums</h1>
  ${cards.length == 0
    ? html`<p>No Albums in Catalog!</p>`
    : cards.map(catalogTemplate)}
</section>`;

export async function catalogPage(ctx) {
  let cards = await getAllCatalogs();

  ctx.render(catalogsTemplate(cards));
}
