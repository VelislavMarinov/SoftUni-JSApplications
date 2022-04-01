import { createGame } from "../api/data.js";
import { html } from "../lib.js";

let createGamePageTemplate = (onSubmit) => html`<section
  id="create-page"
  class="auth"
>
  <form @submit=${onSubmit} id="create">
    <div class="container">
      <h1>Create Game</h1>
      <label for="leg-title">Legendary title:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter game title..."
      />

      <label for="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        placeholder="Enter game category..."
      />

      <label for="levels">MaxLevel:</label>
      <input
        type="number"
        id="maxLevel"
        name="maxLevel"
        min="1"
        placeholder="1"
      />

      <label for="game-img">Image:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        placeholder="Upload a photo..."
      />

      <label for="summary">Summary:</label>
      <textarea name="summary" id="summary"></textarea>
      <input class="btn submit" type="submit" value="Create Game" />
    </div>
  </form>
</section>`;

export async function createGamePage(ctx) {
  ctx.render(createGamePageTemplate(onSubmit));

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
      let result = await createGame(body);

      ctx.page.redirect("/homepage");
    }
  }
}
