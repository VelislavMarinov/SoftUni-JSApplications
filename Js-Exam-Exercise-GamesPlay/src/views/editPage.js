import { editGame, getGameDetails } from "../api/data.js";
import { html } from "../lib.js";

let editGamePageTemplate = (gamedata, onSubmit) => html`<section
  id="edit-page"
  class="auth"
>
  <form @submit=${onSubmit} id="edit">
    <div class="container">
      <h1>Edit Game</h1>
      <label for="leg-title">Legendary title:</label>
      <input type="text" id="title" name="title" value="${gamedata.title}" />

      <label for="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value="${gamedata.category}"
      />

      <label for="levels">MaxLevel:</label>
      <input
        type="number"
        id="maxLevel"
        name="maxLevel"
        min="1"
        value="${gamedata.maxLevel}"
      />

      <label for="game-img">Image:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value="${gamedata.imageUrl}"
      />

      <label for="summary">Summary:</label>
      <textarea name="summary" id="summary">${gamedata.summary}</textarea>
      <input class="btn submit" type="submit" value="Edit Game" />
    </div>
  </form>
</section>`;

export async function editPage(ctx) {
  let pathname = ctx.pathname;
  let id = pathname.split("/")[2];

  let game = await getGameDetails(id);

  ctx.render(editGamePageTemplate(game, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    let body = {
      title: form.get("title"),
      category: form.get("category"),
      maxLevel: form.get("maxLevel"),
      imageUrl: form.get("imageUrl"),
      summary: form.get("summary"),
    };
    if (
      body.title != "" &&
      body.category != "" &&
      body.maxLevel != "" &&
      body.imageUrl != "" &&
      body.summary != ""
    ) {
      let result = await editGame(game._id, body);

      ctx.page.redirect(`/details/${game._id}`);
    }
  }
}
