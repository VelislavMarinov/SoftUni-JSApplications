import { isLoggedIn } from "../api/api.js";
import { getAllGames } from "../api/data.js";
import { html } from "../lib.js";

let gameTemplate = (game) => html`<div class="allGames">
  <div class="allGames-info">
    <img src="${game.imageUrl}" />
    <h6>${game.category}</h6>
    <h2>${game.title}</h2>

    <a class="details-button" href="/details/${game._id}" id="details"
      >Details</a
    >
  </div>
</div>`;

let allGamesTemplate = (games) => html`<section id="catalog-page">
  <h1>All Games</h1>
  ${games.length == 0
    ? html`<h3 class="no-articles">No articles yet</h3>`
    : games.map(gameTemplate)}
</section>`;

export async function allGamesPage(ctx) {
  let games = await getAllGames();

  ctx.render(allGamesTemplate(games));
}
