import { isLoggedIn } from "../api/api.js";
import {
  createComment,
  deleteGame,
  getComentsForGame,
  getGameDetails,
} from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

let detailsPageTemplate = (
  comments,
  game,
  checkIfUserIsCreator,
  onDelete,
  onSubmit
) => html`<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">
  <div class="game-header">
    <img class="game-img" src="${game.imageUrl}" />
    <h1>${game.title}</h1>
    <span class="levels">MaxLevel: ${game.maxLevel}</span>
    <p class="type">${game.category}</p>
  </div>

  <p class="text">
    ${game.summary}
  </p>
  
  <div class="details-comments">
            <h2>Comments:</h2>
            ${
              comments.length == 0
                ? html`<p class="no-comment">No comments.</p>`
                : html`<ul>
                    <!-- list all comments for current game (If any) -->
                    ${comments.map(commentsTemplate)}
                  </ul>`
            }
  </div>
  
  ${
    checkIfUserIsCreator
      ? html`<div class="buttons">
          <a href="/edit/${game._id}" class="button">Edit</a>
          <a @click=${onDelete} class="button">Delete</a>
        </div>`
      : html`${isLoggedIn()
          ? html`<article class="create-comment">
              <label>Add new comment:</label>
              <form @submit=${onSubmit} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment" />
              </form>
            </article>`
          : html``}`
  }


</section>`;

let commentsTemplate = (coment) => html`<li class="comment">
  <p>${coment.comment}.</p>
</li>`;

export async function detailsPage(ctx) {
  let pathname = ctx.pathname;
  let id = pathname.split("/")[2];
  let userData = getUserData();

  let game = await getGameDetails(id);

  let checkIfUserIsCreator = false;

  let bool = userData && userData.id == game._ownerId ? true : false;
  checkIfUserIsCreator = bool;

  let coments = await getComentsForGame(game._id);

  ctx.render(
    detailsPageTemplate(coments, game, checkIfUserIsCreator, onDelete, onSubmit)
  );

  async function onSubmit(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    let text = form.get("comment");
    let body = {
      gameId: game._id,
      comment: text,
    };
    let result = await createComment(body);

    ctx.page.redirect(`${ctx.pathname}`);
  }

  async function onDelete(e) {
    e.preventDefault;
    if (userData) {
      const choice = confirm(
        "Are you sure you want to delete this album forever ?"
      );

      if (choice) {
        await deleteGame(id);
        ctx.page.redirect("/homepage");
      }
    }
  }
}
